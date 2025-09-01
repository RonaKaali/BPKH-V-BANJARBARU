'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.message || 'Login gagal');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat mencoba login');
    }
  };

  return (
    <div className="mx-auto my-12 max-w-md rounded-lg border border-gray-200 bg-gray-50 p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Login Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="username" className="mb-2 block font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 bg-white p-3 focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 bg-white p-3 focus:border-green-500 focus:ring-green-500"
          />
        </div>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <button 
            type="submit" 
            className="w-full cursor-pointer rounded-md border-none bg-green-600 p-3 font-bold text-white transition-colors hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
