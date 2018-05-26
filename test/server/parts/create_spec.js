/* global api, describe, it, expect, beforeEach */

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Part = require('../../../models/part');
const User = require('../../../models/user');

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

let token;

describe('POST /parts', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Part.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
      })
      .then(() => done());
  });
  it('should return a 401 response without a token', done => {
    api
      .post('/api/parts')
      .send(ramData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 201 response with a token', done => {
    api
      .post('/api/parts')
      .set('Authorization', `Bearer ${token}` )
      .send(ramData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('should return a valid part object', done => {
    api
      .post('/api/parts')
      .set('Authorization', `Bearer ${token}`)
      .send(ramData)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string');
        Object.keys(ramData).forEach(field => {
          expect(res.body[field]).to.deep.eq(ramData[field]);
        });
        done();
      });
  });
});
