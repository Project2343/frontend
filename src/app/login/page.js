// components/Login.js
"use client"; // Mark the component as a Client Component

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Change from 'next/router' to 'next/navigation'
import styles from './Login.module.css'; // Import the CSS module

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // This is from next/navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);

      // Redirect based on user role
      if (res.data.role === 'seller') {
        router.push('/dashboard'); // Redirect to the seller dashboard
      } else {
        router.push('/products'); // Redirect to the buyer product list
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const handleSignupRedirect = () => {
    router.push('/signup'); // Navigate to the Signup page
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignupRedirect} className={styles.signupButton}>
        Signup
      </button>
    </div>
  );
};

export default Login;
