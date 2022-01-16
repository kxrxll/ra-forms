import React, {useState} from 'react';
import './App.css';
import TrainingItem from './TrainingItem';
import {nanoid} from 'nanoid';

const Training = () => {
  const [formData, setFormData] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target.closest('form'));
    evt.target.closest('form').reset();
    const pattern =/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/;
    if (pattern.test(formData.get('date'))) {
      const newTraining = {
        id: nanoid(),
        date: formData.get('date'),
        distance: formData.get('distance')
      }
      setFormData(prevForms => [...prevForms, newTraining])
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
                return parseInt(item1.date) - parseInt(item2.date)
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