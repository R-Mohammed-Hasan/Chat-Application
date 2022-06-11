const io = require('socket.io')(8000, {
    cors: {
        origin: [
            "http://localhost:8080"
        ]
    }
})

const users = {};

io.on('connection', (socket) => {
    socket.on('user-joined', name => {
        // we are assigning a new key, not replacing
        users[socket.id] = name;
        // console.log(users);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        console.log(users[socket.id]);
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    })

})