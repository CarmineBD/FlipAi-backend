const mysql = require('mysql2');
const config = require('./config.js');

const db = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.databaseName,
    charset: config.database.charset,
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos: ', err);
        return;
    }
    console.log('Conexión establecida con la base de datos');
});

module.exports = db;
