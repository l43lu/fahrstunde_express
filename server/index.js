const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const person = require('./routes/api/person');
const termin = require('./routes/api/termin');

app.use('/api/person', person);
app.use('/api/termin', termin);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ${port}'));