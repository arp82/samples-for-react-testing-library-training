import React from 'react';
import './MessageList.less'

interface MessageListProps {
    messages: any[];
}

class MessageList extends React.Component<MessageListProps> {
    constructor(props) {
        super(props);
    }


    render() {
        const { messages } = this.props;

        return (
            <table className="messages-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {
                            messages.map( message => {
                                return (
                                    <tr key={message.id}>
                                        <td>{message.subject}</td>
                                        <td>{message.body}</td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
        );
    }
}


export default MessageList