const mysql = require("mysql2");
require("dotenv").config();

const MysqlDB = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DATABASEUSER,
    password: process.env.DATABASEPASSWORD,
    database: process.env.DATABASENAME,
    port: process.env.PORTNUMBER,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

MysqlDB.getConnection((err, connection) => {
    if (err) {
        console.error('❌ MySQL pool connection error:', err);
        return;
    }
    console.log('✅ MySQL database is connect');
    connection.release();
});

module.exports = MysqlDB;

