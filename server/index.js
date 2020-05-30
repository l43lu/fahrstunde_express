const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const config     = require("config");
const mongoose   = require("mongoose");

const app = express();

const mongopfad = "mongodb://fahrstundemongo:mongodb123@localhost:27017/fahrstunde"

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const person     = require('./routes/api/person');
const termin     = require('./routes/api/termin');
const usersRoute = require("./routes/users.route");


//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

//connect to mongodb
mongoose.connect(mongopfad, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));


app.use('/api/person', person);
app.use('/api/termin', termin);
app.use("/api/users", usersRoute);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));