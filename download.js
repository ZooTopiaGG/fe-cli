const download = require("download-git-repo");
const chalk = require("chalk");

download(
  "direct:https://gitee.com/lelewj/js-skulpt.git#master",
  "test/tmp",
  { clone: true },
  function (err) {
    console.log(err);
    console.log(err ? chalk.red("Error") : chalk.green("Success"));
  }
);
