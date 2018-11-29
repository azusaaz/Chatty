
import React, {Component} from 'react';


class Message extends Component {
  
  render() {
    let message =   
          <div className="message">
            <span className="message-username"  style={{color: this.props.message.ownerColor}}>{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>;

    let notification = 
          <div className="notification">
            <span className="notification-content">{this.props.message.content}</span>
          </div>;
    
    if (this.props.message.type === "incomingNotification") {
       message = notification;
    }

    return ( 
      <div>
        {message} 
      </div>

    );
  }
}


export default Message;