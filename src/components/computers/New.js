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

    if(value === 'Please select') value = undefined;

    if(this.state.parts.find(part => part._id === value)) {

      const part = this.state.parts.find(part => part._id === value);

      if(part.type === 'Case' &&
         (!this.state.motherboardEnums ||
          part.size >= this.state.motherboardEnums.size)){

        console.log('case passed!');
        size = part.size;

      } else if(part.type === 'Case' &&
                part.value === null) {

        size = null;

      } else if(part.type === 'Motherboard' &&

        (!this.state.caseEnums ||
         part.size <= this.state.caseEnums.size) &&

        (!this.state.cpuEnums ||
         (this.state.cpuEnums.chipset === part.chipset)) &&

       (!this.state.cpuEnums ||
        (this.state.cpuEnums.vendor === part.vendor))) {

        console.log('motherboard passed!');
        size = part.size;
        chipset = part.chipset;
        vendor = part.vendor;

      } else if(part.type === 'Motherboard' &&
                part.value === null) {

        size = null;

      }else if(part.type === 'CPU' &&

        (!this.state.motheboardEnums ||
         this.state.motheboardEnums.chipset === part.chipset) &&

        (!this.state.motherboardEnums ||
         this.state.motherboardEnums.vendor === part.vendor)) {

        console.log('CPU passed!');
        chipset = part.chipset;
        vendor = part.vendor;
      } else if(part.type === 'CPU' &&
                part.value === null) {

        size = null;

      } else if(part.type === 'GPU' ||
                part.type === 'Storage' ||
                part.type === 'PSU') {
        console.log('successful GPU/Storage/PSU!');
      } else if(part.type === 'RAM' &&

        (part.ramType === 'DDR3' &&

         (!this.state.motherboardEnums ||
         this.state.motherboardEnums.chipset === 'Z87' ||
         this.state.motherboardEnums.chipset === 'Z97' ||
         this.state.motherboardEnums.chipset === 'FM2+' ||
         this.state.motherboardEnums.chipset === 'AM3+' ||
         this.state.motherboardEnums.chipset === null) &&
         
         (!this.state.cpuEnums ||
         this.state.cpuEnums.chipset === 'Z87' ||
         this.state.cpuEnums.chipset === 'Z97' ||
         this.state.cpuEnums.chipset === 'FM2+' ||
         this.state.cpuEnums.chipset === 'AM3+')) ||

        (part.ramType === 'DDR4' &&

         (!this.state.motherboardEnums ||
         this.state.motherboardEnums.chipset !== 'Z87' ||
         this.state.motherboardEnums.chipset !== 'Z97' ||
         this.state.motherboardEnums.chipset !== 'FM2+' ||
         this.state.motherboardEnums.chipset !== 'AM3+') &&

         (!this.state.cpuEnums ||
         this.state.cpuEnums.chipset !== 'Z87' ||
         this.state.cpuEnums.chipset !== 'Z97' ||
         this.state.cpuEnums.chipset !== 'FM2+' ||
         this.state.cpuEnums.chipset !== 'AM3+'))) {

        console.log('ram passed!');
        ramType = part.ramType;
      } else {
        errors[name] = 'Item not compatible with selected components!';
        return this.setState({ errors });
      }
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
