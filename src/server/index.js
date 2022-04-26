/* istanbul ignore file */
const { json } = require('express');
const app = require('express')();
require('express-async-errors');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const errorHandler = require('./middlewares/error-handler');
const rootRouter = require('./routes/root.routes');
const usersRouter = require('./routes/users.routes');

const port = process.env.PORT || 3000;

app.use(json());

app.use(rootRouter);
app.use(usersRouter);

app.use(errorHandler);

io.on('connection', (socket) => {});

server.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
