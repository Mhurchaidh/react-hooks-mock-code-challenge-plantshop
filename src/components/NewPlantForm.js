import React, { useState } from "react";

function NewPlantForm({onAddPlant}) {

  const initialValues = {
    id: '',
    name: '',
    image: '',
    price: ''
  };

  const [formData, setFormData] = useState(initialValues)

  const {name, image, price} = formData;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((formData) => ({...formData, [name]: value}))
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch('http://localhost:6001/plants', config)
    .then(resp => resp.json())
    .then(plant => {
      onAddPlant(plant);
      setFormData(initialValues);
    })
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleFormSubmit}>
        <input value={name} type="text" name="name" placeholder="Plant name" onChange={handleChange}/>
        <input value={image} type="text" name="image" placeholder="Image URL" onChange={handleChange}/>
        <input value={price} type="number" name="price" step="0.01" placeholder="Price" onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
