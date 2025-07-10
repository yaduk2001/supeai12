# SupeAI - Full Stack Application

A modern full-stack application built with Next.js frontend and Express.js backend.

## Project Structure

```
supeai/
├── backend/          # Express.js API server
│   ├── app.js        # Main server file
│   └── package.json  # Backend dependencies
└── frontend/         # Next.js frontend application
    ├── src/app/      # App router pages
    │   ├── page.js   # Home page
    │   └── test/     # Test page for API
    └── package.json  # Frontend dependencies
```

## Features

- **Frontend**: Next.js 14 with App Router
- **Backend**: Express.js with CORS enabled
- **Styling**: Tailwind CSS
- **API Testing**: Built-in test page to verify backend connectivity

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /` - Health check
- `GET /api/ping` - Returns `{ message: "pong" }`

## Testing the Connection

1. Visit `http://localhost:3000` to see the home page
2. Click "Test API Connection" or navigate to `http://localhost:3000/test`
3. Click the "Test API Ping" button to verify backend connectivity

## Development

- Backend changes will auto-restart the server
- Frontend changes will hot-reload in the browser
- CORS is configured to allow requests from `http://localhost:3000` to `http://localhost:5000`

## Environment Variables

Create a `.env` file in the backend directory to customize:
- `PORT` - Backend server port (default: 5000) 