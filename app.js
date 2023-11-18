const express = require("express");
const app = express()
const path = require("path");
const PORT = process.env.PORT || 3000;
const { Server } = require('socket.io')
const http = require('http')

const server = http.createServer(app)
// express specific stuff 
app.use("/static", express.static('static'));

// app.set('views', path.join(__dirname + 'views'));

const io = new Server(server)

const users = {};

io.on('connection', socket =>{
    console.log("connected....");
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);;
    });

    socket.on('msg-sent', message => {
        socket.broadcast.emit('recieve', {message: message, name:users[socket.id]});
    });

});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
server.listen(PORT, ()=>{
    console.log("client-server is running on the port " + PORT + "...")
})
