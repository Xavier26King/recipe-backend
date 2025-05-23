const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('API is running');
});

const recipeRouter = require('./routes/recipeRoutes');

app.use('/recipe', recipeRouter);

const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        server.listen(PORT,()=>{console.log(`Sever Port : ${PORT}`)});
    })
    .catch((err)=>{console.log(`${err} : Error Occurred`)});