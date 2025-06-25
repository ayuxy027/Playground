# Personal Bookmark Manager

A sophisticated bookmark management application with Google OAuth authentication, built using the MERN stack (MongoDB, Express.js, React, Node.js). Features a vintage black and white design with Jakarta Sans typography.

## Features

- **Secure Authentication**: Google OAuth 2.0 integration with JWT tokens
- **Bookmark Management**: Full CRUD operations for bookmarks
- **Organization**: Category-based organization and tagging system
- **Search & Filter**: Fast search and category filtering
- **Responsive Design**: Works seamlessly across devices
- **Vintage UI**: Clean black and white design with Jakarta Sans font
- **Real-time Updates**: Instant updates without page refresh

## Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Passport.js** for Google OAuth
- **JWT** for session management
- **Joi** for validation
- **Helmet** for security headers
- **Rate limiting** for API protection

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Hook Form** for form handling
- **React Hot Toast** for notifications
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google Cloud Console account for OAuth

### Backend Setup

1. **Clone and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your values:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bookmark-manager
   JWT_SECRET=your-super-secret-jwt-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   CLIENT_URL=http://localhost:5173
   SESSION_SECRET=your-session-secret
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

### Full Stack Development

To run both backend and frontend simultaneously:

```bash
# From the root directory
npm install
npm run dev
```

## Project Structure

```
bookmark-manager/
├── backend/
│   ├── config/
│   │   └── passport.js          # Passport Google OAuth config
│   │   └── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   │   └── models/
│   │   │   ├── User.js              # User model
│   │   │   └── Bookmark.js          # Bookmark model
│   │   └── routes/
│   │   │   ├── auth.js              # Authentication routes
│   │   │   └── bookmarks.js         # Bookmark CRUD routes
│   │   ├── .env.example             # Environment variables template
│   │   ├── package.json
│   │   └── server.js                # Express server setup
├── frontend/
│   ├── src/
│   │   ├── api/                 # API service functions
│   │   ├── components/          # Reusable React components
│   │   ├── contexts/            # React contexts (Auth)
│   │   ├── pages/               # Page components
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js       # Tailwind configuration
│   └── vite.config.js           # Vite configuration
├── package.json                 # Root package.json for dev scripts
└── README.md
```

## API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh JWT token

### Bookmarks
- `GET /api/bookmarks` - Get user's bookmarks (with pagination/filtering)
- `POST /api/bookmarks` - Create new bookmark
- `PUT /api/bookmarks/:id` - Update bookmark
- `DELETE /api/bookmarks/:id` - Delete bookmark
- `GET /api/bookmarks/categories` - Get user's categories
- `GET /api/bookmarks/stats` - Get bookmark statistics

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookmark-manager
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your-session-secret
NODE_ENV=development
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## Design System

The application uses a vintage black and white color palette:

- **Primary Black**: `#1a1a1a`
- **Charcoal**: `#2d2d2d`
- **Slate**: `#666666`
- **Silver**: `#999999`
- **Platinum**: `#cccccc`
- **Pearl**: `#e6e6e6`
- **Snow**: `#f5f5f5`
- **Pure White**: `#ffffff`

Typography uses **Plus Jakarta Sans** with `-3%` letter spacing for enhanced readability and modern aesthetics.

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation using Joi
- **Rate Limiting**: API endpoints protected against abuse
- **Helmet.js**: Security headers for Express
- **CORS Configuration**: Proper cross-origin resource sharing
- **MongoDB Injection Protection**: Mongoose schema validation

## Deployment

### Backend Deployment (Render/Railway/Heroku)
1. Set environment variables
2. Ensure MongoDB connection string is updated
3. Update Google OAuth redirect URIs for production domain

### Frontend Deployment (Vercel/Netlify)
1. Build the application: `npm run build`
2. Set `VITE_API_URL` to your backend URL
3. Configure redirects for React Router

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 