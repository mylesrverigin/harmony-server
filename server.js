// base imports 
const express = require('express');
const app = express();
// middle ware imports
const cors = require('cors')
require('dotenv').config();
const jwtAuth = require('./middleware/jwtAuth');

// routes imports 
const userRoutes = require('./routes/userRoutes');
///////
const PORT = process.env.PORT || 8081


// middle ware
app.use(cors())
app.use(express.json())

// base routes
app.use('/user',jwtAuth,userRoutes);

app.get('/',(req,res)=>{
    res.status(200).json('Hello from the API')
})

app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })