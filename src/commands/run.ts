import fs from 'fs';
import path from 'path';
import cli from '../cli';
import tokenize from '../lang/tokenize';
import * as functions from '../lang/functions';
import chalk from 'chalk';

cli
  .command('run <filename>')
  .option('-r, --repeat <number>', 'Repeat the script (0: Infinity)', '1')
  .description('Run a .KM MacroScript')
  .action(async (filename, options) => {
    if (!fs.existsSync(path.resolve(filename))) {
      console.error(`File ${filename} does not exist`);
      process.exit(1);
    }

    let repeat = Number(options.repeat);

    if (repeat === 0) {
      repeat = Infinity;
    }

    // console.log(chalk.bold(`Running ${filename} ${repeat} times...`));

    const data = fs.readFileSync(path.resolve(filename), 'utf-8');

    const tokens = tokenize(data);

   for (let i = 0; i < repeat; i++) {
     for (const token of tokens) {
      let [cmd, ...args]: [...string[]] = token.split(' ');
      cmd = cmd.toLowerCase();
      // if (cmd === 'help') {
      //   console.log('CLEAR    Clear the console');
      //   // console.log('EDITOR   Enter editor mode');
      //   console.log('EXIT     Exit the REPL');
      //   console.log('HELP     Print this help message');
      //   // console.log('LOAD     Load JS from a file into the REPL session');
      //   // console.log('SAVE     Save all evaluated commands in this REPL session to a file');
      // } else if (cmd === 'exit') {
      //   break;
      // } else if (cmd === 'clear') {
      //   console.clear();
      // } else 
      if (cmd in functions) {
        if (cmd === "click") functions.click(...args);
        if (cmd === "key") functions.key(...args);
        if (cmd === "move") functions.move(...args);
        if (cmd === "type") functions.type(...args);
        if (cmd === "wait") await functions.wait(...args);
      } else {
        console.error(`< ${chalk.redBright('Uncaught ReferenceError')}:`, chalk.bgRed(" "+cmd.toUpperCase()+" "), chalk.red("is not defined"));
      }
    }
  }
  });
