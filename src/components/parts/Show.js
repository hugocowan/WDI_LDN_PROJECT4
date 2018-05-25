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
      .get(`/api/parts/${id}`)
      .then(res => this.setState({ part: res.data }, () => console.log(this.state)));
  }

  handleDelete = () => {
    const { id } = this.props.match.params;
    axios
      .delete(`/api/parts/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/parts'));
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
    const { id } = this.props.match.params;
    axios
      .delete(`/api/parts/${id}/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        this.setState({ part: res.data });
      });
  }

  render(){
    const { part } = this.state;
    if(!part) return null;
    return (
      <div className="columns is-multiline">
        <div className="column is-6">
          <div className="hero-image" style={{ backgroundImage: `url(${part.image})` }} />
          {Auth.isCurrentUser(part.addedBy) && <Link
            to={`/parts/${part._id}/edit`}
            className="button"
          >
            Edit
          </Link>}
          {' '}
          {Auth.isCurrentUser(part.addedBy) && <button
            className="button is-danger"
            onClick={this.handleDelete}
          >
              Delete
          </button>}

          <hr />

          {Auth.isAuthenticated() && <Comments
            handleCommentChange = {this.handleCommentChange}
            handleCommentSubmit = {this.handleCommentSubmit}
            comment = {this.state.comment}
          />}

        </div>
        <div className="column is-6">
          <h1 className="title is-1">{part.name}</h1>
          <h2 className="subtitle is-2">{part.restaurant}</h2>
          <p>{part.description}</p>
          <p className="price">{'💰'.repeat(part.price)}</p>

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
