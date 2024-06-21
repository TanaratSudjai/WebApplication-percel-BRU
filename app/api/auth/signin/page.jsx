"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn('Credentials', {
        username,
        password,
        redirect: false, // Change as needed
      });

      if (result.error) {
        // Handle sign-in error
        console.error('Sign in error:', result.error);
      } else {
        // Navigate to success page or handle success
        router.push('/'); // Example redirect
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInPage;
