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
      .then(res => {
        const part = { ...res.data };
        console.log(part);
        part.caseEnums = {
          size: part.case.size,
          chipset: part.case.chipset,
          vendor: part.case.vendor
        };
        part.motherboardEnums = {
          size: part.motherboard.size,
          chipset: part.motherboard.chipset,
          vendor: part.motherboard.vendor
        };
        part.cpuEnums = {
          chipset: part.cpu.chipset,
          vendor: part.cpu.vendor
        };
        part.ramEnums = {
          ramType: part.ram.ramType
        };

        // console.log('computer: ',res.data);
        this.setState(part);
      });

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

        console.log('CPU passed!', 'this.state: ',this.state);
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
      <div>
        <ComputerForm
          computer={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          parts={this.state.parts}
        />
      </div>
    );
  }
}
export default ComputerEdit;
