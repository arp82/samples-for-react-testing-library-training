import * as React from 'react';
import  { shallow }  from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  {MessageList} from './MessageList';

describe('Message List component test', () => {
  configure({ adapter: new Adapter() });

  let component;
    
  beforeEach(() => {
    component = shallow(< MessageList messages={[]}/>);
  });

  it('should render a table', () =>{
    expect(component.find('table')).toHaveLength(1);
  });

  it('should render two  th', () =>{
    expect(component.find('th')).toHaveLength(2);
  });

  it('should render  a thead', () =>{
    expect(component.find('thead')).toHaveLength(1);
  });

  it('should render a tbody', () =>{
    expect(component.find('tbody')).toHaveLength(1);
  });

  it('should render none td', () =>{
    expect(component.find('td')).toHaveLength(0);
  });

  it('should render two td', () => {
    let messages = [
      {
        id: 1,
        subject: 'Hello world',
        body: 'Hello world'
      }
    ];
    component = shallow(< MessageList messages={messages}/>);
    expect(component.find('td')).toHaveLength(2);
  });
});