'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSignUp) {
      await supabase.auth.signUp({ email, password });
    } else {
      await supabase.auth.signInWithPassword({ email, password });
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-xl mb-4">{isSignUp ? 'Sign Up' : 'Log In'}</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded" type="submit">
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>
        <p className="mt-2 text-sm text-center cursor-pointer text-blue-600" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account?' : 'Create an account'}
        </p>
      </form>
    </div>
  );
}
