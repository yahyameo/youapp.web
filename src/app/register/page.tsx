"use client";

import React, { useState } from 'react';
import { URLs } from '../utils/api.urls';
import { useRouter } from 'next/navigation';
import { ApiResponse } from '../utils/api.response';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();


    const handleLogin = async () => {

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(URLs.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });
            if (response.ok) {
                let data = await response.json() as ApiResponse;
                if (!data.success) return setError(data.message);
                setError("");
                localStorage.setItem("authToken", data.data["token"]);
                router.push('/profile', { scroll: false });
            } else {
                const data = await response.json();
                setError(data.message || 'Registeration failed');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-md w-full px-8 py-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Register</h2>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 border rounded-md w-full" placeholder="Enter email" />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 border rounded-md w-full" placeholder="Enter username" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Create Password</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 border rounded-md w-full" placeholder="Enter password" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 p-2 border rounded-md w-full" placeholder="Confirm password" />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Register</button>
                </form>
                <p>Have an account? <a href='/'>Login</a></p>
            </div>
        </div>
    );
}

export default Login;
