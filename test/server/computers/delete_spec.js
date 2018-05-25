/* global api, describe, it, expect, beforeEach */

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Computer = require('../../../models/computer');
const Part = require('../../../models/part');
const User = require('../../../models/user');

const userData = {
  username: 'test',
  email: 'test@test',
  password: 'test',
  passwordConfirmation: 'test'
};

let partData = [{
  type: 'case',
  name: 'Fractal Design Node 304',
  image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
  size: 'Mini-ITX'
}, {
  type: 'cpu',
  name: '6700k',
  image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
  cpuVendor: 'Intel',
  chipset: 'Z170'
}, {
  type: 'gpu',
  name: 'GTX 780',
  image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
  gpuVendor: 'Nvidia'
}, {
  type: 'mobo',
  name: 'Maximus VIII Impact',
  image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
  size: 'Mini-ITX',
  cpuVendor: 'Intel',
  chipset: 'Z170'
}, {
  type: 'psu',
  name: 'EVGA 850W G2',
  image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
  psuSize: 'ATX',
  power: 850
}, {
  type: 'ram',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
}, {
  type: 'storage',
  name: '840 EVO',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
  capacity: 500,
  storageType: 'SSD'
}];

let computerData = {
  name: 'My First Computerlol',
  image: 'https://i.pinimg.com/736x/41/2d/11/412d11b67072b252c757d8d1d3598d15--desktop-computers-gaming.jpg',
  description: 'My very first computer!'
};

let computerId;
let token;

describe('DELETE /computers/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Computer.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        partData = partData.map(part => {
          part.addedBy = user;
          return part;
        });
        computerData.createdBy = user._id;
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
        // console.log('partData: ', partData, 'computerData', computerData);
      })
      .then(() =>  Part.create(partData))
      .then((parts) => {
        return Computer.create({
          ...computerData,
          case: parts.find(part => part.type === 'case')._id,
          cpu: parts.find(part => part.type === 'cpu')._id,
          gpu: parts.find(part => part.type === 'gpu')._id,
          mobo: parts.find(part => part.type === 'mobo')._id,
          psu: parts.find(part => part.type === 'psu')._id,
          ram: parts.find(part => part.type === 'ram')._id,
          storage: parts.find(part => part.type === 'storage')._id
        });
      })
      .then(computer => {
        computerId = computer._id;
        done();
      });
  });
  it('should return a 401 response without a token', done => {
    api
      .delete(`/api/computers/${computerId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/computers/${computerId}`)
      .set('Authorization', `Bearer ${token}` )
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
});
