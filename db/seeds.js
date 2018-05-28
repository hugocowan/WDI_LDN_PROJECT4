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
    },
    {
      username: 'Rob',
      email: 'r@r',
      password: 'r',
      passwordConfirmation: 'r',
      picture: 'https://www.publicdomainpictures.net/pictures/140000/velka/computer-guy.jpg'
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
          size: 0,
          createdBy: seededUsers[0],
          description: 'A small form-factor case with deceptively large potential for accommodating high-end components.'
        },
        {
          type: 'Case',
          name: 'Corsair Obsidian 500D',
          image: 'https://www.overclockers.co.uk/media/image/thumbnail/CA23LCS_179016_800x800.jpg',
          size: 2,
          createdBy: seededUsers[1]
        },
        {
          type: 'Case',
          name: 'NZXT S340',
          image: 'https://images-na.ssl-images-amazon.com/images/I/61sBXjQ93ZL._SL1430_.jpg',
          size: 2,
          createdBy: seededUsers[2],
          description: 'This extremely compact mid tower combines an uncompromising approach to chassis design with pure, minimalist style and everything you need.'
        },
        {
          type: 'Case',
          name: 'Cooler Master MasterBox Lite 3.1',
          image: 'https://images-na.ssl-images-amazon.com/images/I/81Nh1YIm-ZL._SL1500_.jpg',
          size: 1,
          createdBy: seededUsers[1],
          description: 'The MasterBox Lite 3.1 mATX Case is your straightforward option for your PC build that doesn\'t ignore good looks, customization, or performance. A sleek DarkMirror front panel and three custom trim colors (included in the box) offer a great first entry point for customization. Additionally, it comes with an edge to edge transparent acrylic side panel to show your internal components. And with support for up to 3 cooling fans and a watercooling system, we ensure your performance will not suffer.',
          link: 'https://www.amazon.co.uk/Cooler-Master-MasterBox-Computer-MCW-L3B3-KANN-01/dp/B071GDSBMN/ref=sr_1_2?s=computers&ie=UTF8&qid=1527509618&sr=1-2&keywords=micro+atx+case&dpID=419FEX%252BwTeL&preST=_SY300_QL70_&dpSrc=srch',
          price: 38.46
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
          vendor: 'Intel',
          chipset: 6,
          createdBy: seededUsers[0]
        },
        {
          type: 'CPU',
          name: '2700X',
          image: 'https://www.notebookcheck.net/fileadmin/_processed_/2/e/csm_AMD_Ryzen_7_2700X_09_6d4f9960ba.jpg',
          vendor: 'AMD',
          chipset: 11,
          createdBy: seededUsers[1]
        },
        {
          type: 'CPU',
          name: 'i7 3960X',
          image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Intel_Core_i7-3930k_top_IMGP3915_smial_wp.jpg',
          vendor: 'Intel',
          chipset: 0,
          createdBy: seededUsers[2],
          description: 'An old but solid 6 core, 12 thread CPU.',
          link: 'https://www.amazon.co.uk/Intel-Corei7-3930K-Processor-3-20GHz-SKT2011/dp/B00681D9ZI/ref=pd_lpo_sbs_147_t_0?_encoding=UTF8&psc=1&refRID=NH8SB47HY51V55TXPZPW',
          price: 350
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
          createdBy: seededUsers[0]
        },
        {
          type: 'GPU',
          name: 'RX Vega 64',
          image: 'https://www.overclockers.co.uk/media/image/AMD-Radeon-RX-Vega-Limited-Edition_3.png',
          createdBy: seededUsers[1]
        },
        {
          type: 'GPU',
          name: 'RX 480 Gaming X 8G',
          image: 'https://images-na.ssl-images-amazon.com/images/I/61IViLA3R3L._SL1000_.jpg',
          createdBy: seededUsers[1],
          link: 'https://www.amazon.co.uk/MSI-GAMING-Express-Graphics-Card/dp/B01JGQBMB4/ref=sr_1_1?s=computers&ie=UTF8&qid=1527508853&sr=1-1&dpID=519mvlkVsAL&preST=_SX300_QL70_&dpSrc=srch',
          price: 275
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
          size: 0,
          vendor: 'Intel',
          chipset: 6,
          createdBy: seededUsers[0]
        },
        {
          type: 'Motherboard',
          name: 'Crosshair VII',
          image: 'https://eteknix-eteknixltd.netdna-ssl.com/wp-content/uploads/2017/05/asuscvihero802ac4.jpg',
          size: 2,
          vendor: 'AMD',
          chipset: 11,
          createdBy: seededUsers[1]
        },
        {
          type: 'Motherboard',
          name: 'INTEL X79 Motherboard',
          image: 'https://images-na.ssl-images-amazon.com/images/I/91Vn-xhsOkL._SL1500_.jpg',
          size: 1,
          vendor: 'Intel',
          chipset: 0,
          createdBy: seededUsers[2],
          description: 'An old motherboard I\'m using to make a new system with!',
          link: 'https://www.amazon.co.uk/Motherboard-Chipset-Support-Non-ECC-SATA3-0/dp/B07B63PVVJ/ref=sr_1_1?s=computers&ie=UTF8&qid=1527508148&sr=1-1&keywords=x79+motherboard&dpID=61FL36SRoZL&preST=_SY300_QL70_&dpSrc=srch',
          price: 85.82
        },
        {
          type: 'Motherboard',
          name: 'Maximus VII Impact',
          image: 'https://www.techpowerup.com/img/14-08-11/29e.jpg',
          size: 0,
          vendor: 'Intel',
          chipset: 2,
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
          size: 2,
          power: 850,
          createdBy: seededUsers[0]
        },
        {
          type: 'PSU',
          name: 'HX 1000i',
          image: 'https://images-na.ssl-images-amazon.com/images/I/51-7QtHptBL._SX355_.jpg',
          size: 2,
          power: 1000,
          createdBy: seededUsers[1]
        },
        {
          type: 'PSU',
          name: 'Corsair SF450',
          image: 'https://www.gamersnexus.net/media/k2/items/cache/dcaeef4c16b8a8dd2169c4e6191f97b9_XL.jpg',
          size: 0,
          power: 450,
          createdBy: seededUsers[1],
          description: 'A dead silent SFX PSU with excellent ripple and efficiency.'
        },
        {
          type: 'PSU',
          name: 'Corsair VS650',
          image: 'https://images-na.ssl-images-amazon.com/images/I/81uv9IeA4TL._SL1500_.jpg',
          size: 2,
          power: 650,
          createdBy: seededUsers[2],
          description: 'The Corsair VS series PSU is an ideal choice if you\'re building a home or office system, provides compatibility and reliability. With 0.99 Active Power Factor Correction, you get the peace of mind from knowing that your components are protected from uneven power delivery. And, a dedicated single +12 V rail saves you from the hassle of balancing your components across multiple power cables',
          link: 'https://www.amazon.co.uk/Corsair-CP-9020098-UK-PLUS-Power-Supply/dp/B00PGUSEBG/ref=sr_1_5?s=computers&ie=UTF8&qid=1527509014&sr=1-5&keywords=power+supply&dpID=51jVmSSdsoL&preST=_SY300_QL70_&dpSrc=srch',
          price: 44.98
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
        },
        {
          type: 'RAM',
          name: 'QUMOX 16GB(2x 8GB)',
          image: 'https://images-na.ssl-images-amazon.com/images/I/61rduzcZzVL._SL1000_.jpg',
          ramType: 'DDR3',
          capacity: 16,
          speed: 1600,
          createdBy: seededUsers[2],
          description: 'DDR3. CAS Latency: CL11, Bus Clock: 1600 MHz.',
          link: 'https://www.amazon.co.uk/QUMOX-8GB-1600MHz-PC3-12800-MEMORY/dp/B00W6WEXTO/ref=sr_1_4?s=computers&ie=UTF8&qid=1527509227&sr=1-4&keywords=16gb+ddr3&dpID=51PEFi8hyOL&preST=_SY300_QL70_&dpSrc=srch',
          price: 97
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
        },
        {
          type: 'Storage',
          name: '850 EVO',
          image: 'https://images-na.ssl-images-amazon.com/images/I/61uZrGx1XEL._SL1009_.jpg',
          capacity: 500,
          storageType: 'SSD',
          createdBy: seededUsers[2],
          description: 'Upgrade virtually every aspect of your computer’s performance with Samsung’s 850 EVO, designed with state of the art SSD which includes 3D V-NAND technology. In 840 EVO, you will get three dimensional chip design that enables performance, reliability and high energy efficiency so you can work and play faster and longer than before.',
          link: 'https://www.amazon.co.uk/Samsung-inch-Solid-State-Drive/dp/B00P73B1E4/ref=sr_1_3?s=computers&ie=UTF8&qid=1527509529&sr=1-3&keywords=ssd&dpID=41LDHJHtOnL&preST=_SX300_QL70_&dpSrc=srch',
          price: 107.99
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
        },
        {
          type: 'Computer',
          name: 'Old meets New',
          image: 'https://images-na.ssl-images-amazon.com/images/I/91LH%2BhJAZbL._SL1500_.jpg',
          description: 'Old, perfectly good CPU and motherboard parts used with a modern case and graphics card.',
          createdBy: seededUsers[2],
          case: seededCases[3],
          cpu: seededCPUs[2],
          gpu: seededGPUs[2],
          motherboard: seededMotherboards[2],
          psu: seededPsus[3],
          ram: seededRam[3],
          storage: seededStorage[2]
        }]);
    })
    .then(computers => console.log(`${computers.length} Computers created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
