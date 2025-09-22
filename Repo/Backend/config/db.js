const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "Liam_7687",
	database: "DB_Menu",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

const promisePool= pool.promise();

module.exports = promisePool;
