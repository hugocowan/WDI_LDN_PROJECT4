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
        partsShow: true,
    };

    callQueue = [];
    timeouts = [];

    _source = axios.CancelToken.source();

    componentDidMount() {

        Promise.props({
            parts: axios.get('/api/parts').then(res => res.data),
            computers: axios.get('/api/computers').then(res => res.data)
        })
            .then(data => this.setState(data, () => this.getScrapes()));
    }

    componentWillUnmount() {
        this.callQueue = [];
        this._source.cancel('Request cancelled by user.');
        if (this.timeouts.length) {
            this.timeouts.forEach(timeout => clearTimeout(timeout));
        }

    }

    handleChange = ({target: {name, value}}) => {
        this.setState({[name]: value});
    };

    getScrapes = () => {
        const parts = [ ...this.state.parts ];

        this.state.parts.forEach((part, index) => {

            const position = parts.findIndex(partToReplace => partToReplace.id === part.id);

            if (!part.scrapes || !part.scrapes.lastScrape) {

                this.timeouts.push(setTimeout(() => {
                    axios
                        .post(`/api/scrapers/${part.id}`, {
                            cancelToken: this._source.token
                        })
                        .then(res => {
                            if (typeof res.data === 'string') {
                                return console.log(res.data);
                            }
                            parts[position].scrapes = res.data;
                            this.setState({ parts });
                        })
                        .catch(err => console.log('Error while scraping:', err));
                }, 4000 * index));
            } else {

                let scrapes = Object.assign({}, part.scrapes);

                this.timeouts.push(setTimeout(() => {
                    axios
                        .get(`/api/scrapers/${scrapes.id}`, {
                            cancelToken: this._source.token
                        })
                        .then(res => {
                            let scrapes = res.data;

                            if (scrapes.data && scrapes.data.length >= 2) {
                                scrapes.data = scrapes.data.sort((scrapeA, scrapeB) =>
                                    new Date(scrapeB.createdAt) - new Date(scrapeA.createdAt));
                            }

                            parts[position].scrapes = scrapes;
                            this.setState({ parts });
                        })
                        .catch(err => console.log('Error while scraping:', err));
                    }, 4000 * index));
            }
        });
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

    render() {
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

                            {['computers', 'parts'].map(model =>
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
                                                />
                                                <div className="card-content">
                                                    <div className="media">
                                                        <div className="media-content">
                                                            <p className="title is-4">{item.name}</p>
                                                            <p className="subtitle is-6">{this.ellipsis(item.description)}</p>
                                                            {item.price && <p className="subtitle is-6">
                                                                <span>{Decimals.calculate(item.scrapedPrice || item.price)}</span></p>}
                                                            {item.type === 'Computer' &&
                                                            <div>
                                                                <p className="subtitle is-6">
                                                                    CPU: {item.cpu.name}<br/>
                                                                    GPU: {item.gpu.name}<br/>
                                                                    RAM: {item.ram.capacity}GB<br/>

                                                                </p>
                                                                <p className="subtitle is-5">
                                                                    Total
                                                                    cost: <span>{Decimals.calculate(item.scrapedPrice || item.price)}</span>
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
