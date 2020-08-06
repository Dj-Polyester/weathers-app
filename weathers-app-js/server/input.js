const readline = require("readline");

process.stdin.pause();

function input(keyvalue) {
  var lines = keyvalue["lines"] - 1;
  const prompt = keyvalue["prompt"];
  var data = "";
  if (prompt) console.log(prompt);

  process.stdin.resume();

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", function (chunk, key) {
    process.stdin.write(key.sequence);

    if (key && key.ctrl) {
      const ctrlkey = keyvalue["ctrl-" + key.name];
      if (ctrlkey) ctrlkey();
    } else if (key) {
      data += key.sequence;

      const tmpkey = keyvalue[key.name];
      //all keys on the keyboard
      if (tmpkey) tmpkey();
      //backspace if not specified
      else if (!tmpkey && key.name === "backspace") {
        process.stdin.write("\b \b");
        data = data.slice(0, -1);
      }
      //response if return not specified
      else if (!tmpkey && key.name === "return") {
        if (lines) --lines;
        else if (lines === 0) process.stdin.pause();
        process.stdin.write("\n");
        const reskey = keyvalue["response"];
        if (reskey) reskey(data);
        data = "";
      }
    }
  });
}

module.exports = input;
