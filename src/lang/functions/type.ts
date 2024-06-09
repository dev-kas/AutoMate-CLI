import * as robot from 'robotjs';

/*
-- Typewrte string
--<
    TYPE <string>
>--

TYPE Hello, World!
*/

export function type(...args: string[]): void {
  let data = args[0];
  robot.typeString(data);
  console.log(`< TYPE: typed '${data}'`);
}
