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
      log('2');
      return new RSVP.Promise(function(resolve, reject) {
        log('3');
        var niceAnimals = ['rhino', 'elephant', 'dolphin'];
        if (niceAnimals.indexOf(animal) !== -1) {
          resolve(animal);
        } else {
          reject(animal);
        }
      });
    }
    log('1');
    var promise = animalPromise('dolphin');
    log('4');
    promise.then(function(animal) {
      log('6');
      log("A " + animal + " is a nice animal");
    });
    log('5');
    promise.then(function(animal) {
      log("I like " + animal + "s");
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

  function example7() {
    function retry(promiseGenerator, n) {
      return new RSVP.Promise(function(resolve, reject) {
        (function tryIt(retries, success, failure) {
          promiseGenerator().then(function(value) {
            log(value);
            success(value);
          }, function(reason) {
            log(reason + ", " + retries + " tries left");
            if (retries > 0) {
              tryIt(retries-1, success, failure);
            } else {
              failure(reason);
            }
          });
        })(n, resolve, reject);
      });
    }

    retry(diceToss, 2)
      .then(function(value)  { log('Success :) ' + value) },
            function(reason) { log('Failure :( ' + reason) });
  }
  addExample('example-7', example7);

  function example8() {
    function retry(promiseGenerator, n) {
      return new RSVP.Promise(function(resolve, reject) {
        (function tryIt(retries, delay, success, failure) {
          setTimeout(function() {
            promiseGenerator().then(function(value) {
              log(value);
              success(value);
            }, function(reason) {
              log(reason + ", " + retries + " tries left");
              if (retries > 0) {
                delay = delay === 0 ? 200 : delay * 2;
                tryIt(retries-1, delay, success, failure);
              } else {
                failure(reason);
              }
            });
          }, delay);
        })(n, 0, resolve, reject);
      });
    }

    retry(diceToss, 10)
      .then(function(value)  { log('Success :) ' + value) },
            function(reason) { log('Failure :( ' + reason) });
  }
  addExample('example-8', example8);

  function randomDelay() {
    return Math.floor(Math.random() * 200);
  }

  function example9() {
    function delayedResolve(value, delay) {
      return new RSVP.Promise(function(resolve) {
        setTimeout(function() {
          log(value);
          resolve(value);
        }, delay || randomDelay());
      });
    }

    function delayedReject(value, delay) {
      return new RSVP.Promise(function(_, reject) {
        setTimeout(function() {
          log(value);
          reject(value);
        }, delay || randomDelay());
      });
    }

    var promise1 = delayedResolve("Promise 1", 100);
    var promise2 = delayedResolve("Promise 2");
    var promise3 = delayedReject("Promise 3");
    var promises = [promise1, promise2, promise3];
    return RSVP.Promise.race(promises).then(function(value) {
      log(value + " succeeded");
    }, function(reason) {
      log(reason + " failed");
    });
  }
  addExample('example-9', example9);
})();



