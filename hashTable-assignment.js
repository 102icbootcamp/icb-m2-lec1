var getIndexForKey = function (str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % max;
};

var HashTable = function () {
  this.limit = 8;
  this.storage = [];
  this.length = this.storage.length;
}

HashTable.prototype.insert = function(k, v) {
  var index = getIndexForKey(k, this.limit);

  if (!this.storage[index]) {
    this.storage[index] = [];
    this.storage[index].push([k, v]);
    this.length = this.storage.length;
    if (this.length >= (this.limit/2)) {
      this.limit = this.limit * 2;
    }
  } else {
    for (var i = 0; i < this.storage[index].length; i++) {
      if (k === this.storage[index][i][0]) {
        this.storage[index][i][1] = v;
        console.log('this.length', this.length, 'this.storage.length', this.storage.length);
        return;
      }
    }
    this.storage[index].push([k, v]);
  }
};

HashTable.prototype.retrieve = function (k) {
  var index = getIndexForKey(k, this.limit);

  for (var i = 0; i < this.storage[index].length; i++) {
    if (k === this.storage[index][i[0]]) {
      return this.storage[index][i][1];
    }
  }
  return undefined;
};

HashTable.prototype.remove = function (k) {
  var index = getIndexForKey(k, this.limit);
  var memory = this.storage[index];

  if (memory) {
    for (var i = 0; i < memory.length; i++) {
      if (k === memory[i][0]) {
        memory.splice(i, 1);
        this.length--;
        if (this.length <= (this.limit * 2)) {
          this.limit = this.limit / 2;
        }
        if (!memory.length) {
          delete this.storage[index];
        }
      }
    }
  }
};