const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

const mongourl = 'mongodb://fahrstundemongo:mongodb123@localhost:27017/fahrstunde'

// Get Termine
router.get('/', async (req,res) => {
	const termine = await loadTerminCollection();
	res.send(await termine.find({}).toArray());
});

//Add Termin
router.post("/add", async (req, res)=>{
	const termine = await loadTerminCollection();
	await termine.insertOne({
		schueler:        	req.body.person_id,
		fahrlehrer:      	req.body.fahrlehrer_id,
		schueler_zusage: 	req.body.schueler_zusage,
		fahrleher_zusage:	req.body.fahrleher_zusage,
		zeitpunkt:{
			von:        req.body.zeitpunkt.von,
			bis:        req.body.zeitpunkt.bis,
			ort:        req.body.zeitpunkt.ort
		},
		createdAt: new Date()
	})
	res.status(201).send();
})

//Delte Termin
router.delete('/:id', async (req, res) => {
	const termine = await loadTerminCollection();
	await termine.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
	res.status(200).send();
})


async function loadTerminCollection(){
	const client = await mongodb.MongoClient.connect(mongourl, {
		useNewUrlParser: true
	});
	return client.db('fahrstunde').collection('termine');
}


module.exports = router;