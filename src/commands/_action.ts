import chalk from 'chalk';
import readline from 'readline';
import cli from '../cli';
import tokenize from '../lang/tokenize';
import * as functions from '../lang/functions';

declare const __config__: Record<string, any>;
declare const __version__: string;

function semverDestructure(version: string) {
  const regex = /^(\d+)\.(\d+)\.(\d+)(?:\.(.+))?$/;
  const match = version.match(regex);

  if (!match) {
    throw new Error('Invalid input format');
  }

  const [, major, minor, patch, extraOptional] = match;

  return {
    major,
    minor,
    patch,
    extra: extraOptional || '',
  };
}

cli.action(async () => {
  const version = semverDestructure(__version__);

  console.log(
    'Welcome to ' +
      chalk.green(__config__.product_name) +
      ' v' +
      chalk.green(version.major) +
      '.' +
      chalk.greenBright(version.minor) +
      '.' +
      chalk.yellowBright(version.patch) +
      (version.extra.trim() !== '' ? `.${chalk.redBright(version.extra)}` : '') +
      '.',
  );
  console.log('Type ' + chalk.green('HELP') + ' for more information.');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  mainLoop: while (true) { // Label the loop as mainLoop
    const input = await new Promise<string>((resolve) => {
      rl.question('> ', resolve);
    });

    const tokens = tokenize(input);
    
    for (const token of tokens) {
      let [cmd, ...args]: [...string[]] = token.split(' ');
      cmd = cmd.toLowerCase();
      if (cmd === 'help') {
        console.log(`${chalk.greenBright('CLEAR')}    ${chalk.green('Clear the console')}`);
        // console.log('EDITOR   Enter editor mode');
        console.log(`${chalk.greenBright('EXIT')}     ${chalk.green('Exit the REPL')}`);
        console.log(`${chalk.greenBright('HELP')}     ${chalk.green('Print this help message')}`);
        // console.log('LOAD     Load JS from a file into the REPL session');
        // console.log('SAVE     Save all evaluated commands in this REPL session to a file');
        console.log(chalk.gray('=====    ==========================='));
        console.log(`${chalk.greenBright('CLICK')}    ${chalk.green('CLICK <button: left/middle/right> <x> <y> <state: tap/down/up> <dbl: true/false>')}`);
        console.log(`${chalk.greenBright('KEY')}      ${chalk.green('KEY <key> <state: tap/down/up>')}`);
        console.log(`${chalk.greenBright('MOVE')}     ${chalk.green('MOVE <x> <y>')}`);
        console.log(`${chalk.greenBright('TYPE')}     ${chalk.green('TYPE <data>')}`);
        console.log(`${chalk.greenBright('WAIT')}     ${chalk.green('WAIT <duration>')}`);
      } else if (cmd === 'exit') {
        break mainLoop;
      } else if (cmd === 'clear') {
        console.clear();
      } else if (cmd in functions) {
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

  rl.close();
});

/*
> node
Welcome to PRODUCT_NAME vVE.RS.I.ON.
Type "HELP" for more information.
> HELP
BREAK    Sometimes you get stuck, this gets you out
CLEAR    Alias for BREAK
EDITOR   Enter editor mode
EXIT     Exit the REPL
HELP     Print this help message
LOAD     Load JS from a file into the REPL session
SAVE     Save all evaluated commands in this REPL session to a file

Press Ctrl+C to abort current expression, Ctrl+D to exit the REPL
> 
(To exit, press Ctrl+C again or Ctrl+D or type .exit)
> 
*/
