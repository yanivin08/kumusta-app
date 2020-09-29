const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

//set up database
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { 
   useNewUrlParser: true,
   useUnifiedTopology: true
}); // added useUnifiedTopology to prevent deprecation warning

const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error:'));
mongoDB.once('open', function() {
   console.log("MongodDB Connected!");
});

app.listen(port, () => console.log(`Server started on port ${port}`));