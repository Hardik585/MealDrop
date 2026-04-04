import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFoodDetails } from '../../services/FoodService';

import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const FoodDetails = () => {

    const { increaseQty } = useContext(StoreContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [data, setData] = useState({});

    useEffect(() => {
        const loadFoodDetails = async () => {
            try {
                const foodData = await fetchFoodDetails(id);
                setData(foodData);
            } catch (error) {
                toast.error("Error in displaying the food details");
                console.log(error);
            }
        };
        loadFoodDetails();
    }, [id]);

    const addToCart = () => {
        increaseQty(data.id);
        navigate('/cart');
    }

    return (
        <div>
            <section className="py-5" >
                <div className="container px-4 bg-light px-lg-5 my-3 py-2">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={data.imageUrl} alt="..." /></div>
                        <div className="col-md-6">
                            <div className=" mb-1 fs-6">Category: <span className='badge text-bg-warning fs-6'>{data.category}</span> </div>
                            <h1 className="display-5 fw-bolder">{data.name}</h1>
                            <div className="fs-5 mb-5">
                                <span className="text-decoration-line-through">&#8377;100.00</span>
                                <span>&#8377;{data.price}.00</span>
                            </div>
                            <p className="lead">{data.description}</p>
                            <div className="d-flex">
                                <button
                                    onClick={() => addToCart()}
                                    className="btn btn-outline-dark flex-shrink-0" type="button">
                                    <i className="bi-cart-fill me-1"></i>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FoodDetails;
