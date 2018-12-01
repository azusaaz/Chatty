
import React, {Component} from 'react';

class Message extends Component {
  
  render() {

    let newContent = [];
    let tmpContent = this.props.message.content.slice();
    let urlList= tmpContent.match(/(https|http):\/\/[^\s]*\.(jpg|png|gif)/g);
    
    if(urlList){
      //separate url and non-url lines
      let contentBlocks = tmpContent.match(/((https|http):\/\/[^\s]*\.(jpg|png|gif))|([^\s]+)/g);

      contentBlocks.forEach((block, index)=>{       
        let found = false;

        for(let ii =0; ii < urlList.length ; ii++){
          if(block === urlList[ii]){
            newContent.push(<div key={index} style={{margin: '0 -5px', borderRadius: '15px', overflow: 'hidden', border: `5px solid ${this.props.message.ownerColor}`}}><img key={index} src={block}/></div>);

            found = true;
            break;     
          }
        }

        if(!found){
          newContent.push(<span key={index} >{block}&nbsp;</span>);
        }
        
      });

    }else{

     newContent = tmpContent;
    }

    let message =   
          <div className='message'>
            <span className='message-username'  style={{color: this.props.message.ownerColor}}>{this.props.message.username}</span>
            <span className='message-content' ><div className="content-wrapper" style={{backgroundColor: this.props.message.ownerColor, color: 'white'}}>{newContent}</div></span>
          </div>;

    let notification = 
          <div className='message notification'>
            <span className='notification-content' style={{color: this.props.message.ownerColor}}>{this.props.message.content}</span>
          </div>;
    
    if (this.props.message.type === 'incomingNotification') {
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