const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');


mongoose.connect('mongodb://127.0.0.1:27017/mongo_2024')
    .catch((err)=>console.log(err.message))


const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log('server start at port = ' + PORT);
})
