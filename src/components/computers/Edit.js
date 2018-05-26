import React from 'react';
import ComputerForm from './ComputerForm';
import axios from 'axios';
import Auth from '../../lib/Auth';

class ComputerEdit extends React.Component {
  state = {
    errors: {}
  }

  componentDidMount(){
    axios
      .get(`/api/computers/${this.props.match.params.id}`)
      .then(res => this.setState(res.data));

    axios
      .get('/api/parts')
      .then(res => this.setState({ parts: res.data }, () => console.log(this.state.parts)));
  }

  handleChange = ({ target: { name, value } }) => {
    const errors = { ...this.state.errors, [name]: '' };
    this.setState({ errors, [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    axios
      .put(`/api/computers/${id}`, this.state, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push(`/computers/${id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render(){
    return(
      <ComputerForm
        computer={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        parts={this.state.parts}
      />
    );
  }
}
export default ComputerEdit;
