import React, { useState } from 'react'

import Header from '../../components/Header/Header.component';
import ExploreMenu from '../../components/Explore Menu/ExploreMenu.component';
import FoodDisplay from '../../components/Food Display/FoodDisplay.component';

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <main className='container'>
       <Header/>
       <ExploreMenu category={category} setCategory={setCategory}/>
       <FoodDisplay category={category} searchText={''}/>
    </main>
  )
}

export default Home;
