import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleAuthSuccess = () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        toast.error('Authentication failed. Please try again.');
        navigate('/login');
        return;
      }

      if (token) {
        login(token);
        navigate('/bookmarks');
      } else {
        toast.error('No authentication token received.');
        navigate('/login');
      }
    };

    handleAuthSuccess();
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen bg-vintage-snow flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <div>
          <h2 className="text-xl font-semibold text-vintage-black tracking-tight">
            Completing Sign In
          </h2>
          <p className="text-vintage-slate tracking-tight">
            Please wait while we set up your account...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccessPage; 