import React, {useState} from 'react';
import './App.css';

const Converter = () => {
  const [color, setColor] = useState('#FFFFFF');
  const [content, setContent] = useState(hexToRgb(color));

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `r: ${parseInt(result[1], 16)},
      g: ${parseInt(result[2], 16)},
      b: ${parseInt(result[3], 16)}` : 'Uncorrect';
  }

  const handleColor = (evt) => {
    const value = evt.target.value;
    if (value.length === 7) {
      setColor(value);
      setContent(hexToRgb(value));
    }
  }

  return (
    <div className='converter' style={{backgroundColor: color}}>
      <div className='converter_main'>
        <input type="text" className='converter_input' onChange={handleColor}/>
        <div className='converter_result'>{content}</div>
      </div>
    </div>
  )
}

export default Converter;