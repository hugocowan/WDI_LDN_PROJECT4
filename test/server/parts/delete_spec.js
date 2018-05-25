/* global api, describe, it, expect, beforeEach */

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Part = require('../../../models/part');
const User = require('../../../models/user');

// let user;
const userData = {
  username: 'test',
  email: 'test@test',
  password: 'test',
  passwordConfirmation: 'test'
};

// const caseData = {
//   type: 'case',
//   name: 'Fractal Design Node 304',
//   image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
//   size: 'Mini-ITX'
// };
//
// const cpuData = {
//   type: 'cpu',
//   name: '6700k',
//   image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
//   cpuVendor: 'Intel',
//   chipset: 'Z170'
// };
//
// const gpuData = {
//   type: 'gpu',
//   name: 'GTX 780',
//   image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
//   gpuVendor: 'Nvidia'
// };
//
// const moboData = {
//   type: 'mobo',
//   name: 'Maximus VIII Impact',
//   image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
//   size: 'Mini-ITX',
//   cpuVendor: 'Intel',
//   chipset: 'Z170'
// };
//
// const psuData = {
//   type: 'psu',
//   name: 'EVGA 850W G2',
//   image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
//   psuSize: 'ATX',
//   power: 850
// };

const ramData =  {
  type: 'ram',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
};


// const storageData = {
//   type: 'storage',
//   name: '840 EVO',
//   image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
//   capacity: 500,
//   storageType: 'SSD'
// };

let partId;
let token;

describe('DELETE /parts/:id', () => {
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
      .delete(`/api/parts/${partId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/parts/${partId}`)
      .set('Authorization', `Bearer ${token}` )
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
});
