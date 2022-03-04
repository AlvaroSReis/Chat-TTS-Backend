const client = require('./connection.js')
const express = require('express')
const cors = require('cors')
const app = express();


app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.post('/mensagem', (req, res)=> {
    const message = req.body;
    let insertQuery = `insert into conversas(sender, receiver, msg) 
                       values('${message.sender}', '${message.receiver}', '${message.msg}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.get('/:id', (req, res)=>{
    client.query(`Select * from conversas where sender='${req.params.id}' or receiver='${req.params.id}'`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

client.connect();


