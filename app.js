const express = require('express');
const path = require('path');
require('./config/config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true }, (err,res) => {
  if(err) throw err;

  console.log("DB online");
});


app.get('/', (req, res)=> {
  res.send("Invalid Endpoint");
});

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
});
