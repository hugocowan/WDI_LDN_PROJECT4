/* global api, describe, it, expect, beforeEach */

const Part = require('../../../models/part');

// const caseData = {
//   partType: 'case',
//   name: 'Fractal Design Node 304',
//   image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
//   size: 'Mini-ITX'
// };
//
// const cpuData = {
//   partType: 'cpu',
//   name: '6700k',
//   image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
//   cpuVendor: 'Intel',
//   chipset: 'Z170'
// };
//
// const gpuData = {
//   partType: 'gpu',
//   name: 'GTX 780',
//   image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
//   gpuVendor: 'Nvidia'
// };
//
// const moboData = {
//   partType: 'mobo',
//   name: 'Maximus VIII Impact',
//   image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
//   size: 'Mini-ITX',
//   cpuVendor: 'Intel',
//   chipset: 'Z170'
// };
//
// const psuData = {
//   partType: 'psu',
//   name: 'EVGA 850W G2',
//   image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
//   psuSize: 'ATX',
//   power: 850
// };
//
// const storageData = {
//   partType: 'storage',
//   name: '840 EVO',
//   image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
//   capacity: 500,
//   storageType: 'SSD'
// };

const ramData =  {
  partType: 'ram',
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
