import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import ComputerForm from './ComputerForm';
import HandleChange from "../common/HandleChange";

class ComputerEdit extends React.Component {
    state = {
        errors: {}
    };

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
                        this.setState(computer, () => console.log(this.state));
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
    };

    handleChange = ({target: {name, value}}) => {
        const changes = HandleChange(name, value, this);
        this.setState(changes);
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
    };

    render() {
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
