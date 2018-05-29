/* global api, describe, it, expect, beforeEach */

const Computer = require('../../../models/computer');
const Part = require('../../../models/part');

const partData = [{
  //0
  type: 'Case',
  name: 'Fractal Design Node 304',
  image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
  size: 0
},
//1
{
  type: 'CPU',
  name: '6700k',
  image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
  vendor: 'Intel',
  chipset: 6
},
//2
{
  type: 'GPU',
  name: 'GTX 780',
  image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
  vendor: 'Nvidia'
},
//3
{
  type: 'Motherboard',
  name: 'Maximus VIII Impact',
  image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
  size: 0,
  vendor: 'Intel',
  chipset: 6
},
//4
{
  type: 'PSU',
  name: 'EVGA 850W G2',
  image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
  size: 2,
  power: 850
},
//5
{
  type: 'RAM',
  name: 'Trident Z 3200MHz',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
  ramType: 'DDR4',
  capacity: 8
},
//6
{
  type: 'Storage',
  name: '840 EVO',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
  capacity: 500,
  storageType: 'SSD'
},
//7
{
  type: 'Case',
  name: 'Corsair Obsidian 500D',
  image: 'https://www.overclockers.co.uk/media/image/thumbnail/CA23LCS_179016_800x800.jpg',
  size: 0
},
//8
{
  type: 'CPU',
  name: '2700X',
  image: 'https://www.notebookcheck.net/fileadmin/_processed_/2/e/csm_AMD_Ryzen_7_2700X_09_6d4f9960ba.jpg',
  vendor: 'AMD',
  chipset: 11
},
//9
{
  type: 'GPU',
  name: 'RX Vega 64',
  image: 'https://www.overclockers.co.uk/media/image/AMD-Radeon-RX-Vega-Limited-Edition_3.png',
  vendor: 'AMD'
},
//10
{
  type: 'Motherboard',
  name: 'Crosshair VII',
  image: 'https://www.asu.com/media/global/products/gURCpzWlZ6L8DGny/P_setting_000_1_90_end_500.png',
  size: 2,
  vendor: 'AMD',
  chipset: 11
},
//11
{
  type: 'PSU',
  name: 'HX 1000i',
  image: 'https://images-na.ssl-images-amazon.com/images/I/51-7QtHptBL._SX355_.jpg',
  size: 2,
  power: 1000
},
//12
{
  type: 'RAM',
  name: 'HyperX Fury',
  image: 'https://sep.yimg.com/ay/outletpc/hyperx-fury-16gb-2-x-8gb-ddr4-2133-ram-desktop-cl14-xmp-black-dimm-288-pin-hx421c14fb2k2-16-memory-kit-69.jpg',
  ramType: 'DDR4',
  capacity: 16
},
//13
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
          cpu: parts[1],
          gpu: parts[2],
          motherboard: parts[3],
          psu: parts[4],
          ram: parts[5],
          storage: parts[6]
        },
        {
          ...computerData[1],
          case: parts[7],
          cpu: parts[8],
          gpu: parts[9],
          motherboard: parts[10],
          psu: parts[11],
          ram: parts[12],
          storage: parts[13]
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
