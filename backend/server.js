const express = require('express');
const dotenv = require('dotenv').config({ path: __dirname+'/.env' });
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
//console.log("ENV CONTENTS.....===>>>>>>",process.env);
// Serve static files from the React frontend app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

// Add your API routes here
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.get('/apis', (req, res) => {
  res.send({ message: "List of users below..." });
});

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error(`Error connecting to MongoDB:`, err);
  });

app.listen(port, () => console.log(`Server started on the port ${port}`));
