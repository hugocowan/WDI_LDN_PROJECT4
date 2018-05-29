import React from 'react';

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
        <div key={type} className="field">
          <label htmlFor={type}>{type}</label>
          <div className="control">
            <div className="select">
              <select
                id={type}
                name={type.toLowerCase()}
                onChange={handleChange}
                value={computer[type.toLowerCase()] &&
                       computer[type.toLowerCase()]._id ||
                       computer[type.toLowerCase()] || ''}
              >
                <option value={null} >Please select</option>

                {parts.filter((part) => part.type === type).map(part =>
                  <option key={part._id} value={part._id}>

                    {part.ramType ? `${part.ramType}: ${part.name}` :
                      part.size && part.chipset ? `${sizes[part.size]} ||
                    ${chipsets[part.chipset]}:  ${part.name}` :
                        part.size && !part.chipset ? `${sizes[part.size]}:  ${part.name}` :
                          part.chipset ? `${chipsets[part.chipset]}:  ${part.name}` :
                            part.storageType ? `${part.storageType}:  ${part.name}`:
                              part.name}
                  </option>
                )}

                {/* {parts.reduce((accumulator, part) => {
                  if(part.type === type){
                    console.log(part);
                    return <option key={part._id} value={part._id}>

                      {part.ramType ? `${part.ramType}: ${part.name}` :
                        part.size && part.chipset ? `${sizes[part.size]} ||
                      ${chipsets[part.chipset]}:  ${part.name}` :
                          part.size && !part.chipset ? `${sizes[part.size]}:  ${part.name}` :
                            part.chipset ? `${chipsets[part.chipset]}:  ${part.name}` :
                              part.storageType ? `${part.storageType}:  ${part.name}`:
                                part.name}
                    </option>;
                  }
                })} */}


              </select>
            </div>
          </div>
          {errors[type.toLowerCase()] && <small>{errors[type.toLowerCase()]}</small>}
        </div>)}

      <button disabled={formInvalid} className="button is-primary">Submit</button>
    </form>
  );
};

export default ComputerForm;
