/* global api, describe, it, expect, beforeEach */

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Part = require('../../../models/part');
const User = require('../../../models/user');

const ramData =  {
  type: 'RAM',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
};

// let user;
const userData = {
  username: 'test',
  email: 'test@test',
  password: 'test',
  passwordConfirmation: 'test'
};

let partId;
let token;

describe('PUT /parts/:id', () => {
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
      .put(`/api/parts/${partId}`)
      .send(ramData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 200 response with a token', done => {
    api
      .put(`/api/parts/${partId}`)
      .set('Authorization', `Bearer ${token}` )
      .send(ramData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
});
