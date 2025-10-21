import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';

const ChatBox = ({
  title = "Some Chat Room",
  lastActive = "0 min ago",
  initialMessages = [],
  currentUser = {
    name: 'My profile',
    pic: 'https://images.unsplash.com/photo-1534135954997-e58fbd6dbbfc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=02d536c38d9cfeb4f35f17fdfaa36619'
  },
  otherUser = {
    name: 'Other profile',
    pic: 'https://images.unsplash.com/photo-1537396123722-b93d0acd8848?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE4NTg5fQ&s=efc6e85c24d3cfdd15cd36cb8a2471ed'
  },
  onSendMessage,
  enableAutoMessages = false,
  placeholder = "Enter your message here..."
}) => {
  const [messages, setMessages] = useState(initialMessages.length > 0 ? initialMessages : [
    { profile: 'other', message: 'Hello!' },
    { profile: 'my', message: 'Hi!' },
    { profile: 'my', message: 'How are you!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [inputHeight, setInputHeight] = useState('40px');
  
  const chatBodyRef = useRef(null);
  const inputRef = useRef(null);
  
  const profiles = {
    my: currentUser,
    other: otherUser
  };

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    const target = e.target;
    target.style.height = '0';
    const newHeight = Math.min(target.scrollHeight + 1, 120);
    target.style.height = newHeight + 'px';
    setInputHeight(newHeight + 'px');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const newMessage = {
      profile: 'my',
      message: inputValue.trim()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setInputHeight('40px');
    
    if (inputRef.current) {
      inputRef.current.style.height = '40px';
    }
    
    if (onSendMessage) {
      onSendMessage(newMessage);
    }
  };

  const addMessage = (profile, message) => {
    const newMessage = { profile, message };
    setMessages(prev => [...prev, newMessage]);
  };

  // Auto messages functionality
  useEffect(() => {
    if (!enableAutoMessages) return;
    
    const autoText = () => {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const randomMessages = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          ];
          
          addMessage('other', randomMessages[Math.floor(Math.random() * 4)]);
          setIsTyping(false);
          autoText();
        }, 3000);
      }, 8000);
    };
    
    const timer = setTimeout(autoText, 3000);
    return () => clearTimeout(timer);
  }, [enableAutoMessages]);

  const renderMessages = () => {
    const rendered = [];
    let lastProfile = null;

    messages.forEach((msg, index) => {
      // Add profile if it's different from the last one
      if (msg.profile !== lastProfile) {
        rendered.push(
          <div key={`profile-${index}`} className={`profile ${msg.profile}-profile`}>
            {msg.profile === 'other' && (
              <>
                <img 
                  src={profiles[msg.profile].pic} 
                  alt={profiles[msg.profile].name}
                  width="30" 
                  height="30" 
                />
                <span>{profiles[msg.profile].name}</span>
              </>
            )}
            {msg.profile === 'my' && (
              <>
                <span>{profiles[msg.profile].name}</span>
                <img 
                  src={profiles[msg.profile].pic} 
                  alt={profiles[msg.profile].name}
                  width="30" 
                  height="30" 
                />
              </>
            )}
          </div>
        );
      }
      
      // Add message
      rendered.push(
        <div key={`message-${index}`} className={`message ${msg.profile}-message`}>
          {msg.message}
        </div>
      );
      
      lastProfile = msg.profile;
    });

    return rendered;
  };

  return (
    <div className="flexbox">
      <div className="chat-box">
        <div className="chat-box-header">
          <h3>{title}<br /><small>Last active: {lastActive}</small></h3>
        </div>
        
        <div className="chat-box-body" ref={chatBodyRef}>
          <div id="chat_messages">
            {renderMessages()}
          </div>
        </div>
        
        <div className={`typing-indicator ${isTyping ? 'active' : ''}`}>
          <div>
            <span></span>
            <span></span>
            <span></span>
            <span className="n">{otherUser.name}</span> is typing...
          </div>
        </div>
        
        <div className="chat-box-footer">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="chat-input"
            style={{ height: inputHeight }}
          />
          <button onClick={sendMessage} className="send-button">
            <svg style={{width:'24px',height:'24px'}} viewBox="0 0 24 24">
              <path fill="#006ae3" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;