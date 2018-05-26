import React from 'react';

const ComputerForm = ({ handleChange, handleSubmit, computer, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);
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
      <button disabled={formInvalid} className="button is-primary">Submit</button>
    </form>
  );
};

export default ComputerForm;
