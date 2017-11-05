var express = require('express');
var consolidate = require('consolidate');
var app = express(); //for routing
app.engine('html', consolidate.nunjucks);
const router = new express.Router();


app.use('/static', express.static('./static'));
app.set('views', './templates');
app.get('/', function (request, response) { 
   response.render('index.html');
});
app.get('/unittest', function (request, response) {
	console.log("hmmmmmmm")
	response.render('unittest.html');
});
app.listen(3000, function () {
	console.log('Server is now listening at port 3000');
});

