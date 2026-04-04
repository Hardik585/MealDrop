import React from 'react';

const Header = () => {
  return (
    <div className='p-5 mb-4 bg-light rounded-3 mt-1'>
      <div className="container-fluid">
        <h1 className="display-5 fw-bold">Welcome to MealDrop</h1>
        <p className="col-md-8 fs-4">Discover delicious meals delivered to your doorstep with MealDrop. Explore our menu and order now!</p>
        <button className="btn btn-outline-primary btn-lg" type="button">Explore Menu</button>
      </div>
    </div>
  )
}

export default Header;
