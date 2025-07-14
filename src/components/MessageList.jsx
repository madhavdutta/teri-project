import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import Message from './Message';

const MessageList = () => {
  const { messages } = useContext(ChatContext);

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
