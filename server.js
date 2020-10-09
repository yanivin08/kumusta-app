const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./routes/users');
const router = require('./routes/Chat');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
   socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });

      if(error) return callback(error);

      socket.join(user.room);
 
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to southcoders mini project.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
 
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      
      callback();
   });
 
   socket.on('sendMessage', (message, callback) => {
     const user = getUser(socket.id);
 
     io.to(user.room).emit('message', { user: user.name, text: message });
 
     callback();
   });
 
   socket.on('disconnect', () => {
     const user = removeUser(socket.id);
 
     if(user) {
       io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
     }
   })
 });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//set up database
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { 
   useNewUrlParser: true,
   useUnifiedTopology: true
}); // added useUnifiedTopology to prevent deprecation warning

const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error:'));
mongoDB.once('open', function() {
   console.log("MongodDB Connected!");
});

app.use('/user', require('./routes/User'));
app.use('/chat', require('./routes/Chat'));

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use( express.static('client/build') );

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));