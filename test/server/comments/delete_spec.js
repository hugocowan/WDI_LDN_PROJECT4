/* global api, describe, it, expect, beforeEach */

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Computer = require('../../../models/computer');
const Part = require('../../../models/part');
const Comment = require('../../../models/comment');
const User = require('../../../models/user');

const userData = {
  username: 'test',
  email: 'test@test',
  password: 'test',
  passwordConfirmation: 'test'
};

const computerData = {
  name: 'My First Computer',
  image: 'https://i.pinimg.com/736x/41/2d/11/412d11b67072b252c757d8d1d3598d15--desktop-computers-gaming.jpg',
  description: 'My very first computer!'
};

const partData =  {
  type: 'ram',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
};

const commentData = {
  content: 'This is a very interesting thing and I like it.',
  rating: 4
};

let token;
let computerId;
let commentId;
let partId;

describe('DELETE /computers/:id/comments/:commentId', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Computer.remove({}),
      Comment.remove({}),
      Part.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        partData.addedBy = user._id;
        computerData.createdBy = user._id;
        commentData.createdBy = user._id;
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
        // console.log('partData: ', partData, 'computerData', computerData);
      })
      .then(() => Computer.create({
        ...computerData
      }))
      .then(computer => {
        computerId = computer._id;
      })
      .then(() => Comment.create({
        ...commentData
      }))
      .then(comment => {
        commentId = comment._id;
      })
      .then(() => Part.create({
        ...partData
      }))
      .then(part => {
        partId = part._id;
        done();
      });
  });
  it('deleting computer comment should return a 401 response without a token', done => {
    api
      .delete(`/api/computers/${computerId}/comments/${commentId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('deleting computer comment should return a 204 response with a token', done => {
    api
      .delete(`/api/computers/${computerId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}` )
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
  it('deleting part comment should return a 401 response without a token', done => {
    api
      .delete(`/api/parts/${partId}/comments/${commentId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('deleting part comment should return a 204 response with a token', done => {
    api
      .delete(`/api/parts/${partId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}` )
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
});
