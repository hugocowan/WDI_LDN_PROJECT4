const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');

const Computer = require('../models/computer');
const User = require('../models/user');
const Part = require('../models/part');


mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  let seededUsers = [];
  let seededCases = [];
  let seededCPUs = [];
  let seededGPUs = [];
  let seededMotherboards = [];
  let seededPsus = [];
  let seededRam = [];
  let seededStorage = [];

  User.create([
    {
      username: 'Hugo',
      email: 'h@h',
      password: 'h',
      passwordConfirmation: 'h',
      picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'
    },
    {
      username: 'Alexa',
      email: 'a@a',
      password: 'a',
      passwordConfirmation: 'a',
      picture: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Robot_Emoji_Icon_7070a254-26f7-4a54-8131-560e38e34c2e_large.png?v=1513336430'
    }
  ])
    .then(users => {
      console.log(`${users.length} users created`);
      seededUsers = users;
      // console.log('=====>',seededUsers[0]);
      return Part.create([
        {
          type: 'Case',
          name: 'Fractal Design Node 304',
          image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
          size: 'Mini-ITX',
          createdBy: seededUsers[0],
          description: 'A small form-factor case with deceptively large potential for accommodating high-end components.'
        },
        {
          type: 'Case',
          name: 'Corsair Obsidian 500D',
          image: 'https://www.overclockers.co.uk/media/image/thumbnail/CA23LCS_179016_800x800.jpg',
          size: 'ATX',
          createdBy: seededUsers[1]
        }
      ]);
    })
    .then((chassis) => {
      console.log(`${chassis.length} Cases created`);
      seededCases = chassis;
      return Part.create([
        {
          type: 'CPU',
          name: '6700k',
          image: 'https://ae01.alicdn.com/kf/HTB1V14NNXXXXXXkapXXq6xXFXXXB/Intel-core-Quad-core-I7-6700K-I7-6700K-I7-Processor-LGA-1151-4-40GHz-6M-Level.jpg_640x640.jpg',
          vendorCPU: 'Intel',
          chipset: 'Z170',
          createdBy: seededUsers[0]
        },
        {
          type: 'CPU',
          name: '2700X',
          image: 'https://www.notebookcheck.net/fileadmin/_processed_/2/e/csm_AMD_Ryzen_7_2700X_09_6d4f9960ba.jpg',
          vendorCPU: 'AMD',
          chipset: 'AM4',
          createdBy: seededUsers[1]
        }
      ]);
    })
    .then(cpus => {
      console.log(`${cpus.length} CPUs created`);
      seededCPUs = cpus;
      return Part.create([
        {
          type: 'GPU',
          name: 'GTX 780',
          image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
          createdBy: seededUsers[0],
          vendorGPU: 'Nvidia'
        },
        {
          type: 'GPU',
          name: 'RX Vega 64',
          image: 'https://www.overclockers.co.uk/media/image/AMD-Radeon-RX-Vega-Limited-Edition_3.png',
          createdBy: seededUsers[1],
          vendorGPU: 'AMD'
        }]);
    })
    .then(gpus => {
      console.log(`${gpus.length} GPUs created`);
      seededGPUs = gpus;
      return Part.create([
        {
          type: 'Motherboard',
          name: 'Maximus VIII Impact',
          image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
          size: 'Mini-ITX',
          vendorCPU: 'Intel',
          chipset: 'Z170',
          createdBy: seededUsers[0]
        },
        {
          type: 'Motherboard',
          name: 'Crosshair VII',
          image: 'https://eteknix-eteknixltd.netdna-ssl.com/wp-content/uploads/2017/05/asuscvihero802ac4.jpg',
          size: 'ATX',
          vendorCPU: 'AMD',
          chipset: 'AM4',
          createdBy: seededUsers[1]
        },
        {
          type: 'Motherboard',
          name: 'Maximus VII Impact',
          image: 'https://www.techpowerup.com/img/14-08-11/29e.jpg',
          size: 'ATX',
          vendorCPU: 'AMD',
          chipset: 'Z97',
          createdBy: seededUsers[0],
          description: 'A solid board for Haswell and Broadwell CPUs. Has a true 8-phase VRM design that is more than enough to push your CPU to its limits.'
        }]);
    })
    .then(motherboards => {
      console.log(`${motherboards.length} Motherboards created`);
      seededMotherboards = motherboards;
      return Part.create([
        {
          type: 'PSU',
          name: 'EVGA 850W G2',
          image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
          psuSize: 'ATX',
          power: 850,
          createdBy: seededUsers[0]
        },
        {
          type: 'PSU',
          name: 'HX 1000i',
          image: 'https://images-na.ssl-images-amazon.com/images/I/51-7QtHptBL._SX355_.jpg',
          psuSize: 'ATX',
          power: 1000,
          createdBy: seededUsers[1]
        },
        {
          type: 'PSU',
          name: 'Corsair SF450',
          image: 'https://www.gamersnexus.net/media/k2/items/cache/dcaeef4c16b8a8dd2169c4e6191f97b9_XL.jpg',
          psuSize: 'ATX',
          power: 1000,
          createdBy: seededUsers[1],
          description: 'A dead silent SFX PSU with excellent ripple and efficiency.'
        }]);
    })
    .then(psus => {
      console.log(`${psus.length} power supplies created`);
      seededPsus = psus;
      return Part.create([
        {
          type: 'RAM',
          name: 'Trident Z 3200MHz',
          image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
          ramType: 'DDR4',
          capacity: 8,
          createdBy: seededUsers[0]
        },
        {
          type: 'RAM',
          name: 'HyperX Fury',
          image: 'https://sep.yimg.com/ay/outletpc/hyperx-fury-16gb-2-x-8gb-ddr4-2133-ram-desktop-cl14-xmp-black-dimm-288-pin-hx421c14fb2k2-16-memory-kit-69.jpg',
          ramType: 'DDR4',
          capacity: 16,
          createdBy: seededUsers[1]
        },
        {
          type: 'RAM',
          name: 'Corsair Dominator Platinum',
          image: 'https://i2.wp.com/www.ocdrift.com/wp-content/uploads/2014/08/dom_pt_x4_c.png',
          ramType: 'DDR3',
          capacity: 16,
          createdBy: seededUsers[1],
          description: 'Low latency, high speed DDR3 RAM with a beautiful chrome aesthetic.'
        }]);
    })
    .then(ram => {
      console.log(`${ram.length} sets of RAM created`);
      seededRam = ram;
      return Part.create([
        {
          type: 'Storage',
          name: '840 EVO',
          image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
          capacity: 500,
          storageType: 'SSD',
          createdBy: seededUsers[0]
        },
        {
          type: 'Storage',
          name: 'WD Black',
          image: 'https://images-eu.ssl-images-amazon.com/images/I/41wAdOm-YKL._SL500_AC_SS350_.jpg',
          capacity: 1000,
          storageType: 'HDD',
          createdBy: seededUsers[1]
        }]);
    })
    .then(storage => {
      console.log(`${storage.length} storage devices created`);
      seededStorage = storage;
      return Computer.create([
        {
          type: 'Computer',
          name: 'My First Computer',
          image: 'https://lh3.googleusercontent.com/23y8SXb6j8ynqxJoqnM72bvQ8U2lRUv5Z3HgRgN5CuQrambzqPy61dnePqHzkTrmIcDKf19SrFkYcB4ZmTh6lsK52dtbsZvpQa6i8sufM5CkVyGWAWdPspCMh5qYVHKdV16oqONsrWWhDJXeRS9zIbvueuoT2ouAJbvOwVM-SaWav23kLg6SjrZ3jzxkT-y6sx0un48wmK-c01ZdR8krrPhMOCRpPqviPFHMKqUNUUeRSvFPcY-a4KStlFRUUmdonYKIVK19cI_ndZ5TReYhypmySIi0MpC4eA1oyACUjtvggywmH5aAatwbbeYWxEGMCKQV0fQKwnIFTOgfqQldExrNmlKsIZ0P6JJnKKkpMQCpKTalL-SxGSzR0zOmwJpcRTgZo3c3vFkMgjWp5y3q8cJErMJa3i9GTq2y7tqHd1gIg3ZBfgmzJ92COMKgAZdAJYmWoRj_I_kEqQP6Qh-L1lXmrns_bkMFkcXItlI6T_L5_4rRD8rdoLvCmTadeB4P7NlsVhnVmRnwbl0UGvysHX1oLL0c9Epw3TZB9psT90EjUyfOcS8LencTeDZVJjT7KEVEms_eomKOvHwFRY006NI3Hofvr9n5y5NAv0as8yLTeG2E5f3YTeqIaRKgl8DwWrx3vMaA2r7IJbTlGr04r1sbLyxscke0GxuDamjlEQ=w887-h665-no?.jpg',
          description: 'My very first computer!',
          createdBy: seededUsers[0],
          case: seededCases[0],
          cpu: seededCPUs[0],
          gpu: seededGPUs[0],
          motherboard: seededMotherboards[0],
          psu: seededPsus[0],
          ram: seededRam[0],
          storage: seededStorage[0]
        },
        {
          type: 'Computer',
          name: 'An All AMD Build',
          image: 'https://www.overclockers.co.uk/media/image/thumbnail/FS1BZOG_173795_750x750.jpg',
          description: 'Ryzen and Vega working together in harmony.',
          createdBy: seededUsers[1],
          case: seededCases[1],
          cpu: seededCPUs[1],
          gpu: seededGPUs[1],
          motherboard: seededMotherboards[1],
          psu: seededPsus[1],
          ram: seededRam[1],
          storage: seededStorage[1]
        }]);
    })
    .then(computers => console.log(`${computers.length} Computers created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
