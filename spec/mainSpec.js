var diff = require('../src');
describe("Basic functionality:", function(){
  describe("When it is given only one arument,", function(){
    it("should throw an error", function(){
      function anError () {  diff({});  }
      expect(anError).toThrowError(TypeError, "You must supply two arguments to diff.");
    });
  });
  describe("When two objects are the same,", function(){
    var j5 = {jackson: 5};
    var songs = ["ABC", "I'll Be There", "Rockin' Robin"];
    var members = 5;
    var name = "Jackson 5";
    var overplayed = false;
    var expirationDate = null;

    it("should return true.", function(){
      expect(
        diff(j5,j5),
        diff(songs,songs),
        diff(members,members),
        diff(name,name),
        diff(overplayed,overplayed),
        diff(expirationDate,expirationDate)
      ).toEqual(true);
    });
  });
});
