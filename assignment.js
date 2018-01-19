//retrieve property

HashTable.prototype.retrieve = function(k) {
  var index = getIndexForKey(k, this.limit);

    for (var i = 0; i < this._storage[index].length; i++){
      if (k === this.storage[index][i][0]) {
        return this.storage[index][i][1];
      }
    }
    return undefined;
};



//remove property

HashTable.prototype.remove = function(k) {
  var index = getIndexForKey(k, this.limit);
  var bucket = this.storage[index];
  if (bucket) {
    for (var i = 0; i < bucket.length; i++) {
      if (k === bucket[i][0]) {
        bucket.splice(i, 1);
        if(!bucket.length) {
          delete this.storage[index];
      }
     }
    }	
   }
 }