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
    type: 'Case',
    name: 'Fractal Design Node 304',
    image: 'https://www.scan.co.uk/images/products/super/2084488-l-a.jpg',
    size: 0,
    description: 'A small form-factor case with deceptively large potential for accommodating high-end components.',
    price: 75.26,
    link: 'https://www.amazon.co.uk/Fractal-Design-Node-304-Case/dp/B009PIEMUC'
  },
  {
    type: 'Case',
    name: 'Corsair Obsidian 500D',
    image: 'https://i2.wp.com/www.xtremegaminerd.com/wp-content/uploads/2018/03/Corsair-Obsidian-Series-1000D-case.jpg?resize=800%2C600&ssl=1',
    size: 2,
    description: 'This chassis encompasses all the iconic CORSAIR design elements such as beautiful smoked tempered glass, sleek aluminum construction, and an easy access hinged door to satisfy the most discerning builder.',
    price: 127.10,
    link: 'https://www.amazon.co.uk/Corsair-Obsidian-Mid-Tower-Tempered-Aluminium/dp/B074T6691B'
  },
  {
    type: 'Case',
    name: 'NZXT S340',
    image: 'https://images-na.ssl-images-amazon.com/images/I/61sBXjQ93ZL._SL1430_.jpg',
    size: 2,
    description: 'This extremely compact mid tower combines an uncompromising approach to chassis design with pure, minimalist style and everything you need.',
    price: 66.94,
    link: 'https://www.amazon.co.uk/NZXT-CA-S340W-B1-Source-Midi-Tower-Case/dp/B00NGMIBUU/ref=sr_1_3?s=computers&ie=UTF8&qid=1527584034&sr=1-3&keywords=NZXT+S340'
  },
  {
    type: 'Case',
    name: 'Cooler Master MasterBox Lite 3.1',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81Nh1YIm-ZL._SL1500_.jpg',
    size: 1,
    description: 'The MasterBox Lite 3.1 mATX Case is your straightforward option for your PC build that doesn\'t ignore good looks, customization, or performance. A sleek DarkMirror front panel and three custom trim colors (included in the box) offer a great first entry point for customization. Additionally, it comes with an edge to edge transparent acrylic side panel to show your internal components. And with support for up to 3 cooling fans and a watercooling system, we ensure your performance will not suffer.',
    link: 'https://www.amazon.co.uk/Cooler-Master-MasterBox-Computer-MCW-L3B3-KANN-01/dp/B071GDSBMN/ref=sr_1_2?s=computers&ie=UTF8&qid=1527509618&sr=1-2&keywords=micro+atx+case&dpID=419FEX%252BwTeL&preST=_SY300_QL70_&dpSrc=srch',
    price: 38.46
  }
];

xdescribe('Index', () => {
  let wrapper;
  let promise;

  before(done => {
    promise = Promise.resolve({ data: partsData });
    //If axios can't access the data, sinon returns this data:
    sinon.stub(axios, 'get').returns(promise);
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
  it('should display a map', done => {
    promise.then(() => {
      wrapper.update();
      expect(wrapper.find('div.map').length).to.eq(1);
      done();
    });
  });
  it('should display 4 cards', done => {
    promise.then(() => {
      // console.log(wrapper.debug());
      wrapper.find('.buttons').childAt(1).simulate('click');
      wrapper.update();
      // console.log(wrapper.debug());
      expect(wrapper.find('div.card').length).to.eq(partsData.length);
      done();
    });
  });
  it('should display the correct image, name and restaurant for each burger', done => {
    promise.then(() => {
      wrapper.find('.buttons').childAt(1).simulate('click');
      wrapper.update();
      _.orderBy(partsData, 'name', 'asc').forEach((burger, index) => {
        // console.log((wrapper.find('.title').at(index).text()).to.eq(burger.name));
        expect(wrapper.find('.title').at(index).text()).to.eq(burger.name);
        expect(wrapper.find('.card-image').at(index).prop('style').backgroundImage).to.include(burger.image);
      });
    });
    done();
  });
  it('should change the order of the burgers when the sort dropdown is changed', done => {
    promise.then(() => {
      wrapper.find('.buttons').childAt(1).simulate('click');
      wrapper.find('select').simulate('change', { target: { name: 'sort', value: 'name|desc' } });
      wrapper.update();
      _.orderBy(partsData, 'name', 'desc').forEach((burger, index) => {
        // console.log((wrapper.find('.title').at(index).text()).to.eq(burger.name));
        expect(wrapper.find('.title').at(index).text()).to.eq(burger.name);
        expect(wrapper.find('.card-image').at(index).prop('style').backgroundImage).to.include(burger.image);
      });
      done();
    });
  });
  it('should create a link for each burger', done => {
    promise.then(() => {
      wrapper.find('.buttons').childAt(1).simulate('click');
      wrapper.update();
      partsData.forEach(burger => {
        expect(wrapper.find({ href: `/burgers/${burger._id}` }).length).to.eq(1);
      });
      done();
    });
  });
});
