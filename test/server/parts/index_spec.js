/* global api, describe, it, expect, beforeEach */

const Part = require('../../../models/part');

// const caseData = [{
//   type: 'case',
//   name: 'Fractal Design Node 304',
//   image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
//   size: 'Mini-ITX'
// },
// {
//   type: 'case',
//   name: 'Corsair Obsidian 500D',
//   image: 'https://www.overclockers.co.uk/media/image/thumbnail/CA23LCS_179016_800x800.jpg',
//   size: 'ATX'
// }];
//
// const cpuData = [{
//   type: 'cpu',
//   name: '6700k',
//   image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
//   cpuVendor: 'Intel',
//   chipset: 'Z170'
// },
// {
//   type: 'cpu',
//   name: '2700X',
//   image: 'https://www.notebookcheck.net/fileadmin/_processed_/2/e/csm_AMD_Ryzen_7_2700X_09_6d4f9960ba.jpg',
//   cpuVendor: 'AMD',
//   chipset: 'AM4'
// }];
//
// const gpuData = [{
//   type: 'gpu',
//   name: 'GTX 780',
//   image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
//   gpuVendor: 'Nvidia'
// },
// {
//   type: 'gpu',
//   name: 'RX Vega 64',
//   image: 'https://www.overclockers.co.uk/media/image/AMD-Radeon-RX-Vega-Limited-Edition_3.png',
//   gpuVendor: 'AMD'
// }];
//
// const moboData = [{
//   type: 'mobo',
//   name: 'Maximus VIII Impact',
//   image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
//   size: 'Mini-ITX',
//   cpuVendor: 'Intel',
//   chipset: 'Z170'
// },
// {
//   type: 'mobo',
//   name: 'Crosshair VII',
//   image: 'https://www.asu.com/media/global/products/gURCpzWlZ6L8DGny/P_setting_000_1_90_end_500.png',
//   size: 'ATX',
//   cpuVendor: 'AMD',
//   chipset: 'AM4'
// }];
//
// const psuData = [{
//   type: 'psu',
//   name: 'EVGA 850W G2',
//   image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
//   psuSize: 'ATX',
//   power: 850
// },
// {
//   type: 'psu',
//   name: 'HX 1000i',
//   image: 'https://images-na.ssl-images-amazon.com/images/I/51-7QtHptBL._SX355_.jpg',
//   psuSize: 'ATX',
//   power: 1000
// }];

const ramData =  [{
  type: 'ram',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
},
{
  type: 'ram',
  name: 'HyperX Fury',
  image: 'https://sep.yimg.com/ay/outletpc/hyperx-fury-16gb-2-x-8gb-ddr4-2133-ram-desktop-cl14-xmp-black-dimm-288-pin-hx421c14fb2k2-16-memory-kit-69.jpg',
  ramType: 'DDR4',
  capacity: 16
}];


// const storageData = [{
//   type: 'storage',
//   name: '840 EVO',
//   image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
//   capacity: 500,
//   storageType: 'SSD'
// },
// {
//   type: 'storage',
//   name: 'WD Black',
//   image: 'https://images-eu.ssl-images-amazon.com/images/I/41wAdOm-YKL._SL500_AC_SS350_.jpg',
//   capacity: 1000,
//   storageType: 'HDD'
// }];

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
