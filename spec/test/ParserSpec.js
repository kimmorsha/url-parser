describe("Scheme checker", function() {
  var UrlParser = require('../../static/urlparser')

  beforeEach(function() {
    urlParser = new UrlParser();
  });
  
  it("should return correct scheme", function() {
    var validurl = 'http://jack:blarney@www.foo.com/bar/foo/acme?stuff=thing&foo=bar&blarg=snoggle#place';
    var scheme = urlParser.getScheme(validurl);
    expect(scheme).toEqual("http");
  });

  it("should return correct 'https' scheme", function() {
    var validurl = 'https://domain.com?poo=javascript%20decode%20uri%20%2B%20sign%20to%20space';
    var scheme = urlParser.getScheme(validurl);
    expect(scheme).toEqual("https");
  });
  
  it('should return correct scheme', function() {
    var validurl = 'file:///home/arnelle/Documents/example.txt';
    var scheme = urlParser.getScheme(validurl);
    
    expect(scheme).toEqual("file");  
  });
  
  it('should return correct scheme', function() {
    var validurl = 'mailto:arnellebalane@gmail.com';
    var scheme = urlParser.getScheme(validurl);
    
    expect(scheme).toEqual("mailto"); 
  });
});

describe("Port checker", function() {
  var UrlParser = require('../../static/urlparser')

  beforeEach(function() {
    urlParser = new UrlParser();
  });
  
  it('getPort() should return correct port if scheme uses default port.', function() {
    var validurl = 'http://jack:blarney@www.foo.com/bar/foo/acme?stuff=thing&foo=bar&blarg=snoggle#place';
    var port = urlParser.getPort(validurl);
    
    expect(port).toEqual("80");
  });
  
  it('getPort() should return correct port if it is explicitly shown in the url.', function() {
    var validurl = 'http://atpass:foo%40bar@127.0.0.1:8080/path?search=foo#bar';
    var port = urlParser.getPort(validurl);
    
    expect(port).toEqual("8080");
     
  });
  
  it('getPort() should return "null" if host is not present', function() {
    var validurl = 'madeupscheme:/example.com/';
    var port = urlParser.getPort(validurl);
    expect(port).toEqual(null);
  });
});

describe("Path checker", function() {
  var UrlParser = require('../../static/urlparser')

  beforeEach(function() {
    urlParser = new UrlParser();
  });
  
  it('should return correct path', function() {
    var validurl = 'http://jack:blarney@www.foo.com/bar/foo/acme?stuff=thing&foo=bar&blarg=snoggle#place';
    var path= urlParser.getPath(validurl)
    expect(path).toEqual('/bar/foo/acme');
  });
  
  it('should return an empty string if path is not present', function() {
    var validurl = 'http://domain.com?poo=javascript%20decode%20uri%20%2B%20sign%20to%20space';
    var path = urlParser.getPath(validurl);
    
    expect(path).toEqual("");
  });
});
