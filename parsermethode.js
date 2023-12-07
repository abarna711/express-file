const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/process', (req, res) => {
let {name,phone}=req.body;
res.status(200).send(`name:${name},phone:${phone}`)

console.log({name:name,phone:phone})

})
app.listen(2020)
console.log("running")

