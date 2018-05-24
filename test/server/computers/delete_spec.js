/* global api, describe, it, expect, beforeEach */

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Computer = require('../../../models/computer');
const User = require('../../../models/user');

// let user;
const userData = {
  username: 'test',
  email: 'test@test',
  password: 'test',
  passwordConfirmation: 'test'
};

const caseData = [{
  partType: 'case',
  name: 'Fractal Design Node 304',
  image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
  size: 'Mini-ITX'
},
{
  partType: 'case',
  name: 'Corsair Obsidian 500D',
  image: 'https://www.overclockers.co.uk/media/image/thumbnail/CA23LCS_179016_800x800.jpg',
  size: 'ATX'
}];

const cpuData = [{
  partType: 'cpu',
  name: '6700k',
  image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
  cpuVendor: 'Intel',
  chipset: 'Z170'
},
{
  partType: 'cpu',
  name: '2700X',
  image: 'https://www.notebookcheck.net/fileadmin/_processed_/2/e/csm_AMD_Ryzen_7_2700X_09_6d4f9960ba.jpg',
  cpuVendor: 'AMD',
  chipset: 'AM4'
}];

const gpuData = [{
  partType: 'gpu',
  name: 'GTX 780',
  image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
  gpuVendor: 'Nvidia'
},
{
  partType: 'gpu',
  name: 'RX Vega 64',
  image: 'https://www.overclockers.co.uk/media/image/AMD-Radeon-RX-Vega-Limited-Edition_3.png',
  gpuVendor: 'AMD'
}];

const moboData = [{
  partType: 'mobo',
  name: 'Maximus VIII Impact',
  image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
  size: 'Mini-ITX',
  cpuVendor: 'Intel',
  chipset: 'Z170'
},
{
  partType: 'mobo',
  name: 'Crosshair VII',
  image: 'https://www.asu.com/media/global/products/gURCpzWlZ6L8DGny/P_setting_000_1_90_end_500.png',
  size: 'ATX',
  cpuVendor: 'AMD',
  chipset: 'AM4'
}];

const psuData = [{
  partType: 'psu',
  name: 'EVGA 850W G2',
  image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
  psuSize: 'ATX',
  power: 850
},
{
  partType: 'psu',
  name: 'HX 1000i',
  image: 'https://images-na.ssl-images-amazon.com/images/I/51-7QtHptBL._SX355_.jpg',
  psuSize: 'ATX',
  power: 1000
}];

const ramData =  [{
  partType: 'ram',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
},
{
  partType: 'ram',
  name: 'HyperX Fury',
  image: 'https://sep.yimg.com/ay/outletpc/hyperx-fury-16gb-2-x-8gb-ddr4-2133-ram-desktop-cl14-xmp-black-dimm-288-pin-hx421c14fb2k2-16-memory-kit-69.jpg',
  ramType: 'DDR4',
  capacity: 16
}];


const storageData = [{
  partType: 'storage',
  name: '840 EVO',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
  capacity: 500,
  storageType: 'SSD'
},
{
  partType: 'storage',
  name: 'WD Black',
  image: 'https://images-eu.ssl-images-amazon.com/images/I/41wAdOm-YKL._SL500_AC_SS350_.jpg',
  capacity: 1000,
  storageType: 'HDD'
}];


const computerData = [{
  name: 'My First Computer',
  image: 'https://i.pinimg.com/736x/41/2d/11/412d11b67072b252c757d8d1d3598d15--desktop-computers-gaming.jpg',
  description: 'My very first computer!',
  case: caseData[0],
  cpu: cpuData[0],
  gpu: gpuData[0],
  mobo: moboData[0],
  psu: psuData[0],
  ram: ramData[0],
  storage: storageData[0]
},
{
  name: 'AMD FTW Build',
  image: 'https://cdn.pcpartpicker.com/static/forever/images/userbuild/226205.895856ea92be2b9cff5e36ff70eb2606.1600.jpg',
  description: 'An All AMD Build.',
  case: caseData[1],
  cpu: cpuData[1],
  gpu: gpuData[1],
  mobo: moboData[1],
  psu: psuData[1],
  ram: ramData[1],
  storage: storageData[1]
}];

let computerId;
let token;

xdescribe('DELETE /computers/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Computer.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h'});
      })
      .then(() => Computer.create(computerData))
      .then((computer) => {
        computerId = computer._id;
      })
      .then(() => done());
  });
  it('should return a 401 response without a token', done => {
    api
      .delete(`/api/computers/${computerId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  xit('should return a 204 response with a token', done => {
    api
      .delete(`/api/computers/${computerId}`)
      .set('Authorization', `Bearer ${token}` )
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
});
