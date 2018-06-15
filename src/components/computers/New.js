import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import ComputerForm from './ComputerForm';

class ComputersNew extends React.Component{
  state = {
    errors: {},
    type: 'Computer',
    case: {
      image: 'https://placehold.it/500x600/d3d3d3/000000/&text=Choose+your+Case'
    },
    cpu: {
      image: 'https://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+CPU'
    },
    gpu: {
      image: 'https://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+GPU'
    },
    motherboard: {
      image: 'https://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+Mobo'
    },
    psu: {
      image: 'https://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+PSU'
    },
    ram: {
      image: 'https://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+RAM'
    },
    storage: {
      image: 'https://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+Storage'
    }
  };

  componentDidMount() {
    axios
      .get('/api/parts')
      .then(res => this.setState({ parts: res.data }));
  }

  handleSlideChange = (index, type) => {
    if(index === 0) return this.handleChange({ target:
      { name: type, value: null }
    });

    const part = this.state.parts.filter(part => part.type === type)[index-1];

    this.handleChange({ target: { name: type.toLowerCase(), value: part } });
  }

  handleChange = ({ target: { name, value } }) => {

    const errors = { ...this.state.errors, [name]: '' };

    if(!value){
      value = {
        image: `https://placehold.it/500x600/d3d3d3/000000/&text=Choose+your+${name}`
      };
      name = name.toLowerCase();
      this.setState({ errors, [name]: value });
    }

    this.setState({ errors, [name]: value }, () => {

      const pc = this.state;

      if(pc.case.size < pc.motherboard.size){
        errors.case = 'Case is too small for selected Motherboard.';
        errors.motherboard = 'Motherboard is too large for selected Case.';

      } else if(pc.case.size < pc.psu.size){
        errors.case = 'Case is too small for selected PSU.';
        errors.psu = 'PSU is too large for selected Case.';

      } else if(pc.cpu.vendor && pc.motherboard.vendor &&
         (pc.cpu.vendor !== pc.motherboard.vendor ||
          pc.cpu.chipset !== pc.motherboard.chipset)
      ){
        errors.cpu = 'CPU chipset is incompatible with selected Motherboard.';
        errors.motherboard = 'Motherboard chipset is incompatible with selected CPU.';

      } else if(
        (pc.ram.ramType === 'DDR3' && pc.motherboard.chipset > 4) ||
        (pc.ram.ramType === 'DDR4' && pc.motherboard.chipset <= 4)
      ){
        errors.ram = 'RAM type is incompatible with selected Motherboard chipset.';
        errors.motherboard = 'Motherboard chipset is incompatible with selected RAM type.';

      } else{
        errors.cpu = '';
        errors.case = '';
        errors.motherboard = '';
        errors.psu = '';
        errors.ram = '';
      }

      this.setState({ errors });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('/api/computers', this.state, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/index'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
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
