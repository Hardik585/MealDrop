import './App.css';

import {Route, Routes} from 'react-router-dom';

import Menubar from './components/Menubar/Menubar.component';

import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import ExploreFood from './pages/ExploreFood/ExploreFood';
import FoodDetails from './pages/Food Details/FoodDetails';
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <div>
      <Menubar />
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/explore' element={<ExploreFood/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/food/:id' element={<FoodDetails/>}/>
      </Routes>
    </div>

  )
}

export default App
