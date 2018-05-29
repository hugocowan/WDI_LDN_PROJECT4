import React from 'react';

const SortFilterBar = ({ handleChange, data, showComputers, showParts, isParts, isComputers }) => {
  return(
    <div className="columns">
      {isParts && <div className="column is-10">
        <div className="field column is-5">
          <input className="input" placeholder="Search for Parts" name="search" onChange={handleChange} value={data.search}/>
        </div>
        <div className="field column is-5">
          <div className="control">
            <div className="select">
              <select onChange={handleChange} name="sort" value={data.sort}>
                <option value="name|asc">Name (A - Z)</option>
                <option value="name|desc">Name (Z - A)</option>
                <option value="price|desc">Price (Hi - Lo)</option>
                <option value="price|asc">Name (Lo - Hi)</option>
              </select>
            </div>
          </div>
        </div>
      </div>}
      {isComputers && <div className="column is-10">
        <div className="field column is-5">
          <input className="input" placeholder="Search for Computers" name="computerSearch" onChange={handleChange} value={data.computerSearch}/>
        </div>
        <div className="field column is-5">
          <div className="control">
            <div className="select">
              <select onChange={handleChange} name="computerSort" value={data.computerSort}>
                <option value="name|asc">Name (A - Z)</option>
                <option value="name|desc">Name (Z - A)</option>
                <option value="price|desc">Price (Hi - Lo)</option>
                <option value="price|asc">Name (Lo - Hi)</option>
              </select>
            </div>
          </div>
        </div>
      </div>}
      <div className="buttons has-addons column is-2">
        <button
          className="button"
          onClick={showComputers}
        >
          Computers
        </button>
        <button
          className="button"
          onClick={showParts}
        >
          Parts
        </button>
      </div>
    </div>
  );
};

export default SortFilterBar;
