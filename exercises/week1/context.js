var assert = require('assert');

function loop(array, fn){
  for ( var i = 0; i < array.length; i++ ) {
    fn.call(array, array[i]);
  }
}

var num = 0;
loop([0, 1, 2], function(value){
  assert(value == num++, "Make sure the contents are as we expect it.");
  assert(this instanceof Array, "The context should be the full array.");
});
