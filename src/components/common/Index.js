import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import Stars from '../../lib/Stars';
import Decimals from '../../lib/Decimals';
import SortFilterBar from './SortFilterBar';
import Promise from 'bluebird';

class Index extends React.Component {
    state = {
        search: '',
        sort: 'name|asc',
        computersShow: false,
        partsShow: true
    };

    componentDidMount() {

        Promise.props({
            parts: axios.get('/api/parts').then(res => res.data),
            computers: axios.get('/api/computers').then(res => res.data)
        })
            .then(data => this.setState(data));
    }

    handleChange = ({target: {name, value}}) => {
        this.setState({[name]: value});
    };

    sortAndFilter = () => {
        const [field, dir] = this.state.sort.split('|');
        const re = new RegExp(this.state.search, 'i');

        function filter(items) {
            const filtered = _.filter(items, item => {
                return re.test(item.name) || re.test(item.type);
            });
            return _.orderBy(filtered, field, dir);
        }

        if (this.state.computersShow) {
            return filter(this.state.computers);
        } else if (this.state.filteredParts) {
            return filter(this.state.filteredParts);
        } else {
            return filter(this.state.parts);
        }
    };

    showComputers = () => {
        this.setState({computersShow: true, partsShow: false});
    };

    showParts = () => {
        this.setState({computersShow: false, partsShow: true});
    };

    toggleFilter = ({target: {name}}) => {
        const toggledParts = {...this.state.toggledParts};
        let toggleKeys = Object.keys(toggledParts);
        const getKeys = () => toggleKeys = Object.keys(toggledParts);

        if (toggleKeys.includes(name)) {
            // console.log('part filter getting deleted: ', name);
            delete toggledParts[name];
            getKeys();

            const filteredParts = this.state.parts.filter(part => {

                if (toggleKeys[0]) {
                    return toggleKeys.includes(part.type);

                } else return !toggleKeys.includes(part.type);
            });

            return this.setState({filteredParts, toggledParts});
        }

        toggledParts[name] = name;
        getKeys();

        const filteredParts = this.state.parts.filter(part =>
            toggleKeys.includes(part.type));

        this.setState({filteredParts, toggledParts});

    };

    resetFilters = () => {
        window.location.reload();
    };

    ellipsis = (string) => {
        if (!string) return null;
        if (string.length > 60) {
            return `${string.substring(0, 60)}...`;
        } else return string;
    };

    currency = (price) => {
        if (price % 1 === 0) {
            return `£${price}.00`;
        } else if (price.toString().split('.')[1].length === 1) {
            return `£${price}0`;
        } else return `£${price}`;
    };

    totalPrice = (computer) => {
        return computer.case.price +
            computer.cpu.price +
            computer.gpu.price +
            computer.motherboard.price +
            computer.psu.price +
            computer.ram.price +
            computer.storage.price;
    };

    render() {
        const allModels = ['computers', 'parts'];

        return (

            <div>

                <div className="columns is-multiline is-mobile">

                    <div className="filter-bar column is-2-desktop is-2-tablet is-12-mobile">
                        <SortFilterBar
                            showComputers={this.showComputers}
                            showParts={this.showParts}
                            handleChange={this.handleChange}
                            toggleFilter={this.toggleFilter}
                            resetFilters={this.resetFilters}
                            data={this.state}
                            isParts={this.state.partsShow}
                            isComputers={this.state.computersShow}
                        />
                    </div>

                    <div className="column is-10-desktop is-10-tablet is-12-mobile">
                        <div className="columns is-multiline">

                            {allModels.map(model =>
                                (this.state[model] && this.state[`${model}Show`]) && this.sortAndFilter().map(item =>
                                    <div className="column is-4-desktop is-6-tablet is-12-mobile" key={item._id}>
                                        <Link to={`/${model}/${item._id}`}>

                                            <div
                                                className={item.type === 'Computer' ?
                                                    'computer card' :
                                                    'part card'}
                                            >

                                                <div
                                                    className="card-image"
                                                    style={{backgroundImage: `url(${item.image})`}}
                                                ></div>
                                                <div className="card-content">
                                                    <div className="media">
                                                        <div className="media-content">
                                                            <p className="title is-4">{item.name}</p>
                                                            <p className="subtitle is-6">{this.ellipsis(item.description)}</p>
                                                            {item.price && <p className="subtitle is-6">
                                                                <span>{Decimals.calculate(item.price)}</span></p>}
                                                            {item.type === 'Computer' &&
                                                            <div>
                                                                <p className="subtitle is-6">
                                                                    CPU: {item.cpu.name}<br/>
                                                                    GPU: {item.gpu.name}<br/>
                                                                    RAM: {item.ram.capacity}GB<br/>

                                                                </p>
                                                                <p className="subtitle is-5">
                                                                    Total
                                                                    cost: <span>{Decimals.calculate(item.price)}</span>
                                                                </p>
                                                            </div>}
                                                            <div dangerouslySetInnerHTML={Stars.avgRating(item.avgRating)}/>
                                                            <p className="subtitle is-6">Created
                                                                by {item.createdBy.username}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            )}

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Index;
