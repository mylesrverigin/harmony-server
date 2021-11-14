const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

// Load configs
const PORT = process.env.PORT || 8081

app.get('/',(req,res)=>{
    res.status(200).send('Hello from the API')
})
app.get('/myles',(req,res)=>{
    res.status(200).send('')
})
app.get('/robert',(req,res)=>{
    res.status(200).send('Robert endpoint')
})
app.get('/user',(req,res)=>{
    let username = Date.now()
    res.status(200).send('your user is '+username)
})
app.get('/data',(req,res)=>{
    let randomData = Math.random() * Date.now();
    res.status(200).send('this is important user data ' + randomData);
})


app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })