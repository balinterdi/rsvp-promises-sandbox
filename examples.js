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
})();
