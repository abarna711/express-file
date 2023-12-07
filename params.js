const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hi, your request has been received');
});

app.get('/home/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`<html><body><h1>Welcome to home page  ${userId}</h1></body></html>`);
});

app.listen(2000, () => {
    console.log('Listening at http://localhost:2000');
});

