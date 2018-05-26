import React from 'react';

const ComputerForm = ({ handleChange, handleSubmit, part, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="type">Part Type</label>
        <div className="control">
          <div className="select">
            <select
              id="type"
              name="type"
              onChange={handleChange}
              value={part.type || ''}>
              <option>Please select</option>
              <option value="Case">Case</option>
              <option value="CPU">CPU</option>
              <option value="GPU">GPU</option>
              <option value="Motherboard">Motherboard</option>
              <option value="PSU">PSU</option>
              <option value="RAM">RAM</option>
              <option value="Storage">Storage</option>
            </select>
          </div>
        </div>
        {errors.type && <small>{errors.type}</small>}
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="input"
          placeholder="Name"
          onChange={handleChange}
          value={part.name || ''}
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
          value={part.image || ''}
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
          value={part.description || ''}
        />
        {errors.description && <small>{errors.description}</small>}
      </div>
      <button disabled={formInvalid} className="button is-primary">Submit</button>
    </form>
  );
};

export default ComputerForm;
