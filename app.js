require('dotenv').config()
const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db')
const fs = require('fs');
const  http = require('http');
const  server = http.createServer(app);
const path = require ('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const crossOption = {
    methods : [ "GET", "POST", "PUT", "DELETE", "OPTION" ],
    credentials : true 
};

require('./config/routes')(router, app);
app.use(router);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(cors(crossOption));



server.listen(PORT, ()=>console.log(`running on port ${PORT}`));