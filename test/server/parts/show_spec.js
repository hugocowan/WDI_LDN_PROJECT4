/* global api, describe, it, expect, beforeEach */

const Part = require('../../../models/part');

const ramData =  {
  type: 'RAM',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
};

let partId;

describe('GET /parts/:id', () => {
  beforeEach(done => {
    Part
      .remove({})
      .then(() => Part.create(ramData))
      .then(part => partId = part._id)
      .then(() => done());
  });
  it('should return a 200 response', done => {
    api
      .get(`/api/parts/${partId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return an object as response body', done => {
    api
      .get(`/api/parts/${partId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should return a valid part object', done => {
    api
      .get(`/api/parts/${partId}`)
      .end((err, res) => {
        Object.keys(ramData).forEach(field => {
          expect(res.body[field]).to.deep.eq(ramData[field]);
        });
        done();
      });
  });
});
