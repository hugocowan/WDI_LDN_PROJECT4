import React from 'react';
import FormCarousel from './Carousel';

const ComputerForm = ({ handleChange, handleSubmit, computer, parts, errors, handleSlideChange }) => {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  const partTypes = [
    'Case', 'CPU', 'GPU', 'Motherboard',
    'PSU', 'RAM', 'Storage', 'Cooler'
  ];

  // console.log(parts);

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
        {errors.name && <div className="error">{errors.name}</div>}
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
        {errors.image && <div className="error">{errors.image}</div>}
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
        {errors.description && <div className="error">{errors.description}</div>}
      </div>

      {parts && partTypes.map(type =>
        <div key={type}>
          <label htmlFor={type}>{type}</label>
          {' '}
          {errors[type.toLowerCase()] && <div className="error">{errors[type.toLowerCase()]}</div>}
          <FormCarousel
            parts={parts}
            computer={computer}
            type={type}
            handleSlideChange={handleSlideChange}
          />
        </div>
      )}

      <button disabled={formInvalid} className="button is-primary">Submit</button>
    </form>
  );
};

export default ComputerForm;
