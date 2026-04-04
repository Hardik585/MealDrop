import React, { useState } from 'react';

import { assets } from "../../assets/assets";

import { addFood } from '../../services/FoodServices';
import { toast } from 'react-toastify';

const AddFood = () => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Noddle'
  })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Plz Select an image");
      return;
    }
    try {
      await addFood(data, image);
      toast.success("Food added successfully");
      setData({ name: '', price: '', description: '', category: 'Noddle' });
      setImage(null);
    } catch (err) {
      toast.error("Failed to add food");
      console.error(err);
    }
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Add Food</h3>
              <form onSubmit={handleSubmit}>
                {/* Image */}
                <div className="mb-3 mx-3">
                  <label htmlFor="image" className="form-label">
                    <img src={image ? URL.createObjectURL(image) : assets.upload2} alt="Upload" style={{ width: '100px', cursor: 'pointer' }} />
                  </label>
                  <input
                    onChange={e => setImage(e.target.files[0])}
                    type="file"
                    className="form-control"
                    id="image"
                    hidden
                  />
                </div>

                {/* Name + Price + category*/}
                <div className='d-flex gap-3'>
                  {/* Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      onChange={handleChange}
                      value={data.name}
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Food name"
                      required
                    />
                  </div>
                  {/* Price */}
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                      onChange={handleChange}
                      value={data.price}
                      name="price"
                      type="text"
                      className="form-control"
                      id="price"
                      placeholder="Enter Food Price"
                      required
                    />
                  </div>

                  {/* Category*/}
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select "
                      onChange={handleChange}
                      value={data.category}
                      name="category"
                      id='category'>
                      <option value="Pizza" >Pizza</option>
                      <option value="Noddle">Noddle</option>
                      <option value="Burger">Burger</option>
                      <option value="Cake">Cake</option>
                      <option value="Momo">Momo</option>
                      <option value="Pasta">Pasta</option>
                      <option value="Rolls">Rolls</option>
                      <option value="Biryani" >Biryani</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    onChange={handleChange}
                    value={data.description}
                    name="description"
                    className="form-control"
                    id="description"
                    rows="3"
                    placeholder="food description"
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFood;

