const mongoose = require('mongoose');
const mongoURI = process.env.mongoURI;
if(mongoose.connect(mongoURI)){
    console.log('mongo connected');
}