var express = require('express');
var router = express.Router();

/* GET customers listing. */
router.get('/', function(req, res, next) {
    // Read all customers from PostgreSQL database


    const { Client } = require('pg');
    require('dotenv').config();
    
    (async () => {
      const client = new Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        ssl: false,
      });
      await client.connect();
      const res = await client.query('SELECT * FROM customers;', ['Connection to postgres successful!']);
      console.log(res.rows[0].connected);
      await client.end();
    })();


    res.send('respond with a JSON array of customers');
});

module.exports = router;
