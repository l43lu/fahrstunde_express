const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Get Person
router.get('/all',async (req,res) => {
	try{
	  const personen = await loadPersonCollection();
	  res.send(await personen.find({}).toArray());		
	}
	catch(err){
	   console.log(err);
	}

});

//Add Person
router.post("/add", async (req, res)=>{
	const personen = await loadPersonCollection();
	await personen.insertOne({
		name:         req.body.name,
		vorname:      req.body.vorname,
		ist_schueler: req.body.ist_schueler,
		ist_lehrer:   req.body.ist_lehrer,
		adresse:{
			strasse:    req.body.adresse.strasse,
			plz:        req.body.adresse.plz,
			ort:        req.body.adresse.ort,
			hausnummer: req.body.adresse.hausnummer
		},
		createdAt: new Date()
	})
	res.status(201).send();
})

//Delte Person
router.delete('/:id', async (req, res) => {
	const personen = await loadPersonCollection();
	await personen.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
	res.status(200).send();
})




async function loadPersonCollection(){
	const client = await mongodb.MongoClient.connect('mongodb://fahrstundemongo:mongodb123@localhost:27017/fahrstunde', {
		useNewUrlParser: true
	});
	return client.db('fahrstunde').collection('personen');
}


module.exports = router;