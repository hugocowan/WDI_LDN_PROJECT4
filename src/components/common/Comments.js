import React from 'react';

const Comments = ({ handleCommentChange, handleCommentSubmit, comment }) => {
  return(
    <form onSubmit={handleCommentSubmit}>
      <div className="field">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className="textarea"
          placeholder="Write comments here."
          onChange={handleCommentChange}
          value={comment.content || ''}
        />
      </div>
      <div className="field">
        <label htmlFor="rating">Rating</label>
        <div className="control">
          <div className="select">
            <select
              id="rating"
              name="rating"
              onChange={handleCommentChange}
              value={comment.rating || ''}
            >
              <option>Please select</option>
              <option value="1">⭐️</option>
              <option value="2">⭐️⭐️</option>
              <option value="3">⭐️⭐️⭐️</option>
              <option value="4">⭐️⭐️⭐️⭐️</option>
              <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
            </select>
          </div>
        </div>
      </div>
      <button className="button is-primary">Submit</button>
    </form>
  );
};
export default Comments;
