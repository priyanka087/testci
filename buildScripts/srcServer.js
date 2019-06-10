'use strict';
const express = require('express');
const fs = require("fs")
const git = require('git-rev-sync');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const VERSION = process.env.npm_package_version;
const SHA_LONG=git.long()

// Write the version and last commit sha to text files

fs.writeFileSync('./src/version.txt', VERSION);
fs.writeFileSync('./src/sha.txt', SHA_LONG)

// APP
var app = express();

app.get('/', (req,res) => {
  res.send('APP Version Number: '+VERSION+' ');
});

app.get('/git', function (req, res) {
  fs.readFile( __dirname + "/" + "../src/sha.txt", 'utf8', function (err, data) {
    console.log( data); //eslint-disable-line no-console
    res.end( data );
  });
});

app.listen(PORT,HOST);
console.log(`Application running on http://${HOST}:${PORT}`); //eslint-disable-line no-console
