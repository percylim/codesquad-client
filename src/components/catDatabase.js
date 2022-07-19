//const express = require('express');
//const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createPool({
    'HOST': process.env.DB_HOST || 'sql6.freemysqlhosting.net',
    'USER': process.env.DB_USER || 'sql6424048',
    'PASSWORD': process.env.DB_PASSWORD || 'JZjZpssFYy',
    'DB': process.env.DB_NAME || 'sql6424048',
    'dialect': 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


module.exports = db;
