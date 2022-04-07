const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;


app.get('/', (req, res) => {
    res.send({ response: 'Conectado com sucesso!' });
});

app.set("ipaddr", "10.0.0.1");

io.on("connection", (socket) => {
    console.log("user connected")
    console.log(socket.id);
    socket.on("message", msg => {
        console.log(msg);
        io.emit("message", msg);
    });
});


server.listen(port, () => console.log("Server running on port: " + port));


