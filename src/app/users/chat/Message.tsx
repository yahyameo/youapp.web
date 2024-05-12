import React from 'react';
import { format } from 'date-fns';

export interface MessageProps {
    sender: string;
    content: string;
    isCurrentUser: boolean;
    date: string;
}

const Message: React.FC<MessageProps> = ({ sender, content, isCurrentUser, date }) => {
    return (
        <div>
            <div className={isCurrentUser ? "chat_bubble_container outgoing" : " chat_bubble_container incoming"}>
                <div className="chat_bubble">
                    <p>{content}</p>
                    <div>
                        <p><span><small style={{fontSize:"x-small"}}>{format(date, 'MMMM dd, yyyy')}</small></span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
