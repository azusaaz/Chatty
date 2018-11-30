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
     this.colorList = ["#6b5b95", "#feb236", "#d64161", "#ff7b25"];
     this.state = {
       "currentUser": {name: "Anonymous"},
       "messages": [],
       "numOfClient": 1,
       "nameColor" : this.colorList[Math.floor(Math.random() * 3)],
      };
      this.addMessage = this.addMessage.bind(this);
      this.changeName = this.changeName.bind(this);
      this.generateColor = this.generateColor.bind(this);
      this.socket = new WebSocket("ws://localhost:3001/");
      this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom() {
     var target = document.getElementsByClassName("message");
     target.item(target.length-1).scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {

    
    // console.log(this.socket);
    console.log('Client connected');
    
    this.socket.onmessage = (event) => {

      let data = JSON.parse(event.data);
      console.log("data",event.data)

      if(data.numOfClient){
        console.log("numOfClient",data.numOfClient)
        this.setState({numOfClient: data.numOfClient});

      }else{

        const newMessages =  {
          "username": data.username, 
          "content": data.content,
          "renderColor": data.userColor,
          "ownerColor": data.ownerColor
        };
  
        switch(data.type) {
          case "incomingMessage":
            newMessages.type = "incomingMessage"
            break;
  
          case "incomingNotification":
            newMessages.type = "incomingNotification"
            break;
  
          default:
            throw new Error("Unknown event type " + data.type);
        }
  
        const messages = this.state.messages.concat(newMessages);
  
        this.setState({messages: messages});

        this.scrollToBottom();

      }
 
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

  generateColor(){
    let colorList = [
     "#6b5b95", "#feb236", "#d64161", "#ff7b25"
    ]
    
    let nameColor = colorList[Math.floor(Math.random() * 3)];

    this.setState({nameColor: nameColor});

  }

  changeName(e){
    let keycode = (e.keyCode ? e.keyCode : e.which);
     
    let newCurrentUser = {name: e.target.value.trim()};
    let oldCurrentUser = this.state.currentUser;

    if(!newCurrentUser.name){
      newCurrentUser.name = "Anonymous";
    }

    if(keycode === 13 && (oldCurrentUser.name !== newCurrentUser.name)){
      
      const newMessages =  {
        "type": "postNotification",
        "content": `${oldCurrentUser.name} has changed their name to ${newCurrentUser.name}.`
      };
  
      this.socket.send(JSON.stringify(newMessages));

      this.setState({currentUser: newCurrentUser});
    }  

  }

  addMessage(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    var inputValue = e.target.value.trim();
  
    if(inputValue && keycode === 13){
   
        // const newMessages =  {
        //   // id: this.state.messages.length, 
        //   username: this.state.currentUser, 
        //   content: e.target.value
        // };
        

        const newMessages =  {
          "type": "postMessage",
          "username": this.state.currentUser.name, 
          "content": inputValue,
          "ownerColor": this.state.nameColor
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
         <p>{this.state.numOfClient} users online</p>
       </nav>
      <MessageList messages= {this.state.messages} nameColor = {this.state.nameColor}/>
      <ChatBar addMessage={this.addMessage} changeName={this.changeName} currentUser = {this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
