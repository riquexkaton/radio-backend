require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server);
app.use(cors());
app.use(express.static(path.join(__dirname,"..",'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"..","public","index.html"));
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