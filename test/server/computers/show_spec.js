/* global api, describe, it, expect, beforeEach */

const Computer = require('../../../models/computer');
const Part = require('../../../models/part');

const partData = [{
  type: 'Case',
  name: 'Fractal Design Node 304',
  image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
  size: 0
}, {
  type: 'CPU',
  name: '6700k',
  image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
  vendor: 'Intel',
  chipset: 6
}, {
  type: 'GPU',
  name: 'GTX 780',
  image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
  vendor: 'Nvidia'
}, {
  type: 'Motherboard',
  name: 'Maximus VIII Impact',
  image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
  size: 0,
  vendor: 'Intel',
  chipset: 6
}, {
  type: 'PSU',
  name: 'EVGA 850W G2',
  image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
  size: 2,
  power: 850
}, {
  type: 'RAM',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
}, {
  type: 'Storage',
  name: '840 EVO',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
  capacity: 500,
  storageType: 'SSD'
}];

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
      .then(() =>  Part.create(partData))
      .then((parts) => {
        return Computer.create({
          ...computerData,
          case: parts.find(part => part.type === 'Case')._id,
          cpu: parts.find(part => part.type === 'CPU')._id,
          gpu: parts.find(part => part.type === 'GPU')._id,
          motherboard: parts.find(part => part.type === 'Motherboard')._id,
          psu: parts.find(part => part.type === 'PSU')._id,
          ram: parts.find(part => part.type === 'RAM')._id,
          storage: parts.find(part => part.type === 'Storage')._id
        });
      })
      .then(computer => {
        computerId = computer._id;
        done();
      });
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
