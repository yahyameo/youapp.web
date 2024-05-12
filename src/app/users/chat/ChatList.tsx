import React from 'react';
import Message, { MessageProps } from './Message';

interface ChatListProps {
  messages: MessageProps[];
}

const ChatList: React.FC<ChatListProps> = ({ messages }) => {
  return (
    <div className="chat-list">
      {messages.map((message) => (
        <Message key={message.sender + message.content} {...message} />
      ))}
    </div>
  );
};

export default ChatList;
