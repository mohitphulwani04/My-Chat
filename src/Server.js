const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');

app.use(cors());

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('message', (data) => {
    console.log(`Message from ${socket.id}: ${data}`);
    io.emit('message', { id: socket.id, message: data });
  });
});

server.listen(8000, () => {
  console.log('Server started on port 8000');
});

