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

console.log(isPrime(5)); // simpy invoking the function

// todo: why it doesn't work? (in function isPrime this pointing to global object)
assert.equal(isPrime.cache, undefined);

// todo: why this works?
assert.equal(global.cache[5], true);

//this is point at diferent object depending on how  the function is invoke, in this case this in function isPrime pointing to global(window)