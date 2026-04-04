import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem.component';

const FoodDisplay = ({ category, searchText }) => {

  const { foodList } = useContext(StoreContext);
  
  const filterFoodList = foodList.filter(food => (
    (category === 'All' || food.category === category)
    &&
    food.name.toLowerCase().includes(searchText.toLowerCase())
  ));

  return (
    <div className='container'>
      <div className="row">
        {filterFoodList.length > 0 ? (
          filterFoodList.map((foodItem, index) => (
            <FoodItem foodItem={foodItem} key={index} />
          ))
        ) : (
          <div className="col-12">
            <h3 className='text-center'>No food items available.</h3>
          </div>
        )}
      </div>
    </div>
  )

}

export default FoodDisplay;
