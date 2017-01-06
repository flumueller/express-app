var path = require('path');
var express = require('express');
var fs = require('fs');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log');
		}
	});

	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance');
// });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index', {
		pageTitle: 'Home',
		currentYear: new Date().getFullYear()
	});
});

app.listen(3000, () => {
	console.log('Console is up on port 3000');
});