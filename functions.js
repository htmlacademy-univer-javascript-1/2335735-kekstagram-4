const lengthCheck = function(string, length) {
  if(string.length <= length){
    return true;
  }
  return false;
};
lengthCheck('Test', 4);
