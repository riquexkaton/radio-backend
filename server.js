const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: 'https://riquexfm.netlify.app', //aqui va el dominio del front
        methods: ['GET', 'POST'],
        credentials: true  // permitir solicitudes con credenciales
    }
});

app.use(cors())
app.get('/', (req, res) => {
    res.send('hola mundo');
});

io.on('connection', (socket) => {


    //envio y recibo de mensajes
    socket.on('message', (data) => {
        socket.broadcast.emit('message', data);
    });


});

server.listen(process.env.PORT || 4000, () => {
    console.log('listening on ' + process.env.PORT);
});