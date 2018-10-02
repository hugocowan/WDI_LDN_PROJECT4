import React from 'react';
import PartForm from './PartForm';
import axios from 'axios';
import Auth from '../../lib/Auth';

class PartEdit extends React.Component {
    state = {
        errors: {}
    };

    componentDidMount() {
        axios
            .get(`/api/parts/${this.props.match.params.id}`)
            .then(res => this.setState(res.data));
    }

    handleChange = ({target: {name, value}}) => {
        const errors = {...this.state.errors, [name]: ''};
        this.setState({errors, [name]: value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const {id} = this.props.match.params;
        axios
            .put(`/api/parts/${id}`, this.state, {
                headers: {Authorization: `Bearer ${Auth.getToken()}`}
            })
            .then(() => this.props.history.push(`/parts/${id}`))
            .catch(err => this.setState({errors: err.response.data.errors}));
    };

    render() {
        return (
            <PartForm
                part={this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                errors={this.state.errors}
            />
        );
    }
}

export default PartEdit;
