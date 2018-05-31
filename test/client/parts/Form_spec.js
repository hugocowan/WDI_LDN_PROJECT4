/* global describe, it */
import React from 'react';
import { expect } from 'chai';
//allows us to create and change things without worrying about state or functional components:
import { shallow } from 'enzyme';

import PartForm from '../../../src/components/parts/PartForm';

describe('PartForm', () => {
  it('should render 1 select, 4 input fields and 1 text area.', done => {
    const state = {
      errors: {}
    };
    const component = shallow(<PartForm part={state} errors={state.errors} />);
    expect(component.find('input').length).to.eq(4);
    expect(component.find('select').length).to.eq(1);
    expect(component.find('textarea').length).to.eq(1);
    done();
  });
  it('should populate the form', done => {
    const state={
      type: 'CPU',
      name: 'name',
      image: 'image',
      link: 'link',
      price: 1,
      description: 'description',
      errors: {}
    };
    const component = shallow(<PartForm part={state} errors={state.errors} />);
    //component.find checks to see if there are tags, values etc in the component.
    expect(component.find({ value: 'CPU', name: 'type' }).length).to.eq(1);
    expect(component.find({ value: 'name', name: 'name' }).length).to.eq(1);
    expect(component.find({ value: 'image', name: 'image' }).length).to.eq(1);
    expect(component.find({ value: 'link', name: 'link' }).length).to.eq(1);
    expect(component.find({ value: 1, name: 'price' }).length).to.eq(1);
    expect(component.find({ value: 'description', name: 'description' }).length).to.eq(1);
    done();
  });
  it('should display errors', done => {
    const state = {
      errors: {
        type: 'Part type is required.',
        name: 'A name is required',
        image: 'An image is required.',
        link: 'A link to a reseller is required.',
        price: 'Part price is required.'
      }
    };
    const component = shallow(<PartForm part={state} errors={state.errors} />);
    expect(component.find('.error').length).to.eq(5);
    done();
  });
});
