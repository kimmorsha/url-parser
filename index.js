var express = require('express');
var app = express(); 
const router = new express.Router();
const consolidate = require('consolidate');
app.engine('html', consolidate.nunjucks);

app.use('/static', express.static('./static'));
app.set('views', './templates');
app.get('/', function (request, response) { 
   response.render('index.html');
});
app.listen(3000, function () {
	console.log('Server is now listening at port 3000');
});

