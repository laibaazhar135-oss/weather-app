const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health',(req,res)=>{
    res.status(200).json({message: 'server is alive'});
})


const weatherapp = require('./routes/weatherRoutes');
app.use('/api',weatherapp);

app.use((req,res)=>{
    res.status(400).json({error: 'No route found'})
})

const PORT= process.env.PORT|| 5000;
app.listen(PORT,()=>{
    console.log(`App is running  on http://localhost:${PORT}`);
    console.log(`App health : http://localhost:${PORT}/health`);
})