handleChange = ({ target: { name, value } }) => {

  const errors = { ...this.state.errors, [name]: '' };
  let size = null;
  let vendor = null;
  let chipset = null;
  let ramType = null;



  const clearError = (name1, name2) => {
    errors[name1] = '';
    errors[name2] = '';
    // console.log('clearing error! name1 =',name1, 'name2 = ', name2);
    this.setState({ errors, [name]: value });
    setEnums();
  };

  const setEnums = () => {
    // console.log('size: ', size, 'vendor: ', vendor, 'chipset: ', chipset, 'ramType: ', ramType);
    this.setState({ [`${name.toLowerCase()}Enums`]: { size, vendor, chipset, ramType } });
  };

  const handleErrors = () => {
    errors[name] = 'Item not compatible with selected components!';
    this.setState({ errors, [name]: value });
    setEnums();
  };

  if(value === null){
    value = null;
    size = null;
    vendor = null;
    chipset = null;
    ramType = null;
    return clearError();
  }

  if(this.state.parts.find(part => part._id === value)) {

    const part = this.state.parts.find(part =>
      part._id === value);



    switch(part.type) {
      case 'Case':
        size = part.size;
        (!this.state.motherboardEnums ||
       part.size >= this.state.motherboardEnums.size) ?
          (clearError('case','motherboard')) : handleErrors();

        break;

      case 'Motherboard':

        size = part.size;
        chipset = part.chipset;
        vendor = part.vendor;

        ((!this.state.caseEnums ||
         part.size <= this.state.caseEnums.size) &&

        (!this.state.cpuEnums ||
         (this.state.cpuEnums.chipset === part.chipset)) &&

       (!this.state.cpuEnums ||
        (this.state.cpuEnums.vendor === part.vendor))) ?

          (clearError('motherboard','cpu', 'case')) :
          handleErrors();

        break;

      case 'CPU':
        // console.log('CPU chipset: ', part.chipset);
        // if(this.state.motherboardEnums) console.log('Motherboard chipset: ', this.state.motherboardEnums.chipset);
        // console.log('state: ',this.state);

        chipset = part.chipset;
        vendor = part.vendor;

        ((!this.state.motherboardEnums ||
         this.state.motherboardEnums.chipset === part.chipset) &&

        (!this.state.motherboardEnums ||
         this.state.motherboardEnums.vendor === part.vendor)) ?

          (clearError('cpu','motherboard')) :
          handleErrors();

        break;

      case 'RAM':

        ramType = part.ramType;

        ((part.ramType === 'DDR3' &&

         (!this.state.motherboardEnums ||
          this.state.motherboardEnums.chipset <= 4) &&

         (!this.state.cpuEnums ||
         this.state.cpuEnums.chipset <= 4)) ||

        (part.ramType === 'DDR4' &&

         (!this.state.motherboardEnums ||
         this.state.motherboardEnums.chipset >= 5) &&

         (!this.state.cpuEnums ||
         this.state.cpuEnums.chipset >= 5))) ?

          (clearError('ram','motherboard', 'cpu')) : handleErrors();

        break;

      case 'GPU':
        break;
      case 'Storage':
        break;
      case 'PSU':
        break;

      default:
        handleErrors();
    }
  }
  this.setState({ errors, [name]: value });
};
