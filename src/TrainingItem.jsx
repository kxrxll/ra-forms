import React from 'react';
import './App.css';

const TrainingItem = ({item, removeItem}) => {
  const date = item.date;
  const distance = item.distance;
  const id = item.id;

  return (
    <div className='training_item'>
      <p>Дата: {date}</p>
      <p>Расстояние: {distance} км</p>
      <button className='training_delete' onClick={removeItem} id={id}>X</button>
    </div>
  )
}

export default TrainingItem;