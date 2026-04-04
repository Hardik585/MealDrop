import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { calculateCartTotals } from '../../utils/CartUtils';

const Cart = () => {

  const navigate = useNavigate();
  const { foodList, increaseQty, decreaseQty, quantities, removeFromCart } = useContext(StoreContext);

  // card items
  const cartItems = foodList.filter(food => quantities[food.id] > 0);

  //calculations Price
  const { subTotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities);
  
  return (
    <div className="cart-wrapper">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Your Shopping Cart</h4>
              <span className="text-muted">{cartItems.length}</span>
            </div>

            <div className="d-flex flex-column gap-3">
              {
                cartItems.length === 0 ? (
                  <p>Your Card is Empty</p>
                ) : (
                  cartItems.map((food, index) => (
                    <div key={index} className="product-card p-3 shadow-sm">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <img
                            src={food.imageUrl}
                            alt={food.name}
                            className="product-image" />
                        </div>
                        <div className="col-md-4">
                          <h6 className="mb-1 fw-semibold mx-4">{food.name}</h6>
                          <p className='text-muted text-capitalize mb-0 mx-4'>{food.category}</p>
                        </div>
                        <div className="col-md-3">
                          <div className="d-flex align-items-center gap-2">
                            <button
                              onClick={() => decreaseQty(food.id)}
                              className="quantity-btn">-</button>
                            <input
                              value={quantities[food.id]}
                              readOnly
                              type="number"
                              className="quantity-input" />
                            <button
                              onClick={() => increaseQty(food.id)}
                              className="quantity-btn">+</button>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <span className="fw-bold">&#8377;{food.price}</span>
                        </div>
                        {/* <button
                          onClick={() => removeFromCart(food.id)}
                          className="col-md-1 btn"
                        >
                          <i className="bi bi-trash remove-btn"></i>
                        </button> */}
                      </div>
                    </div>
                  ))
                )
              }
              {/* Continue Shopping Button  */}
              <div className="text-start mb-4">
                <Link
                  to="/"
                  className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="summary-card p-4 shadow-sm">
              <h5 className="mb-4">Order Summary</h5>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span>&#8377;{subTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Shipping</span>
                <span className="">&#8377;{shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Tax</span>
                <span className="text-warning">&#8377;{tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold">&#8377;{total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate('/order')}
                className="btn btn-primary checkout-btn w-100 mb-3"
                disabled={cartItems.length == 0}>
                Proceed to Checkout
              </button>

              <div className="d-flex justify-content-center gap-2">
                <i className="bi bi-shield-check text-success"></i>
                <small className="text-muted">Secure checkout</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
