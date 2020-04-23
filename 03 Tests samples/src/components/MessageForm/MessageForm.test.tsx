import * as React from 'react';
import  { shallow, mount }  from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import  { MessageFormComponent } from './MessageForm';


describe('Message Form component test', () => {
	configure({ adapter: new Adapter() });


	let component, addMessageSpy, truncComponent;
	let event = {
		preventDefault: () => {
		}};


	beforeEach(() => {
		addMessageSpy = sinon.spy();
		const props = {
			messages: [],
			addMessage: addMessageSpy,
		};
		jest.spyOn(event, 'preventDefault');
		component = shallow(< MessageFormComponent {...props}/>);
	});

	it('should render message form properyl', () =>{
		expect(component.find('.message-form')).toHaveLength(1);
		expect(component.find('.message-form label')).toHaveLength(2);
		expect(component.find('.message-form input')).toHaveLength(1);
		expect(component.find('.message-form textarea')).toHaveLength(1);
		expect(component.find('.message-form button')).toHaveLength(1);
	});

	it('should click on component button call add Message', () => {
		component.find('button').simulate('click', event);
		expect(addMessageSpy.calledOnce).toBe(true);
	});

	it('should handleChange change input and textarea values', ()=>{
		const newMessage = component.state().newMessage;
		const inputValue = 'Hello world';
        
		event['target'] = {
			value: inputValue,
			name: 'body',
		};
		component.find('textarea').simulate('change', event);
        
		event['target'].name = 'subject';
		component.find('input').simulate('change', event);

		expect(newMessage.subject).toBe(inputValue);
		expect(newMessage.body).toBe(inputValue);
	});
});