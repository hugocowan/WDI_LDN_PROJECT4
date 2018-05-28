import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import ComputerForm from './ComputerForm';

class ComputersNew extends React.Component{
  state = {
    errors: {},
    type: 'Computer'
  };

  componentDidMount() {
    axios
      .get('/api/parts')
      .then(res => this.setState({ parts: res.data }));
  }

  handleChange = ({ target: { name, value } }) => {
    const errors = { ...this.state.errors, [name]: '' };
    let size = null;
    let vendor = null;
    let chipset = null;
    let ramType = null;

    if(this.state.parts.find(part => part._id === value)){
      const part = this.state.parts.find(part => part._id === value);
      if(part.size) size = part.size;
      if(part.vendor) vendor = part.vendor;
      if(part.chipset) chipset = part.chipset;
      if(part.ramType) ramType = part.ramType;
    }

    this.setState({ errors, [name]: value, [`${name}Enums`]: { size, vendor, chipset, ramType } }, () => console.log(this.state));
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('/api/computers', this.state, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/index'))
      .catch(err => this.setState({ errors: err.response.data.errors }, () => console.log(this.state)));
  }

  render() {
    return(
      <ComputerForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        computer={this.state}
        errors={this.state.errors}
        parts={this.state.parts}
      />
    );
  }
}
export default ComputersNew;
