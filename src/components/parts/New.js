import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import PartForm from './PartForm';

class PartsNew extends React.Component{
  state = {
    errors: {}
  };

  handleChange = ({ target: { name, value } }) => {
    const errors = { ...this.state.errors, [name]: '' };
    this.setState({ errors, [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('/api/parts', this.state, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/index'))
      .catch(err => this.setState({ errors: err.response.data.errors }, () => console.log(this.state)));
  }

  render() {
    return(
      <PartForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        part={this.state}
        errors={this.state.errors}
      />
    );
  }
}
export default PartsNew;
