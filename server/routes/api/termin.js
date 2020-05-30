const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

const mongourl = 'mongodb://fahrstundemongo:mongodb123@localhost:27017/fahrstunde'

// Get Person
router.get('/', async (req,res) => {
	const termine = await loadTerminCollection();
	res.send(await termine.find({}).toArray());
});

//Add Person

//Delte Person


async function loadTerminCollection(){
	const client = await mongodb.MongoClient.connect(mongourl, {
		useNewUrlParser: true
	});
	return client.db('fahrstunde').collection('termine');
}


module.exports = router;