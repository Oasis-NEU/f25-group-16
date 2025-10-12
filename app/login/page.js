'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Login() {
  const router = useRouter();
  const googleButtonRef = useRef(null);

  const handleSignIn = () => {
    router.push('/feed');
  };

  // Initialize Google Sign-In
  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      // Render the Google Sign-In button
      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            theme: 'outline',
            size: 'large',
            width: 384, // Set explicit width in pixels (matches max-w-md container)
            text: 'continue_with',
          }
        );
      }
    }
  }, []);

  const handleCredentialResponse = (response) => {
    // Handle the JWT token from Google
    console.log('Google Sign-In response:', response);

    // You can decode the JWT token here or send it to your backend
    // For now, we'll just redirect to the feed
    router.push('/feed');
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-slate-800 text-center mb-6">Sign in</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email or Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-500"
            />
          </div>

          <div className="text-right">
            <a href="/password" className="text-slate-500 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            onClick={handleSignIn}
            className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4"
          >
            Sign in
          </button>
        </div>

        <div className="text-center">

            <a href="/login/create" className="text-slate-500 text-sm hover:underline">
              Don't Have an Account? Create one!
            </a>
          </div>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-500"></div>
          <span className="px-4 text-slate-500 text-sm">or</span>
          <div className="flex-1 border-t border-slate-500"></div>
        </div>

        {/* Google Sign-In Button */}
        <div ref={googleButtonRef} className="w-full google-signin-container"></div>

        <style dangerouslySetInnerHTML={{
          __html: `
            .google-signin-container .g_id_signin {
              width: 100% !important;
            }
            .google-signin-container .g_id_signin > div {
              width: 100% !important;
            }
            .google-signin-container .g_id_signin iframe {
              width: 100% !important;
            }
          `
        }} />
      </div>
    </div>
  );
}

