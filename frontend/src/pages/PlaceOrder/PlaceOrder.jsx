import React, { useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { calculateCartTotals } from '../../utils/CartUtils';
import { toast } from 'react-toastify';
import { createOrder, initiateRazorpayPayment } from '../../services/Order';


const PlaceOrder = () => {

    const { foodList, quantities, token } = useContext(StoreContext);
    const navigate = useNavigate();

    //user data 
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: '',
        phoneNumber: '',
        address: '',
        state: '',
        country: '',
        zip: ''
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // console.log(data);
        const orderData = {
            'userAddress': `${data.firstName} ${data.lastName}   ${data.country} ${data.address} ${data.state} ${data.zip}`,
            'email': data.email,
            'phoneNumber': data.phoneNumber,
            'orderItems': cartItems.map(foodItem => ({
                'foodId': foodItem.id,
                'quantity': quantities[foodItem.id],
                'price': foodItem.price * quantities[foodItem.id],
                'category': foodItem.category,
                'imageUrl': foodItem.imageUrl,
                'description': foodItem.description,
                'name': foodItem.name
            })),
            'amount': total.toFixed(2),
            'orderStatus': 'preparing'
        }
        try {
            const response = await createOrder(orderData, token);
            if (response.status == 200 && response.data.razorpayOrderId) {
                //initiate payment // dialog the razorpay payment UI
                initiateRazorpayPayment(response.data, data, token);
                navigate('/');
            } else {
                toast.error('Unable to placed order');
            }
        } catch (error) {
            toast.error('Unable to placed order');
            console.error(error);
            throw error;
        }
    }

    // card items
    const cartItems = foodList.filter(food => quantities[food.id] > 0);

    //calculations Price
    const { shipping, tax, total } = calculateCartTotals(cartItems, quantities);

    return (
        <div className='container p-2 mt-4'>
            <main>
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3"> <span className="text-primary">Your
                            cart</span> <span className="badge bg-primary rounded-pill">{cartItems.length}</span> </h4>
                        <ul className="list-group mb-3">
                            {
                                cartItems.map((item, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                                        <div>
                                            <h6 className="my-0">{item.name}</h6> <small className="text-body-secondary">
                                                Qty: {quantities[item.id]}</small>
                                        </div> <span className="text-body-secondary">{item.price * quantities[item.id]}</span>
                                    </li>
                                ))
                            }
                            <li className="list-group-item d-flex justify-content-between ">
                                <div>
                                    <small>Shipping</small>
                                </div>
                                <span>&#8377;{shipping.toFixed(2)}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <small>Tax (10%)</small>
                                </div>
                                <span className="text-body-secondary">&#8377;{tax.toFixed(2)}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between"> <span>Total (INR)</span>
                                <strong>&#8377;{total.toFixed(2)}</strong> </li>
                        </ul>

                    </div>
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Billing address</h4>
                        <form
                            onSubmit={onSubmitHandler}
                            className="needs-validation">
                            <div className="row g-3">
                                <div className="col-sm-6"> <label htmlFor="firstName" className="form-label">First name</label>
                                    <input
                                        name="firstName"
                                        onChange={onChangeHandler}
                                        value={data.firstName}
                                        required
                                        type="text" className="form-control" id="firstName" placeholder="" />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input
                                        name="lastName"
                                        onChange={onChangeHandler}
                                        value={data.lastName}
                                        type="text" className="form-control" id="lastName" placeholder="" required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <div
                                        className="input-group has-validation">
                                        <span className="input-group-text">@</span>
                                        <input
                                            name="email"
                                            onChange={onChangeHandler}
                                            value={data.email}
                                            type="email" className="form-control" id="email" placeholder="email" required />
                                    </div>
                                </div>

                                <div
                                    className="col-12">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input
                                        name="phoneNumber"
                                        onChange={onChangeHandler}
                                        value={data.phoneNumber}
                                        type="number" className="form-control" id="phone" placeholder="3242567434" required />
                                </div>

                                <div
                                    className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input
                                        name="address"
                                        onChange={onChangeHandler}
                                        value={data.address}
                                        type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                                </div>
                                <div
                                    className="col-md-5">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <select
                                        name="country"
                                        onChange={onChangeHandler}
                                        value={data.country}
                                        className="form-select" id="country" required>
                                        <option value="">Choose...</option>
                                        <option value="India">India</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select
                                        name="state"
                                        onChange={onChangeHandler}
                                        value={data.state}
                                        className="form-select" id="state" required>
                                        <option value="">Choose...</option>
                                        <option value="Kurukshetra">Kurukshetra</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label">Zip</label>
                                    <input
                                        name="zip"
                                        onChange={onChangeHandler}
                                        value={data.zip}
                                        type="text"
                                        className="form-control" id="zip" placeholder="" required />
                                </div>
                            </div>
                            <hr className="my-4" />
                            <button
                                className="w-100 btn btn-primary btn-lg"
                                type="submit"
                                disabled={cartItems == 0}>
                                Continue to checkout</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PlaceOrder;


{/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */ }
