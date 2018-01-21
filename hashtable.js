HashTable.prototype.retrieve=function(k){
var index = getIndexForKey(k,this.limit);
var location = this.Storage[index];

for(var value of location){
if (k === value[0]){
    reuturn value[1];
   }
 }
  return undefind;
}