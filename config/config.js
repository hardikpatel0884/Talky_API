/**
 * config/config.js
 * basic configuration file
 * created at: 27/04/2018 12:54 AM
 * author: nullplus HP
 * */

module.exports = {
    /** port number to run application */
    port: process.env.PORT || 3000,
    logPath: './logfile/server.log',

    /** mysql connection properties */
    mysql: {
        hostname: "localhost",
        database: "talky",
        username: "root",
        password: "Har884dik"
    },

    /* user table */
    user: {
        userId: "userId",
        fullName: "fullName",
        otp: "otp",
        profile: "profile",
        deviceId: "deviceId",
        ifActive: "isActive",
        isVerify: "isVerify"
    }
};