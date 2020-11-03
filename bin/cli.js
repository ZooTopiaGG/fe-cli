process.env.NODE_PATH = __dirname + "/../node_modules";
const path = require("path");
const program = require("commander");
const pkg = require("../package.json");
const chalk = require("chalk");
const resolve = (command) => path.resolve(__dirname, "../commands", command);
const log = console.log;

// 用法示例  command 命令行 options 选项
program.version(pkg.version, "-v, --version").usage("<command>");

log(chalk.green(`当前版本：${pkg.version}`));

// ** 选项和命令分开注册
program
  .option("-d, --debug", "output extra debugging")
  .option("-s, --small", "small pizza size")
  .option("-p, --pizza-type <type>", "flavour of pizza")
  .option("-t, --template [template]", "enable some foo");

program
  .command("create <app-name> <project-name>")
  .description("Generate a new project")
  .action(() => {
    require(resolve("init"));
  });

// 把命令行参数传给commander解析 一定要放在最后
program.parse(process.argv);

if (program.template !== undefined)
  console.log(`template: ${program.template}`);
// console.log(program.parse(process.argv));
if (program.debug !== undefined) log(`float: ${program.debug}`);
if (program.small !== undefined) log(`integer: ${program.small}`);
if (program.pizzaType !== undefined) log(program.pizzaType);
if (program.template !== undefined) log(program.template);

if (!program.args.length) {
  program.help();
}
