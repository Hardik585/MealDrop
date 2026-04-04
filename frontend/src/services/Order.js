import axios from "axios";
import { RAZORPAY_KEY } from "../utils/constant";
import { toast } from "react-toastify";


const API_BASE_URI = 'http://localhost:9091/orders'


export const createOrder = async (orderData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URI}/create`, orderData, { 'headers': { 'Authorization': `Bearer ${token}` } });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const initiateRazorpayPayment = async (placedOrderData, data, token) => {
    try {
        const options = {
            key: RAZORPAY_KEY,
            amount: Math.round(placedOrderData.amount * 100),
            currency: "INR",
            name: "MealDrop",
            description: "Food Order Payment",
            order_id: placedOrderData.razorpayOrderId,

            handler: async function (response) {
                try {
                    await verifyPayment(response, token);
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                } catch (err) {
                    toast.error("Payment verification failed");
                }
            },

            prefill: {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                contact: data.phoneNumber
            },

            theme: { color: "#3399cc" },

            modal: {
                onDismiss: async function () {
                    console.warn("Payment popup closed");
                    await deleteOrder(placedOrderData.id, token);
                }
            }
        };

        const razorpay = new window.Razorpay(options);

        razorpay.on("payment.failed", function (response) {
            console.error(response.error);
            toast.error("Payment failed!");
        });

        razorpay.open();

    } catch (error) {
        console.error(error);
        throw error;
    }
};

// export const initiateRazorpayPayment = async (placedOrderData, data, token) => {
//     try {
//         const options = {
//             // "key": process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
//             "key": RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
//             "amount": placedOrderData.amount * 100.00, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//             "currency": "INR",
//             'name': "MealDrop",
//             'description': "Food Order Payment",
//             "order_id": placedOrderData.razorpayOrderId, //This is a sample Order ID
//             handler: async function (razorpayResponse) {
//                 try {
//                     await verifyPayment(razorpayResponse, token);
//                     alert(`Payment successful! Payment ID: ${razorpayResponse.razorpay_payment_id}`);
//                 } catch (err) {
//                     toast.error("Payment verification failed");
//                 }
//             },
//             'prefill': {
//                 'name': data.firstName + ' ' + data.lastName,
//                 'email': data.email,
//                 'contact': data.phoneNumber
//             },
//             'theme': { 'color': '#3399cc' },
//             'modal': {
//                 onDismiss: async function () {
//                     return await deleteOrder(placedOrderData.id, token);
//                 }
//             }
//         }
//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

const verifyPayment = async (razorpayResponse, token) => {
    const data = {
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id
    };
    const response = await axios.post(
        `${API_BASE_URI}/verify`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
        await clearCart(token);
    }
    return response;
};


const deleteOrder = async (orderId, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URI}/delete/${orderId}`, { 'headers': { 'Authorization': `Bearer ${token}` } });
        return response;
    } catch (error) {
        console.error(error);
    }
}

const clearCart = async (token) => {
    try {
        const response = await axios.delete('http://localhost:9091/api/cart/clear', { 'headers': { 'Authorization': `Bearer ${token}` } })
        return response;
    }
    catch (error) {
        toast.error('Error while clearing the cart');
        console.error(error);
    }
}