import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Orders = () => {

  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:9091/orders/get/all');
    if (response.status === 200) {
      setData(response.data);
    }
  }

  const orderStatusUpdate = async (status, orderId) => {
    if (!status || !orderId) return;
    const response = await axios.patch(`http://localhost:9091/orders/status/update/${orderId}?status=${status}`);
    if (response.status === 200) {
      fetchOrders();
    }
  }

  useEffect(() => {
    fetchOrders();
    orderStatusUpdate();
  }, []);
  return (
    <div className='cotainer-fluid'>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">S No.</th>
            <th scope="col">Pic</th>
            <th scope="col">Items Name</th>
            <th scope="col">Total Items</th>
            <th scope="col">Amount</th>
            <th scope="col">User Address</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((order, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
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
                  <td>{order.userAddress}</td>
                  <td>
                    <div className="form">
                      <select
                        value={order.orderStatus || "Food Preparing"}
                        onChange={(event) => orderStatusUpdate(event.target.value, order.id)}
                        className="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option value="Food Preparing">Food Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Orders;
