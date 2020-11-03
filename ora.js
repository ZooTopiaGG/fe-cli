const ora = require("ora");
const chalk = require("chalk");
const spinner = ora({
  text: `Loading ${chalk.red("unicorns")}`,
  spinner: "dots",
  prefixText: "what?",
}).start();

setTimeout(() => {
  spinner.color = "yellow";
  spinner.text = `Loading ${chalk.blue("rainbows")}`;
}, 1000);
