const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;


//app.use(cors());

io.on("connection", socket => {
    console.log(socket.id);
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
    });
});


server.listen(port, () => console.log("Server running on port: " + port));


