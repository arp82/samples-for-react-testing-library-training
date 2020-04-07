import React from 'react';
import { Message } from '../../API';
import './MessageList.less'

interface MessageListProps {
    messages: Message[],
}

export const MessageList  = (props : MessageListProps) => {
    return (<table className="messages-table">
        <thead>
            <tr>
                <th>Subject</th>
                <th>Body</th>
            </tr>
        </thead>
        <tbody>
            {props.messages.map(message => {
                return (<tr key={message.id}>
                    <td>{message.subject}</td>
                    <td>{message.body}</td>
                </tr>);
            })}
        </tbody>
    </table>);
}