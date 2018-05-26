/* global api, describe, it, expect, beforeEach */

const Computer = require('../../../models/computer');
const Part = require('../../../models/part');

const partData = [{
  type: 'Case',
  name: 'Fractal Design Node 304',
  image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
  size: 'Mini-ITX'
},
{
  type: 'CPU',
  name: '6700k',
  image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
  vendorCPU: 'Intel',
  chipset: 'Z170'
},
{
  type: 'GPU',
  name: 'GTX 780',
  image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
  vendorGPU: 'Nvidia'
},
{
  type: 'Motherboard',
  name: 'Maximus VIII Impact',
  image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
  size: 'Mini-ITX',
  vendorCPU: 'Intel',
  chipset: 'Z170'
},
{
  type: 'PSU',
  name: 'EVGA 850W G2',
  image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
  psuSize: 'ATX',
  power: 850
},
{
  type: 'RAM',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
},
{
  type: 'Storage',
  name: '840 EVO',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
  capacity: 500,
  storageType: 'SSD'
},
{
  type: 'Case',
  name: 'Corsair Obsidian 500D',
  image: 'https://www.overclockers.co.uk/media/image/thumbnail/CA23LCS_179016_800x800.jpg',
  size: 'ATX'
},
{
  type: 'CPU',
  name: '2700X',
  image: 'https://www.notebookcheck.net/fileadmin/_processed_/2/e/csm_AMD_Ryzen_7_2700X_09_6d4f9960ba.jpg',
  vendorCPU: 'AMD',
  chipset: 'AM4'
},
{
  type: 'GPU',
  name: 'RX Vega 64',
  image: 'https://www.overclockers.co.uk/media/image/AMD-Radeon-RX-Vega-Limited-Edition_3.png',
  vendorGPU: 'AMD'
},
{
  type: 'Motherboard',
  name: 'Crosshair VII',
  image: 'https://www.asu.com/media/global/products/gURCpzWlZ6L8DGny/P_setting_000_1_90_end_500.png',
  size: 'ATX',
  vendorCPU: 'AMD',
  chipset: 'AM4'
},
{
  type: 'PSU',
  name: 'HX 1000i',
  image: 'https://images-na.ssl-images-amazon.com/images/I/51-7QtHptBL._SX355_.jpg',
  psuSize: 'ATX',
  power: 1000
},
{
  type: 'RAM',
  name: 'HyperX Fury',
  image: 'https://sep.yimg.com/ay/outletpc/hyperx-fury-16gb-2-x-8gb-ddr4-2133-ram-desktop-cl14-xmp-black-dimm-288-pin-hx421c14fb2k2-16-memory-kit-69.jpg',
  ramType: 'DDR4',
  capacity: 16
},
{
  type: 'Storage',
  name: 'WD Black',
  image: 'https://images-eu.ssl-images-amazon.com/images/I/41wAdOm-YKL._SL500_AC_SS350_.jpg',
  capacity: 1000,
  storageType: 'HDD'
}];


const computerData = [{
  type: 'Computer',
  name: 'My First Computer',
  image: 'https://i.pinimg.com/736x/41/2d/11/412d11b67072b252c757d8d1d3598d15--desktop-computers-gaming.jpg',
  description: 'My very first computer!'
},
{
  type: 'Computer',
  name: 'AMD FTW Build',
  image: 'https://cdn.pcpartpicker.com/static/forever/images/userbuild/226205.895856ea92be2b9cff5e36ff70eb2606.1600.jpg',
  description: 'An All AMD Build.'
}];



describe('GET /computers', () => {
  beforeEach(done => {
    Promise.all([
      Computer.remove({}),
      Part.remove({})
    ])
      .then(() =>  {
        // console.log(partData[0]);
        return Part.create(partData);
      })
      .then((parts) => {
        // console.log('parts: ',parts);
        return Computer.create([{
          ...computerData[0],
          case: parts[0],
          cpu: parts[2],
          gpu: parts[4],
          motherboard: parts[6],
          psu: parts[8],
          ram: parts[10],
          storage: parts[12]
        },
        {
          ...computerData[1],
          case: parts[3],
          cpu: parts[5],
          gpu: parts[7],
          motherboard: parts[9],
          psu: parts[11],
          ram: parts[13],
          storage: parts[15]
        }])
          .then(() => done());
      });
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
