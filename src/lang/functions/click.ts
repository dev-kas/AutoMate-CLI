import * as robot from 'robotjs';

/*
-- Click mouse at (X, Y)
--<
    CLICK <button: left/middle/right> <x> <y> <state: tap/down/up> <dbl: true/false>
        defaults:
            button: left
            x: current_pos
            y: current_pos
            state: tap
            dbl: false
>--

CLICK left 100 100
CLICK right 100 100
CLICK
*/

export function click(...args: string[]): void {
  const button: 'left' | 'right' | 'middle' =
    args[0] === 'left' || args[0] === 'right' || args[0] === 'middle' ? args[0] : 'left';
  let x = args[1] || String(robot.getMousePos().x);
  let y = args[2] || String(robot.getMousePos().y);
  const state: 'up' | 'down' | 'tap' =
    args[3] === 'up' || args[3] === 'down' || args[3] === 'tap' ? args[3] : 'tap';
  const dbl: boolean = args[4] === 'true';

  if (x === 'current_pos') {
    x = String(robot.getMousePos().x);
  }
  if (y === 'current_pos') {
    y = String(robot.getMousePos().y);
  }

  const position = {
    x: parseFloat(x),
    y: parseFloat(y),
  };

  robot.moveMouse(position.x, position.y);
  if (state === 'tap') {
    console.debug(`< arg4: ${args[4]} dbl: ${dbl} button: ${button} x: ${x} y: ${y}`);
    robot.mouseClick(button, dbl);
  } else if (state === 'down') {
    robot.mouseToggle('down', button);
  } else if (state === 'up') {
    robot.mouseToggle('up', button);
  }

  console.log(`< CLICK: clicked at (${x}, ${y})`);
}
