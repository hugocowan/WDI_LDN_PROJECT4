import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Index extends React.Component{
  state ={};

  componentDidMount() {
    axios
      .get('/api/computers')
      .then(res => this.setState({ computers: res.data }, () => console.log(this.state)));
    axios
      .get('/api/parts')
      .then(res => this.setState({ parts: res.data }));
  }
  render(){
    return(
      <div>
        {this.state.computers && this.state.computers.map(computer =>
          <div key={computer._id}>
            <Link to={`/computers/${computer._id}`}>{computer.name}</Link>
          </div>
        )}
        {this.state.parts && this.state.parts.map(part =>
          <div key={part._id}>
            <Link to={`/parts/${part._id}`}>{part.name}</Link>
          </div>
        )}
      </div>
    );
  }
}
export default Index;
