import './App.css';

import { Route, Routes } from 'react-router-dom';

import Menubar from './components/Menubar/Menubar.component';

import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import ExploreFood from './pages/ExploreFood/ExploreFood';
import FoodDetails from './pages/Food Details/FoodDetails';
import { ToastContainer } from 'react-toastify';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Login from './components/Login/Login.component';
import Register from './components/Register/Register.component';
import MyOrders from './pages/MyOrder/MyOrders';
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';


function App() {

  const { token } = useContext(StoreContext);

  return (
    <div>
      <Menubar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<ExploreFood />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/food/:id' element={<FoodDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={token ? <PlaceOrder /> : <Login />} />
        <Route path='/login' element={token ? <Home /> : <Login />} />
        <Route path='/register' element={token ? <Home /> : <Register />} />
        <Route path='/my-order' element={token ? <MyOrders /> : <Login />} />
      </Routes>
    </div>

  )
}

export default App
