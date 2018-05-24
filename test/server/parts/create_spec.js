/* global api, describe, it, expect, beforeEach */

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Burger = require('../../../models/burger');
const User = require('../../../models/user');

const userData = {
  username: 'test',
  email: 'test@test',
  password: 'test',
  passwordConfirmation: 'test'
};

const burgerData = {
  name: 'California',
  restaurant: 'Honest Burger',
  address: 'Widegate St, London E1 7HP, UK',
  location: {
    lat: 51.518159,
    lng: -0.078075
  },
  price: 2,
  description: 'Mustard-fried beef, bacon, American cheese, burger sauce, onion, tomato, pickle and lettuce with rosemary salted chips',
  image: 'https://www.honestburgers.co.uk/wp-content/uploads/2018/04/california-page.jpg'
};

let token;

describe('POST /burgers', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Burger.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
      })
      .then(() => done());
  });
  it('should return a 401 response without a token', done => {
    api
      .post('/api/burgers')
      .send(burgerData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 201 response with a token', done => {
    api
      .post('/api/burgers')
      .set('Authorization', `Bearer ${token}` )
      .send(burgerData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('should return a valid burger object', done => {
    api
      .post('/api/burgers')
      .set('Authorization', `Bearer ${token}`)
      .send(burgerData)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string');
        Object.keys(burgerData).forEach(field => {
          expect(res.body[field]).to.deep.eq(burgerData[field]);
        });
        done();
      });
  });
});
