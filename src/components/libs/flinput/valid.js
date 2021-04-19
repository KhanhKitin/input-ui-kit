function allnumeric(inputtxt)
   {
      var numbers = /^[0-9]+$/;
      return inputtxt.match(numbers)
      
   } 

export default {
   isAllnumeric: allnumeric
};