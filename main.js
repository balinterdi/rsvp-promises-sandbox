var examples = {};

function prettyExample(name) {
  var example = examples[name].toString();
  example = example.replace(/\n/g, "<br />");
  return example.replace(/\s{2,}/g, function(indent) {
    var htmlIndent = [];
    for (var i=0; i<indent.length; i++) {
      htmlIndent.push("&nbsp;");
    }
    return htmlIndent.join('');
  });
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

