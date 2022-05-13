/* istanbul ignore file */
const { json } = require('express');
const cors = require('cors');
const app = require('express')();
require('express-async-errors');

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const errorHandler = require('./middlewares/error-handler');
const usersRouter = require('./routes/users.routes');

const port = process.env.PORT || 3000;

app.use(json());
app.use(cors());

app.use(usersRouter);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use(errorHandler);

io.on('connection', (socket) => {
  socket.join('BROAD_CHANNEL');

  socket.on('message', (data) => {
    io.emit('message', data);
  });

  io.emit('connection_success', {
    rooms: [
      {
        id: 'BROAD_CHANNEL',
        users: ['*'],
      },
    ],
    socket_id: socket.id,
  });
});

io.sockets.on('message', (socket, data) => {
  console.log(data);
  console.log(socket);
  socket.emit('message', data);
});

server.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
