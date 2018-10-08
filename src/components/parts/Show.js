import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Auth from '../../lib/Auth';
import Stars from '../../lib/Stars';
import Decimals from '../../lib/Decimals';
import Comments from '../common/Comments';

class PartShow extends React.Component {
    state = {
        comment: {}
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        axios
            .get(`/api/parts/${id}`)
            .then(res => {
                const currentPart = res.data.find(part => part._id === id);
                const comparisonParts = res.data.filter(part =>
                    part.ramType
                        ?
                        (part.type === currentPart.type &&
                            part._id !== id &&
                            part.ramType === currentPart.ramType)
                        :
                        (part.type === currentPart.type &&
                            part._id !== id));
                this.setState({ part: currentPart, parts: comparisonParts }, () => {

                    if (!this.state.part.scrapes || !this.state.part.scrapes.id) {
                        axios
                            .post(`/api/scrapers/${id}`)
                            .then(res => this.setState({ part: { ...this.state.part, scrapes: res.data } }));
                    } else {

                        const scrapes = Object.assign({}, this.state.part.scrapes);

                        axios
                            .get(`/api/scrapers/${scrapes.id}`)
                            .then(res => {

                                if (!scrapes.data.filter(scrape => scrape.id = res.data.id)[0]) {
                                    scrapes.data.push(res.data);
                                }

                                const orderedScrapes = scrapes.data.sort((scrapeA, scrapeB) =>
                                    new Date(scrapeB.data.createdAt) - new Date(scrapeA.data.createdAt));

                                this.setState({ part: { ...this.state.part, scrapes: orderedScrapes } });
                            });
                    }
                });
            });
    }

    handleDelete = () => {
        const {id} = this.props.match.params;
        axios
            .delete(`/api/parts/${id}`, {
                headers: {Authorization: `Bearer ${Auth.getToken()}`}
            })
            .then(() => this.props.history.push('/index'));
    };

    handleCommentChange = ({target: {name, value}}) => {
        const comment = {...this.state.comment, [name]: value};
        this.setState({comment});
    };

    handleCommentSubmit = e => {
        const {id} = this.props.match.params;
        e.preventDefault();
        axios
            .post(`/api/parts/${id}/comments`, this.state.comment, {
                headers: {Authorization: `Bearer ${Auth.getToken()}`}
            })
            .then((res) => {
                // console.log(res.data);
                this.setState({part: res.data, comment: {}});
            });
    };

    handleCommentDelete = (comment) => {
        // console.log(this.state);
        const {id} = this.props.match.params;
        axios
            .delete(`/api/parts/${id}/comments/${comment._id}`, {
                headers: {Authorization: `Bearer ${Auth.getToken()}`}
            })
            .then(res => {
                // console.log('frontend res.data: ',res.data);
                this.setState({part: res.data});
            });
    };

    changePage = (part) => {
        this.props.history.push(`/parts/${part._id}`);

        const parts = this.state.parts.filter(otherPart =>
            otherPart._id !== part._id);

        parts.push(this.state.part);

        this.setState({part, parts});
    };

    render() {
        const {part} = this.state;
        const {parts} = this.state;

        const sizes = ['M-ITX', 'M-ATX',
            'ATX', 'E-ATX'
        ];

        const chipsets = ['X79', 'Z87', 'Z97',
            'FM2+', 'AM3+', 'X99', 'Z170', 'X299',
            'Z270', 'Z370', 'Z390', 'AM4', 'X399'
        ];

        if (!part) return null;

        return (
            <div className="columns is-multiline">
                <div className="column is-6">
                    <h1 className="title is-1">{part.name}</h1>
                    <p className="show-description subtitle is-6">Added by {part.createdBy.username}</p>
                    <span className="tag">{part.vendor}
                        {' '}
                        {sizes[part.size]}
                        {' '}
                        {part.ramType}
                        {' '}
                        {part.storageType}
                        {' '}
                        {part.type}</span>
                    {part.chipset && <span className="tag">{chipsets[part.chipset]} socket</span>}
                    {part.scrapes && part.scrapes.data &&
                    <span className="tag bold">Price: {Decimals.calculate(part.scrapes.data[0].price)}</span>}
                    {!part.scrapes && <span className="tag bold">Price: {Decimals.calculate(part.price)}</span>}
                    <div className="hero-image" style={{backgroundImage: `url(${part.image})`}}/>

                    <div className="show-buttons">
                        <div
                            className="stars"
                            dangerouslySetInnerHTML={Stars.avgRating(part.avgRating)}/>

                        {Auth.isCurrentUser(part.createdBy) && <Link
                            to={`/parts/${part._id}/edit`}
                            className="button"
                        >
                            Edit
                        </Link>}

                        {Auth.isCurrentUser(part.createdBy) && <button
                            className="button is-danger"
                            onClick={this.handleDelete}
                        >
                            Delete
                        </button>}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={part.link}
                            className="button is-info"
                        >
                            Where to Buy
                        </a>

                    </div>

                    <hr/>

                    <h2 className="show-description subtitle is-6">{part.description}</h2>

                    {part.comments[0] && part.comments.map(comment =>
                        <div className="column is-11" key={comment._id}>
                            <div className="card">
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-4">{comment.content}</p>
                                            <p className="subtitle is-3 price">{'⭐️'.repeat(comment.rating)}</p>
                                            <p className="subtitle is-8">by user {comment.createdBy.username}
                                                <img
                                                    className="show-image"
                                                    src={comment.createdBy.picture}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {Auth.isCurrentUser(comment.createdBy) && <button
                                    className="button is-danger comment-delete"
                                    onClick={() => this.handleCommentDelete(comment)}
                                >
                                    Delete
                                </button>}
                            </div>
                        </div>
                    )}

                </div>

                <div className="show-column-right column is-6">

                    <table className="column table is-striped is-fullwidth is-hoverable">
                        <thead>
                        <tr>
                            <th>Name</th>
                            {(part.type === 'CPU' ||
                                part.type === 'GPU' ||
                                part.type === 'Motherboard') &&
                            <th>Vendor</th>}
                            {(part.type === 'CPU' ||
                                part.type === 'Motherboard') &&
                            <th>Chipset</th>}
                            {(part.type === 'RAM' ||
                                part.type === 'Storage') &&
                            <th>Type</th>}
                            {(part.type === 'Case' ||
                                part.type === 'Motherboard' ||
                                part.type === 'PSU') &&
                            <th>Size</th>}
                            {(part.type === 'CPU' ||
                                part.type === 'GPU' ||
                                part.type === 'RAM') &&
                            <th>Clockspeed</th>}
                            {(part.type === 'GPU') &&
                            <th>VRAM</th>}
                            {(part.type === 'RAM' ||
                                part.type === 'Storage') &&
                            <th>Capacity</th>}
                            {part.type === 'PSU' &&
                            <th>Power</th>}
                            {part.type === 'Cooler' &&
                            <th>Height</th>}
                            {part.type === 'Case' &&
                            <th>CPU Clearance</th>}
                            {part.type === 'Cooler' &&
                            <th>Fan Size</th>}
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="currentItem">
                            <th>{part.name}</th>
                            {(part.type === 'CPU' ||
                                part.type === 'GPU' ||
                                part.type === 'Motherboard') &&
                            <td>{part.vendor}</td>}
                            {(part.type === 'CPU' ||
                                part.type === 'Motherboard') &&
                            <td>{chipsets[part.chipset]} socket</td>}
                            {part.type === 'RAM' &&
                            <td>{part.ramType}</td>}
                            {part.type === 'Storage' &&
                            <td>{part.storageType}</td>}
                            {(part.type === 'Case' ||
                                part.type === 'Motherboard' ||
                                part.type === 'PSU') &&
                            <td>{sizes[part.size]}</td>}
                            {part.type === 'CPU' &&
                            <td>{part.speed}GHz</td>}
                            {(part.type === 'RAM' ||
                                part.type === 'GPU') &&
                            <td>{part.speed}MHz</td>}
                            {part.type === 'GPU' &&
                            <td>{part.vram}GB</td>}
                            {(part.type === 'RAM' ||
                                part.type === 'Storage') &&
                            <td>{part.capacity}GB</td>}
                            {part.type === 'PSU' &&
                            <td>{part.power}W</td>}
                            {(part.type === 'Cooler' ||
                                part.type === 'Case') &&
                            <td>{part.coolerHeight}mm</td>}
                            {part.type === 'Cooler' &&
                            <td>{part.coolerFanSize}</td>}
                            {part.scrapes && part.scrapes.data &&
                            <td>{Decimals.calculate(part.scrapes.data[0].price)}</td>}
                            {!part.scrapes && <td>{Decimals.calculate(part.price)}</td>}
                        </tr>
                        {parts.map(part =>
                            <tr key={part._id}>
                                <th>
                                    <a onClick={() => this.changePage(part)}>
                                        {part.name}
                                    </a>
                                </th>
                                {(part.type === 'CPU' ||
                                    part.type === 'GPU' ||
                                    part.type === 'Motherboard') &&
                                <td>{part.vendor}</td>}
                                {(part.type === 'CPU' ||
                                    part.type === 'Motherboard') &&
                                <td>{chipsets[part.chipset]} socket</td>}
                                {part.type === 'RAM' &&
                                <td>{part.ramType}</td>}
                                {part.type === 'Storage' &&
                                <td>{part.storageType}</td>}
                                {(part.type === 'Case' ||
                                    part.type === 'Motherboard' ||
                                    part.type === 'PSU') &&
                                <td>{sizes[part.size]}</td>}
                                {part.type === 'CPU' &&
                                <td>{part.speed}GHz</td>}
                                {(part.type === 'RAM' ||
                                    part.type === 'GPU') &&
                                <td>{part.speed}MHz</td>}
                                {part.type === 'GPU' &&
                                <td>{part.vram}GB</td>}
                                {(part.type === 'RAM' ||
                                    part.type === 'Storage') &&
                                <td>{part.capacity}GB</td>}
                                {part.type === 'PSU' &&
                                <td>{part.power}W</td>}
                                {(part.type === 'Cooler' ||
                                    part.type === 'Case') &&
                                <td>{part.coolerHeight}mm</td>}
                                {part.type === 'Cooler' &&
                                <td>{part.coolerFanSize}</td>}
                                {part.scrapes && part.scrapes.data &&
                                <td>{Decimals.calculate(part.scrapes.data[0].price)}</td>}
                                {!part.scrapes && <td>{Decimals.calculate(part.price)}</td>}
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <hr/>

                    {Auth.isAuthenticated() && <Comments
                        handleCommentChange={this.handleCommentChange}
                        handleCommentSubmit={this.handleCommentSubmit}
                        comment={this.state.comment}
                    />}


                </div>
            </div>
        );
    }
}

export default PartShow;
