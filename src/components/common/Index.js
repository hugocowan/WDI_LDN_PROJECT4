import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Index extends React.Component{
  state ={};

  componentDidMount() {
    axios
      .get('/api/computers')
      .then(res => this.setState({ computers: res.data }));

    axios
      .get('/api/parts')
      .then(res => this.setState({ parts: res.data }));
  }
  render() {
    const allModels = Object.keys(this.state);

    return(
      <div className="columns is-multiline is-mobile">
        {allModels.map(model =>
          this.state[`${model}`] && this.state[`${model}`].map(item =>
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
    );
  }
}
export default Index;
