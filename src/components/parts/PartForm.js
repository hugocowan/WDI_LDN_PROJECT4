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
        {errors.type && <div className="error">{errors.type}</div>}
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
          value={part.image || ''}
        />
        {errors.image && <div className="error">{errors.image}</div>}
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
        {errors.link && <div className="error">{errors.link}</div>}
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
        {errors.price && <div className="error">{errors.price}</div>}
      </div>

      {part.type === 'PSU' && <div className="field">
        <label htmlFor="power">Power</label>
        <input
          id="power"
          name="power"
          className="input"
          placeholder="W"
          onChange={handleChange}
          value={part.power || ''}
        />
        {errors.power && <div className="error">{errors.power}</div>}
      </div>}

      {(part.type === 'CPU') &&
        <div className="field">
          <label htmlFor="speed">Clockspeed</label>
          <input
            id="speed"
            name="speed"
            className="input"
            placeholder="GHz"
            onChange={handleChange}
            value={part.speed || ''}
          />
          {errors.speed && <div className="error">{errors.speed}</div>}
        </div>}
      {(part.type === 'GPU') &&
      <div>
        <div className="field">
          <label htmlFor="speed">Core Clock</label>
          <input
            id="speed"
            name="speed"
            className="input"
            placeholder="MHz"
            onChange={handleChange}
            value={part.speed || ''}
          />
          {errors.speed && <div className="error">{errors.speed}</div>}
        </div>

        <div className="field">
          <label htmlFor="vram">VRAM Capacity</label>
          <input
            id="vram"
            name="vram"
            className="input"
            placeholder="GB"
            onChange={handleChange}
            value={part.vram || ''}
          />
          {errors.vram && <div className="error">{errors.vram}</div>}
        </div>

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
          {errors.vendor && <div className="error">{errors.vendor}</div>}
        </div>
      </div>}

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

              {(part.type === 'Motherboard' ||
              part.type === 'Case') &&
                <option value="1">Micro-ATX</option>}

              <option value="2">ATX</option>

              {(part.type === 'Motherboard' ||
              part.type === 'Case') &&
                <option value="3">E-ATX</option>}

            </select>
          </div>
        </div>
        {errors.size && <div className="error">{errors.size}</div>}
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
          {errors.vendor && <div className="error">{errors.vendor}</div>}
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
          {errors.chipset && <div className="error">{errors.chipset}</div>}
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
          {errors.chipset && <div className="error">{errors.chipset}</div>}
        </div>}
      </div>}

      {part.type === 'RAM' &&
      <div>
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
          {errors.ramType && <div className="error">{errors.ramType}</div>}
        </div>

        <div className="field">
          <label htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            name="capacity"
            className="input"
            placeholder="GB"
            onChange={handleChange}
            value={part.capacity || ''}
          />
          {errors.capacity && <div className="error">{errors.capacity}</div>}
        </div>
      </div>}

      {part.type === 'Storage' &&
      <div>
        <div className="field">
          <label htmlFor="storageType">Storage Type</label>
          <div className="control">
            <div className="select">
              <select
                id="storageType"
                name="storageType"
                onChange={handleChange}
                value={part.storageType || ''}>
                <option>Please select</option>
                <option value="SSD">SSD</option>
                <option value="HDD">HDD</option>
              </select>
            </div>
          </div>
          {errors.storageType && <div className="error">{errors.storageType}</div>}
        </div>
        
        <div className="field">
          <label htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            name="capacity"
            className="input"
            placeholder="GB"
            onChange={handleChange}
            value={part.capacity || ''}
          />
          {errors.capacity && <div className="error">{errors.capacity}</div>}
        </div>
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
        {errors.description && <div className="error">{errors.description}</div>}
      </div>

      <button disabled={formInvalid} className="button is-primary">Submit</button>

    </form>
  );
};

export default ComputerForm;
