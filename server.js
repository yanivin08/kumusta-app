const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const app = express();

//set up database
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })

const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error:'));
mongoDB.once('open', function() {
   console.log("MongodDB Connected!");
});

app.use('/user', require('./routes/User'));
app.use('/chat', require('./routes/Chat'));

app.listen(port, () => console.log(`Server started on port ${port}`));