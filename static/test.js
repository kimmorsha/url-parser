//unit testing

chai.config.includeStack = false;
chai.config.truncateThreshold = 0;

describe('Scheme checker', function() {
  it('should return correct scheme', function() {
    var validurl = 'http://jack:blarney@www.foo.com/bar/foo/acme?stuff=thing&foo=bar&blarg=snoggle#place';
    var scheme = getScheme(validurl);

    chai.assert.equal(scheme, "http");
  });
   it('should return correct scheme', function() {
    var validurl = 'https://domain.com?poo=javascript%20decode%20uri%20%2B%20sign%20to%20space';
    var scheme = getScheme(validurl);

    chai.assert.equal(scheme, "https");    
  });
   it('should return correct scheme', function() {
    var validurl = 'file:///home/arnelle/Documents/example.txt';
    var scheme = getScheme(validurl);

    chai.assert.equal(scheme, "file");  
  });
   it('should return correct scheme', function() {
    var validurl = 'mailto:arnellebalane@gmail.com';
    var scheme = getScheme(validurl);

    chai.assert.equal(scheme, "mailto");  
  });
});

describe('Port checker', function() {
  it('getPort() should return correct port if scheme uses default port.', function() {
    var validurl = 'http://jack:blarney@www.foo.com/bar/foo/acme?stuff=thing&foo=bar&blarg=snoggle#place';
    var port = getPort(validurl)

    chai.assert.equal(port, 80);
  });
   it('getPort() should return correct port if it is explicitly shown in the url.', function() {
    var url = 'http://atpass:foo%40bar@127.0.0.1:8080/path?search=foo#bar';
   

    var port = getPort(url);

    chai.assert.equal(port, 8080);
  });
   it('getPort() should return "null" if host is not present', function() {
    var url = 'madeupscheme:/example.com/';
   
    var port = getPort(url);

    chai.assert.equal(port, null);
  });
});

describe('Path checker', function() {
  it('should return correct path', function() {
    var validurl = 'http://jack:blarney@www.foo.com/bar/foo/acme?stuff=thing&foo=bar&blarg=snoggle#place';
    var path = getPath(validurl)

    chai.assert.equal(path, '/bar/foo/acme');
  });
   it('should return an empty string if path is not present', function() {
    var url = 'http://domain.com?poo=javascript%20decode%20uri%20%2B%20sign%20to%20space';
   

    var path = getPath(url);

    chai.assert.equal(path, "");
  });
});