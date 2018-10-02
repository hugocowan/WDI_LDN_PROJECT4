import React from 'react';

const SortFilterBar = ({ handleChange, data, showComputers, showParts, toggleFilter, resetFilters }) => {
  return(


    <nav className="filter-panel panel column is-12">
      <p className="panel-heading bold">
        PCBuilder
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input is-small"
            placeholder="Search"
            name="search"
            onChange={handleChange} value={data.search}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <div className="panel-block">
        <button
          className="button is-info is-outlined is-fullwidth"
          onClick={showComputers}
        >
          Computers
        </button>
      </div>
      <div className="panel-block">
        <button
          className="button is-info is-outlined is-fullwidth"
          onClick={showParts}
        >
          Parts
        </button>
      </div>
      <div className="hidden-on-mobile">
        <div className="panel-block">
          <div className="control">
            <div className="select">
              <select onChange={handleChange} name="sort" value={data.sort}>
                <option value="name|asc">Name(A - Z)</option>
                <option value="name|desc">Name(Z - A)</option>
                <option value="price|desc">Price(Hi - Lo)</option>
                <option value="price|asc">Price(Lo - Hi)</option>
                <option value="avgRating|desc">Rating(Hi - Lo)</option>
                <option value="avgRating|asc">Rating(Lo - Hi)</option>
              </select>
            </div>
          </div>
        </div>
        <label className="panel-block">
          <input
            type="checkbox"
            name="Case"
            onClick={toggleFilter}
          />
          Cases
        </label>
        <label className="panel-block">
          <input
            type="checkbox"
            name="CPU"
            onClick={toggleFilter}
          />
          CPUs
        </label>
        <label className="panel-block">
          <input
            type="checkbox"
            name="GPU"
            onClick={toggleFilter}
          />
          GPUs
        </label>
        <label className="panel-block">
          <input
            type="checkbox"
            name="Motherboard"
            onClick={toggleFilter}
          />
          Mobos
        </label>
        <label className="panel-block">
          <input
            type="checkbox"
            name="PSU"
            onClick={toggleFilter}
          />
          PSUs
        </label>
        <label className="panel-block">
          <input
            type="checkbox"
            name="RAM"
            onClick={toggleFilter}
          />
          RAM
        </label>
        <label className="panel-block">
          <input
            type="checkbox"
            name="Storage"
            onClick={toggleFilter}
          />
          Storage
        </label>
        <label className="panel-block">
          <input
            type="checkbox"
            name="Cooler"
            onClick={toggleFilter}
          />
          CPU Coolers
        </label>
      </div>
      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}>
          Reset
        </button>
      </div>
    </nav>
  );
};

export default SortFilterBar;
