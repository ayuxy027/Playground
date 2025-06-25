import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import LoginPage from './pages/LoginPage';
import AuthSuccessPage from './pages/AuthSuccessPage';
import BookmarksPage from './pages/BookmarksPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-vintage-snow flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/bookmarks" replace /> : <LoginPage />
        } 
      />
      <Route path="/auth/success" element={<AuthSuccessPage />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/bookmarks" replace />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
      </Route>

      {/* Catch all route */}
      <Route 
        path="*" 
        element={
          <Navigate 
            to={isAuthenticated ? "/bookmarks" : "/login"} 
            replace 
          />
        } 
      />
    </Routes>
  );
}

export default App; 