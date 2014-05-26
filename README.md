agr-logger-web
==============

Simple logger defined with requirejs.  Useful for logging and can be modified for use in other environments like node.

# Table of Contents

1. [Quickstart](#quickstart)
2. [API Reference](#api-reference)

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

[back to top](#table-of-contents)

# API Reference

1. [logger.on](#loggeron)
2. [logger.off](#loggeroff)
3. [logger.start](#loggerstartname)
4. [logger.end](#loggerendname)
4. [logger.msg](#loggermsgmsg)
4. [logger.val](#loggervalvals)
4. [logger.startOn](#loggerstartonname)
4. [logger.endOff](#loggerendoffname)

## logger.on()

Turns logging on.  Logging is off by default so unless the default configurations are changed no messages will be displayed until this function is called.

**Example**

```javascript
  logger.on();
  
  logger.msg('show me'); // will display
  
  logger.off();
  
  logger.msg('do not show me'); // will not display
```

[back to api list](#apireference) | [back to top](#table-of-contents)

## logger.off()

Turns logging off.  No log messages will be displayed after this function is called unless logger.on() is called again.

**Example** 

```javascript
  logger.on();
  
  logger.msg('show me'); // will display
  
  logger.off();
  
  logger.msg('do not show me'); // will not display
```

[back to api list](#apireference) | [back to top](#table-of-contents)

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

[back to api list](#apireference) | [back to top](#table-of-contents)

## logger.end(name)

Displays a message stating that a code block or function call has ended.  It's pripary purpose is to help identify output by adding tab spacing and other features to make it look nice.  

> Note that it is important to always call logger.start() before logger.end() so spacing can be accurately preserved.

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

[back to api list](#apireference) | [back to top](#table-of-contents)

## logger.msg(msg)

Displays the specified message.  It uses any indentations created by calling logger.start() and logger.end() to display the output in an easier to read way.  That is, we can tell what code block a message belongs to by seeing its indentation level.  This is useful when view output from multiple function calls.

**Parameters**
1. msg, String: Any message we want to log

**Example**

```javascript
  logger.msg('this is my message');
```

[back to api list](#apireference) | [back to top](#table-of-contents)

## logger.val(vals) 

This function takes in an object and recursively displays it's properties.  The output shows the property name and value for each of the object properties.

**Parameters**
1. vals, Object: Object for which to display values.  Each object property corresponds to a key/value pair.

**Example**

```javascript
  var point = { x: 10, y: 20 };
  
  logger.val({ my: '1st value', with: '2nd value', and: { some: 'other', nested: 'value' }});
  logger.val(point);

```

[back to api list](#apireference) | [back to top](#table-of-contents)

## logger.startOn(name)

Displays the start of a code block or function just like logger.start().  However, this function also implicitely calls logger.on() so that any messages after this call are always displayed (regardless of whether or not logger.off() was previously called).

**Parameters**

1. name, String: Name of the function or code block being executed.  Can be blank.

**Example**

```javascript
  function myFunctionName() {
    logger.startOn('myFunctionName');
   
    logger.msg('this will always be shown');
   
    logger.endOff('myFunctionName');
  }
  
  logger.off();
  myFunctionName(); // will display all messages inside myFunctionName
```

[back to api list](#apireference) | [back to top](#table-of-contents)

## logger.endOff(name)

Displays the end of a code block or function just like logger.end().  However, this function also implicitely calls logger.off().  This is useful if we want to turn debugging off after a specific code block initiated with logger.startOn().

**Parameters**

1. name, String: Name of the function or code block being executed.  Can be blank.

**Example**

```javascript
  function myFunctionName() {
    logger.startOn('myFunctionName');
   
    logger.msg('this will always be shown');
   
    logger.endOff('myFunctionName');
  }
  
  logger.off();
  myFunctionName(); // will display all messages inside myFunctionName
  logger.msg('this will not show'); // not shown because we called logger.endOff() inside our function
```

[back to api list](#apireference) | [back to top](#table-of-contents)



