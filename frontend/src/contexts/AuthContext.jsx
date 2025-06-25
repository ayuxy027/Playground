import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('bookmark_token'));

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedToken = localStorage.getItem('bookmark_token');
      if (storedToken) {
        setToken(storedToken);
        await getCurrentUser();
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const userData = await authApi.getCurrentUser();
      setUser(userData.user);
    } catch (error) {
      console.error('Get current user error:', error);
      if (error.response?.status === 401) {
        logout();
      }
      throw error;
    }
  };

  const login = (newToken) => {
    try {
      setToken(newToken);
      localStorage.setItem('bookmark_token', newToken);
      getCurrentUser();
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setToken(null);
      localStorage.removeItem('bookmark_token');
      toast.success('Successfully logged out!');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authApi.refreshToken();
      const newToken = response.token;
      setToken(newToken);
      localStorage.setItem('bookmark_token', newToken);
      return newToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    refreshToken,
    getCurrentUser,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 