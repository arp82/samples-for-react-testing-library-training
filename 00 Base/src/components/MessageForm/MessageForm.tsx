import React from 'react';
import { addMessage} from '../../redux/actions/MessagesActions'
import { connect } from 'react-redux'
import './MessageForm.less';


interface MessageFormProps {
    messages: any[],
    addMessage: any,
}

interface MessageFormState {
    newMessage: any
}


class MessageForm extends React.Component<MessageFormProps, MessageFormState>{
    constructor(props) {
        super(props);

        this.state = {
            newMessage: this.setNewMessage()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setNewMessage(){
        let newMessage = {
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
                <input value={newMessage.subject} onChange={this.handleChange} name='subject' type="text" />
                <label htmlFor="body">Body</label>
                <textarea name="body" value={newMessage.body} onChange={this.handleChange} cols={30} rows={10}></textarea>
                <button onClick={this.handleSubmit}>Send</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      addMessage: (newMessage) => dispatch(addMessage(newMessage))
    }
}

export default connect(null, mapDispatchToProps)(MessageForm)