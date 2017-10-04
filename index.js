/**
 *  Parses the given URL into its different components.
 *
 *  TODO: Implement this function.
 *  NOTE: You may implement additional functions as you need, as long as this
 *    function behaves as specified in the instructions. Have fun! :)
 **/

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
	
	var obj = {
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
	var parser = document.createElement('a');
	parser.href = url;

	var scheme = parser.protocol
	scheme =  scheme.split(":")
	scheme =  scheme[0]
	
	document.getElementById("scheme").innerHTML = "scheme: " + scheme
	return scheme;
}

function getUsername(url) {
	var parser = document.createElement('a');
	parser.href = url;

	var username = parser.username
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
	var parser = document.createElement('a');
	parser.href = url;

	var password = parser.password
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
	var parser = document.createElement('a');
	parser.href = url;

	var host = parser.hostname
	if (host == '') {
		return null;
	}
	
	document.getElementById("host").innerHTML = "host: " + host
	return host
}

function getPort(url) {
	var parser = document.createElement('a');
	parser.href = url;

	var port = parser.port
	
	if (_scheme === 'https' && port === '') {
		port = '443';
	} else if (_scheme === 'ssh' && port === '') {
		port = '22';
	} else if (_scheme === 'ftp' && port === '') {
		port = '21';
	} else if (_host === null && port === '') {
		port = null;
	} else if (_host !== 'http' && port === '') {
		port = '80';
	} 

	document.getElementById("port").innerHTML = "port: " + port
	return port
}

function getPath(url) {
	var parser = document.createElement('a');
	parser.href = url;

	var path = parser.pathname

	if ((path === '/') && (url.charAt(url.length-1) === '/')) {
		return '/'
	} else if ((path === '/') && isNotAfterSlash('?', url)) {
		return ''
	} else if ((path === '/') && isNotAfterSlash('#', url)) {
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
	var parser = document.createElement('a');
	parser.href = url;

	var qstr = parser.search
	if (qstr == '') {
		return null;
	}
	var query = {};
    var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
	document.getElementById("query").innerHTML = "query: " + query
    return query;
}

function getFragment(url) {
	var parser = document.createElement('a');
	parser.href = url;

	var fragment = parser.hash;
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