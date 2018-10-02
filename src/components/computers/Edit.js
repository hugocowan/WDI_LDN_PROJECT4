import React from 'react';
import axios from 'axios';

import ComputerForm from './ComputerForm';
import Auth from '../../lib/Auth';

class ComputerEdit extends React.Component {
    state = {
        errors: {}
    }

    componentDidMount() {
        axios
            .get('/api/parts')
            .then(res => {
                this.setState({parts: res.data});
            })
            .then(() => {
                axios
                    .get(`/api/computers/${this.props.match.params.id}`)
                    .then(res => {
                        const computer = {...res.data};
                        // console.log(computer);
                        computer.caseEnums = {
                            size: computer.case.size,
                            chipset: computer.case.chipset,
                            vendor: computer.case.vendor,
                            coolerHeight: computer.case.coolerHeight
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
                        computer.coolerEnums = {
                            coolerHeight: computer.cooler.coolerHeight,
                            compatibleSockets: computer.cooler.compatibleSockets
                        };
                        this.setState(computer);
                    });
            });
    }

    handleSlideChange = (index, type) => {
        if (index === 0) {
            return this.handleChange({target: {name: type, value: null}});
        }
        const filteredParts = this.state.parts.filter(part => part.type === type);

        // console.log('filteredParts: ',filteredParts);
        this.handleChange({target: {name: type.toLowerCase(), value: filteredParts[index - 1]._id}});
    }

    handleChange = ({target: {name, value}}) => {

        const errors = {...this.state.errors, [name]: ''};
        let size = null,
            vendor = null,
            chipset = null,
            ramType = null,
            coolerHeight = null,
            compatibleSockets = null;

        const socketVChipset = [['1', '2', '6', '8', '9', '10'], ['0', '5', '12'], ['3', '4'], ['11'], ['12']];

        const clearError = (parts) => {
            parts ? parts.forEach(part => errors[part] = '') : null;
            // console.log('clearing error!', errors);
            this.setState({errors, [name]: value});
            setEnums();
        };

        const setEnums = () => {
            this.setState({
                [`${name.toLowerCase()}Enums`]: {size, vendor, chipset, ramType, coolerHeight, compatibleSockets}
            });
        };

        const handleErrors = () => {
            // console.log('hi!');
            errors[name] = 'Item not compatible with selected components!';
            this.setState({errors, [name]: value});
            setEnums();
        };

        if (value === null) {
            value = null;
            size = null;
            vendor = null;
            chipset = null;
            ramType = null;
            coolerHeight = null;
            compatibleSockets = null;
            return clearError();
        }

        if (this.state.parts.find(part => part._id === value)) {

            const part = this.state.parts.find(part => part._id === value);


            switch (part.type) {
                case 'Case':

                    size = part.size;
                    coolerHeight = part.coolerHeight;

                    ((!this.state.motherboardEnums ||
                        part.size >= this.state.motherboardEnums.size) &&

                        (!this.state.coolerEnums ||
                            part.coolerHeight >= this.state.coolerEnums.coolerHeight)) ?

                        (clearError(['case', 'motherboard', 'cooler'])) : handleErrors();

                    break;

                case 'Motherboard':

                    size = part.size;
                    chipset = part.chipset;
                    vendor = part.vendor;

                    ((!this.state.caseEnums ||
                        part.size <= this.state.caseEnums.size) &&

                        (!this.state.cpuEnums ||
                            (this.state.cpuEnums.chipset === part.chipset)) &&

                        (!this.state.coolerEnums ||
                            socketVChipset[this.state.coolerEnums.compatibleSockets].includes(part.chipset)) &&

                        (!this.state.cpuEnums ||
                            (this.state.cpuEnums.vendor === part.vendor))) ?

                        (clearError(['motherboard', 'cpu', 'case', 'cooler'])) : handleErrors();

                    break;

                case 'CPU':

                    chipset = part.chipset;
                    vendor = part.vendor;

                    if (this.state.coolerEnums) {
                        console.log('cpu:', socketVChipset[this.state.coolerEnums.compatibleSockets], typeof part.chipset);
                        console.log(socketVChipset[this.state.coolerEnums.compatibleSockets].includes(part.chipset));
                    }


                    ((!this.state.motherboardEnums ||
                        this.state.motherboardEnums.chipset === part.chipset) &&

                        (!this.state.coolerEnums ||
                            socketVChipset[this.state.coolerEnums.compatibleSockets].includes(part.chipset)) &&

                        (!this.state.motherboardEnums ||
                            this.state.motherboardEnums.vendor === part.vendor)) ?

                        (clearError(['cpu', 'motherboard', 'cooler'])) : handleErrors();

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

                        (clearError(['ram', 'motherboard', 'cpu'])) : handleErrors();

                    break;

                case 'Cooler':

                    coolerHeight = part.coolerHeight;
                    compatibleSockets = part.compatibleSockets;

                    ((!this.state.caseEnums ||
                        part.coolerHeight <= this.state.caseEnums.coolerHeight) &&

                        (!this.state.motherboardEnums ||
                            socketVChipset[part.compatibleSockets].includes(this.state.motherboardEnums.chipset)) &&

                        (!this.state.cpuEnums ||
                            socketVChipset[part.compatibleSockets].includes(this.state.cpuEnums.chipset))) ?

                        (clearError(['cooler', 'case', 'cpu', 'motherboard'])) : handleErrors();

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
        this.setState({errors, [name]: value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const {id} = this.props.match.params;
        axios
            .put(`/api/computers/${id}`, this.state, {
                headers: {Authorization: `Bearer ${Auth.getToken()}`}
            })
            .then(() => this.props.history.push(`/computers/${id}`))
            .catch(err => this.setState({errors: err.response.data.errors}));
    }

    render() {
        // console.log(this.state);
        if (!this.state.parts) return null;

        return (
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
