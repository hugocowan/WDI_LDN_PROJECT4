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

// const caseData = [{
//   partType: 'case',
//   name: 'Fractal Design Node 304',
//   image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
//   size: 'Mini-ITX'
// },
// {
//   partType: 'case',
//   name: 'Corsair Obsidian 500D',
//   image: 'https://www.overclockers.co.uk/media/image/thumbnail/CA23LCS_179016_800x800.jpg',
//   size: 'ATX'
// }];
//
// const cpuData = [{
//   partType: 'cpu',
//   name: '6700k',
//   image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
//   cpuVendor: 'Intel',
//   chipset: 'Z170'
// },
// {
//   partType: 'cpu',
//   name: '2700X',
//   image: 'https://www.notebookcheck.net/fileadmin/_processed_/2/e/csm_AMD_Ryzen_7_2700X_09_6d4f9960ba.jpg',
//   cpuVendor: 'AMD',
//   chipset: 'AM4'
// }];
//
// const gpuData = [{
//   partType: 'gpu',
//   name: 'GTX 780',
//   image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
//   gpuVendor: 'Nvidia'
// },
// {
//   partType: 'gpu',
//   name: 'RX Vega 64',
//   image: 'https://www.overclockers.co.uk/media/image/AMD-Radeon-RX-Vega-Limited-Edition_3.png',
//   gpuVendor: 'AMD'
// }];
//
// const moboData = {
//   partType: 'mobo',
//   name: 'Maximus VIII Impact',
//   image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
//   size: 'Mini-ITX',
//   cpuVendor: 'Intel',
//   chipset: 'Z170'
// };

// const psuData = {
//   partType: 'psu',
//   name: 'EVGA 850W G2',
//   image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
//   psuSize: 'ATX',
//   power: 850
// };
//
const ramData =  {
  partType: 'ram',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
};
//
//
// const storageData = {
//   partType: 'storage',
//   name: '840 EVO',
//   image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
//   capacity: 500,
//   storageType: 'SSD'
// };

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
