import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Header from '../components/Header';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});

describe('<Header />', () => {
  it('renders <Header /> component', () => {
    const component = shallow(<Header />);  
    expect(component).toMatchSnapshot();
  });
});