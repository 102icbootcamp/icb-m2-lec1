// obj = {name: 'yasser'}
// obj.name = 'yasser'
// obj.name = 'mahmud'
// obj.age = 45
// use  agenerator 0 - 7, this will give an index
// arr[1] arr[1] arr[2]
// arr = [empty, [ ['name', 'yasser'], ['age', 45] ],..........empty]
// arr = [location=empty, location[],]


// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between the
// numbers 0 and `max`
var getIndexForKey = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

///////////////////////////////////////////////////////////////

var HashTable = function() {
  this.limit = 8;
  this.storage = [];
  this.length = this.storage.length
  console.log('initial length', this.length);
  if ((this.storage.length/2) === this.length) {
    this.limit = this.limit*2;
  }
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexForKey(k, this.limit);

  if(!this.storage[index]) { // the location is empty [empty, ......]
    this.storage[index] = []; //[[]. .....]
    this.storage[index].push([k,v]) //[[[k,v]],.....]
    this.length++
  } else { // location is not empty, means collision
    for(var i = 0; i < this.storage[index].length; i++) { // iterate over the array in the selected location
      if(k === this.storage[index][i][0]){ // if the key is already there
        this.storage[index][i][1] = v; // replace the value with new value
        return; 
      }
    }
    this.storage[index].push([k,v]); // if collisin but unique key then add it to the location array
  }
};

HashTable.prototype.retrieve = function(k) {
 // add your code here
  var index = getIndexForKey(k, this.limit);

  for(var i = 0; i < this.storage[index].length; i++) {
    if (k === this.storage[index][i][0]) {
      return this.storage[index][i][1];
    }
  }
  return undefined;
};

HashTable.prototype.remove = function(k) {
  // add your code here
  var index = getIndexForKey(k, this.limit);
  var memory = this.storage[index];

  if (memory) {
    for (var i = 0; i < memory.length; i++) {
      if (k === memory[i][0]) {
        memory.splice(i, 1);
        if(!memory.length) {
          delete this.storage[index];
        }
      }
    }
  }

  

};
