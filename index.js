var ol = $('ol');

// Chat messages should be follow the set chat message template
// (see index.html:15)
function addMessage(urlString) {
    	ol.empty();
    	ol.append('<li>' + urlString + '</li>');
}

// This function sends a message to server via AJAX. See code at the bottom
// of this file for explanation on the different parts of this AJAX request.
// This sends a POST request to the server, and since we're not interested
// on the server's response, we didn't have to listen for the "readystatechange"
// event anymore.
function sendMessage(urlString) {
    
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:3000/url');
	xhr.send(urlString);
}

//this function adds the result message
function addResult(resultMessage){
	
	p.empty();
	p.append('<li>' + resultMessage + '</li>');
}

 // This function fetches the messages from the server via AJAX. See code at
 // the bottom of this file for explanation on the different parts of this
 // AJAX request.
function fetchMessages() {
   
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			var messages = JSON.parse(xhr.responseText);
			ol.empty();
			messages.forEach(addMessage);
		}
	};
	xhr.open('GET', 'http://localhost:3000/url');
	xhr.send();
}

// In order to fetch messages from the server, we need to call the "fetchMessages"
// function. With the code below, we are using "setInterval" to repeatedly call
// "fetchMessages". (See https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
// for more info about setInterval). This technique of repeatedly sending AJAX
// requests to the server to retrieve data or check if there's is new data is
// called "polling".
setInterval(fetchMessages, 100);

$('button[type]').on('click', function(e) {
	addMessage(e.target.textContent);
	sendMessage(e.target.textContent);
});

var input = $('input');

$('form').on('submit', function(e) {
	e.preventDefault();
	if (input.val()) {
		addMessage(input.val());
		sendMessage(input.val());
		parse(input.val());
		input.val('');
	}
});
//*********************************************************
// Parses the given URL into its different components.
//
//*********************************************************

var _scheme;
var _username;
var _password;
var _host;
var _port;
var _path;
var _query;
var _fragment;
	

function parse(url) {
	_scheme = getScheme(url);
	_username = getUsername(url);
	_password = getPassword(url);
	_host  = getHost(url);
	_port = getPort(url);
	_path = getPath(url);
	_query = getQuery(url);
	_fragment = getFragment(url);

	obj = {
	    scheme: _scheme,

	    authority: {
	      username: _username,
	      password: _password,
	      host: _host,
	      port: _port
	    },

	    path: _path,

	    query: _query,
	    fragment: _fragment	  
	};

	return obj;
}


function getScheme(url) {
	parser = helpParser();
	parser.href = url;

	scheme = parser.protocol
	scheme =  scheme.split(":")
	scheme =  scheme[0]
	

	document.getElementById("scheme").innerHTML = "scheme: " + scheme
	return scheme;
}


function getUsername(url) {
	parser = helpParser();
	parser.href = url;

	username = parser.username
	if (username == '') {
		return null;
	}
	username = username.split(":")
	username = username[0]

	if (username.match(/%[0-9a-f]{2}/i)) {
    		username = decodeURIComponent(username)
	}
	

	document.getElementById("username").innerHTML = "username: " + username
	return username
}


function getPassword(url) {
	parser = helpParser();
	parser.href = url;

	password = parser.password
	if (password == '') {
		return null;
	}
	if (password.match(/%[0-9a-f]{2}/i)) {
    	password = decodeURIComponent(password)
	}
	
	document.getElementById("password").innerHTML = "password: " + password
	return password
}


function getHost(url) {
	parser = helpParser();
	parser.href = url;

	host = parser.hostname
	if (host == '') {
		return null;
	}
	
	document.getElementById("host").innerHTML = "host: " + host
	return host
}


function getPort(url) {
	parser = helpParser();
	parser.href = url;

	const HTTPS_SCHEME = 'https';
	const SSH_SCHEME = 'ssh';
	const FTP_SCHEME = 'ftp';
	const HTTP_HOST = 'http';

	const HTTPS_PORT = '443';
	const SSH_PORT = '22';
	const FTP_PORT = '21';
	const HTTP_PORT = '80';

	const EMPTY = ''; 

	port = parser.port
	
	if (_scheme === HTTPS_SCHEME && port === EMPTY) {
		port = HTTPS_PORT;
	} else if (_scheme === SSH_SCHEME && port === EMPTY) {
		port = SSH_PORT;
	} else if (_scheme === FTP_SCHEME && port === EMPTY) {
		port = FTP_PORT;
	} else if (_host === null && port === EMPTY) {
		port = null;
	} else if (_host !== HTTP_HOST && port === EMPTY) {
		port = HTTP_PORT;
	} 

	document.getElementById("port").innerHTML = "port: " + port
	return port
}


function getPath(url) {
	parser = helpParser();
	parser.href = url;

	path = parser.pathname

	if ((path === '/') && (url.charAt(url.length-1) === '/')) {
		return '/'
	} else if ((path === '/') && isNotAfterSlash('?', url)) {
		return ''
	} else if ((path === '/') && isNotAfterSlash('#', url) {
		return ''
	} else if (path.match(/%[0-9a-f]{2}/i)) {
    	path = decodeURIComponent(path)
	}

	
	document.getElementById("path").innerHTML = "path: " + path
	return path
}


function isNotAfterSlash(char, url) {
	return url.charAt(url.indexOf(char)-1) !== '/';
}


function getQuery(url) {
	parser = helpParser();
	parser.href = url;

	queryString = parser.search
	if (queryString == '') {
		return null;
	}
	query = {};
    	a = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    	for (i = 0; i < a.length; i++) {
        	b = a[i].split('=');
        	query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    	}

	document.getElementById("query").innerHTML = "query: " + query
    	return query;
}


function getFragment(url) {
	parser = helpParser();
	parser.href = url;

	fragment = parser.hash;
	if (fragment == '') {
		return null;
	}
	fragment = fragment.split("#")
	fragment = fragment[1]

	if (fragment.match(/%[0-9a-f]{2}/i)) {
    	fragment = decodeURIComponent(fragment)
	}
	
	document.getElementById("fragment").innerHTML = "fragment: " + fragment
	return fragment
}


function helpParser() {
	return document.createElement('a');
}
