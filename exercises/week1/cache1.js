var assert = require('assert');

// wrong solution
function isPrime( num ) {
  this.cache = this.cache || {};
  var prime = num != 1; // Everything but 1 can be prime
  for ( var i = 2; i < num; i++ ) {
    if ( num % i == 0 ) {
      prime = false;
      break;
    }
  }
  this.cache[num] = prime;
  return prime;
}

console.log(isPrime(5));

// todo: why it doesn't work?
assert.equal(isPrime.cache, undefined);

// todo: why this works?
assert.equal(global.cache[5], true);
