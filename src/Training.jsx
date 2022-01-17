import React, {useState} from 'react';
import './App.css';
import TrainingItem from './TrainingItem';
import {nanoid} from 'nanoid';

const Training = () => {
  const [formData, setFormData] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const trainingFormData = new FormData(evt.target.closest('form'));
    evt.target.closest('form').reset();
    const pattern =/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/;
    if (pattern.test(trainingFormData.get('date'))) {
      const newTraining = {
        id: nanoid(),
        date: trainingFormData.get('date'),
        distance: parseInt(trainingFormData.get('distance'))
      }
      const existingTraining = formData.find(item => item.date === newTraining.date);
      if (existingTraining) {
        existingTraining.distance += parseInt(newTraining.distance)
        setFormData(prevForms => [...prevForms])
      } else {
        setFormData(prevForms => [...prevForms, newTraining])
      }
    } else alert('Bad date format! Should be DD.MM.YYYY!')
  }

  const handleRemove = (evt) => {
    const id = evt.target.id;
    setFormData(prevForms => prevForms.filter(o => o.id !== id));
  }

  return (
    <div className='training'>
      <div className='training_main'>
        <form className='training_form' onSubmit={handleSubmit}>
          <input type="text" name='date' placeholder='Дата' className='training_input' required />
          <input type="text" name='distance' placeholder='Расстояние' className='training_input' required />
          <button type='submit' className='training_submit'>OK</button>
        </form>
        <div className='training_results'>
          {
            formData.sort(
              (item1, item2) => {
                return parseInt(item2.date) - parseInt(item1.date)
              }
            ).map(
              item => <TrainingItem item={item} key={item.id} removeItem={handleRemove}/>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default Training;