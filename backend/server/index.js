//import express from 'express';
//import http from 'http';
const express = require('express');

console.log('starting');

const app = express();

app.get('/', (req, res) => { res.send('ok') });

app.listen(8080, () => console.log('listening'));
//http.createServer(app).listen(8080, 'localhost', () => console.log('listening'));