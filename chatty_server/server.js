const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.on('connection', (ws) => {
  console.log('Client connected');

  // Broadcast how many users are connecting to each client
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {

      //check how many users are connecting
      var data = {numOfClient: wss.clients.size}
      client.send(JSON.stringify(data));
    }
  });

  // when a message was posted
  ws.on('message', function incoming(data) {
  
    // make object from string
    var data = JSON.parse(data);

    // generate random id for a message
    data.id = uuidv1();

     // set message type
    switch(data.type) {
      case "postMessage":
        data.type = "incomingMessage";
        break;

      case "postNotification":
        data.type = "incomingNotification";
        break;
        
      default:
        throw new Error("Unknown event type " + data.type);
    }
 
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {

      if (client.readyState === WebSocket.OPEN) {

        client.send(JSON.stringify(data));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')

    // Broadcast how many users are connecting to update the number.
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        var data = {numOfClient: wss.clients.size}
        client.send(JSON.stringify(data));
      }
    });
  });
});