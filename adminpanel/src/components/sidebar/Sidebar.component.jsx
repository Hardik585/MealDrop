import React from 'react';

import { Link } from 'react-router-dom';

import {assets} from '../../assets/assets';
const Sidebar = ({sidebarVisible}) => {
  return (
    <div>
      <div className={`border-end bg-white ${sidebarVisible ? 'd-block' : 'd-none'}`} id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-light d-flex justify-content-center align-items-center"><img src={assets.logo}  alt="logo" style={{height:'60px'}}/> </div>
        <div className="list-group list-group-flush">
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/add">AddFood</Link>
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list">FoodList</Link>
          <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="order">Order</Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;

