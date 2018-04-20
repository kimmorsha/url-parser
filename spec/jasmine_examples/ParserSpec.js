describe("Scheme checker", function() {
  var Player = require('../../lib/jasmine_examples/Player');
  var Scheme = require('../../index')

//   it("should return correct scheme", function() {
//     var validurl = 'http://jack:blarney@www.foo.com/bar/foo/acme?stuff=thing&foo=bar&blarg=snoggle#place';
//     var scheme = getScheme(validurl);
    
//     expect(scheme).toEqual("http");
//   });

//   it("should return correct 'https' scheme", function() {
//     var validurl = 'https://domain.com?poo=javascript%20decode%20uri%20%2B%20sign%20to%20space';
//     var scheme = getScheme(validurl);

//     // demonstrates use of 'not' with a custom matcher
//     expect(scheme).toEqual("https");
//   });
});

// describe("Player", function() {
//   var Player = require('../../lib/jasmine_examples/Player');
//   var Song = require('../../lib/jasmine_examples/Song');
//   var player;
//   var song;

//   beforeEach(function() {
//     player = new Player();
//     song = new Song();
//   });

//   it("should be able to play a Song", function() {
//     player.play(song);
//     expect(player.currentlyPlayingSong).toEqual(song);

//     //demonstrates use of custom matcher
//     expect(player).toBePlaying(song);
//   });

//   describe("when song has been paused", function() {
//     beforeEach(function() {
//       player.play(song);
//       player.pause();
//     });

//     it("should indicate that the song is currently paused", function() {
//       expect(player.isPlaying).toBeFalsy();

//       // demonstrates use of 'not' with a custom matcher
//       expect(player).not.toBePlaying(song);
//     });

//     it("should be possible to resume", function() {
//       player.resume();
//       expect(player.isPlaying).toBeTruthy();
//       expect(player.currentlyPlayingSong).toEqual(song);
//     });
//   });

//   // demonstrates use of spies to intercept and test method calls
//   it("tells the current song if the user has made it a favorite", function() {
//     spyOn(song, 'persistFavoriteStatus');

//     player.play(song);
//     player.makeFavorite();

//     expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
//   });

//   //demonstrates use of expected exceptions
//   describe("#resume", function() {
//     it("should throw an exception if song is already playing", function() {
//       player.play(song);

//       expect(function() {
//         player.resume();
//       }).toThrowError("song is already playing");
//     });
//   });
// });

