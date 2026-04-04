import axios from 'axios';

const API_URI = 'http://localhost:9091/api';

export const addFood = async (foodData, image) => {
    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    formData.append('image', image);
    try {
        await axios.post(`${API_URI}/foods`, formData, { Headers: { "content-type": "multipart/form-data" } });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getFoodList = async () => {
    try {
        const response = await axios.get(`${API_URI}/foods`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const removeFood = async (id) => {
    try {
       const response =  await axios.delete(`${API_URI}/deletefood/${id}`);
       return response.status == 204;
    } catch (error) {
        console.error(error);
        throw error;
    }
};