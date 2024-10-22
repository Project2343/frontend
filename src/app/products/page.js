"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import styles from './Products.module.css'; // Import the CSS module

const Products = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter(); // Initialize useRouter for navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, { product_id: product.id, quantity: 1 }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Redirect to the Cart page after successful addition
      router.push('/cart');
    } catch (err) {
      console.error('Failed to add to cart', err.response.data);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.searchInput} // Apply CSS class
        placeholder="Search by name or category"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            // Safely parse the price
            const price = parseFloat(product.price);
            const formattedPrice = isNaN(price) ? 'Invalid price' : price.toFixed(2);

            return (
              <div key={product.id} className={styles.productItem}style={{display:'flex', flexDirection:'row'}}>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productPrice}>Price: ${formattedPrice}</p>
                <button 
                  className={styles.addToCartButton} 
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
