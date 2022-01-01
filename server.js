// base imports 
const express = require('express');
const app = express();
// middle ware imports
const cors = require('cors')
require('dotenv').config();
const jwtAuth = require('./middleware/jwtAuth');

// routes imports 
const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');
const goalRoutes = require('./routes/goalRoutes');
///////
const PORT = process.env.PORT || 8081


// middle ware
app.use(cors());
app.use(express.json());
app.use(jwtAuth);
// base routes
app.use('/user',userRoutes);
app.use('/habit',habitRoutes);
app.use('/goal',goalRoutes);


app.get('/',(req,res)=>{
    res.status(200).json('Hello from the API')
})

app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })