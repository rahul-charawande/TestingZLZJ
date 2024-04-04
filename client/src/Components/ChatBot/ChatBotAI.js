import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";

const SimpleChatbot = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const steps = [
    {
      id: "1",
      message: "Hello, What is your name?",
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "Hi {previousValue}, nice to meet you!",
      end: true,
    },
  ];

  const customHeader = (props) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{props.botName}</span>
      <button onClick={toggleChatbot} className="close-button">
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </div>
  );

  return (
    <div className="chatbot-container">
      {isOpen && (
        <ChatBot
          steps={steps}
          customHeader={customHeader}
          floating={true}
          floatingStyle={{
            right: "20px",
            bottom: "20px",
          }}
        />
      )}
    </div>
  );
};

export default SimpleChatbot;
