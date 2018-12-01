# Chatty Project

Chatty is a React app that allows users to communicate with each other without having to register accounts. 

 *** Currently no persistent database is involved. ***

!["Chatty"](https://github.com/azusaaz/Chatty/blob/master/docs/chatty.gif)

## Functions
- Multiple User can do real time online chat through a page.
- Users can set or change their user name.
- Posted image urls(http:// or https:// with a file extension .jpg, png, or gif) are rendered as the images.

## Dependencies

### - Chatty-Server
- node.js
- express
- uuid
- ws

### - Chatty-Main
- node.js
- react
- react-dom

## Getting Started

- clone this repository
- repository has two main folder "chatty_server" that works as a server and "chatty_main" that works as a interface.

- inside of chatty_server folder, Install all dependencies (using the `npm install` command).
- inside of chatty_main folder, Install all dependencies (using the `npm install` command).
- inside of chatty_server folder, run the development web server using the `npm start` command.
- inside of chatty_main folder, run the app using the `npm start` command.
- open multipe browser windows and access http://localhost:3000/
- post something from each window
