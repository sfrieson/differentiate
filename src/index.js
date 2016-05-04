var diff = function (a, b, opt) {
  var options = ['undefined'];
  opt = addOptions(opt, options, false);
  var primitiveRegEx = /string|number|boolean|null|undefined|symbol/i;
  var results = false;
  // Add on missing options

  if ((a === undefined || b === undefined) && !opt['undefined']) throw new TypeError("You must supply two arguments to diff.");

  // Primitive equality or same reference  check
  if (a === b) return results;

  //Same Types
  if(typeof a === typeof b){
    if(primitiveRegEx.test(typeof a)) results = primitiveDiff.call(null, a, b, opt);
    else results = objectDiff.call(null, a, b, opt);

  //Different Types
  } else {
    if(primitiveRegEx.test(typeof a)) results = b;

    //TODO: More cases before this
    else results = b;
  }

  return results;

};

function primitiveDiff (a, b, opt){
  var options = ["difference"];
  opt = addOptions(opt, options, false);
  if(opt.difference && /number/.test(typeof a)) return b-a;
  return b;
}

function objectDiff (a, b, opt){
  var options = ["difference"];
  opt = addOptions(opt, options, false);
  var results = {
    added:[],
    removed:[],
    changed: {}
  };

  var properties = {};
  var prop;
  for(prop in a) properties[prop] = true;
  for(prop in b) properties[prop] = true;
  for(prop in properties) {
    if(a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
      var result = diff.call(null, a[prop], b[prop], opt);
      if (result) results.changed[prop] = result;
    }
    else {
      if(a.hasOwnProperty(prop)) results.removed.push(prop);
      if(b.hasOwnProperty(prop)) results.added.push(prop);
    }
  }
  return results;
}

function addOptions (object, optArr, defaultValue){
  object = object || {};
  optArr.forEach(function(option){ object[option] = object[option] || defaultValue; });
  return object;
}
module.exports = diff;
