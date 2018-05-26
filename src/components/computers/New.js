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
    this.setState({ errors, [name]: value }, () => console.log(this.state));
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
