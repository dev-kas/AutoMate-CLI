import cli from '../cli';
import fs from 'fs';
import path from 'path';
import { GlobalKeyboardListener } from 'node-global-key-listener';

const mapping = {
  BACKSPACE: 'backspace',
  DELETE: 'delete',
  RETURN: 'enter',
  TAB: 'tab',
  ESCAPE: 'escape',
  'UP ARROW': 'up',
  'DOWN ARROW': 'down',
  'LEFT ARROW': 'left',
  'RIGHT ARROW': 'right',
  HOME: 'home',
  END: 'end',
  'PAGE UP': 'pageup',
  'PAGE DOWN': 'pagedown',
  F1: 'f1',
  F2: 'f2',
  F3: 'f3',
  F4: 'f4',
  F5: 'f5',
  F6: 'f6',
  F7: 'f7',
  F8: 'f8',
  F9: 'f9',
  F10: 'f10',
  F11: 'f11',
  F12: 'f12',
  'LEFT META': 'command',
  'LEFT ALT': 'alt',
  'LEFT CTRL': 'control',
  'LEFT SHIFT': 'shift',
  'RIGHT SHIFT': 'right_shift',
  SPACE: 'space',
  'PRINT SCREEN': 'printscreen',
  INS: 'insert',
  'NUMPAD 0': 'numpad_0',
  'NUMPAD 1': 'numpad_1',
  'NUMPAD 2': 'numpad_2',
  'NUMPAD 3': 'numpad_3',
  'NUMPAD 4': 'numpad_4',
  'NUMPAD 5': 'numpad_5',
  'NUMPAD 6': 'numpad_6',
  'NUMPAD 7': 'numpad_7',
  'NUMPAD 8': 'numpad_8',
  'NUMPAD 9': 'numpad_9',
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  E: 'e',
  F: 'f',
  G: 'g',
  H: 'h',
  I: 'i',
  J: 'j',
  K: 'k',
  L: 'l',
  M: 'm',
  N: 'n',
  O: 'o',
  P: 'p',
  Q: 'q',
  R: 'r',
  S: 's',
  T: 't',
  U: 'u',
  V: 'v',
  W: 'w',
  X: 'x',
  Y: 'y',
  Z: 'z'
}

cli
  .command('record <outputfile>')
  .option("-a, --append", "Append to existing file", false)
  .description('Record activity and save it to the specified file.')
  .action(async (outputfile: string, options: any) => {
    if (!fs.existsSync(path.resolve(outputfile))) {
      fs.writeFileSync(path.resolve(outputfile), '', 'utf8');
    }

    let append = options.append;

    if (!append) {
      fs.writeFileSync(path.resolve(outputfile), '', 'utf8');
    }

    // TODO: Start recording
    const listener = new GlobalKeyboardListener();
    listener.addListener((e, down) => {
      console.log(e, down)
    });
  });

