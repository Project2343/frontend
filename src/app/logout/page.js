import axios from 'axios';
import { useRouter } from 'next/router';

const handleLogout = async () => {
    const router = useRouter();
    
    try {
        const token = localStorage.getItem('token');
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        localStorage.removeItem('token'); // Clear token from localStorage
        router.push('/login'); // Redirect to login page
    } catch (error) {
        console.error('Failed to log out:', error.response?.data || error.message);
    }
};
