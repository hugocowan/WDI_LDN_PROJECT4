import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Auth from '../../lib/Auth';
import Stars from '../../lib/Stars';
import Decimals from '../../lib/Decimals';
import ComputerComments from '../common/Comments';

class ComputerShow extends React.Component {
    state = {
        comment: {}
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        axios
            .get(`/api/computers/${id}`)
            .then(res => this.setState({computer: res.data}));
    }

    handleDelete = () => {
        const {id} = this.props.match.params;
        axios
            .delete(`/api/computers/${id}`, {
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
            .post(`/api/computers/${id}/comments`, this.state.comment, {
                headers: {Authorization: `Bearer ${Auth.getToken()}`}
            })
            .then((res) => {
                this.setState({computer: res.data, comment: {}});
            });

    };

    handleCommentDelete = (comment) => {
        const {id} = this.props.match.params;
        axios
            .delete(`/api/computers/${id}/comments/${comment._id}`, {
                headers: {Authorization: `Bearer ${Auth.getToken()}`}
            })
            .then(res => {
                this.setState({computer: res.data});
            });
    };


    render() {
        const {computer} = this.state;
        if (!computer) return null;
        const sizes = [ 'M-ITX', 'M-ATX', 'ATX', 'E-ATX'];
        return (
            <div className="columns is-multiline">
                <div className="column is-6">
                    <h1 className="title is-1">{computer.name}</h1>
                    <p className="show-description subtitle is-6">By {computer.createdBy.username}</p>
                    <div className="hero-image" style={{backgroundImage: `url(${computer.image})`}}/>
                    <div className="show-buttons">
                        <div
                            dangerouslySetInnerHTML={Stars.avgRating(computer.avgRating)}
                        />
                        {Auth.isCurrentUser(computer.createdBy) && <Link
                            to={`/computers/${computer._id}/edit`}
                            className="button"
                        >
                            Edit
                        </Link>}
                        {' '}
                        {Auth.isCurrentUser(computer.createdBy) && <button
                            className="button is-danger"
                            onClick={this.handleDelete}
                        >
                            Delete
                        </button>}
                    </div>


                    <hr/>

                    <h2 className="show-description subtitle is-6">{computer.description}</h2>

                    {computer.comments[0] && computer.comments.map(comment =>
                        <div className="column is-11" key={comment._id}>
                            <div className="card">
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-4">{comment.content}</p>
                                            <p className="subtitle is-3 price">{'⭐️'.repeat(comment.rating)}</p>
                                            <p className="subtitle is-8">by user {comment.createdBy.username}</p>
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
                <div className="column show-column-right is-6">

          <span className="tag bolder">
            Total cost: {Decimals.calculate(computer.price)}
          </span>

                    <table className="column table is-striped is-fullwidth is-hoverable">
                        <thead>
                        <tr>
                            <th>Part</th>
                            <th>Name</th>
                            <th>Key Specs</th>
                            <th>Price</th>
                            <th>Where to Buy</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>Case</th>
                            <td><Link to={`/parts/${computer.case._id}`}>{computer.case.name}</Link></td>
                            <td>{sizes[computer.case.size]}</td>
                            <td>{Decimals.calculate(computer.case.price)}</td>
                            <td><a href={computer.case.link}>Link</a></td>
                        </tr>
                        <tr>
                            <th>CPU</th>
                            <td><Link to={`/parts/${computer.cpu._id}`}>{computer.cpu.name}</Link></td>
                            <td>{computer.cpu.speed}GHz</td>
                            <td>{Decimals.calculate(computer.cpu.price)}</td>
                            <td><a href={computer.cpu.link}>Link</a></td>
                        </tr>
                        <tr>
                            <th>CPU Cooler</th>
                            <td><Link to={`/parts/${computer.cooler._id}`}>{computer.cooler.name}</Link></td>
                            <td>{computer.cooler.coolerFanSize} Fan Size</td>
                            <td>{Decimals.calculate(computer.cooler.price)}</td>
                            <td><a href={computer.cooler.link}>Link</a></td>
                        </tr>
                        <tr>
                            <th>GPU</th>
                            <td><Link to={`/parts/${computer.gpu._id}`}>{computer.gpu.name}</Link></td>
                            <td>{computer.gpu.vram}GB VRAM</td>
                            <td>{Decimals.calculate(computer.gpu.price)}</td>
                            <td><a href={computer.gpu.link}>Link</a></td>
                        </tr>
                        <tr>
                            <th>Motherboard</th>
                            <td><Link to={`/parts/${computer.motherboard._id}`}>{computer.motherboard.name}</Link></td>
                            <td>{sizes[computer.motherboard.size]}</td>
                            <td>{Decimals.calculate(computer.motherboard.price)}</td>
                            <td><a href={computer.motherboard.link}>Link</a></td>
                        </tr>
                        <tr>
                            <th>PSU</th>
                            <td><Link to={`/parts/${computer.psu._id}`}>{computer.psu.name}</Link></td>
                            <td>{computer.psu.power}W</td>
                            <td>{Decimals.calculate(computer.psu.price)}</td>
                            <td><a href={computer.psu.link}>Link</a></td>
                        </tr>
                        <tr>
                            <th>RAM</th>
                            <td><Link to={`/parts/${computer.ram._id}`}>{computer.ram.name}</Link></td>
                            <td>{computer.ram.capacity}GB RAM</td>
                            <td>{Decimals.calculate(computer.ram.price)}</td>
                            <td><a href={computer.ram.link}>Link</a></td>
                        </tr>
                        <tr>
                            <th>Storage</th>
                            <td><Link to={`/parts/${computer.storage._id}`}>{computer.storage.name}</Link></td>
                            <td>{computer.storage.capacity}GB</td>
                            <td>{Decimals.calculate(computer.storage.price)}</td>
                            <td><a href={computer.storage.link}>Link</a></td>
                        </tr>
                        </tbody>
                    </table>

                    <hr/>

                    {Auth.isAuthenticated() && <ComputerComments
                        handleCommentChange={this.handleCommentChange}
                        handleCommentSubmit={this.handleCommentSubmit}
                        comment={this.state.comment}
                    />}

                </div>
            </div>
        );
    }
}

export default ComputerShow;
