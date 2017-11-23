require('jsdom-global')()


module.exports = function() { 
    this.parse = parse;
    this.getScheme = getScheme;
    this.getHost = getHost;
    this.getUsername = getUsername;
    this.getPassword = getPassword;
    this.getPort = getPort;
    this.getPath = getPath;
    this.getQuery = getQuery;
  
    //etc
}



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
var _fragment
var parser = document.createElement('a');



var parse = function( url ) {
	parser = document.createElement('a');

	_scheme = getScheme( url );
	_username = getUsername( url );
	_password = getPassword( url );
	_host  = getHost( url );
	_port = getPort( url );
	_path = getPath( url );
	_query = getQuery( url );
	_fragment = getFragment( url );

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


var getScheme = function( url ) {
	parser.href = url;

	scheme = parser.protocol
	scheme =  scheme.split(":")
	scheme =  scheme[0]
	
	
	return scheme;
}


var getUsername = function( url ) {
	parser.href = url;

	username = parser.username
	if ( username == '' ) {
		return null;
	}
	username = username.split(":")
	username = username[ 0 ]
	if ( username.match(/%[0-9a-f]{2}/i) ) {
    	username = decodeURIComponent(username)
	}
	
	return username
}


var getPassword = function( url ) {
	parser.href = url;

	password = parser.password
	if ( password == '' ) {
		return null;
	}
	if ( password.match(/%[0-9a-f]{2}/i) ) {
    	password = decodeURIComponent(password)
	}
	
	return password
}


var getHost = function( url ) {
	parser.href = url;

	var host = parser.hostname
	if ( host == '' ) {
		return null;
	}
	return host
}


var getPort = function( url ) {
	parser.href = url;
	_host  = getHost( url );

	const HTTPS_SCHEME = 'https';
	const SSH_SCHEME = 'ssh';
	const FTP_SCHEME = 'ftp';
	const HTTPS_PORT_HOST = 'http';

	const HTTPS_PORT = '443';
	const SSH_PORT = '22';
	const FTP_PORT = '21'
	const HTTP_PORT = '80';

	const EMPTY = '';

	var port = parser.port
	
	if ( _scheme === HTTPS_SCHEME && port === EMPTY ) {
		port = HTTPS_PORT;
	} else if ( _scheme === SSH_SCHEME && port === EMPTY ) {
		port = SSH_PORT;
	} else if ( _scheme === FTP_SCHEME && port === EMPTY ) {
		port = FTP_PORT;
	} else if ( _host === null && port === EMPTY ) {
		port = null;
	} else if ( _host !== HTTPS_PORT_HOST && port === EMPTY ) {
		port = HTTP_PORT;
	} 
	
	return port
}


var getPath =  function( url ) {
	parser.href = url;

	path = parser.pathname
	if ( ( path === '/' ) && isPathOnlyASlash( url ) ) {
		return '/'
	} else if ( ( path === '/' ) && isNotAfterSlash( '?', url ) ) {
		return ''
	} else if ( ( path === '/' ) && isNotAfterSlash( '#', url ) ) {
		return ''
	} else if (path.match(/%[0-9a-f]{2}/i)) {
    	path = decodeURIComponent(path)
	}

	return path
}

var isPathOnlyASlash = function( url ) {
	return url.charAt( url.length-1 ) === '/';
}

var isNotAfterSlash = function( char, url ) {
	return url.charAt( url.indexOf( char ) - 1 ) !== '/';
}


var getQuery = function( url ) {
	parser.href = url;

	var queryString = parser.search

	if ( queryString == '' ) {
		return null;
	}

	var queryArray = {};
    var query = (queryString[ 0 ] === '?' ? queryString.substr( 1 ) : queryString).split( '&' );
    
    //separate key-value pairs of parsed query
    for ( var indexOfQuery = 0; indexOfQuery < query.length; indexOfQueryy++ ) {
        var queryPart = query[indexOfa].split('=');
        queryArray[decodeURIComponent(queryPart[0])] = decodeURIComponent(queryPart[1] || '');
    }

	
    return query;
}


var getFragment = function( url ) {
	parser.href = url;

	fragment = parser.hash;
	if ( fragment == '' ) {
		return null;
	}
	fragment = fragment.split("#")
	fragment = fragment[ 1 ]

	if ( fragment.match(/%[0-9a-f]{2}/i) ) {
    	fragment = decodeURIComponent(fragment)
	}

	return fragment
}

