var ol = $('ol');

var urlparser = require('./urlparser.js');
var parser = new urlparser();

function addMessage( urlString ) {
	console.log("addMessage" + urlString)
	ol.empty();
	ol.append('<li>' + urlString + '</li>');
}


$('button[type]').on('click', function(e) {

	addMessage( e.target.textContent );
	sendMessage( e.target.textContent );
});


var input = $('input');


$('form').on('submit', function(e) {
	e.preventDefault();
	if ( input.val() ) {
		addMessage( input.val() );
		var parsedUrl = parser.parse( input.val() );
		document.getElementById("scheme").innerHTML = "scheme: " + parsedUrl.scheme
		document.getElementById("username").innerHTML = "username: " + parsedUrl.authority.username
		document.getElementById("password").innerHTML = "password: " + parsedUrl.authority.password
		document.getElementById("host").innerHTML = "host: " + parsedUrl.authority.host
		document.getElementById("port").innerHTML = "port: " + parsedUrl.authority.port
		document.getElementById("path").innerHTML = "path: " + parsedUrl.path
		document.getElementById("query").innerHTML = "query:" + iterateQuery(parsedUrl.query);
		document.getElementById("fragment").innerHTML = "fragment: " + parsedUrl.fragment

		input.val('');

	}
});


function iterateQuery( query ) {
	var queryHtml = "<br>"

	$.each( query, function( k , v ) {
    queryHtml += k + " : " + v + "<br>";
  	});
	return queryHtml;
}


