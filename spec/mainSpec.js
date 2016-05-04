var diff = require('../src');
describe("Basic functionality:", function(){
  describe("When it is given only one arument,", function(){
    it("should throw an error", function(){
      function anError () {  diff({});  }
      expect(anError).toThrowError(TypeError, "You must supply two arguments to diff.");
    });
  });
});

//Primitives
describe("Primitives:", function(){
  describe("When arguments are equal (except undefined)", function(){
    var name = "Jackson 5",
        members = 5,
        overplayed = false,
        royalties = null,
        afro = Symbol('afro'),
        label;
    it("should return false.", function(){
      expect(
        diff(members,5),
        diff(name,"Jackson 5"),
        diff(overplayed, false),
        diff(royalties,null),
        diff(afro,afro)
      ).toEqual(false);
      var anError = function(){ diff(label, undefined); };
      expect(anError).toThrowError();
    });
  });

  describe("When the arguments are the same type and values are different", function(){
    it("should return the newer argument", function(){
      expect(diff(4,5)).toEqual(5);
      expect(diff("Hi","Hello")).toEqual("Hello");
      expect(diff(false,true)).toEqual(true);
      var sym = Symbol(5);
      expect(diff(Symbol(5),sym)).toEqual(sym);
    });
  });
  describe("When the arguments are the different types", function(){
    it("should return the newer argument", function(){
      expect(diff(5,null)).toEqual(null);
    });
  });
});

//Objects
describe("Objects:", function(){
  var obj1 = {name: "John Smith", age: 25},
      obj2 = {name: "John Smith", age: 26, nationality: "British"},
      nestObj1 = {first: "John", last: "Smith", kids: ["John", "Sam", "Sally"], address:{num: 5, street: "Easy St", zip:90210}},
      nestObj2 = {first: "Jane", maiden: "Doe", last: "Smith", kids: ["Sam", "Sally"], address:{num: 5, street: "Easy St", zip:90210}},
      mixed1,
      mixed2,
      arr1 = ["apple", "banana", "mango", "kiwi", "grapes", "lemon"],
      arr2 = ["apple", "banana", "pineapple", "Mango", "lemon", "grapes"],
      fn1 = function add(a, b){return a+b;},
      fn2 = function subtract(a,b){return a-b;},
      fnAnon = function(){return "Jasmine Testing";};

  describe("When objects are the same reference,", function(){
    var j5 = {jackson: 5},
        songs = ["ABC", "I'll Be There", "Rockin\' Robin"],
        sing = function(){return "She's a dance, dance, dance, dancing machine.";};

    it("should return false.", function(){
      expect(
        diff(j5,j5),
        diff(songs,songs),
        diff(sing,sing)
      ).toEqual(false);
    });
  });
  describe("When objects are same type", function(){
    it("should return false.", function(){
      var result = diff(obj1,obj2);
      expect( result.changed.hasOwnProperty('age') ).toEqual(true);
    });
  });
});

//Options
describe("Options:",function(){
  describe("undefined: When undefined arguments are passed ", function(){
    it("should not throw a TypeError, and should check for primitive equality", function(){
      var obj;
      expect(diff(obj, undefined, {undefined:true})).toEqual(false);
      obj = {jackson:5};
      expect(diff(obj, undefined, {undefined:true})).toBe(undefined);
      expect(diff(undefined, obj, {undefined:true})).toBeTruthy();
    });
  });
  describe("difference: When two numbers are passed", function(){
    it("should return the difference from the old to the new",function(){
      expect(diff(5,6, {difference:true})).toEqual(1);
      expect(diff(5,4, {difference:true})).toEqual(-1);
    });
  });
});
//options, not testable...
// describe("When options are", function(){
//   describe("not included,", function(){
//     it("should fill all options with false values", function(){
//
//     });
//   });
//   describe("included,", function(){
//     it("should fill the remaining options with false values", function(){
//
//     });
//   });
// });
