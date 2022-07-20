import axios from "axios";

const express = require("express");
const app = express();

//cors
const cors = require("cors");
app.use(cors());

//json parser
const bodyParser = require('body-parser');
app.use(bodyParser.json())

const server = require("http").createServer(app);
const client = require('./connection.js')
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

//===============================================
// Functions
//===============================================

async function getUserData(acessToken) {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    userInfoResponse.json().then(data => {
        console.log(data)

    });
}


//===============================================
// REST
//===============================================

//Default response for check if is up
app.get('/', (req, res) => {
    res.send('running')
});

/*=======================================
Gets
=========================================*/

//User login
/*
app.get('/login/:username&:password', (req, res)=>{

    const username = String(req.params.username)
    const senha = String(req.params.password)
    client.query(`SELECT username, senha FROM usuario WHERE username = '${req.params.username}' AND senha = '${req.params.password}'`, (err, result)=>{
        //console.log(`SELECT * FROM usuario WHERE username = '${req.params.username}'`)
        if(!err){
            res.send(result.rows);
        }else{
            res.send(err)
        }
        
    });
    client.end;
})
*/
//Usuario

app.get('/userinfo/:username', (req, res) => {

    const user = String(req.params.username)
    client.query(`SELECT * FROM usuario WHERE username = '${user}';`, (err, result) => {
        console.log(result)
        if (!err) {

            res.send(JSON.stringify(result.rows.username));
        } else {
            res.send(err)
        }

    });
    client.end;
})

app.get('/username/:email', (req, res) => {
    const email = String(req.params.email)
    client.query(`SELECT username FROM usuario WHERE email = '${email}';`, (err, result) => {
        console.log(result.rows)
        /*
        try{
            console.log(result.rows[0].username)
        }catch{
            
            //err
        }
        */
        if (!err) {
            //try {
            //    console.log(result.rows[0].username)
            //    res.send(result.rows)
            //}catch{

            //}
            res.send(result.rows);
        } else {
            res.send('')
        }

    });
    client.end;
})



//test
app.get('/users', (req, res) => {

    const user = String(req.params.username)
    client.query(`SELECT * FROM usuario`, (err, result) => {
        console.log(result.rows)
        if (!err) {
            res.send(result.rows);
        } else {
            res.send(err)
        }

    });
    client.end;
})

//get friends
app.get('/friends/:user', (req, res) => {
    const user = String(req.params.user)
    client.query(`SELECT username FROM friendship INNER JOIN usuario ON usuario1 = id OR usuario2 = id WHERE (usuario1 = (SELECT id FROM usuario WHERE username = '${user}') OR usuario2 = (SELECT id FROM usuario WHERE username ='${user}')) AND username != '${user}';`, (err, result) => {
        //console.log(result.rows) 
        if (!err) {
            res.send(result.rows);
        } else {
            res.send(err)
        }
    })
})




/*=======================================
Posts
=========================================*/


// Create new user
app.post('/novoUsuario', (req, res) => {
    const user = req.body;
    let insertQuery = `INSERT INTO usuario(username, email) 
                       VALUES('${user.username}', '${user.email}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Sucess')
        }
        else { console.log(err.message) }
    })
    client.end;
})

//UserLogin

app.post('/tokenLogin', (req, res) => {
    const token = req.body;
    //console.log(tokenData)
    if (token?.type === "success") {
        //getUserData(token)
        res.send('TokenReceived')
    } else {
        console.log(err.message)
    }
    //client.query(insertQuery, (err, result) => {
    //    if (!err) {
    //        res.send('Sucess')
    //    }
    //    else { console.log(err.message) }
    //})
    client.end;
})

/*=======================================
Io for chat
=========================================*/


io.on('connection', (socket) => {
    io.emit('connected')

    //socket.on('disconnect', (reason) => {
    //io.emit('disconnect')
    //});

    socket.on('message', (data, name) => {
        io.emit('message', data, name)
    })
});

/*
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
*/
client.connect();

server.listen(port, () => console.log("Server running on port: " + port));


