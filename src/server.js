require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: 'https://radio-music.vercel.app',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://radio-music.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.get('/', (req, res) => {
    res.send('hola mundo');
});

io.on('connection', (socket) => {


    //envio y recibo de mensajes
    socket.on('message', (data) => {
        socket.broadcast.emit('message', data);
    });


});

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log('listening on ' + process.env.PORT);
});