import express from 'express';
import firebaseApp from '../config/firebase.js';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import session from 'express-session';

const router = express.Router();
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

// Session middleware
router.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

// Get current session
router.get('/session', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(200).json({ user: null });
    }

    // Get user data from Firebase Auth
    const userRecord = await auth.getUser(userId);

    // Get additional user data from Realtime Database
    const userRef = db.ref('users/' + userId);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    res.status(200).json({
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        ...userData
      }
    });
  } catch (error) {
    console.error('Session check error:', error);
    res.status(200).json({ user: null });
  }
});

// Google Sign-in
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;
    
    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // Get or create user record
    let userRecord;
    try {
      userRecord = await auth.getUser(uid);
    } catch (error) {
      // User doesn't exist, create new user
      userRecord = await auth.createUser({
        uid,
        email,
        displayName: name,
        photoURL: picture,
        emailVerified: true
      });

      // Store additional user data in Realtime Database
      const userRef = db.ref('users/' + uid);
      await userRef.set({
        name,
        email,
        picture,
        accountType: 'personal',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        provider: 'google'
      });
    }

    // Set session
    req.session.userId = uid;

    res.status(200).json({
      message: 'Google sign-in successful',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL
      }
    });
  } catch (error) {
    console.error('Google sign-in error:', error);
    res.status(401).json({ 
      message: error.message || 'Google sign-in failed' 
    });
  }
});

// Sign up with email/password
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, phone, accountType } = req.body;
    console.log('Signup request received:', { email, name, phone, accountType });

    // Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });
    console.log('User created in Firebase Auth:', userRecord.uid);

    // Store additional user data in Realtime Database
    const userRef = db.ref('users/' + userRecord.uid);
    const userData = {
      name,
      email,
      phone,
      accountType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      provider: 'email'
    };
    
    await userRef.set(userData);
    console.log('User data stored in Realtime Database');

    res.status(201).json({ 
      message: 'User created successfully',
      userId: userRecord.uid 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ 
      message: error.message || 'Failed to create user' 
    });
  }
});

// Login with email/password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify the user's credentials
    const userCredential = await auth.getUserByEmail(email);

    // Get additional user data from Realtime Database
    const userRef = db.ref('users/' + userCredential.uid);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    // Create session
    req.session.userId = userCredential.uid;
    
    res.status(200).json({ 
      message: 'Login successful',
      user: {
        uid: userCredential.uid,
        email: userCredential.email,
        displayName: userCredential.displayName,
        ...userData
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ 
      message: error.message || 'Invalid email or password' 
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Get user profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const userRecord = await auth.getUser(req.session.userId);
    const userRef = db.ref('users/' + req.session.userId);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      ...userData
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router;