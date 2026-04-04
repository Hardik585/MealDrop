import React, { useEffect, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';

import { getFoodList, removeFood} from '../../services/FoodServices';
import { toast } from 'react-toastify';

import './ListFood.css';

const ListFood = () => {

  const [foodList, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    try {
      const data = await getFoodList();
      setFoodList(data);
    } catch (err) {
      toast.error("Failed to fetch food list");
    }
  }


  const handleRemove = async (id) => {
    try {
      const isDelete = await removeFood(id);
      if (isDelete) {
        toast.success("Food removed successfully");
        fetchFoodList();
      } else {
        toast.error("Failed to remove food");
      }
    } catch (err) {
      toast.error("Failed to remove food");
    }
  }

  useEffect(() => {
    fetchFoodList();
  }, []);

  return (
    <div className='container-fluid' >
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map((food, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td><img src={food.imageUrl} alt='image' height={48} width={48} /></td>
              <td>{food.name}</td>
              <td>&#8377;{food.price}.00</td>
              <td className='text-danger pointer'><IconTrash stroke={2} onClick={() => handleRemove(food.id)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListFood;
