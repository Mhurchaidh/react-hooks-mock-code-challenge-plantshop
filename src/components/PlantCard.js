import React, { useState } from "react";

function PlantCard({plant, onEditPrice, onDeletePlant}) {

  const [inStock, setInStock] = useState(true);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(plant.price);

  const handlePriceEdit = () => {
    
    setEdit(!edit);
    if(edit) {
      const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({price: Number(editValue)})
      }
      fetch(`http://localhost:6001/plants/${plant.id}`, config)
      .then(resp => resp.json())
      .then(plant => onEditPrice(plant))
    }
    
  }

  const handleDeleteButton = (e) => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {method: 'DELETE'})
    .then(onDeletePlant(e.target.id))
  }

  return (
    <li className="card">
      <img src={plant.image} alt={"plant name"} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {inStock ? (
        <button className="primary" onClick={() => setInStock(!inStock)}>In Stock</button>
      ) : (
        <button onClick={() => setInStock(!inStock)}>Out of Stock</button>
      )}
      <button onClick={handlePriceEdit}>{edit? 'Save' : 'Edit Price'}</button>
      <button id={plant.id} className="delete" onClick={handleDeleteButton}>Delete</button>
      {edit? <input type='text' value={editValue} onChange={(e) => setEditValue(e.target.value)}></input> : null}
    </li>
  );
}

export default PlantCard;
