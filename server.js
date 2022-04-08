const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;
const cors = require("cors");
const res = require("express/lib/response");

app.use(cors());

app.set("ipaddr", "0.0.0.0");

app.get('/', (req, res) => {
    res.send('running')
});

io.on("connection", (socket) => {
    console.log("user connected")

    socket.on('disconnect', (reason) => {
        io.emit('disconnect', socket.client.conn.server.clientsCount)
      });

    socket.on("message", msg => {
        console.log(msg);
        io.emit("message", msg);
    });
});


server.listen((process.env.port || port), () => console.log("Server running on port: " + port));


