import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plantsArray, setPlantsArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [editedPlant, setEditedPlant] = useState({});
  const [deleteIndex, setDeleteIndex] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(resp => resp.json())
    .then(plants => setPlantsArray(plants))
  }, [editedPlant, deleteIndex])

  const onAddPlant = (plantObj) => {
    setPlantsArray([...plantsArray, plantObj])
  }

  const onSearchChange = (value) => {
    setSearchValue(value);
  }

  const onEditPrice = (plantObj) => {
    setEditedPlant(plantObj);
  }

  const filteredPlants = plantsArray.filter(plant => plant.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant}/>
      <Search searchValue={searchValue} onSearchChange={onSearchChange}/>
      <PlantList plants={filteredPlants} onEditPrice={onEditPrice} onDeletePlant={setDeleteIndex}/>
    </main>
  );
}

export default PlantPage;
