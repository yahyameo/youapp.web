import React, { useState } from 'react';
import { Send } from '@geist-ui/icons';
import { connectToWebSocket } from '@/app/utils/socket';
import { getAuthtoken } from '@/app/utils/appUtils';
import { useSearchParams } from 'next/navigation';


const MessageInput: React.FC<{ onMessageSend?: (message: string) => void }> = ({ onMessageSend }) => {
    const [message, setMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };


    const handleSubmit = (event: any) => {
        event.preventDefault();
        onMessageSend && onMessageSend(message);
        setMessage('');
    };

    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <textarea
                className='chat-input'
                value={message}
                onChange={handleChange}
                placeholder="Type your message..."
                onKeyDown={
                    (e) => {
                        if (e.key == 'Enter') {
                            handleSubmit(e);
                        }
                    }
                }
            />
            <button className='send-btn' type="submit"><Send></Send></button>
        </form>
    );
};

export default MessageInput;
