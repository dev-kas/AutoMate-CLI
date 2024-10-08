import chalk from 'chalk';
import * as robot from 'robotjs';

/*
-- Press key
--<
    KEY <key> <state: tap/down/up>
        defaults:
            state: tap
>--

KEY k down
KEY k up
*/

export function key(...args: string[]): void {
  let key: string = args[0];
  const state: 'up' | 'down' | 'tap' = args[1] === 'up' || args[1] === 'down' || args[1] === 'tap' ? args[1] : 'tap';

  try {
    if (state === 'down') {
      robot.keyToggle(key, 'down');
      // console.log(`< KEY: Pressed '${key}'`);
    } else if (state === 'up') {
      robot.keyToggle(key, 'up');
      // console.log(`< KEY: Released '${key}'`);
    } else {
      robot.keyTap(key);
      // console.log(`< KEY: Tapped '${key}'`);
    }
  } catch (err: any) {
    if (err.message === "Invalid key code specified.") {
      console.error(`< ${chalk.redBright('Invalid key code')}`, chalk.bgRed(" "+key.toUpperCase()+" "), chalk.red("specified."));
    }
  }
}
