import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onEditPrice, onDeletePlant}) {

  const plantsList = plants.map(plant => {
    return <PlantCard key={plant.id} plant={plant} onEditPrice={onEditPrice} onDeletePlant={onDeletePlant}/>
  })

  return (
    <ul className="cards">{plantsList}</ul>
  );
}

export default PlantList;
