import { Terminal } from 'xterm';
import chalk from 'chalk';
chalk.level = 2;

export default new Terminal({
  cursorBlink: true,
  visualBell: true,
  theme: {
    background: '#002b36',
    foreground: '#eee8d5',
    yellow: '#b58900',
    orange: '#cb4b16',
    red: '#dc322f',
    magenta: '#d33682',
    violet: '#6c71c4',
    blue: '#268bd2',
    cyan: '#2aa198',
    green: '#859900',
  }
});
