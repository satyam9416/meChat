const io = require('socket.io')(8000, {
    cors: {
      origin: "http://localhost:3000",
    //   origin: "http://127.0.0.1:5500",
      credentials: true
    }
});

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
