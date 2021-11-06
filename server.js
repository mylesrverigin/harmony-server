const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

// Load configs
const PORT = process.env.PORT || 8081

app.get('/',(req,res)=>{
    res.status(200).send('Hello from the API')
})

app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })