// base imports 
const express = require('express');
var cors = require('cors')
const app = express();
require('dotenv').config();
// middle ware imports

// routes imports 
const userRoutes = require('./routes/userRoutes');
///////
const PORT = process.env.PORT || 8081


// middle ware
app.use(cors())
app.use(express.json())

// base routes
app.use('/user',userRoutes);

app.get('/',(req,res)=>{
    res.status(200).json('Hello from the API')
})

app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })