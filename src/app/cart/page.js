"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Cart.module.css'; // Import the CSS module

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL; // Use environment variable

      try {
        const res = await axios.get(`${API_URL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(res.data);
      } catch (err) {
        console.error('Failed to fetch cart items', err);
      }
    };
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (itemId) => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const API_URL = process.env.NEXT_PUBLIC_API_URL; // Use environment variable

    try {
      const res = await axios.delete(`${API_URL}/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.message); // Success message
      // Update the cartItems state by filtering out the removed item
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Failed to remove from cart', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className={styles.cartItemsList}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <h2 className={styles.productName}>{item.name}</h2>
              <p className={styles.quantity}>Quantity: {item.quantity}</p>
              <button className={styles.removeButton} onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyCartMessage}>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
