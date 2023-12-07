const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.send('Hi, your request has been received');
});
app.get('/home', (req,res) => {
    res.send('<html><body><h1>welcome to home page</h1></body></html>');
});
app.get('/about', (req,res) => {
    res.send('{name:abi,id:2}');
});

app.listen(2000, () => {
    console.log('listening at http://localhost:2000');
});