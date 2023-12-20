const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const routes = require('./routes');


require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.static("."));
app.listen(5000, () => {
    console.log('Server run 5000');
})





app.use('/api/v1', routes)

