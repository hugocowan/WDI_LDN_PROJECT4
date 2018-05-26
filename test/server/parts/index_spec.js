/* global api, describe, it, expect, beforeEach */

const Part = require('../../../models/part');

const ramData =  [{
  type: 'RAM',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
},
{
  type: 'RAM',
  name: 'HyperX Fury',
  image: 'https://sep.yimg.com/ay/outletpc/hyperx-fury-16gb-2-x-8gb-ddr4-2133-ram-desktop-cl14-xmp-black-dimm-288-pin-hx421c14fb2k2-16-memory-kit-69.jpg',
  ramType: 'DDR4',
  capacity: 16
}];

describe('GET /parts', () => {
  beforeEach(done => {
    Part
      .remove({})
      .then(() => {
        Part.create(ramData);
      })
      .then(() => done());
  });
  it('should return a 200 response', done => {
    api
      .get('/api/parts')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return an array as response body', done => {
    api
      .get('/api/parts')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should return an array of valid part objects', done => {
    api
      .get('/api/parts')
      .end((err, res) => {
        res.body.forEach((part, index) => {
          Object.keys(ramData).forEach(field => {
            expect(part[field]).to.deep.eq(ramData[index][field]);
          });

        });
        done();
      });
  });
});
