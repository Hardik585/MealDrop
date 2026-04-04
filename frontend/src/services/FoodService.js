import React from 'react'

import axios from 'axios';

const API_URL = 'http://localhost:9091/api';

export const fetchFoodList = async () => {
    try {
        const response = await axios.get(API_URL + '/foods');
        return response.data;
    } catch (error) {
        console.error('Error fetching food list:', error);
        throw error;
    }
}

export const fetchFoodDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/food/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error in fetching food details " + error);
        throw error;
    }
}

