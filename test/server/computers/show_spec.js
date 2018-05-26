/* global api, describe, it, expect, beforeEach */

const Computer = require('../../../models/computer');

const computerData = {
  type: 'Computer',
  name: 'My First Computer',
  image: 'https://i.pinimg.com/736x/41/2d/11/412d11b67072b252c757d8d1d3598d15--desktop-computers-gaming.jpg',
  description: 'My very first computer!'
};

let computerId;

describe('GET /computers/:id', () => {
  beforeEach(done => {
    Computer
      .remove({})
      .then(() => {
        return Computer.create(computerData);
      })
      .then(computer => computerId = computer._id)
      .then(() => done());
  });
  it('should return a 200 response', done => {
    api
      .get(`/api/computers/${computerId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return an object as response body', done => {
    api
      .get(`/api/computers/${computerId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should return a valid computer object', done => {
    api
      .get(`/api/computers/${computerId}`)
      .end((err, res) => {
        Object.keys(computerData).forEach(field => {
          expect(res.body[field]).to.deep.eq(computerData[field]);
        });
        done();
      });
  });
});
