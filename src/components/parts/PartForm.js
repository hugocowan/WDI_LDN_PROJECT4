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
        <label htmlFor="link">Link</label>
        <input
          id="link"
          name="link"
          className="input"
          placeholder="Link"
          onChange={handleChange}
          value={part.link || ''}
        />
        {errors.link && <small>{errors.link}</small>}
      </div>
      <div className="field">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          className="input"
          placeholder="£"
          onChange={handleChange}
          value={part.price || ''}
        />
        {errors.price && <small>{errors.price}</small>}
      </div>
      {(part.type === 'Case' ||
      part.type === 'Motherboard' ||
      part.type === 'PSU') &&
      <div className="field">
        <label htmlFor="size">Size</label>
        <div className="control">
          <div className="select">
            <select
              id="size"
              name="size"
              onChange={handleChange}
              value={part.size || ''}>
              <option>Please select</option>
              <option value="0">Mini-ITX</option>
              <option value="1">Micro-ATX</option>
              <option value="2">ATX</option>
              <option value="3">E-ATX</option>
            </select>
          </div>
        </div>
        {errors.size && <small>{errors.size}</small>}
      </div>}
      {part.type === 'GPU' &&
      <div className="field">
        <label htmlFor="vendor">Vendor</label>
        <div className="control">
          <div className="select">
            <select
              id="vendor"
              name="vendor"
              onChange={handleChange}
              value={part.vendor || ''}>
              <option>Please select</option>
              <option value="AMD">AMD</option>
              <option value="Nvidia">Nvidia</option>
            </select>
          </div>
        </div>
        {errors.vendor && <small>{errors.vendor}</small>}
      </div>}
      {(part.type === 'CPU' ||
      part.type === 'Motherboard') &&
      <div>
        <div className="field">
          <label htmlFor="vendor">Vendor</label>
          <div className="control">
            <div className="select">
              <select
                id="vendor"
                name="vendor"
                onChange={handleChange}
                value={part.vendor || ''}>
                <option>Please select</option>
                <option value="AMD">AMD</option>
                <option value="Intel">Intel</option>
              </select>
            </div>
          </div>
          {errors.vendor && <small>{errors.vendor}</small>}
        </div>

        {part.vendor === 'AMD' && <div className="field">
          <label htmlFor="chipset">Chipset</label>
          <div className="control">
            <div className="select">
              <select
                id="chipset"
                name="chipset"
                onChange={handleChange}
                value={part.chipset || ''}>
                <option>Please select</option>
                <option value="11">AMD AM4</option>
                <option value="4">AMD AM3+</option>
                <option value="3">AMD FM2+</option>
                <option value="12">AMD X399</option>
              </select>
            </div>
          </div>
          {errors.chipset && <small>{errors.chipset}</small>}
        </div>}
        {part.vendor === 'Intel' && <div className="field">
          <label htmlFor="chipset">Chipset</label>
          <div className="control">
            <div className="select">
              <select
                id="chipset"
                name="chipset"
                onChange={handleChange}
                value={part.chipset || ''}>
                <option>Please select</option>
                <option value="10">Intel Z390 </option>
                <option value="9">Intel Z370</option>
                <option value="8">Intel Z270</option>
                <option value="6">Intel Z170</option>
                <option value="2">Intel Z97</option>
                <option value="1">Intel Z87</option>
                <option value="7">Intel X299</option>
                <option value="5">Intel X99</option>
                <option value="0">Intel X79</option>
              </select>
            </div>
          </div>
          {errors.chipset && <small>{errors.chipset}</small>}
        </div>}
      </div>}
      {part.type === 'RAM' &&
      <div className="field">
        <label htmlFor="ramType">RAM Type</label>
        <div className="control">
          <div className="select">
            <select
              id="ramType"
              name="ramType"
              onChange={handleChange}
              value={part.ramType || ''}>
              <option>Please select</option>
              <option value="DDR3">DDR3</option>
              <option value="DDR4">DDR4</option>
            </select>
          </div>
        </div>
        {errors.ramType && <small>{errors.ramType}</small>}
      </div>}
      {part.type === 'Storage' &&
      <div className="field">
        <label htmlFor="storage">Storage Type</label>
        <div className="control">
          <div className="select">
            <select
              id="storage"
              name="storage"
              onChange={handleChange}
              value={part.storage || ''}>
              <option>Please select</option>
              <option value="DDR3">DDR3</option>
              <option value="DDR4">DDR4</option>
            </select>
          </div>
        </div>
        {errors.storage && <small>{errors.storage}</small>}
      </div>}
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
