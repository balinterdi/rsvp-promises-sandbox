var examples = {};

function prettyExample(name) {
  return examples[name].toString();
};

function runExample(name) {
  var example = examples[name];
  example();
};

function addExample(name, fn) {
  examples[name] = fn;
}

// new RSVP.Promise takes a resolver function as its first argument
// the resolver function describes how to resolve that promise and what
// value to fulfill or reject it with.
var resolve = RSVP.resolve;
var reject =  RSVP.reject;

function logAndReturn(x, y) {
  $('.results').append('<div>' + x + '</div>');
  return y ? y : x;
};

function logErrorAndReturn(x, y) {
  $('.results').append('<div class="error">Error caught: ' + x + '</div>');
}

function log(x) {
  $('.results').append("<div>" + x + "</div>");
}

      // promise2 = promise1.then(onFulfilled, onRejected)
      // promise1 is resolved (fulfilled or rejected) with value x

      // new RSVP.Promise(function(resolve, reject) {
      //   // 1. You execute the async operation (e.g getJSON)
      //   // 2. If the operation succeeds, call resolve with the result (if any)
      //   // 3. If the operation fails, call reject with the error reason
      // });


      // animal is assigned a value here
      // new RSVP.Promise(function(resolve, reject) {
      //   setTimeout(function() {
      //     var niceAnimals = ['rhino', 'elephant', 'dolphin'];
      //     if (niceAnimals.indexOf(animal) !== -1) {
      //       resolve(animal);
      //     } else {
      //       reject(animal);
      //     }
      //   }, 0);
      // });


      // resolve("rhino")
      // .then(log)
      // .then(function(animal) {
      //   log(animal.toUpperCase());
      // })
      // .then(null, logErrorAndReturn)

      // rhino
      // Error caught: TypeError: Cannot read property 'toUpperCase' of undefined


