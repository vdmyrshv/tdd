import React from 'react';

import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });


//in TDD red-green testing, start with red tests


// this setup function is used for DRY coding 
// its a factory function to create a shallow wrapper
// @function setup
// @param {object} props - component props specific to this setup
// @param {object} state - initial state for setup
// @returns {shallowWrapper} 

const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props}/>);
  if (state) wrapper.setState(state);
  return wrapper;
}

//this type of documentation is great for remembering what a fn does - called jsdoc

// return shallow wrapper containing node(s) (remember the dom tree!) with given data-test value
// @param {shallowWrapper} shallowWrapper - enzyme shallow wrapper to search within
// @param {string} attr - data-test attribute to search for
// @returns {shallowWrapper} 

const findByTestAttr = (shallowWrapper, attr) => {
  return shallowWrapper.find(`[data-test="${attr}"]`);
};

//good basic test
test('renders without error', () => {
  const wrapper = setup();

  // use a standard naming convention for naming data-test attributes as shown below
  const appComponent = findByTestAttr(wrapper, "component-app");

  //console.log(wrapper.debug())

  expect(appComponent.length).toBe(1);
});

test('renders incrememt button', () => {
  //the returned shallow wrapper should be named for the component i.e. as below, for a button test the returned shallow wrapper is button
  const wrapper = setup();
  //const button = wrapper.find("[data-test='increment-button']");
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  //const counterDisplay = wrapper.find("[data-test='counter-display']");
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const counterStart = wrapper.state('counter');
  expect(counterStart).toBe(0);
});

test('clicking button increments counter display', () => {
  //when writing tests, esp for front end ux components, an important consideration is whether
  //the test checks a change in the component STATE or how it is displayed
  const counter = 7;

  const wrapper = setup(null, { counter });

  //find button and simulate a click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate('click');


  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  //toContain means that the value can be contained in the text, doesnt have to be an exact match
  expect(counterDisplay.text()).toContain(counter + 1);
  // this is an alternate way - but it is testing the STATE, not the displayed value, so less far removed
  // const counterInc = wrapper.state('counter');

  // expect(counterInc).toBe(counter + 1);
  
});

test('clicking button decrements counter display', () => {
  //when writing tests, esp for front end ux components, an important consideration is whether
  //the test checks a change in the component STATE or how it is displayed
  const counter = 7;

  const wrapper = setup(null, { counter });

  //find button and simulate a click
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate('click');


  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  //toContain means that the value can be contained in the text, doesnt have to be an exact match
  expect(counterDisplay.text()).toContain(counter - 1);
  // this is an alternate way - but it is testing the STATE, not the displayed value, so less far removed
  // const counterInc = wrapper.state('counter');

  // expect(counterInc).toBe(counter + 1);
  
});

