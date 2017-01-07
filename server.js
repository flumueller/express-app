var path = require('path');
var express = require('express');
var fs = require('fs');

var port = process.env.PORT || 3000;
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

app.use(express.static(path.join(__dirname, 'public')));

// Set global variables which are accessible in all views
app.use(function (req, res, next) {
   res.locals = {
     currentYear: new Date().getFullYear(),
     name: 'Flurin'
   };
   next();
});

app.get('/', (req, res) => {
	res.render('index', {
		pageTitle: 'Home'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		pageTitle: 'About'
	});
});

app.get('/contact', (req, res) => {
	res.render('contact', {
		pageTitle: 'Contact us'
	});
});

app.listen(port, () => {
	console.log(`Console is up on port ${port}`);
});