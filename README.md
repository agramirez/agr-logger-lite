agr-logger-web
==============

Simple logger defined with requirejs.  Useful for logging and can be modified for use in other environments like node.

# Quickstart 

Download from github and include it somewhere in your application.  Reference it with RequireJS and you are set to go.

```javascript
  require(['logger', function (logger) {
    logger.on(); // needs to be turned on so output can be displpayed
    
    function myFunction() {
      logger.start('myFunction');
      
      logger.end('myFunction');
    }
    
    function myOtherFunction(params) {
      var x, y, sum;
      loger.start('myOtherFunction');
      
      logger.val(params); // displays value of params
      
      x = 10;
      y = 2;
      sum = x + y;
      
      logger.val({ x: x, y: y, sum: sum }); // displays values of x, y, and sum
      
      logger.end('myOtherFunction').on(); // end must be called BEFORE a value is returned
      return sum; 
    }
    
    logger.msg('starting functions');
    myFunction();
    myOtherFunction({ some: 'value' });
    logger.msg('done calling function');
    
    logger.off(); // turns logging off, no messages are output until it is turned on again
    
    logger.msg('this message will never be seen'); // does not get displayed because logging was turned off
  });
```
