import React from 'react';
import { addMessage} from '../../redux/actions/MessagesActions'
import { connect } from 'react-redux'
import { Message } from '../../API';
import './MessageForm.less';

interface MessageFormProps {
    messages: Message[],
    addMessage?: (newMessage : Message)  => Promise<void>,
}

interface MessageFormState {
    newMessage: Message
}

export class MessageFormComponent extends React.Component<MessageFormProps, MessageFormState>{
    constructor(props) {
        super(props);

        this.state = {
            newMessage: this.setNewMessage()
        };
    }

    setNewMessage(){
        let newMessage = {
            id: -1,
            subject: '',
            body: '',
        }

        return newMessage;
    }

    handleSubmit(event){
        event.preventDefault();
       let { addMessage } = this.props;
       let { newMessage } = this.state;
       
       addMessage(newMessage);

       const emptyMessage = this.setNewMessage();
       this.setState({
           newMessage: emptyMessage
        })
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let {newMessage} = this.state;

        newMessage[name] = target.value

        this.setState({
          newMessage
        });
    }

    render() {
        let { newMessage } = this.state;

        return (
            <form className="message-form">
                <label htmlFor="subject">Subject</label>
                <input value={newMessage.subject} onChange={(event) => this.handleChange(event)} name='subject' type="text" />
                <label htmlFor="body">Body</label>
                <textarea name="body" value={newMessage.body} onChange={(event) => {this.handleChange(event)}} cols={30} rows={10}></textarea>
                <button onClick={(event) => {this.handleSubmit(event)}}>Send</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      addMessage: (newMessage) => dispatch(addMessage(newMessage))
    }
}

const MessageForm = connect(null, mapDispatchToProps)(MessageFormComponent);
export {MessageForm};