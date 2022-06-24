
/*
const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "postgres",
    schema: 'public'
})

module.exports = client
*/


const {Client} = require('pg')

const client = new Client({
    host: "ec2-34-200-35-222.compute-1.amazonaws.com",
    user: "nscxctaisxmafd",
    port: 5432,
    password: "b3f8eedef7c344dda8f196f935656aae773c0f65ef51a45b23f22bd58182360d",
    database: "dd80jfhflnkbm7",
    schema: 'public',
    ssl: { rejectUnauthorized: false }
})

module.exports = client
