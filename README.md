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

# Application Programming Interface

## logger.on()

Turns logging on.  Logging is off by default so unless the default configurations are changed no messages will be displayed until this function is called.

**Example**

```javascript
  logger.on();
  
  logger.msg('show me'); // will display
  
  logger.off();
  
  logger.msg('do not show me'); // will not display
```

## logger.off()

Turns logging off.  No log messages will be displayed after this function is called unless logger.on() is called again.

**Example** 

```javascript
  logger.on();
  
  logger.msg('show me'); // will display
  
  logger.off();
  
  logger.msg('do not show me'); // will not display
```

## logger.start(name)

Displays a message stating which function, code block, module, etc. is being called.  It's pripary purpose is to help identify output by adding tab spacing and other features to make it look nice.  

> Note that it is important to always call logger.end(name) at some point so spacing can be accurately preserved.

**Parameters**

1. name, String: Name of the function or code block being executed.  Can be blank.

**Example**

```javascript
  function myFunctionName() {
    logger.start('myFunctionName');
   
    logger.start('important code block');
    // do something important
    logger.end('imprtant code block');
    logger.end('myFunctionName');
  }
```






