describe("Scheme checker", function() {
  var Player = require('../../lib/jasmine_examples/Player');
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

    // demonstrates use of 'not' with a custom matcher
    expect(scheme).toEqual("https");
  });
});

