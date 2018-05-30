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

    // .then(() => {
    //   const computer = this.state.computer;
    //   const partNames = [
    //     computer.case.name,
    //     computer.cpu.name,
    //     computer.gpu.name,
    //     computer.motherboard.name,
    //     computer.psu.name,
    //     computer.ram.name,
    //     computer.storage.name
    //   ];
    //
    //   const currentParts = partNames.map(name => this.state.parts.filter(part => (part.name === name)));
    //   // console.log(currentParts);
    //
    //   const indexes = currentParts.map(part =>
    //     this.state.parts.filter(generalPart =>
    //       part[0].type === generalPart.type).findIndex(generalPart =>
    //       generalPart.name === part[0].name));
    //
    //   indexes.forEach(index =>
    //     partNames.forEach(name =>
    //       this.setState({ [name]: index}, () => console.log(this.state))));
    // });

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

        // console.log('case passed!');
        size = part.size;

      } else if(part.type === 'Motherboard' &&

        (!this.state.caseEnums ||
         part.size <= this.state.caseEnums.size) &&

        (!this.state.cpuEnums ||
         (this.state.cpuEnums.chipset === part.chipset)) &&

       (!this.state.cpuEnums ||
        (this.state.cpuEnums.vendor === part.vendor))) {

        // console.log('motherboard passed!');
        size = part.size;
        chipset = part.chipset;
        vendor = part.vendor;

      } else if(part.type === 'CPU' &&

        (!this.state.motherboardEnums ||
         this.state.motherboardEnums.chipset === part.chipset) &&

        (!this.state.motherboardEnums ||
         this.state.motherboardEnums.vendor === part.vendor)) {

        // console.log('CPU passed!', 'this.state: ',this.state);
        chipset = part.chipset;
        vendor = part.vendor;
      } else if(part.type === 'GPU' ||
                part.type === 'Storage' ||
                part.type === 'PSU') {
        // console.log('successful GPU/Storage/PSU!');
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

        // console.log('ram passed!');
        ramType = part.ramType;
      } else {
        errors[name] = 'Item not compatible with selected components!';
        return this.setState({ errors, [name]: value });
      }
    }

    this.setState({ errors, [name]: value, [`${name}Enums`]: { size, vendor, chipset, ramType } });
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
    console.log(this.state);
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
