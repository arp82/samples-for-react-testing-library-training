import * as React from 'react';
import  { shallow }  from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import  { MessagesSectionComponent } from './MessagesSection';
import { Button } from '../Button/Button';


describe('Message List component test', () => {
  configure({ adapter: new Adapter() });

  let component, getMessagesSpy;
    
  beforeEach(() => {
    getMessagesSpy = sinon.spy();
    const props = {
      messages: [],
      getMessages : getMessagesSpy,
    };
    component = shallow(< MessagesSectionComponent {...props}/>);
  });

  it('should render message-section div', () =>{
    expect(component.find('.message-section')).toHaveLength(1);
  });

  it('should getMessages be called in ComponentDidMound', () =>{
    expect(getMessagesSpy.calledOnce).toBe(true);
  });
  it('should handle the click event', () =>{
    window.alert = jest.fn();
    expect(typeof component.find(Button).at(0).prop('onClickButton')).toBe('function');
    component.find(Button).at(0).prop('onClickButton')(); 
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
  
});