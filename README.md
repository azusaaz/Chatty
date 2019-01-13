# Chatty Project

Chatty is a React app that allows users to communicate with each other without having to register accounts. 

 *** Currently no persistent database is involved. ***

!["Chatty"](https://github.com/azusaaz/Chatty/blob/master/docs/chatty3.gif)

## Functions
- Multiple users can do real time online chat through a page.
- Users can set or change their user name.
- Posted image urls(http:// or https:// with a file extension (.jpg, .png, or .gif) are rendered as the image. (In some cases, image url doesn't have any file extension. You can add either matching one (.jpg, .png, or .gif) manually to use the url.) (If you want to include url and text, or multiple urls in one post, they must be split by whitespace)


<caption>&nbsp;Input example</caption>
<img src="https://github.com/azusaaz/Chatty/blob/master/docs/ex_in.png" width ="550px"/>
<caption>&nbsp;Output</caption>
<img src="https://github.com/azusaaz/Chatty/blob/master/docs/ex_out.png" width ="450px"/>

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
- open multiple browser windows and access http://localhost:3000/
- post something from each window
