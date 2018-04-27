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
    fs.appendFile(config.logPath, log);
    next();
});

app.use(bodyparser());
/* connect with database */
connection.connect();

function mysqlPromise(sql) {
    return new Promise(function(resolve, reject) {
        connection.query(sql, (err, res) => {
            if (!err) {
                return resolve(res);
            }
            reject(err);
        })
    });
}

/** user routes */
//require('./route/userRoute')(app, connection, fs);

app.post('/user/register', (req, res) => {
    let sql = "insert into UserMaster ('userId', 'fullName', 'otp', 'profile', 'deviceId') VALUES(" + req.body.phone + ",'" + req.body.fullName + "','123','" + req.body.profile + "','" + req.body.deviceId + "')"
    console.log("reqgister user : " + sql);
    mysqlPromise(sql).then((result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(400).send("something wrong");
        }
    }).catch((err) => {
        res.status(200).send(err);
    });
});

/* set application port */
app.listen(config.port, () => {
    console.log(`magic start on port ${config.port}`);
});