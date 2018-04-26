/**
 * server.js
 * main server file
 * */

/**
 * require modules
 * express: to run application
 * config: basic configuration of application
 * bodyparser: parse request body
 * mysql: connection with mysql database
 * */
const express = require("express"),
    config = require("./config/config"),
    bodyparser = require("body-parser"),
    mysql = require("mysql"),
    fs = require("fs"),
    app = express(),
    /** create connection properties */
    connection = mysql.createConnection({
        host: config.mysql.hostname,
        user: config.mysql.username,
        password: config.mysql.password,
        database: config.mysql.database
    });

/* server request logfile */
app.use((req, res, next) => {
    var log = `${new Date().toString()} : ${req.method} ${req.url} \n`;
    fs.appendFile('./logfile/server.log', log);
    next();
});

app.use(bodyparser());
/* connect with database */
connection.connect();

app.get("/", (req, res) => {
    res.send("Welcome To Talky")
});

/**
 * POST : /user/register
 * param {String} userId phonenumber of user
 */
app.post("/user/register", (req, res) => {

})

/* set application port */
app.listen(config.port, () => {
    console.log(`magic start on port ${config.port}`);
});