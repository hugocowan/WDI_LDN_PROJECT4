import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import ComputerForm from './ComputerForm';
import HandleChange from '../common/HandleChange';

class ComputersNew extends React.Component {
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
        },
        cooler: {
            image: 'http://placehold.it/500x600/d3d3d3/000000/&text=Choose+Your+CPU+Cooler'
        }
    };

    componentDidMount() {
        axios
            .get('/api/parts')
            .then(res => this.setState({parts: res.data}));
    }

    handleSlideChange = (index, type) => {
        if (index === 0) {
            return this.handleChange({target: {name: type, value: null}});
        }
        const filteredParts = this.state.parts.filter(part => part.type === type);
        this.handleChange({target: {name: type.toLowerCase(), value: filteredParts[index - 1]._id}});
    };

    handleChange = ({target: {name, value}}) => {
        const changes = HandleChange(name, value, this);
        this.setState(changes);
    };

    handleSubmit = e => {
        e.preventDefault();
        axios
            .post('/api/computers', this.state, {
                headers: {Authorization: `Bearer ${Auth.getToken()}`}
            })
            .then(() => this.props.history.push('/index'))
            .catch(err => this.setState({errors: err.response.data.errors}));
    };

    render() {
        return (
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
