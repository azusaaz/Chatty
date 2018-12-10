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
       'nameColor' : this.colorList[Math.floor(Math.random() * 7)],  //set user color randomly
      };
      this.socket = new WebSocket('ws://localhost:3001/');
      this.addMessage = this.addMessage.bind(this);
      this.changeName = this.changeName.bind(this);
      this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  // Autoscroll to the last message
  scrollToBottom() {
     var target = document.getElementsByClassName('message');
     target.item(target.length-1).scrollIntoView({ behavior: 'smooth' });
  }

  // User can change own name after inputting name and hit enter
  changeName(e){
    
    //read a code key
    let keycode = (e.keyCode ? e.keyCode : e.which);
    let newCurrentUser = {name: e.target.value.trim()};
    let oldCurrentUser = this.state.currentUser;

    // set Anonymous if the field was empty
    if(!newCurrentUser.name){
      newCurrentUser.name = 'Anonymous';
    }

    // reject too long username 
    if(newCurrentUser.name.length > 15){
      alert('please use less than fifteen letters for a username');
      return;
    }

    // if enter(keycode 13) was pressed and inputted name was different with current
    if(keycode === 13 && (oldCurrentUser.name !== newCurrentUser.name)){
      
      // generate a new message object to send a server
      const newMessages =  {
        'type': 'postNotification',
        'content': `----- ${oldCurrentUser.name} has changed their name to ${newCurrentUser.name} -----`,
        'ownerColor': this.state.nameColor
      };
  
      this.socket.send(JSON.stringify(newMessages));

      this.setState({currentUser: newCurrentUser});
    }  
  }

  // Accept a message input, and send server to broadcast it.
  addMessage(e){

    // read a code key
    var keycode = (e.keyCode ? e.keyCode : e.which);
    var inputValue = e.target.value.trim();
  
    // if any text was inputted, and enter(keycode 13) was pressed
    if(inputValue && keycode === 13){
        const newMessage =  {
          'type': 'postMessage',
          'username': this.state.currentUser.name, 
          'content': inputValue,
          'ownerColor': this.state.nameColor
        };

        // send data with string
        this.socket.send(JSON.stringify(newMessage));

        e.target.value = '';
    }
  }

  componentDidMount() {
    
    this.socket.onmessage = (event) => {

      // convert data string to object
      let data = JSON.parse(event.data);

      if(data.numOfClient){
        this.setState({numOfClient: data.numOfClient});

      }else{

        // generate a new message object to send a server
        const newMessage =  {
          'username': data.username, 
          'content': data.content,
          'renderColor': data.userColor,
          'ownerColor': data.ownerColor
        };
  
        switch(data.type) {
          case 'incomingMessage':
            newMessage.type = 'incomingMessage'
            break;
  
          case 'incomingNotification':
            newMessage.type = 'incomingNotification'
            break;
  
          default:
            throw new Error('Unknown event type ' + data.type);
        }
  
        const messages = this.state.messages.concat(newMessage);
  
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
      <MessageList messages= {this.state.messages}/>
      <ChatBar addMessage={this.addMessage} changeName={this.changeName} currentUser = {this.state.currentUser}/>
      </div>
    );
  }
}

export default App;