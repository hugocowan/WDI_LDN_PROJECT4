/* global describe, it, before, after, beforeEach */
import React from 'react';
import { expect } from 'chai';
//Mount is needed to handle classical components. Lifecycle components and state.
import { mount } from 'enzyme';
import axios from 'axios';
import sinon from 'sinon';
import { MemoryRouter as Router } from 'react-router-dom';
import _ from 'lodash';

import Index from '../../../src/components/common/Index';

const partsData = [
  {
    _id: 1,
    type: 'Case',
    name: 'Fractal Design Node 304',
    image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
    size: 0,
    description: 'A small form-factor case with deceptively large potential for accommodating high-end components.',
    price: 75.26,
    link: 'https://www.amazon.co.uk/Fractal-Design-Node-304-Case/dp/B009PIEMUC'
  },
  {
    _id: 2,
    type: 'Case',
    name: 'Corsair Obsidian 500D',
    image: 'https://i2.wp.com/www.xtremegaminerd.com/wp-content/uploads/2018/03/Corsair-Obsidian-Series-1000D-case.jpg?resize=800%2C600&ssl=1',
    size: 2,
    description: 'This chassis encompasses all the iconic CORSAIR design elements such as beautiful smoked tempered glass, sleek aluminum construction, and an easy access hinged door to satisfy the most discerning builder.',
    price: 127.10,
    link: 'https://www.amazon.co.uk/Corsair-Obsidian-Mid-Tower-Tempered-Aluminium/dp/B074T6691B'
  }
];

const computerData = [
  {
    _id: 5,
    type: 'Computer',
    name: 'An All AMD Build',
    image: 'https://images-na.ssl-images-amazon.com/images/I/91LH%2BhJAZbL._SL1500_.jpg',
    description: 'Ryzen and Vega working together in harmony.',
    createdBy: {
      username: 'Hugo',
      email: 'h@h',
      password: 'h',
      passwordConfirmation: 'h',
      picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'
    },
    case: {
      _id: 6,
      type: 'Case',
      name: 'Corsair Obsidian 500D',
      image: 'https://i2.wp.com/www.xtremegaminerd.com/wp-content/uploads/2018/03/Corsair-Obsidian-Series-1000D-case.jpg?resize=800%2C600&ssl=1',
      size: 2,
      createdBy: {
        username: 'Hugo',
        email: 'h@h',
        password: 'h',
        passwordConfirmation: 'h',
        picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'
      },
      description: 'This chassis encompasses all the iconic CORSAIR design elements such as beautiful smoked tempered glass, sleek aluminum construction, and an easy access hinged door to satisfy the most discerning builder.',
      price: 127.10,
      link: 'https://www.amazon.co.uk/Corsair-Obsidian-Mid-Tower-Tempered-Aluminium/dp/B074T6691B'
    },
    cpu: {
      _id: 7,
      type: 'CPU',
      name: '2700X',
      image: 'https://www.notebookcheck.net/fileadmin/_processed_/2/e/csm_AMD_Ryzen_7_2700X_09_6d4f9960ba.jpg',
      vendor: 'AMD',
      speed: 4.3,
      chipset: 11,
      createdBy: {
        username: 'Hugo',
        email: 'h@h',
        password: 'h',
        passwordConfirmation: 'h',
        picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'
      },
      description: 'An 8 core 16 thread beast of a processor that clocks up to 4.2GHz all by itself.',
      link: 'https://www.amazon.co.uk/AMD-Ryzen-8-Core-Wraith-Cooler/dp/B07B428M7F/ref=sr_1_1?s=computers&ie=UTF8&qid=1527584114&sr=1-1&keywords=2700x&dpID=41N0skoNQBL&preST=_SX300_QL70_&dpSrc=srch',
      price: 274.99
    },
    gpu: {
      _id: 8,
      type: 'GPU',
      name: 'Gigabyte RX Vega 64',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61PLpwa3daL._SL1000_.jpg',
      createdBy: {
        username: 'Hugo',
        email: 'h@h',
        password: 'h',
        passwordConfirmation: 'h',
        picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'
      },
      description: 'Excellent for heavy compute workloads, plus you can make your money back thanks to cryptocurrency mining!',
      vram: 8,
      speed: 1546,
      vendor: 'AMD',
      link: 'https://www.amazon.co.uk/Gigabyte-Radeon-Vega-Graphics-Card/dp/B078KM88CX/ref=sr_1_2?s=computers&ie=UTF8&qid=1527584265&sr=1-2&keywords=rx+vega+64&dpID=51RKpJviZ4L&preST=_SY300_QL70_&dpSrc=srch',
      price: 548.99
    },
    motherboard: {
      _id: 9,
      type: 'Motherboard',
      name: 'Crosshair VII Hero',
      image: 'https://eteknix-eteknixltd.netdna-ssl.com/wp-content/uploads/2017/05/asuscvihero802ac4.jpg',
      size: 2,
      vendor: 'AMD',
      chipset: 11,
      createdBy: {
        username: 'Hugo',
        email: 'h@h',
        password: 'h',
        passwordConfirmation: 'h',
        picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'
      },
      description: 'A 10 phase motherboard that can handle even LN2 overclocking with a breeze.',
      link: 'https://www.amazon.co.uk/ASUS-X470-ROG-CROSSHAIR-HERO/dp/B07CG2V6ZD/ref=sr_1_2?s=computers&ie=UTF8&qid=1527584423&sr=1-2&keywords=crosshair+vii&dpID=51xwbZAXDNL&preST=_SY300_QL70_&dpSrc=srch',
      price: 261.76
    },
    psu: {
      _id: 10,
      type: 'PSU',
      name: 'HX 1000',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81I02GY0-UL._SL1500_.jpg',
      size: 2,
      power: 1000,
      createdBy: {
        username: 'Hugo',
        email: 'h@h',
        password: 'h',
        passwordConfirmation: 'h',
        picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'
      },
      link: 'https://www.amazon.co.uk/Corsair-CP-9020074-UK-Certified-Thermally-Controlled/dp/B071XV8P6F/ref=sr_1_1?s=computers&ie=UTF8&qid=1527584646&sr=1-1&keywords=corsair%2Bhx1000i&th=1',
      price: 171.12,
      description: 'Corsair’s HX Series power supplies give you extremely tight voltage regulation, virtually silent operation, and a fully modular cable set. With all Japanese 105°C capacitors, they’re a great choice for high performance PCs where reliability is essential. 80 PLUS Platinum efficiency reduces operating cost and excess heat, and together with the fluid dynamic bearing fan and Zero RPM Fan Mode technology, gives you virtually silent operation.'
    },
    ram: {
      _id: 11,
      type: 'RAM',
      name: 'HyperX Fury',
      image: 'https://sep.yimg.com/ay/outletpc/hyperx-fury-16gb-2-x-8gb-ddr4-2133-ram-desktop-cl14-xmp-black-dimm-288-pin-hx421c14fb2k2-16-memory-kit-69.jpg',
      ramType: 'DDR4',
      capacity: 8,
      speed: 2400,
      createdBy: {
        username: 'Hugo',
        email: 'h@h',
        password: 'h',
        passwordConfirmation: 'h',
        picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'
      },
      link: 'https://www.amazon.co.uk/HyperX-HX424C15FBK2-Memory-Skylake-Ready/dp/B013H7Q86C/ref=sr_1_2?s=computers&ie=UTF8&qid=1527584907&sr=1-2&keywords=hyperx+fury+ddr4&dpID=41dIGpq6FsL&preST=_SY300_QL70_&dpSrc=srch',
      price: 161.46,
      description: 'Affordable DDR4 kit that gives an acceptable capacity for today\'s workloads.'
    },
    storage: {
      _id: 12,
      type: 'Storage',
      name: 'WD Black',
      image: 'https://images-eu.ssl-images-amazon.com/images/I/41wAdOm-YKL._SL500_AC_SS350_.jpg',
      capacity: 1000,
      storageType: 'HDD',
      createdBy: {
        username: 'Hugo',
        email: 'h@h',
        password: 'h',
        passwordConfirmation: 'h',
        picture: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'
      },
      description: '1TB WD Black WD1003FZEX, 3.5" HDD, SATA III - 6Gb/s, 7200rpm, 64MB Cache; For Creatives, Enthusiasts & Gamers; 1TB WD BLACK is Smarter than the Average Drive',
      link: 'https://www.amazon.co.uk/WD-TB-Performance-Hard-Drive/dp/B00FJRS6FU',
      price: 65.10
    }
  },
  {
    _id: 13,
    type: 'Computer',
    name: 'Old meets New',
    image: 'https://cdn.pcpartpicker.com/static/forever/images/userbuild/195398.1dea42a2497146f3874b2e9707bff094.1600.jpg',
    description: 'Old, perfectly good CPU and motherboard parts used with a modern case and graphics card.',
    createdBy: {
      username: 'Alexa',
      email: 'a@a',
      password: 'a',
      passwordConfirmation: 'a',
      picture: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Robot_Emoji_Icon_7070a254-26f7-4a54-8131-560e38e34c2e_large.png?v=1513336430'
    },
    case: {
      _id: 14,
      type: 'Case',
      name: 'NZXT S340',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61sBXjQ93ZL._SL1430_.jpg',
      size: 2,
      createdBy: {
        username: 'Alexa',
        email: 'a@a',
        password: 'a',
        passwordConfirmation: 'a',
        picture: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Robot_Emoji_Icon_7070a254-26f7-4a54-8131-560e38e34c2e_large.png?v=1513336430'
      },
      description: 'This extremely compact mid tower combines an uncompromising approach to chassis design with pure, minimalist style and everything you need.',
      price: 66.94,
      link: 'https://www.amazon.co.uk/NZXT-CA-S340W-B1-Source-Midi-Tower-Case/dp/B00NGMIBUU/ref=sr_1_3?s=computers&ie=UTF8&qid=1527584034&sr=1-3&keywords=NZXT+S340'
    },
    cpu: {
      _id: 15,
      type: 'CPU',
      name: 'i7 3960X',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Intel_Core_i7-3930k_top_IMGP3915_smial_wp.jpg',
      vendor: 'Intel',
      speed: 3.9,
      chipset: 0,
      createdBy: {
        username: 'Alexa',
        email: 'a@a',
        password: 'a',
        passwordConfirmation: 'a',
        picture: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Robot_Emoji_Icon_7070a254-26f7-4a54-8131-560e38e34c2e_large.png?v=1513336430'
      },
      description: 'An old but solid 6 core, 12 thread CPU.',
      link: 'https://www.amazon.co.uk/Intel-Corei7-3930K-Processor-3-20GHz-SKT2011/dp/B00681D9ZI/ref=pd_lpo_sbs_147_t_0?_encoding=UTF8&psc=1&refRID=NH8SB47HY51V55TXPZPW',
      price: 350
    },
    gpu: {
      _id: 16,
      type: 'GPU',
      name: 'RX 480 Gaming X 8G',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61IViLA3R3L._SL1000_.jpg',
      createdBy: {
        username: 'Alexa',
        email: 'a@a',
        password: 'a',
        passwordConfirmation: 'a',
        picture: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Robot_Emoji_Icon_7070a254-26f7-4a54-8131-560e38e34c2e_large.png?v=1513336430'
      },
      description: 'A solid card for 1080p or even 1440p gaming. One of AMD\'s best price/performance cards, even now.',
      vram: 8,
      speed: 1316,
      vendor: 'AMD',
      link: 'https://www.amazon.co.uk/MSI-GAMING-Express-Graphics-Card/dp/B01JGQBMB4/ref=sr_1_1?s=computers&ie=UTF8&qid=1527508853&sr=1-1&dpID=519mvlkVsAL&preST=_SX300_QL70_&dpSrc=srch',
      price: 275
    },
    motherboard: {
      _id: 17,
      type: 'Motherboard',
      name: 'INTEL X79 Motherboard',
      image: 'https://images-na.ssl-images-amazon.com/images/I/91Vn-xhsOkL._SL1500_.jpg',
      size: 1,
      vendor: 'Intel',
      chipset: 0,
      createdBy: {
        username: 'Alexa',
        email: 'a@a',
        password: 'a',
        passwordConfirmation: 'a',
        picture: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Robot_Emoji_Icon_7070a254-26f7-4a54-8131-560e38e34c2e_large.png?v=1513336430'
      },
      description: 'An old motherboard I\'m using to make a new system with!',
      link: 'https://www.amazon.co.uk/Motherboard-Chipset-Support-Non-ECC-SATA3-0/dp/B07B63PVVJ/ref=sr_1_1?s=computers&ie=UTF8&qid=1527508148&sr=1-1&keywords=x79+motherboard&dpID=61FL36SRoZL&preST=_SY300_QL70_&dpSrc=srch',
      price: 85.82
    },
    psu: {
      _id: 18,
      type: 'PSU',
      name: 'Corsair VS650',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81uv9IeA4TL._SL1500_.jpg',
      size: 2,
      power: 650,
      createdBy: {
        username: 'Alexa',
        email: 'a@a',
        password: 'a',
        passwordConfirmation: 'a',
        picture: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Robot_Emoji_Icon_7070a254-26f7-4a54-8131-560e38e34c2e_large.png?v=1513336430'
      },
      description: 'The Corsair VS series PSU is an ideal choice if you\'re building a home or office system, provides compatibility and reliability. With 0.99 Active Power Factor Correction, you get the peace of mind from knowing that your components are protected from uneven power delivery. And, a dedicated single +12 V rail saves you from the hassle of balancing your components across multiple power cables',
      link: 'https://www.amazon.co.uk/Corsair-CP-9020098-UK-PLUS-Power-Supply/dp/B00PGUSEBG/ref=sr_1_5?s=computers&ie=UTF8&qid=1527509014&sr=1-5&keywords=power+supply&dpID=51jVmSSdsoL&preST=_SY300_QL70_&dpSrc=srch',
      price: 44.98
    },
    ram: {
      _id: 19,
      type: 'RAM',
      name: 'QUMOX 16GB(2x 8GB)',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61rduzcZzVL._SL1000_.jpg',
      ramType: 'DDR3',
      capacity: 16,
      speed: 1600,
      createdBy: {
        username: 'Alexa',
        email: 'a@a',
        password: 'a',
        passwordConfirmation: 'a',
        picture: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Robot_Emoji_Icon_7070a254-26f7-4a54-8131-560e38e34c2e_large.png?v=1513336430'
      },
      description: 'DDR3. CAS Latency: CL11, Bus Clock: 1600 MHz. Affordable.',
      link: 'https://www.amazon.co.uk/QUMOX-8GB-1600MHz-PC3-12800-MEMORY/dp/B00W6WEXTO/ref=sr_1_4?s=computers&ie=UTF8&qid=1527509227&sr=1-4&keywords=16gb+ddr3&dpID=51PEFi8hyOL&preST=_SY300_QL70_&dpSrc=srch',
      price: 97
    },
    storage: {
      _id: 20,
      type: 'Storage',
      name: '850 EVO',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61uZrGx1XEL._SL1009_.jpg',
      capacity: 500,
      storageType: 'SSD',
      createdBy: {
        username: 'Alexa',
        email: 'a@a',
        password: 'a',
        passwordConfirmation: 'a',
        picture: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Robot_Emoji_Icon_7070a254-26f7-4a54-8131-560e38e34c2e_large.png?v=1513336430'
      },
      description: 'Upgrade virtually every aspect of your computer’s performance with Samsung’s 850 EVO, designed with state of the art SSD which includes 3D V-NAND technology. In 840 EVO, you will get three dimensional chip design that enables performance, reliability and high energy efficiency so you can work and play faster and longer than before.',
      link: 'https://www.amazon.co.uk/Samsung-inch-Solid-State-Drive/dp/B00P73B1E4/ref=sr_1_3?s=computers&ie=UTF8&qid=1527509529&sr=1-3&keywords=ssd&dpID=41LDHJHtOnL&preST=_SX300_QL70_&dpSrc=srch',
      price: 107.99
    }
  }
];

describe('Index', () => {
  let wrapper;
  let promise1;
  let promise2;

  before(done => {
    // promise = new Promise(function(resolve, reject) {
    //   resolve(1);
    // });
    // promise.then(() => {
    //   return({ data: partsData });
    // }).then(() => {
    //   return({ data: computerData });
    // });

    promise1 = Promise.resolve({ data: partsData });
    promise2 = Promise.resolve({ data: computerData });

    //If axios can't access the data, sinon returns this data:
    const stub = sinon.stub(axios, 'get');
    stub.withArgs('/api/parts').returns(promise1);
    stub.withArgs('/api/computers').returns(promise2);

    done();
  });
  after(done => {
    axios.get.restore();
    done();
  });
  beforeEach(done => {
    wrapper = mount(
      <Router>
        <Index />
      </Router>
    );
    done();
  });
  it('should display 4 cards', done => {
    Promise.all([promise1, promise2]).then(() => {
      setTimeout(() => {
        wrapper.update();
        // console.log(wrapper.debug());
        expect(wrapper.find('div.card').length).to.eq(partsData.length);
        done();
      }, 1000);
    });
  });
  xit('should display the correct image, name and restaurant for each part', done => {
    promise.then(() => {
      wrapper.find('.buttons').childAt(1).simulate('click');
      wrapper.update();
      _.orderBy(partsData, 'name', 'asc').forEach((part, index) => {
        // console.log((wrapper.find('.title').at(index).text()).to.eq(part.name));
        expect(wrapper.find('.title').at(index).text()).to.eq(part.name);
        expect(wrapper.find('.card-image').at(index).prop('style').backgroundImage).to.include(part.image);
      });
    });
    done();
  });
  xit('should change the order of the parts when the sort dropdown is changed', done => {
    promise.then(() => {
      wrapper.find('.buttons').childAt(1).simulate('click');
      wrapper.find('select').simulate('change', { target: { name: 'sort', value: 'name|desc' } });
      wrapper.update();
      _.orderBy(partsData, 'name', 'desc').forEach((part, index) => {
        // console.log((wrapper.find('.title').at(index).text()).to.eq(part.name));
        expect(wrapper.find('.title').at(index).text()).to.eq(part.name);
        expect(wrapper.find('.card-image').at(index).prop('style').backgroundImage).to.include(part.image);
      });
      done();
    });
  });
  xit('should create a link for each part', done => {
    promise.then(() => {
      wrapper.find('.buttons').childAt(1).simulate('click');
      wrapper.update();
      partsData.forEach(part => {
        expect(wrapper.find({ href: `/parts/${part._id}` }).length).to.eq(1);
      });
      done();
    });
  });
});
