import axios from "axios";

const BASE_API_URL = 'http://localhost:9091/api/cart';

export const addToCart = async (foodId, token) => {
    try {
        await axios.post(`${BASE_API_URL}/add`, { foodId }, {
            "headers": { 'Authorization': `Bearer ${token}` }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const removeQtyFromCart = async (foodId, token) => {
    try {
        await axios.post(`${BASE_API_URL}/remove`, { foodId }, {
            "headers": { 'Authorization': `Bearer ${token}` }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCart = async (token) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/getcart`, { 'headers': { 'Authorization': `Bearer ${token}` } });
        return response.data.items;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
