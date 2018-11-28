import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

let messageData = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

class App extends Component {

  constructor(){
     super();
     this.state = {currentUserName: messageData.currentUser.name};
  }

  render() {
    let messages = messageData.messages;
    return (
      <div>
       <nav className="navbar">
         <a href="/" className="navbar-brand">Chatty</a>
       </nav>
      <MessageList messages= {messages} />
      <ChatBar currentUserName = {this.state.currentUserName}/>
      </div>
    );
  }
}
export default App;
