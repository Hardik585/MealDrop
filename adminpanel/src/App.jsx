import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

import { ToastContainer } from 'react-toastify';

import Menubar from './components/menubar/Menubar.component';
import Sidebar from './components/sidebar/Sidebar.component';

import AddFood from './pages/AddFood/AddFood';
import Orders from './pages/Orders/Orders';
import ListFood from './pages/ListFood/ListFood';

function App() {

  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar sidebarVisible={sidebarVisible} />

      <div id="page-content-wrapper">
        <Menubar toggleSidebar={toggleSidebar} />
        <ToastContainer />
        <div className="container-fluid">
          <Routes>
            <Route path='/add' element={<AddFood />} />
            <Route path='/list' element={<ListFood />} />
            <Route path='/order' element={<Orders />} />
            <Route path='/' element={<ListFood />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
