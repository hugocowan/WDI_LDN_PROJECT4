/* global api, describe, it, expect, beforeEach */

const Computer = require('../../../models/computer');

const Case = require('../../../models/parts/case');
const Cpu = require('../../../models/parts/Cpu');
const Gpu = require('../../../models/parts/Gpu');
const Mobo = require('../../../models/parts/Mobo');
const Psu = require('../../../models/parts/psu');
const Ram = require('../../../models/parts/ram');
const Storage = require('../../../models/parts/storage');

const cpuData = [{
  name: '6700k',
  image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
  vendor: 'Intel',
  chipset: 'Z170'
},{
  name: '2700X',
  image: 'https://www.notebookcheck.net/fileadmin/_processed_/2/e/csm_AMD_Ryzen_7_2700X_09_6d4f9960ba.jpg',
  vendor: 'AMD',
  chipset: 'AM4'
}];

const gpuData = [{
  name: 'GTX 780',
  image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg'
},{
  name: 'RX Vega 64',
  image: 'https://www.overclockers.co.uk/media/image/AMD-Radeon-RX-Vega-Limited-Edition_3.png'
}];

const moboData = [{
  name: 'Maximus VIII Impact',
  image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
  size: 'Mini-ITX',
  vendor: 'Intel',
  chipset: 'Z170'
},{
  name: 'Crosshair VII',
  image: 'https://www.asus.com/media/global/products/gURCpzWlZ6L8DGny/P_setting_000_1_90_end_500.png',
  size: 'ATX',
  vendor: 'AMD',
  chipset: 'AM4'
}];

const psuData = [{
  name: 'EVGA 850W G2',
  image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
  size: 'ATX',
  power: 850
},{
  name: 'HX 1000i',
  image: 'https://images-na.ssl-images-amazon.com/images/I/51-7QtHptBL._SX355_.jpg',
  size: 'ATX',
  power: 1000
}];

const ramData =  [{
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  type: 'DDR4',
  capacity: 8
},{
  name: 'HyperX Fury',
  image: 'https://sep.yimg.com/ay/outletpc/hyperx-fury-16gb-2-x-8gb-ddr4-2133-ram-desktop-cl14-xmp-black-dimm-288-pin-hx421c14fb2k2-16-memory-kit-69.jpg',
  type: 'DDR4',
  capacity: 16
}];


const storageData = [{
  name: '840 EVO',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
  capacity: 500,
  type: 'SSD'
},{
  name: 'WD Black',
  image: 'https://images-eu.ssl-images-amazon.com/images/I/41wAdOm-YKL._SL500_AC_SS350_.jpg',
  capacity: 1000,
  type: 'HDD'
}];


const computerData = [{
  name: 'My First Computer',
  image: 'https://i.pinimg.com/736x/41/2d/11/412d11b67072b252c757d8d1d3598d15--desktop-computers-gaming.jpg',
  description: 'My very first computer!',
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
  cpu: cpuData[1],
  gpu: gpuData[1],
  mobo: moboData[1],
  psu: psuData[1],
  ram: ramData[1],
  storage: storageData[1]
}];



describe('GET /computers', () => {
  beforeEach(done => {
    Computer
      .remove({})
      .then(() => {
        Computer.create(computerData);
      })
      .then(() => done());
  });
  it('should return a 200 response', done => {
    api
      .get('/api/computers')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return an array as response body', done => {
    api
      .get('/api/computers')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should return an array of valid computer objects', done => {
    api
      .get('/api/computers')
      .end((err, res) => {
        res.body.forEach((computer, index) => {
          Object.keys(computerData).forEach(field => {
            expect(computer[field]).to.deep.eq(computerData[index][field]);
          });

        });
        done();
      });
  });
});
