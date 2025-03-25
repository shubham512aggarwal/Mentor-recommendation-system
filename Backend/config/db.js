// const sql = require("mssql");
// require("dotenv").config();

// const dbconfig = {
//     user: "test512",
//     password: "1234",
//     server: process.env.DB_SERVER, 
//     database: process.env.DB_NAME,
//     options: {
//         trustServerCertificate: true, // Accept self-signed certificate,
//         trustedConnection: false,
//         enableArithAbort: true,
//         instancename: "SQLEXPRESS"
//     },
//     port:1433
// };

// const poolPromise = new sql.ConnectionPool(dbconfig)
//     .connect()
//     .then(pool => {
//         console.log("✅ Connected to database");
//         return pool;
//     })
//     .catch(err => console.error("❌ Database connection error:", err));

// module.exports = { sql, poolPromise };
