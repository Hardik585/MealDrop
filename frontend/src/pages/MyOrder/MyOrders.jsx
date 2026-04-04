import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext';

const MyOrders = () => {

  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:9091/orders/get', { 'headers': { 'Authorization': `Bearer ${token}` } });
    if (response.status === 200) {
      setData(response.data);
    }
  }

  const orderStatusChanged = () => {

  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className='cotainer-fluid'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pic</th>
            <th scope="col">Items Name</th>
            <th scope="col">Total Items</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((order, index) => {
              return (
                <tr key={index}>
                  <th scope="row">1</th>
                  <td><img src={order.orderItems[0].imageUrl} alt="pic" height={48} width={48} /></td>
                  <td>{order.orderItems.map((item, idx) => {
                    if (idx == order.orderItems.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}</td>
                  <td>items: {order.orderItems.reduce((total, item) => total + item.quantity, 0)}</td>
                  <td>&#8377;{order.amount}</td>
                  <td className='d-flex gap-3 align-items-center'>
                    {order.orderStatus}
                    <button 
                      onClick={() => fetchOrders()}
                      className="btn btn-outline-warning flex-shrink-0" type="button">
                      <i className="bi bi-arrow-clockwise"></i>
                    </button>
                  </td>
                  {/* <td>
                    
                  </td> */}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default MyOrders;
