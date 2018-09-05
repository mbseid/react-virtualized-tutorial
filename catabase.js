const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const fs = require('fs');


app.get('/cats', function (req, res) {
	const catFiles = fs.readdirSync('cats')
 	const catURLS =  catFiles.map((cat) => {
 		return {
 			url: `/cats/${cat}`
 		}
 	})
 	res.json(catURLS)
});

app.use('/cats', express.static(path.join(__dirname, 'cats')));


app.get('/cat/:id', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
