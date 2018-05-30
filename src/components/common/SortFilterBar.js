import React from 'react';

const SortFilterBar = ({ handleChange, data, showComputers, showParts, isParts, isComputers }) => {
  return(
    <div className="columns">
      <div className="column is-12">
        {isParts &&
        <div className="field column is-5">
          <input className="input" placeholder="Search for Parts" name="search" onChange={handleChange} value={data.search}/>
        </div>}
        {isParts &&
        <div className="field column">
          <div className="control">
            <div className="select">
              <select onChange={handleChange} name="sort" value={data.sort}>
                <option value="name|asc">Name (A - Z)</option>
                <option value="name|desc">Name (Z - A)</option>
                <option value="price|desc">Price (Hi - Lo)</option>
                <option value="price|asc">Price (Lo - Hi)</option>
              </select>
            </div>
          </div>
          <div className="buttons has-addons">
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
        </div>}
        {isComputers &&
        <div className="field column is-5">
          <input className="input" placeholder="Search for Computers" name="computerSearch" onChange={handleChange} value={data.computerSearch}/>
        </div>}
        {isComputers &&
        <div className="field column">
          <div className="control">
            <div className="select">
              <select onChange={handleChange} name="computerSort" value={data.computerSort}>
                <option value="name|asc">Name (A - Z)</option>
                <option value="name|desc">Name (Z - A)</option>
                <option value="price|desc">Price (Hi - Lo)</option>
                <option value="price|asc">Price (Lo - Hi)</option>
              </select>
            </div>
          </div>
          <div className="buttons has-addons">
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
        </div>}
      </div>
    </div>
  );
};

export default SortFilterBar;
