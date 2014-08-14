(function() {
  // Example 1: Basic resolve and reject
  function example1() {
    resolve("rhino").then(logAndReturn); // => rhino
    reject("snake").then(null, logAndReturn); // => snake
  }

  addExample('example-1', example1);

  // Example 2: Simple chains
  function example2() {
    resolve("rhino")
    .then(function(animal) {
      return logAndReturn(animal, "elephant"); //
    })
    .then(logAndReturn);
  }

  addExample('example-2', example2);

  // Example 3: Chaining with missing handlers
  function example3() {
    // "If onFulfilled is not a function and promise1 is fulfilled, promise2 must
    // be fulfilled with the same value as promise1."
    resolve("rhino")
    .then()
    .then()
    .then(logAndReturn);

    // "If onRejected is not a function and promise1 is rejected, promise2 must be
    // rejected with the same reason as promise1."
    // Make possible error handling in one place, as the last element in the chain
    reject("snake")
    .then(logAndReturn)
    .then(logAndReturn)
    .then(null, logAndReturn);
  }
  addExample('example-3', example3);

  // Example 4: Error handling at the end of the chain
  function example4() {
    resolve("rhino")
    .then(log)
    .then(function(animal) {
      log(animal.toUpperCase());
    })
    .then(null, logErrorAndReturn)
  }
  addExample('example-4', example4);

  function example5() {
    function animalPromise(animal) {
      console.log('2');
      return new RSVP.Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log('4');
          var niceAnimals = ['rhino', 'elephant', 'dolphin'];
          if (niceAnimals.indexOf(animal) !== -1) {
            resolve(animal);
          } else {
            reject(animal);
          }
        }, 0);
      });
    }
    console.log('1');
    var promise = animalPromise('dolphin');
    console.log('3');
    promise.then(function(animal) {
      console.log('5');
      console.log("A " + animal + " is a nice animal");
    });
    promise.then(function(animal) {
      console.log("I like " + animal + "s");
    });
    promise.then(null, function(animal) {
      console.log("Not a fan of " + animal + "s");
    });
  }

  addExample('example-5', example5);

  function example6() {
    function wait(time) {
      return new RSVP.Promise(function(resolve) {
        setTimeout(function() {
          resolve();
        }, time);
      });
    }
    var promise = wait(3000);
    var checked = 1;
    function checkPromise() {
      logAndReturn('Checked ' + checked + ' times, state: ' + promise._state);
      checked++;
      timer = setTimeout(checkPromise, 500);
    }
    var timer = setTimeout(checkPromise, 500);
    promise.then(function() {
      logAndReturn('Promise resolved, state: ' + promise._state);
      clearTimeout(timer);
    });
  }
  addExample('example-6', example6);

  function example7() {
    function retry(promiseGenerator, tryCount) {
      return new RSVP.Promise(function(resolve, reject) {
        var tries = [];
        for (var i=0; i<tryCount; i++ ) { tries.push(promiseGenerator()); }
        return RSVP.any(tries).then(function(result) {
          log('Retry successful: ' + result);
          resolve(result);
        }, function(reason) {
          log('Retry failed ' + reason);
          reject(reason);
        });
      });
    }

    function diceToss() {
      return new RSVP.Promise(function(resolve, reject) {
        setTimeout(function() {
          var n = Math.floor(Math.random() * 6) + 1;
          log("Rolled a " + n);
          if (n === 6) {
            resolve("Yay, rolled a 6");
          } else {
            reject("Ah, can't roll a 6");
          }
        }, 0);
      });
    }

    retry(diceToss, 3)
      .then(function(value)  { console.log('Success :) ' + value) },
            function(reason) { console.log('Failure :( ' + reason) });
  }
  addExample('example-7', example7);
})();



