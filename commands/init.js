const inquirer = require("inquirer");
const program = require("commander");
const download = require("download-git-repo");
const chalk = require("chalk");
const ora = require("ora");
const fs = require("fs");
const log = console.log;

const options = program.opts();

const _args = program.args;

const defaultName = typeof _args[1] === "string" ? _args[1] : "ddc-project";

const tplList = require(`${__dirname}/../templates`);
const tplLists = Object.keys(tplList) || [];
const questions = [
  {
    type: "input",
    name: "name",
    message: "项目名称",
    default: defaultName,
    // 过滤空空
    filter(val) {
      return val.trim();
    },
    // 校验项目名称必填
    validate(val) {
      const validate = val.trim().split(" ").length === 1;
      return validate || "项目名称必填";
    },
    transformer(val) {
      return val;
    },
  },
  {
    type: "input",
    name: "description",
    message: "项目描述",
    default: "",
    transformer(val) {
      return val;
    },
  },
  {
    type: "input",
    name: "author",
    message: "作者",
    default: "",
    transformer(val) {
      return val;
    },
  },
];

const tempList = {
  type: "list",
  name: "template",
  message: "项目模板",
  choices: tplLists,
  default: tplLists[0],
  validate(val) {
    return true;
  },
  transformer(val) {
    return val;
  },
};

if (!options.template) {
  questions.splice(2, 0, tempList);
}

inquirer
  .prompt(questions)
  .then((answers) => {
    const tempName = options.template || answers.template;
    const tplValue = tplList[tempName];
    // Use user feedback for... whatever!!
    log(chalk.blue("\nOrder receipt:"));
    const spinner = ora("Downloading please wait...").start();
    log(JSON.stringify(answers, null, "  "));
    // 从git上获取模板下载
    const gitUrl = `${tplValue["place"]}${tplValue["branch"]}`;
    download(gitUrl, defaultName, { clone: true }, function (err) {
      log(err);
      log(err ? chalk.red("Error") : chalk.green("Success"));
      if (err) {
        spinner.stop();
        process.exit(1);
      }
      const pkgJsonUrl = `./${defaultName}/package.json`;
      fs.readFile(pkgJsonUrl, "utf8", function (err, fileData) {
        if (err) {
          spinner.stop();
          process.exit(1);
        }
        const packageJson = JSON.parse(fileData);
        packageJson.name = answers.name;
        packageJson.description = answers.description;
        packageJson.author = answers.author;
        const updatePackageJson = JSON.stringify(packageJson, null, 2);
        fs.writeFile(pkgJsonUrl, updatePackageJson, "utf8", function (
          err,
          fileData
        ) {
          if (err) {
            spinner.stop();
            return;
          } else {
            spinner.stop();
            console.log(chalk.green("project create successfully!"));
            console.log(`
                  ${chalk.bgWhite.black("   Run Application  ")}
                  ${chalk.yellow(`cd ${defaultName}`)}
                  ${chalk.yellow("npm install")}
                  ${chalk.yellow("npm start")}
                `);
          }
        });
      });
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
