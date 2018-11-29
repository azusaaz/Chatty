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
     this.state = {
       currentUser: {name: "Bob"},
       messages: []

      };
      this.addMessage = this.addMessage.bind(this);
      this.changeName = this.changeName.bind(this);
      this.socket = new WebSocket("ws://localhost:3001/");
  }

  componentDidMount() {

    
    // console.log(this.socket);
    console.log('Client connected');
    
    this.socket.onmessage = (event) => {

      let data = JSON.parse(event.data);

      const newMessages =  {
        username: data.username, 
        content: data.content
      };

      const messages = this.state.messages.concat(newMessages);

      this.setState({messages: messages});
 
    }
   
    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

  }

  changeName(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
     
    if(keycode === 13){
      let newCurrentUser = {name: e.target.value};
      this.setState({currentUser: newCurrentUser});
  
    }  
  }

  addMessage(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
  
    if(keycode === 13){
   
        // const newMessages =  {
        //   // id: this.state.messages.length, 
        //   username: this.state.currentUser, 
        //   content: e.target.value
        // };
        
        const newMessages =  {
          username: this.state.currentUser.name, 
          content: e.target.value
        };

        // const messages = this.state.messages.concat(newMessages);

        // this.setState({messages: messages});

        this.socket.send(JSON.stringify(newMessages));

        e.target.value = '';
    
    }
   
  }

  render() {
    return (
      <div>
       <nav className="navbar">
         <a href="/" className="navbar-brand">Chatty</a>
       </nav>
      <MessageList messages= {this.state.messages} />
      <ChatBar addMessage={this.addMessage} changeName={this.changeName} currentUser = {this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
