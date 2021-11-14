const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

// Load configs
const PORT = process.env.PORT || 8081

app.get('/',(req,res)=>{
    res.status(200).json('Hello from the API')
})
app.get('/myles',(req,res)=>{
    res.status(200).json('')
})
app.get('/robert',(req,res)=>{
    res.status(200).json({ username: 'Flavio' })
})
app.get('/user',(req,res)=>{
    let username = Date.now()
    res.status(200).json('your user is '+username)
})
app.get('/data',(req,res)=>{
    let randomData = Math.random() * Date.now();
    res.status(200).json('this is important user data ' + randomData);
})


app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })