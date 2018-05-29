import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

import Comments from '../common/Comments';

class PartShow extends React.Component {
  state = {
    comment: {}
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    axios
      .get('/api/parts')
      .then(res => {
        const currentPart = res.data.find(part => part._id === id);
        const comparisonParts = res.data.filter(part =>
          part.ramType ?
            (part.type === currentPart.type &&
            part._id !== id &&
            part.ramType === currentPart.ramType) :
            (part.type === currentPart.type &&
              part._id !== id));
        this.setState({ part: currentPart, parts: comparisonParts }, () =>
          console.log(this.state.part));
      });
  }

  handleDelete = () => {
    const { id } = this.props.match.params;
    axios
      .delete(`/api/parts/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/index'));
  }

  handleCommentChange = ({ target: { name, value } }) => {
    const comment = { ...this.state.comment, [name]: value };
    this.setState({ comment });
  }

  handleCommentSubmit = e => {
    const { id } = this.props.match.params;
    e.preventDefault();
    axios
      .post(`/api/parts/${id}/comments`, this.state.comment, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then((res) => {
        this.setState({ part: res.data, comment: {} });
      });

  }

  handleCommentDelete = (comment) => {
    console.log(this.state);
    const { id } = this.props.match.params;
    axios
      .delete(`/api/parts/${id}/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        console.log(res);
        this.setState({ part: res.data });
      });
  }

  currency = (price) => {
    if(price % 1 === 0){
      return `£${price}.00`;
    }else if(price.toString().split('.')[1].length === 1){
      return `£${price}0`;
    } else return `£${price}`;
  }

  render(){
    const { part } = this.state;
    const { parts } = this.state;

    const sizes = [ 'Mini-ITX', 'Micro-ATX',
      'ATX', 'E-ATX'
    ];

    const chipsets =[ 'X79', 'Z87', 'Z97',
      'FM2+', 'AM3+', 'X99', 'Z170', 'X299',
      'Z270', 'Z370', 'Z390', 'AM4', 'X399'
    ];

    if(!part) return null;

    return (
      <div className="columns is-multiline">
        <div className="column is-6">
          <div className="hero-image" style={{ backgroundImage: `url(${part.image})` }} />
          {Auth.isCurrentUser(part.createdBy) && <Link
            to={`/parts/${part._id}/edit`}
            className="button"
          >
            Edit
          </Link>}
          {' '}
          {Auth.isCurrentUser(part.createdBy) && <button
            className="button is-danger"
            onClick={this.handleDelete}
          >
              Delete
          </button>}
          {' '}
          <a target="_blank" href={part.link} className="button is-info">Where to Buy</a>

          <hr />

          {Auth.isAuthenticated() && <Comments
            handleCommentChange = {this.handleCommentChange}
            handleCommentSubmit = {this.handleCommentSubmit}
            comment = {this.state.comment}
          />}

        </div>
        <div className="column is-6">
          <h1 className="title is-1">{part.name}</h1>
          <h2 className="subtitle is-6">{part.vendor}
            {sizes[part.size]}
            {' '}
            {part.ramType}
            {' '}
            {part.storageType}
            {' '}
            {part.type}</h2>
          <h2 className="subtitle is-6">{part.description}</h2>
          {part.chipset && <h2 className="subtitle is-6">{chipsets[part.chipset]} socket</h2>}
          <p className="subtitle is-6">{this.currency(part.price)}</p>

          {part.type === 'RAM' &&
          <table className="column is-6 table is-striped is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Speed</th>
                <th>Capacity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="currentItem">
                <th>{part.name}</th>
                <th>{part.ramType}</th>
                <th>{part.speed}MHz</th>
                <th>{part.capacity}GB</th>
                <th>{this.currency(part.price)}</th>
              </tr>
              {parts.map(part =>
                <tr key={part._id}>
                  <th>{part.name}</th>
                  <th>{part.ramType}</th>
                  <th>{part.speed}MHz</th>
                  <th>{part.capacity}GB</th>
                  <th>{this.currency(part.price)}</th>
                </tr>)}
            </tbody>
          </table>}
          {part.type === 'GPU' &&
          <table className="column is-6 table is-striped is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Vendor</th>
                <th>Clockspeed</th>
                <th>VRAM</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="currentItem">
                <th>{part.name}</th>
                <th>{part.vendor}</th>
                <th>{part.speed}MHz</th>
                <th>{part.vram}GB</th>
                <th>{this.currency(part.price)}</th>
              </tr>
              {parts.map(part =>
                <tr key={part._id}>
                  <th>{part.name}</th>
                  <th>{part.vendor}</th>
                  <th>{part.speed}MHz</th>
                  <th>{part.vram}GB</th>
                  <th>{this.currency(part.price)}</th>
                </tr>)}
            </tbody>
          </table>}

          <hr />

          {part.comments[0] && part.comments.map(comment =>
            <div className="column is-12" key={comment._id}>
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
      </div>
    );
  }
}
export default PartShow;
