import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SortFilterBar from './SortFilterBar';

class Index extends React.Component{
  state = {
    search: '',
    computerSearch: '',
    computerSort: 'name|asc',
    sort: 'name|asc',
    computersShow: false,
    partsShow: true
  };

  componentDidMount() {
    axios
      .get('/api/computers')
      .then(res => this.setState({ computers: res.data }));

    axios
      .get('/api/parts')
      .then(res => this.setState({ parts: res.data }));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  computersSortedAndFiltered = () => {
    const [field, dir] = this.state.computerSort.split('|');
    const re = new RegExp(this.state.computerSearch, 'i');
    const filtered = _.filter(this.state.computers, computer => {
      return re.test(computer.name) || re.test(computer.type);
    });
    return _.orderBy(filtered, field, dir);
  }
  partsSortedAndFiltered = () => {
    const [field, dir] = this.state.sort.split('|');
    const re = new RegExp(this.state.search, 'i');
    const filtered = _.filter(this.state.parts, part => {
      return re.test(part.name) || re.test(part.type);
    });
    return _.orderBy(filtered, field, dir);
  }

  showComputers = () => {
    this.setState({ computersShow: true, partsShow: false }, () => console.log(this.state));
  }
  showParts = () => {
    this.setState({ computersShow: false, partsShow: true }, () => console.log(this.state));
  }

  render() {
    const allModels = ['computers', 'parts'];
    console.log(this.state[`${allModels[0]}`]);

    return(
      <div>
        <SortFilterBar
          showComputers = {this.showComputers}
          showParts = {this.showParts}
          handleChange={this.handleChange}
          data={this.state}
          isParts = {this.state.partsShow}
          isComputers = {this.state.computersShow}
        />
        <div className="columns is-multiline is-mobile">
          {allModels.map(model =>
            (this.state[model] && this.state[`${model}Show`]) && this[`${model}SortedAndFiltered`]().map(item =>
              <div className="column is-4-desktop is-6-tablet is-12-mobile" key={item._id}>
                <Link to={`/${model}/${item._id}`}>
                  <div className="card">
                    <div
                      className="card-image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">{item.name}</p>
                          <p className="subtitle is-6">{item.description}</p>
                          <p className="subtitle is-6">Created by {item.createdBy.username}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}
export default Index;
