const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');

const Computer = require('../models/computer');
const User = require('../models/user');


const Case = require('../models/parts/case');
const Cpu = require('../models/parts/Cpu');
const Gpu = require('../models/parts/Gpu');
const Mobo = require('../models/parts/Mobo');
const Psu = require('../models/parts/psu');
const Ram = require('../models/parts/ram');
const Storage = require('../models/parts/storage');


mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  let seededUsers = [];
  let seededCases = [];
  let seededCpus = [];
  let seededGpus = [];
  let seededMobos = [];
  let seededPsus = [];
  let seededRams = [];
  let seededStorages = [];

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
      return Case.create([
        {
          name: 'Fractal Design Node 304',
          image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
          size: 'Mini-ITX',
          addedBy: seededUsers[0]
        },
        {
          name: 'Corsair Obsidian 500D',
          image: 'https://www.overclockers.co.uk/media/image/thumbnail/CA23LCS_179016_800x800.jpg',
          size: 'ATX',
          addedBy: seededUsers[1]
        }
      ]);
    })
    .then((chassis) => {
      console.log(`${chassis.length} cases created`);
      seededCases = chassis;
      return Cpu.create([
        {
          name: '6700k',
          image: 'http://www.kitguru.net/wp-content/uploads/2015/06/intel_core_pentium_devil_s_canyon_lga1150_haswell.jpg',
          vendor: 'Intel',
          chipset: 'Z170',
          addedBy: seededUsers[0]
        },
        {
          name: '2700X',
          image: 'https://www.notebookcheck.net/fileadmin/_processed_/2/e/csm_AMD_Ryzen_7_2700X_09_6d4f9960ba.jpg',
          vendor: 'AMD',
          chipset: 'AM4',
          addedBy: seededUsers[1]
        }
      ]);
    })
    .then(cpus => {
      console.log(`${cpus.length} CPUs created`);
      seededCpus = cpus;
      return Gpu.create(
        {
          name: 'GTX 780',
          image: 'http://www.nvidia.co.uk/gtx-700-graphics-cards/static/img/gallery/780/gtx-780-10.jpg',
          addedBy: seededUsers[0]
        },
        {
          name: 'RX Vega 64',
          image: 'https://www.overclockers.co.uk/media/image/AMD-Radeon-RX-Vega-Limited-Edition_3.png',
          addedBy: seededUsers[1]
        });
    })
    .then(gpus => {
      console.log(`${gpus.length} GPUs created`);
      seededGpus = gpus;
      return Mobo.create(
        {
          name: 'Maximus VIII Impact',
          image: 'https://images10.newegg.com/ProductImage/13-132-638-02.jpg',
          size: 'Mini-ITX',
          vendor: 'Intel',
          chipset: 'Z170',
          addedBy: seededUsers[0]
        },
        {
          name: 'Crosshair VII',
          image: 'https://www.asus.com/media/global/products/gURCpzWlZ6L8DGny/P_setting_000_1_90_end_500.png',
          size: 'ATX',
          vendor: 'AMD',
          chipset: 'AM4',
          addedBy: seededUsers[1]
        });
    })
    .then(mobos => {
      console.log(`${mobos.length} motherboards created`);
      seededMobos = mobos;
      return Psu.create(
        {
          name: 'EVGA 850W G2',
          image: 'https://images.evga.com/products/gallery/png/220-G2-0850-XR_LG_1.png',
          size: 'ATX',
          power: 850,
          addedBy: seededUsers[0]
        },
        {
          name: 'HX 1000i',
          image: 'https://images-na.ssl-images-amazon.com/images/I/51-7QtHptBL._SX355_.jpg',
          size: 'ATX',
          power: 1000,
          addedBy: seededUsers[1]
        });
    })
    .then(psus => {
      console.log(`${psus.length} power supplies created`);
      seededPsus = psus;
      return Ram.create(
        {
          name: 'Trident Z 3200MHz',
          image: 'https://images-na.ssl-images-amazon.com/images/I/71vKio5VaYL._SL1500_.jpg',
          type: 'DDR4',
          capacity: 8
        },
        {
          name: 'HyperX Fury',
          image: 'https://sep.yimg.com/ay/outletpc/hyperx-fury-16gb-2-x-8gb-ddr4-2133-ram-desktop-cl14-xmp-black-dimm-288-pin-hx421c14fb2k2-16-memory-kit-69.jpg',
          type: 'DDR4',
          capacity: 16
        });
    })
    .then(rams => {
      console.log(`${rams.length} sets of RAM created`);
      seededRams = rams;
      return Storage.create(
        {
          name: '840 EVO',
          image: 'https://images-na.ssl-images-amazon.com/images/I/71y1FKz0I9L._SY355_.jpg',
          capacity: 500,
          type: 'SSD'
        },
        {
          name: 'WD Black',
          image: 'https://images-eu.ssl-images-amazon.com/images/I/41wAdOm-YKL._SL500_AC_SS350_.jpg',
          capacity: 1000,
          type: 'HDD'
        }

      );
    })
    .then(storages => {
      console.log(`${storages.length} storage devices created`);
      seededStorages = storages;
      return Computer.create([
        {
          name: 'My First Computer',
          image: 'https://i.pinimg.com/736x/41/2d/11/412d11b67072b252c757d8d1d3598d15--desktop-computers-gaming.jpg',
          description: 'My very first computer!',
          addedBy: seededUsers[0],
          case: seededCases[0],
          cpu: seededCpus[0],
          gpu: seededGpus[0],
          mobo: seededMobos[0],
          psu: seededPsus[0],
          ram: seededRams[0],
          storage: seededStorages[0]
        },
        {
          name: 'AMD FTW Build',
          image: 'https://cdn.pcpartpicker.com/static/forever/images/userbuild/226205.895856ea92be2b9cff5e36ff70eb2606.1600.jpg',
          description: 'An All AMD Build.',
          addedBy: seededUsers[1],
          case: seededCases[1],
          cpu: seededCpus[1],
          gpu: seededGpus[1],
          mobo: seededMobos[1],
          psu: seededPsus[1],
          ram: seededRams[1],
          storage: seededStorages[1]
        }]);
    })
    .then(computers => console.log(`${computers.length} computers created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
