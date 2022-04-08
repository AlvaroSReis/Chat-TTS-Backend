const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.port || 3000;
const cors = require("cors");

app.use(cors());

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


server.listen(port, () => console.log("Server running on port: " + port));


