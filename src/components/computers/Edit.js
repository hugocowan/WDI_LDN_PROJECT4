import React from 'react';
import axios from 'axios';

import ComputerForm from './ComputerForm';
import Auth from '../../lib/Auth';

class ComputerEdit extends React.Component {
  state = {
    errors: {}
  }

  componentDidMount(){
    axios
      .get('/api/parts')
      .then(res => {
        this.setState({ parts: res.data });
      })
      .then(() => {
        axios
          .get(`/api/computers/${this.props.match.params.id}`)
          .then(res => {
            const computer = { ...res.data };
            // console.log(computer);
            computer.caseEnums = {
              size: computer.case.size,
              chipset: computer.case.chipset,
              vendor: computer.case.vendor
            };
            computer.motherboardEnums = {
              size: computer.motherboard.size,
              chipset: computer.motherboard.chipset,
              vendor: computer.motherboard.vendor
            };
            computer.cpuEnums = {
              chipset: computer.cpu.chipset,
              vendor: computer.cpu.vendor
            };
            computer.ramEnums = {
              ramType: computer.ram.ramType
            };
            this.setState(computer);
          });
      });
  }

  handleSlideChange = (index, type) => {
    if(index === 0){
      return this.handleChange({ target: { name: type, value: null } });
    }
    const part = this.state.parts.filter(part => part.type === type)[index-1];

    // console.log('filteredParts: ',filteredParts);
    this.handleChange({ target: { name: type.toLowerCase(), value: part } });
  }

  handleChange = ({ target: { name, value } }) => {

    const errors = { ...this.state.errors, [name]: '' };

    if(!value){
      value = {
        image: `http://placehold.it/500x600/d3d3d3/000000/&text=Choose+your+${name}`
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
    const { id } = this.props.match.params;
    axios
      .put(`/api/computers/${id}`, this.state, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push(`/computers/${id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render(){
    // console.log(this.state);
    if(!this.state.parts) return null;

    return(
      <div>
        <ComputerForm
          computer={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleSlideChange={this.handleSlideChange}
          errors={this.state.errors}
          parts={this.state.parts}
        />
      </div>
    );
  }
}
export default ComputerEdit;
