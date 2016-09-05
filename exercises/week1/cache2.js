var assert = require('assert');

function isPrime(num) {
  // todo: how to remove this initialization on every call? and do not put it outside the scope
  isPrime.cache = isPrime.cache || {};

  if (isPrime.cache[num] != null)
    return isPrime.cache[num];

  var prime = num != 1; // Everything but 1 can be prime
  for (var i = 2; i < num; i++) {
    if (num % i == 0) {
      prime = false;
      break;
    }
  }

  isPrime.cache[num] = prime

  return prime;
}

isPrime(5);
console.log(isPrime.cache[5]);
