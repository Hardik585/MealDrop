import React, { createContext, useEffect, useState } from 'react'

import { fetchFoodList } from '../services/FoodService';
import { addToCart, removeQtyFromCart, getCart } from '../services/cartService';

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [token, setToken] = useState('');
    const [userName, setUserName] = useState('');

    const increaseQty = async (foodId) => {
        setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
        await addToCart(foodId, token);
    }

    const decreaseQty = async (foodId) => {
        setQuantities((prev) => ({ ...prev, [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0 }));
        await removeQtyFromCart(foodId, token);
    }

    const removeFromCart = (foodId) => {
        setQuantities((prevQty) => {
            const updateQty = { ...prevQty };
            delete updateQty[foodId];
            return updateQty;
        });
    }

    const loadCartData = async (token) => {
        const items = await getCart(token);
        setQuantities(items);
    }

    useEffect(() => {
        async function loadData() {
            const foodData = await fetchFoodList();
            setFoodList(foodData);
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                setUserName(localStorage.getItem('email'));
                await loadCartData(localStorage.getItem('token'));
            }
        };
        loadData();
    }, [])

    const contextValue = {
        foodList,
        quantities,
        setQuantities,
        increaseQty,
        decreaseQty,
        removeFromCart,
        token,
        setToken,
        userName,
        setUserName,
        loadCartData
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

