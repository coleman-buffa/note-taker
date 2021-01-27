//Dependencies
const express = require('express');
const path = require('path');
const fs  = require('fs');

//Setup Express
const app = express();
const PORT = process.env.PORT || 3000;

// Handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routes 
app.get('/notes', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//Read, parse, and send db.json
app.get('/api/notes', function(req, res) {
	const db = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));	
	return res.json(db);
});

//Catch all other paths and direct to landing page
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

//Push new note object to db.json, assign ids to all objects in db.json, and return
//the note that was passed
app.post('/api/notes', function(req, res) {
	const db = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));	
	db.push(req.body);
	for (let i = 0; i < db.length; i++) {
		db[i].id = i + 1;
	};
	fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(db));
	return res.send(res.body);
});

//Delete the note that matches the passed id, reassign all id's to avoid
//creating duplicate ids, and return 200
app.delete('/api/notes/:id', function(req, res) {
	const db = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));	
	db.splice(req.params.id-1,1);
	for (let i = 0; i < db.length; i++) {
		db[i].id = i + 1;
	};
	fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(db));
	res.send(200);
});

//Reset db.json to test state
let dbReset = [{"title": "Something need doing?", "text": "Zug Zug", "id": 1}];
fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(dbReset));

//Start the server
app.listen(PORT, function() {
	console.log(`App listening on PORT ${PORT}`);
})