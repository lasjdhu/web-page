import { type HistoryEntry, type Directory } from './types';

export const AVAILABLE_COMMANDS = ['help', 'clear', 'date', 'echo', 'pwd', 'ls', 'whoami', 'cd', 'history', 'cat', 'su', 'exit'] as const;

export const INITIAL_HISTORY: HistoryEntry[] = [
  {
    content: "Navigate my website using this terminal\nStart by typing 'help' to see available commands",
    type: 'system',
    timestamp: new Date(),
  },
];

export const HELP_TEXT = `Available commands:
  help     Show this help
  clear    Clear terminal
  date     Show current date
  echo     Display text
  pwd      Print working directory
  ls       List directory contents
  whoami   Display current user
  cd       Change directory
  history  Show command history
  cat      Display file contents
  su       Switch user
  exit     Exit current user session`;

export const ROOT_USER = 'root';
export const ROOT_PASSWORD = 'findme';

export const filesystem: Directory = {
  type: 'dir',
  contents: {
    'Documents': {
      type: 'dir',
      contents: {},
      permissions: 'drwxr-xr-x',
      owner: 'user',
      created: new Date(),
      modified: new Date(),
    },
    'Downloads': {
      type: 'dir',
      contents: {},
      permissions: 'drwxr-xr-x',
      owner: 'user',
      created: new Date(),
      modified: new Date(),
    },
    'Pictures': {
      type: 'dir',
      contents: {},
      permissions: 'drwxr-xr-x',
      owner: 'user',
      created: new Date(),
      modified: new Date(),
    },
    'Projects': {
      type: 'dir',
      contents: {},
      permissions: 'drwxr-xr-x',
      owner: 'user',
      created: new Date(),
      modified: new Date(),
    },
    '.bashrc': {
      type: 'file',
      content: 'user bash configuration',
      permissions: '-rw-r--r--',
      owner: 'user',
      created: new Date(),
      modified: new Date(),
    },
    '.gitconfig': {
      type: 'file',
      content: '[user]\nname = Dmitrii Ivanushkin',
      permissions: '-rw-r--r--',
      owner: 'user',
      created: new Date(),
      modified: new Date(),
    },
  },
  permissions: 'drwxr-xr-x',
  owner: 'root',
  created: new Date(),
  modified: new Date(),
};
