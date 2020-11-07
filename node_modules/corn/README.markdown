# Corn

Corn is a simple async template framework for node.  It's based on the proof-of-concept corn in the creationix/grain module.

## Usage

    var Corn = require('corn');

    var templ = Corn("Hello @world, my name is @getName()");

    templ({
      world: "Earth",
      getName: function (callback) {
        setTimeout(function () {
          callback(null, "Tim");
        });
      }
    }, function (err, output) {
      if (err) throw err;
      console.log(output);
    });

The module exports a function that compiles a source template into a template function.

That function then takes a hash of locals and a callback for when it's done.

## Simple Placeholders

As seen in the first example, there are simple placeholders.  These are defined as `@name` where name is any valid variable name.  Also `.` is allowed so `@obj.prop` is also valid.

These simple placeholders are directly replaced by the value given in the data hash.  The resulting template function does simple string concat on them.

## Async Data Providers

In a node program, there is often data that can't be determined in sync time.  It can only be retrieved after a callback.  This often leads to complex callback based code to aquire all the needed data parts.

The greatest value of Corn is the ability to turn this problem on it's head.  Simply define data provider functions in the template and Corn will run them all concurrently and handle gathering for you.  This allows an application author to just declare where data comes from and then use normal node async functions to get the data.  It will all be combined and the template's callback will be called when all the placeholders are filled.

As seen in the example, the syntax is `@funcname()`.   This also supports arguments and `.` access so `@obj.method(arg1, arg2)` will call `obj.method(arg1, arg2, callback)`.

