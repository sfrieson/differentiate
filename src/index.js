var diff = function (a, b, opt) {
  if (a === undefined || b === undefined ) throw new TypeError("You must supply two arguments to diff.");

  //primitive checking
  if(typeof a === "boolean" || typeof a === "number" || typeof a === "string" || a.constructor === "date" || )
  if (a === b) return true;

  return false;

}

module.exports = diff;

function p(n){k=i=0;while(k<n)if(++i!=(i+"").split('').reverse().join(''))++k;return i}
(n=>{k=i=0;while(k<n)if(++i!=(i+"").split('').reverse().join(''))++k;return i})(prompt())
(n,k,i=>while(k<n)if(++i!=(i+"").split('').reverse().join(''))++k; i)(prompt(),0,0)
