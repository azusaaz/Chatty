import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    // make a message array
    let messages = this.props.messages.map((message, i)=>{
        return <Message key = {i} message = {message}/>
    });

    return (
      <main className='messages'>
        {messages}
      </main>
    );
  }
}

export default MessageList;