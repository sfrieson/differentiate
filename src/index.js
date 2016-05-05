if(!Array.isArray) Array.isArray = a => Object.prototype.toString.call(a) === "[object Array]";

var diff = function (a, b, opt) {
  var primitiveRegEx = /string|number|boolean|null|undefined|symbol/i;

  var results = false;
  // Add on missing options
  var options = ['undefined'];
  opt = addOptions(opt, options, false);

  //If missing an argument and not using the option to allow for undefined variables
  if ((a === undefined || b === undefined) && !opt['undefined']) throw new TypeError("You must supply two arguments to diff.");

  // Primitive equality or same reference
  if (a === b) return results;

  //Same Types
  if(typeof a === typeof b){
    if(primitiveRegEx.test(typeof a)) results = primDiff(a,b,opt);
    else if(typeof a === "function")       results = fnDiff(a,b,opt);
    else if(Array.isArray(a))              results = arrDiff(a,b,opt);
    else                              results = objDiff(a,b,opt);

  //Different Types
  } else results = b;

  return results;
};

function primDiff (a, b, opt){
  var options = ["difference"];
  opt = addOptions(opt, options, false);
  if(opt.difference && /number/.test(typeof a)) return b-a;
  //TODO: Add string diffing

  return b;
}

function arrDiff (a, b, opt){
  var diffFound = false;
  var results = {
    added:[],
    removed:[]
  };

  a.forEach(function(item, i){
    var bIndex;
    //If item from a is found on b, remove it from b
    if((bIndex = b.indexOf(item)) > -1) b.splice(bIndex, 1);

    //Otherwise, add it to the removed array
    else {
      results.removed.push(item);
      diffFound = true;
    }
  });

  //if there are still indexes on b, those become the added array
  if(b.length){
    results.added = b;
    diffFound = true;
  }

  if(diffFound) return results;
  return false;
}


function fnDiff (a, b, opt){
  if ( a.toString() === b.toString() ) return false;
  //TODO: Think through other possible helpful implementations
  return b;
}
function objDiff (a, b, opt){
  var options = ["difference"];
  opt = addOptions(opt, options, false);
  var diffFound = false;
  var results = {
    added:[],
    removed:[],
    changed: {}
  };

  //container for all properties on both.
  var properties = keys(a,b);
  properties.forEach(function(p) {
    //If they both have the property find if there are differences between them
    if(a.hasOwnProperty(p) && b.hasOwnProperty(p)) {
      var result = diff( a[p], b[p], opt);
      if (result) {
        results.changed[p] = result;
        diffFound = true;
      }
    }
    //Otherwise, record which were added and which were removed
    else {
      a.hasOwnProperty(p) ? results.removed.push(p) : results.added.push(p);
      diffFound = true;
    }
  });
  if (diffFound)return results;
  return false;
}

// Utilities
function addOptions (object, optArr, defaultValue){
  object = object || {};
  optArr.forEach(function(option){ object[option] = object[option] || defaultValue; });
  return object;
}

function keys (){
  var keys = [];
  //To avoid duplicates without having to use indexOf
  var found = {};

  for(var i = 0; i < arguments.length; i++){
    for(var prop in arguments[i]) {
      if(arguments[i].hasOwnProperty(prop) && !found[prop]) {
        keys.push(prop);
        found[prop] = true;
      }
    }
  }
  return keys;
}
module.exports = diff;
