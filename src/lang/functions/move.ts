import * as robot from 'robotjs';

/*
-- Move mouse to (X, Y)
--<
    MOVE <x> <y>
        defaults:
            x: current_pos
            y: current_pos
>--

MOVE 100 100
*/

export function move(...args: string[]): void {
  let x = args[1] || String(robot.getMousePos().x);
  let y = args[2] || String(robot.getMousePos().y);

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
}
