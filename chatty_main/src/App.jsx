import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(){
     super();
     this.colorList = ['#6b5b95', '#feb236', '#d64161', '#ff7b25', '#48CACE', '#48CE8D', '#C3D345', '#96439E'];
     this.state = {
       'currentUser': {name: 'Anonymous'},
       'messages': [],
       'numOfClient': 1,
       'nameColor' : this.colorList[Math.floor(Math.random() * 7)],
      };
      this.socket = new WebSocket('ws://localhost:3001/');
      this.addMessage = this.addMessage.bind(this);
      this.changeName = this.changeName.bind(this);
      this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom() {
     var target = document.getElementsByClassName('message');
     target.item(target.length-1).scrollIntoView({ behavior: 'smooth' });
  }

  changeName(e){
    let keycode = (e.keyCode ? e.keyCode : e.which);
    let newCurrentUser = {name: e.target.value.trim()};
    let oldCurrentUser = this.state.currentUser;

    if(!newCurrentUser.name){
      newCurrentUser.name = 'Anonymous';
    }

    if(keycode === 13 && (oldCurrentUser.name !== newCurrentUser.name)){
      
      const newMessages =  {
        'type': 'postNotification',
        'content': `${oldCurrentUser.name} has changed their name to ${newCurrentUser.name}.`
      };
  
      this.socket.send(JSON.stringify(newMessages));

      this.setState({currentUser: newCurrentUser});
    }  
  }

  addMessage(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    var inputValue = e.target.value.trim();
  
    if(inputValue && keycode === 13){
        const newMessages =  {
          'type': 'postMessage',
          'username': this.state.currentUser.name, 
          'content': inputValue,
          'ownerColor': this.state.nameColor
        };

        this.socket.send(JSON.stringify(newMessages));

        e.target.value = '';
    }
  }

  componentDidMount() {
    
    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);

      if(data.numOfClient){
        this.setState({numOfClient: data.numOfClient});

      }else{

        const newMessages =  {
          'username': data.username, 
          'content': data.content,
          'renderColor': data.userColor,
          'ownerColor': data.ownerColor
        };
  
        switch(data.type) {
          case 'incomingMessage':
            newMessages.type = 'incomingMessage'
            break;
  
          case 'incomingNotification':
            newMessages.type = 'incomingNotification'
            break;
  
          default:
            throw new Error('Unknown event type ' + data.type);
        }
  
        const messages = this.state.messages.concat(newMessages);
  
        this.setState({messages: messages});

        this.scrollToBottom();
      }
    }
  }

  render() {
    return (
      <div>
       <nav className='navbar'>
         <a href='/' className='navbar-brand'>Chatty</a>
         <p>{this.state.numOfClient} users online</p>
       </nav>
      <MessageList messages= {this.state.messages} nameColor = {this.state.nameColor}/>
      <ChatBar addMessage={this.addMessage} changeName={this.changeName} currentUser = {this.state.currentUser}/>
      </div>
    );
  }
}

export default App;