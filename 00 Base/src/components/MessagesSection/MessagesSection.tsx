import React from 'react';
import { MessageForm , MessageList} from '../index';
import { connect } from 'react-redux'
import { getAllMessages } from '../../redux/actions/MessagesActions'
import './MessagesSection.less';

interface MessagesSectionProps{
    getMessages: any,
    messages: any[];
}
interface MessagesSectionState {
    messages: any[];
}
class MessagesSection extends React.Component<MessagesSectionProps, MessagesSectionState> {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount(){
        let messages = this.props.getMessages();
        this.setState({
            messages,
        })
    }
   
    
    render(){
        const { messages }  = this.props;

        return(
            <div className='message-section'>
                <MessageForm  messages={messages}/>
                <MessageList  messages={messages}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
   return{
       messages: state.messages
   }

}

const mapDispatchToProps = dispatch => {
    return {
        getMessages: () => dispatch(getAllMessages())
    }
 
 }

export default connect(mapStateToProps, mapDispatchToProps)(MessagesSection)