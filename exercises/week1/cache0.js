var assert = require('assert');

function isPrime( num ) {
  var prime = num != 1; // Everything but 1 can be prime
  for ( var i = 2; i < num; i++ ) {
    if ( num % i == 0 ) {
      prime = false;
      break;
    }
  }
  return prime;
}

assert( isPrime(5), "Make sure the function works, 5 is prime." );
assert( isPrime.cache[5], "Is the answer cached?" );

// todo: make this function cacheable
