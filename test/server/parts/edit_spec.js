/* global api, describe, it, expect, beforeEach */

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Burger = require('../../../models/burger');
const User = require('../../../models/user');


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

// let user;
const userData = {
  username: 'test',
  email: 'test@test',
  password: 'test',
  passwordConfirmation: 'test'
};

let burgerId;
let token;

describe('PUT /burgers/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Burger.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
      })
      .then(() => Burger.create(burgerData))
      .then((burger) => {
        burgerId = burger._id;
      })
      .then(() => done());
  });
  it('should return a 401 response without a token', done => {
    api
      .put(`/api/burgers/${burgerId}`)
      .send(burgerData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 200 response with a token', done => {
    api
      .put(`/api/burgers/${burgerId}`)
      .set('Authorization', `Bearer ${token}` )
      .send(burgerData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  // it('should return an object on put request', done => {
  //
  // });
});
