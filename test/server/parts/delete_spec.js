/* global api, describe, it, expect, beforeEach */

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Part = require('../../../models/part');
const User = require('../../../models/user');

// let user;
const userData = {
  username: 'test',
  email: 'test@test',
  password: 'test',
  passwordConfirmation: 'test'
};

const ramData =  {
  type: 'RAM',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
};

let partId;
let token;

describe('DELETE /parts/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Part.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
      })
      .then(() => Part.create(ramData))
      .then((part) => {
        partId = part._id;
      })
      .then(() => done());
  });
  it('should return a 401 response without a token', done => {
    api
      .delete(`/api/parts/${partId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/parts/${partId}`)
      .set('Authorization', `Bearer ${token}` )
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
});
