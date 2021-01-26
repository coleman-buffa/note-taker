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
app.get('/api/notes', function(req, res) {
	const db = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));	
	return res.json(db);
});
app.post('/api/notes', function(req, res) {
	//Add new list item to db.json
	//Read contents of db.json so it can be added to
	const db = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));	
	db.push(req.body);
	for (let i = 0; i < db.length; i++) {
		db[i].id = i + 1;
	};
	fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(db));
	return res.send(res.body);

	//return the note so the next function can do stuff with it
});
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.post('/api/notes', function(req, res) {

});

//Reset db.json to test state
let dbReset = [{"title": "Something need doing?", "text": "Zug Zug", "id": 1}];
fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(dbReset));

//Start the server
app.listen(PORT, function() {
	console.log(`App listening on PORT ${PORT}`);
})