// Node Module
const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const Services = require('./srcServices');
const VERSION = process.env.npm_package_version;

// APP
var app = express();

app.get('/', (req,res) => {
  // Get response from root path
  res.send('Welcome to the java script application with version number: '+VERSION+' ');
});

app.get('/version', (req,res) =>{
  // Get response from '/version' path
  var services = new Services();
  services.requestHandler(req, res);
});

app.listen(PORT,HOST);
console.log(`Application running on http://${HOST}:${PORT}`); //eslint-disable-line no-console
