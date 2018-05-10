describe("Scheme checker", function() {
  var getScheme = require('../../index/getScheme');
  var scheme_thing

  beforeEach(function() {
    scheme_thing = new getScheme();
  });

  it("should return correct 'http' scheme", function() {
    var validurl = 'http://jack:blarney@www.foo.com/bar/foo/acme?stuff=thing&foo=bar&blarg=snoggle#place';
    var scheme = scheme_thing(validurl);
    
    expect(scheme).toEqual("http");
  });

  it("should return correct 'https' scheme", function() {
    var validurl = 'https://domain.com?poo=javascript%20decode%20uri%20%2B%20sign%20to%20space';
    var scheme = scheme_thing(validurl);

    // demonstrates use of 'not' with a custom matcher
    expect(scheme).toEqual("https");
  });
  
  it('should return correct scheme', function() {
    var validurl = 'file:///home/arnelle/Documents/example.txt';
    var scheme = scheme_thing(validurl);

    expect(scheme).toEqual("file");
  });
  
  it('should return correct scheme', function() {
    var validurl = 'mailto:arnellebalane@gmail.com';
    var scheme = scheme_thing(validurl);

    expect(scheme).toEqual("mailto"); 
  });
});
