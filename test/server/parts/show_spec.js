/* global api, describe, it, expect, beforeEach */

const Burger = require('../../../models/burger');

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

let burgerId;

describe('GET /burgers/:id', () => {
  beforeEach(done => {
    Burger
      .remove({})
      .then(() => Burger.create(burgerData))
      .then(burger => burgerId = burger._id)
      .then(() => done());
  });
  it('should return a 200 response', done => {
    api
      .get(`/api/burgers/${burgerId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return an object as response body', done => {
    api
      .get(`/api/burgers/${burgerId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should return a valid burger object', done => {
    api
      .get(`/api/burgers/${burgerId}`)
      .end((err, res) => {
        Object.keys(burgerData).forEach(field => {
          expect(res.body[field]).to.deep.eq(burgerData[field]);
        });
        done();
      });
  });
});
