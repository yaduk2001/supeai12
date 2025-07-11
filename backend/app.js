import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';


dotenv.config();

// Debug environment variables (remove in production)
console.log('🔧 Environment Variables Check:');
console.log('   OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? `✅ Set (${process.env.OPENAI_API_KEY.substring(0, 20)}...)` : '❌ Missing');
console.log('   PORT:', process.env.PORT || '5000 (default)');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'development (default)');
console.log('   ALLOWED_ORIGINS:', process.env.ALLOWED_ORIGINS || 'Using defaults');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('---');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(url => url.trim())
  : [
      'http://localhost:3000',
      'https://supeai.onrender.com',
      'https://www.supeai.onrender.com'
    ];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    console.log('🔍 CORS check - Request origin:', origin);
    console.log('🔍 CORS check - Allowed origins:', allowedOrigins);
    
    // Check for exact match
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ CORS allowed for origin:', origin);
      callback(null, true);
    } else {
      // Check for case-insensitive match
      const normalizedOrigin = origin.toLowerCase();
      const normalizedAllowed = allowedOrigins.map(o => o.toLowerCase());
      
      if (normalizedAllowed.indexOf(normalizedOrigin) !== -1) {
        console.log('✅ CORS allowed for origin (case-insensitive):', origin);
        callback(null, true);
      } else {
        console.log('❌ CORS blocked origin:', origin);
        console.log('❌ Allowed origins:', allowedOrigins);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Import routes
import usersRouter from './routes/users.js';
import chatRouter from './routes/chat.js';
import authRouter from './routes/auth.js';

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running with CORS enabled!' });
});

// Ping route
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// CORS test route
app.get('/api/cors-test', (req, res) => {
  res.json({ 
    message: 'CORS test successful',
    origin: req.headers.origin,
    allowedOrigins: allowedOrigins,
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/users', usersRouter);
app.use('/api/chat', chatRouter);
app.use('/auth', authRouter);

// Start the server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 CORS enabled for: ${allowedOrigins.join(', ')}`);
  console.log('---');
  console.log('🎯 API endpoints ready:');
  console.log(`   GET  http://localhost:${PORT}/api/ping`);
  console.log(`   GET  http://localhost:${PORT}/api/users`);
  console.log(`   POST http://localhost:${PORT}/api/users`);
  console.log(`   POST http://localhost:${PORT}/api/chat`);
  console.log(`   POST http://localhost:${PORT}/auth/signup`);
  console.log(`   POST http://localhost:${PORT}/auth/login`);
  console.log(`   GET  http://localhost:${PORT}/auth/session`);
}); 