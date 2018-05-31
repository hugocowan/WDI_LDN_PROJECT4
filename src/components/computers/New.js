import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import ComputerForm from './ComputerForm';

class ComputersNew extends React.Component{
  state = {
    errors: {},
    type: 'Computer',
    case: {
      image: 'http://placehold.it/500x600/d3d3d3/000000/&text=Choose+your+Case'
    },
    cpu: {
      image: 'http://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+CPU'
    },
    gpu: {
      image: 'http://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+GPU'
    },
    motherboard: {
      image: 'http://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+Mobo'
    },
    psu: {
      image: 'http://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+PSU'
    },
    ram: {
      image: 'http://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+RAM'
    },
    storage: {
      image: 'http://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+Storage'
    }
  };

  componentDidMount() {
    axios
      .get('/api/parts')
      .then(res => this.setState({ parts: res.data }));
  }

  handleSlideChange = (index, type) => {
    if(index === 0){
      return this.handleChange({ target: { name: type, value: null } });
    }
    const filteredParts = this.state.parts.filter(part => part.type === type);

    // console.log('filteredParts: ',filteredParts);
    this.handleChange({ target: { name: type.toLowerCase(), value: filteredParts[index-1]._id } });
  }

  handleChange = ({ target: { name, value } }) => {
    // console.log(name, value)
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

      } else if(part.type === 'CPU' &&

        (!this.state.motherboardEnums ||
         this.state.motherboardEnums.chipset === part.chipset) &&

        (!this.state.motherboardEnums ||
         this.state.motherboardEnums.vendor === part.vendor)) {

        console.log('CPU passed!');
        chipset = part.chipset;
        vendor = part.vendor;
      } else if(part.type === 'GPU' ||
                part.type === 'Storage' ||
                part.type === 'PSU') {
        console.log('successful GPU/Storage/PSU!');
      } else if(part.type === 'RAM' &&

        (part.ramType === 'DDR3' &&

         (!this.state.motherboardEnums ||
          this.state.motherboardEnums.chipset <= 4) &&

         (!this.state.cpuEnums ||
         this.state.cpuEnums.chipset <= 4)) ||

        (part.ramType === 'DDR4' &&

         (!this.state.motherboardEnums ||
         this.state.motherboardEnums.chipset >= 5) &&

         (!this.state.cpuEnums ||
         this.state.cpuEnums.chipset >= 5))) {

        console.log('ram passed!');
        ramType = part.ramType;
      } else {
        errors[name] = 'Item not compatible with selected components!';
        return this.setState({ errors, [name]: value });
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
        handleSlideChange={this.handleSlideChange}
        computer={this.state}
        errors={this.state.errors}
        parts={this.state.parts}
      />
    );
  }
}
export default ComputersNew;
