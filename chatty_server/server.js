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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// wss.broadcast = function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === SocketServer.OPEN) {
//       client.send(data);
//     }
//   });
// };


wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(data) {


    var data = JSON.parse(data);
    data.id = uuidv1();
 
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
      if (client.readyState === WebSocket.OPEN) {
        // console.log('received: %s', data);

        client.send(JSON.stringify(data));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

  // ws.on('message', function incoming(message) {
  //   console.log('received: %s', message);
  // });

  

});
