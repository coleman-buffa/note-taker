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

//Routes 
app.get('/notes', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/notes.html'));
});
app.get('/api/notes', function(req, res) {
	const db = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));	
	return res.json(db);
});
app.post('/api/notes', function(req, res) {
	req
})
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});



//Start the server
app.listen(PORT, function() {
	console.log(`App listening on PORT ${PORT}`);
})