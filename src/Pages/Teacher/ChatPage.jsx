import React, { Component } from "react";

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],

      newMessage: "",

      selectedFile: null,
    };
  }

  handleNewMessageChange = (event) => {
    this.setState({ newMessage: event.target.value });
  };

  handleSelectedFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleSendMessage = () => {
    const { newMessage, selectedFile } = this.state;

    if (newMessage.trim() !== "" || selectedFile) {
      const newMessages = [...this.state.messages];

      if (newMessage.trim() !== "") {
        newMessages.push({
          text: newMessage,
          sender: "user",
          timestamp: new Date(),
        });
      }

      if (selectedFile) {
        newMessages.push({
          file: selectedFile,
          sender: "user",
          timestamp: new Date(),
        });

        this.setState({ selectedFile: null });

        document.getElementById("fileInput").value = "";
      }

      this.setState({
        messages: newMessages,

        newMessage: "",
      });
    }
  };

  handleDeleteMessage = (messageIndex) => {
    const { messages } = this.state;

    const message = messages[messageIndex];

    const currentTime = new Date();

    const timeDifference = (currentTime - message.timestamp) / 1000; // Convert to seconds

    if (timeDifference <= 300) {
      // 300 seconds = 5 minutes

      messages.splice(messageIndex, 1);

      this.setState({ messages });
    }
  };

  handleFileClick = (file) => {
    window.open(URL.createObjectURL(file), "_blank");
  };

  render() {
    const { messages, newMessage } = this.state;

    return (
      <div className="msgContainer">
        <h2 className="msgheading">Chat Page</h2>

        <div className="message-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user-message" : "other-message"
              }`}
              onClick={() => {
                if (message.file) this.handleFileClick(message.file);
              }}
              style={message.file ? { cursor: "pointer" } : {}}
            >
              {message.text && <p>{message.text}</p>}

              {message.file && (
                <p>
                  File: {message.file.name} (
                  {(message.file.size / 1024).toFixed(2)} KB)
                </p>
              )}

              {message.sender === "user" && (
                <button
                  className="delete-button"
                  onClick={() => this.handleDeleteMessage(index)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={this.handleNewMessageChange}
            placeholder="Type a message..."
            className="msgInput"
          />

          <input
            id="fileInput"
            type="file"
            onChange={this.handleSelectedFileChange}
            className="msgInputfile"
          />

          <button className="msgSendButton" onClick={this.handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default ChatPage;
