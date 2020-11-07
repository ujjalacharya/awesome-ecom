
var funPattern = /@([a-z$_][a-z0-9$_]*(?:\.[a-z$_][a-z0-9$_]*)*)\(([^\)]*)\)/i;
var varPattern = /@([a-z$_][a-z0-9$_]*(?:\.[a-z$_][a-z0-9$_]*)*)/i;

module.exports = function (template, locals, callback) {
  var parts = [
  ];
  var match;
  var index = 0;
  while (match = funPattern.exec(template.substr(index))) {
    var line = template.substr(index, match.index);
    if (line) parts.push(addPlain(line));
    parts.push('execute(' + parts.length + ', ' + match[1] + ', [' + match[2] + ']);');
    index += match.index + match[0].length;
  }
  var line = template.substr(index);
  if (line) parts.push(addPlain(line));

  var compile = new Function("locals", "callback",
    "var chunks, position = 0;\n" +
    "process.nextTick(function () { with(locals) {\n" +
    "  chunks = new Array(" + parts.length + ");\n" +
    "  " + parts.join("\n  ") + "\n" +
    "  check();\n" +
    "}}.bind(locals));\n" +
    "return;\n" +
    "\n" +
    "function check() {\n" +
    "  var pieces = [];\n" +
    "  while (chunks[position] && position < chunks.length) {\n" +
    "    position++;\n" +
    "  }\n" +
    "  if (position === chunks.length) {\n" +
    "    callback(null, chunks.join(''));\n" +
    "  }\n" +
    "}\n" +
    "\n" +
    "function execute(position, fn, args) {\n" +
    "  try {\n" +
    "    args.push(function (err, result) {\n" +
    "      if (err) {\n" + 
    "        callback(err);\n" +
    "        return;\n" +
    "      }\n" +
    "      chunks[position] = result;\n" +
    "      check();\n" +
    "    });\n" +
    "    chunks[position] = fn.apply(null, args);\n" +
    "  } catch (err) {\n" +
    "    callback(err);\n" +
    "  }\n" +
    "}\n"
  );
  return locals ? compile(locals, callback) : compile;
  
  // compile the sync parts of the template into a static string concat
  function addPlain(line) {
    var lineParts = [];
    var match;
    var index = 0;
    while (match = varPattern.exec(line.substr(index))) {
      var plain = line.substr(index, match.index);
      if (plain) lineParts.push(JSON.stringify(plain));
      lineParts.push('(' + match[1] + ')');
      index += match.index + match[0].length;
    }
    var plain = line.substr(index);
    if (plain) lineParts.push(JSON.stringify(plain));
    return 'chunks[' + parts.length + '] = (' + lineParts.join(" + ") + ');';
  }
}

