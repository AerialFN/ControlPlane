// Takes ESLint output and makes it GitHub-friendly
// i.e. errors & warnings show up in GUIs

const path = require("path");

module.exports = function(results) {
  for (r in results) {
    for (i in results[r]["messages"]) {
      const data = results[r]["messages"][i]

      // Different parameters GitHub can show
      const severity = data["severity"] === 1 ? "warning" : "error"
      const file = path.relative(process.cwd(), results[i]["filePath"])
      const line = data["line"]
      const col = data["column"]
      const message = data["message"]

      console.log(`::${severity} file=${file},line=${line},col=${col}::${message}`)
    };
  };
};

