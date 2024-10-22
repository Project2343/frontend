"use client"; // Mark the component as a Client Component

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import styles from './Dashboard.module.css'; // Import the CSS module

const Dashboard = () => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    discount: ''
  });

  const router = useRouter(); // Initialize useRouter for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL; // Use environment variable

    try {
      const res = await axios.post(`${API_URL}/api/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Product added:', res.data);
    } catch (err) {
      console.error('Failed to add product', err);
    }
  };

  // Logout functionality
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL; // Use environment variable

    try {
      await axios.post(`${API_URL}/api/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Logout successful');
    } catch (err) {
      console.error('Logout failed', err);
    }

    localStorage.removeItem('token'); // Remove the token from localStorage
    router.push('/login'); // Redirect to the login page
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Logout button */}
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>

      {/* Form to add product */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={productData.name}
          onChange={(e) => setProductData({ ...productData, name: e.target.value })}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          value={productData.category}
          onChange={(e) => setProductData({ ...productData, category: e.target.value })}
          placeholder="Category"
          required
        />
        <textarea
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
          placeholder="Price"
          required
        />
        <input
          type="number"
          value={productData.discount}
          onChange={(e) => setProductData({ ...productData, discount: e.target.value })}
          placeholder="Discount"
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Dashboard;
