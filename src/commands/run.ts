import fs from 'fs';
import path from 'path';
import cli from '../cli';
import tokenize from '../lang/tokenize';
import * as functions from '../lang/functions';

cli
  .command('run <filename>')
  .description('Run a .KM MacroScript')
  .action(async (filename) => {
    if (!fs.existsSync(path.join(process.cwd(), filename))) {
      console.error(`File ${filename} does not exist`);
      process.exit(1);
    }

    const data = fs.readFileSync(path.join(process.cwd(), filename), 'utf-8');

    const tokens = tokenize(data);

    for (const token of tokens) {
      let [cmd, ...args]: [...string[]] = token.split(' ');
      cmd = cmd.toLowerCase();
      if (cmd === 'help') {
        console.log('CLEAR    Clear the console');
        // console.log('EDITOR   Enter editor mode');
        console.log('EXIT     Exit the REPL');
        console.log('HELP     Print this help message');
        // console.log('LOAD     Load JS from a file into the REPL session');
        // console.log('SAVE     Save all evaluated commands in this REPL session to a file');
      } else if (cmd === 'exit') {
        break;
      } else if (cmd === 'clear') {
        console.clear();
      } else if (cmd in functions) {
        if (cmd === "click") functions.click(...args);
        if (cmd === "key") functions.key(...args);
        if (cmd === "move") functions.move(...args);
        if (cmd === "type") functions.type(...args);
        if (cmd === "wait") functions.wait(...args);
      } else {
        console.error('< Uncaught ReferenceError:', cmd.toUpperCase(), "is not defined");
      }
    }
    console.log('Bye!');
  });
