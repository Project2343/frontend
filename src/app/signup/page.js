"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './Signup.module.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        email,
        password,
        role
      });

      // Store the JWT token in localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect to dashboard
      router.push('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Display server-side validation error
      } else {
        setError('Signup failed, please try again');
      }
    }
  };

  const handleLoginRedirect = () => {
    // Redirect to the login page
    router.push('/login'); // Change this to your actual login route
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSignupSubmit}>
        <input
          className={styles.inputField}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className={styles.inputField}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select
          className={styles.inputField}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button className={styles.submitButton} type="submit">Signup</button>
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleLoginRedirect} className={styles.loginButton}>
        Login
      </button>
      </form>
      
    </div>
  );
};

export default Signup;
