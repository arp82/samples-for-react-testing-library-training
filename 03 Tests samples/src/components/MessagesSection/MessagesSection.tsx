import React from 'react';

import { MessageForm, MessageList } from '../index';
import { connect } from 'react-redux';
import { getAllMessages } from '../../redux/actions/MessagesActions';
import './MessagesSection.less';
import { Message } from '../../model';
import { Button } from '..';

interface MessagesSectionProps {
	getMessages: () => Promise<void>,
	messages?: Message[];
}

export class MessagesSectionComponent extends React.Component<MessagesSectionProps> {
	static defaultProps = {
		messages: [],
	}

	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			
		};
		
	}

	componentDidMount() {
		this.props.getMessages();
	}
	handleCallAlert(event){
		alert('Hello! I am an alert box!');
		console.log('alert',event);
	}
	render() {
		const { messages } = this.props;

		return (
			<div className="message-section">
				<h1>Messages management sample, deployed</h1>
				<MessageForm messages={messages} />
				<MessageList messages={messages} />
				<div>
					<Button onClickButton={(event) =>{this.handleCallAlert(event);}}></Button>
				</div>
			</div>
			
		);
	}
}

const mapStateToProps = state => {
	return {
		messages: state.messages
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getMessages: () => dispatch(getAllMessages())
	};
};

const MessagesSection = connect(mapStateToProps, mapDispatchToProps)(MessagesSectionComponent);
export { MessagesSection };
