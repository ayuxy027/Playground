import { Bookmark, Chrome } from 'lucide-react';
import { authApi } from '../api/auth';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = authApi.getGoogleAuthUrl();
  };

  return (
    <div className="min-h-screen bg-vintage-snow flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-vintage-black flex items-center justify-center mb-4">
            <Bookmark size={32} className="text-vintage-white" />
          </div>
          <h1 className="text-3xl font-bold text-vintage-black tracking-tight">
            Bookmark Manager
          </h1>
          <p className="mt-2 text-vintage-slate tracking-tight">
            Curate and organize your digital collections with precision
          </p>
        </div>

        {/* Login Card */}
        <div className="card p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-vintage-black tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-vintage-slate tracking-tight">
              Sign in to access your bookmarks
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full btn-outline flex items-center justify-center space-x-3 py-3 hover:shadow-vintage transition-all duration-200"
          >
            <Chrome size={20} />
            <span>Continue with Google</span>
          </button>

          {/* Features */}
          <div className="border-t border-vintage-pearl pt-6">
            <h3 className="text-sm font-medium text-vintage-black tracking-tight mb-3">
              Features
            </h3>
            <ul className="space-y-2 text-sm text-vintage-slate tracking-tight">
              <li>• Secure bookmark storage</li>
              <li>• Category organization</li>
              <li>• Fast search & filtering</li>
              <li>• Cross-device synchronization</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-vintage-silver tracking-tight">
          <p>By signing in, you agree to our terms of service and privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 