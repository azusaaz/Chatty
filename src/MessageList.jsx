import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {


  render() {

    let messages = this.props.messages.map((message, i)=>{
        // alert(message);
        return <Message key = {i} message = {message}/>
    });

    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}

export default MessageList;