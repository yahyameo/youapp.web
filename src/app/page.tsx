"use client";

import React, { useEffect, useState } from 'react';
import { ApiResponse } from './utils/api.response';
import { useRouter } from 'next/navigation';
import { URLs } from "./utils/api.urls";
import Cookies from 'js-cookie';

const Login: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // if (localStorage.getItem("authToken")) router.push('/profile', { scroll: false });
  }, []);
  
  const handleLogin = async () => {
    try {
      const response = await fetch(URLs.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });
      if (response.ok) {
        let data = await response.json() as ApiResponse;
        if (!data.success) return setError(data.message);
        setError("");
        Cookies.set('authToken', data.data["token"]);
        Cookies.set('userId', data.data["userId"]);
        router.push('/profile', { scroll: false });
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full px-8 py-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login</h2>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email/Username</label>
            <input id="email" type="text" value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} className="mt-1 p-2 border rounded-md w-full" placeholder="Enter your email or username" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 border rounded-md w-full" placeholder="Enter your password" />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Login</button>
        </form>
        <p>Don't have an account? <a href='/register'>Register</a></p>
      </div>
    </div>
  );
}

export default Login;
