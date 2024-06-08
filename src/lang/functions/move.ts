import * as robot from 'robotjs';

export function move(...args: string[]): void {
  console.log('< move : function called with args: ', args);
  const x = parseFloat(args[0]) || 500;
  const y = parseFloat(args[1]) || 500;
  console.log('< move function called with args: ', x, y);
  robot.moveMouse(x, y);
}
