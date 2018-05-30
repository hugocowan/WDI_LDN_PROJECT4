import React from 'react';
import Carousel from 'nuka-carousel';

import Decimals from '../../lib/Decimals';

const ComputerForm = ({ handleChange, handleSubmit, computer, parts, errors }) => {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  const partTypes = [
    'Case', 'CPU', 'GPU', 'Motherboard',
    'PSU', 'RAM', 'Storage'
  ];

  const sizes = [ 'Mini-ITX', 'Micro-ATX',
    'ATX', 'E-ATX'
  ];

  const chipsets =[ 'X79', 'Z87', 'Z97',
    'FM2+', 'AM3+', 'X99', 'Z170', 'X299',
    'Z270', 'Z370', 'Z390', 'AM4', 'X399'
  ];

  // const cases = parts.filter(part => part.type === 'Case');

  function handleSlideChange(index, type) {
    if(index === 0){
      return handleChange({ target: { name: type, value: null } });
    }
    const filteredParts = parts.filter(part => part.type === type);

    console.log('filteredParts: ',filteredParts);
    handleChange({ target: { name: type, value: filteredParts[index-1]._id } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="input"
          placeholder="Name"
          onChange={handleChange}
          value={computer.name || ''}
        />
        {errors.name && <small>{errors.name}</small>}
      </div>
      <div className="field">
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          className="input"
          placeholder="Image"
          onChange={handleChange}
          value={computer.image || ''}
        />
        {errors.image && <small>{errors.image}</small>}
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="textarea"
          placeholder="Description"
          onChange={handleChange}
          value={computer.description || ''}
        />
        {errors.description && <small>{errors.description}</small>}
      </div>
      {parts && partTypes.map(type =>
        <div key={type}>
          <label htmlFor={type}>{type}</label>
          <Carousel
            key={type}
            className="field carousel"
            cellAlign="center"
            slideWidth={0.4}
            cellSpacing={350}
            afterSlide={(index) => handleSlideChange(index, type)}
          >
            <img src={`http://placehold.it/500x600/ffffff/d3d3d3/&text=Choose+Your+${type}`}/>
            {parts.filter((part) => part.type === type).map(part =>
              <div
                className="parts-info"
                key={part._id}>
                <img
                  src={`${part.image}`}
                />
                <p>{part.name}</p>
              </div>
            )}
          </Carousel>
        </div>
      )}


      <button disabled={formInvalid} className="button is-primary">Submit</button>
    </form>
  );
};

export default ComputerForm;
