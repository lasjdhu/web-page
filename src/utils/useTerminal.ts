import { useEffect, useState, type RefObject } from 'react';
import { type HistoryEntry, type EntryType, type File, type Directory } from './types';
import {
  AVAILABLE_COMMANDS,
  INITIAL_HISTORY,
  HELP_TEXT,
  ROOT_USER,
  ROOT_PASSWORD,
  filesystem
} from './constants';

interface UseTerminalProps {
  terminalRef: RefObject<HTMLDivElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

interface UseTerminalReturn {
  input: string;
  history: HistoryEntry[];
  isFullscreen: boolean;
  currentPath: string;
  currentUser: string;
  isAuthenticated: boolean;
  caretPosition: number;
  getPrompt: () => string;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setIsFullscreen: (value: boolean) => void;
}

export function useTerminal({ terminalRef, textareaRef }: UseTerminalProps): UseTerminalReturn {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [currentUser, setCurrentUser] = useState<string>('user');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [caretPosition, setCaretPosition] = useState<number>(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const getDirectory = (path: string): Directory | null => {
    if (path === '/') return filesystem;

    const parts = path.split('/').filter(Boolean);
    let current: Directory | File = filesystem;

    for (const part of parts) {
      if (current.type !== 'dir' || !current.contents[part]) return null;
      current = current.contents[part];
    }

    return current.type === 'dir' ? current : null;
  };

  const getFile = (path: string): File | Directory | null => {
    if (path === '/') return filesystem;

    const parts = path.split('/').filter(Boolean);
    let current: Directory | File = filesystem;

    for (const part of parts) {
      if (current.type !== 'dir' || !current.contents[part]) return null;
      current = current.contents[part];
    }

    return current;
  };

  const ls = (path: string, args: string[]): string => {
    const currentDir = getDirectory(path);
    if (!currentDir || currentDir.type !== 'dir') return 'No such directory';
    if (args.length > 2) return "Too many args for ls command";
    if (args.length === 2 && !['-a', '-l', '-al', '-la'].includes(args[0])) {
      return `ls: invalid option: ${args[0]}`;
    }

    const showHidden = args.includes('-a') || args.includes('-al') || args.includes('-la');
    const showDetails = args.includes('-l') || args.includes('-al') || args.includes('-la');

    const items = Object.entries(currentDir.contents)
      .filter(([name]) => showHidden || !name.startsWith('.'))
      .map(([name, item]) => {
        if (showDetails) {
          const { permissions, owner, modified } = item;
          return `${permissions} ${owner} ${modified.toLocaleString()} ${name}`;
        }
        return name;
      });

    return items.join('\n');
  };

  const cd = (args: string[]): string => {
    if (args.length === 0) {
      setCurrentPath('/');
      return '';
    }

    if (args.length > 1) return "Too many args for cd command";

    const path = args[0];
    if (path === '..') {
      const pathParts = currentPath.split('/').filter(Boolean);
      pathParts.pop();
      const newPath = `/${pathParts.join('/')}`;
      setCurrentPath(newPath);
      return '';
    }

    const targetPath = path.startsWith('/') ? path : `${currentPath}/${path}`.replace(/\/+/g, '/');
    const targetDir = getDirectory(targetPath);

    if (targetDir && targetDir.type === 'dir') {
      setCurrentPath(targetPath);
      return '';
    }

    return `cd: The directory '${path}' does not exist`;
  };

  const cat = (args: string[]): { output: string; type: EntryType } => {
    if (args.length === 0) return { output: 'cat: missing operand', type: 'error' };

    const path = args[0];
    const file = getFile(path);

    if (!file) return { output: `cat: ${path}: No such file`, type: 'error' };
    if (file.type !== 'file') return { output: `cat: ${path}/: Is a directory`, type: 'error' };

    return { output: file.content, type: 'output' };
  };

  const su = (args: string[]): { output: string; type: EntryType } => {
    if (args.length !== 2 || args[0] !== ROOT_USER) {
      return { output: 'Usage: su root <password>', type: 'error' };
    }

    if (args[1] !== ROOT_PASSWORD) {
      return { output: 'Authentication failed', type: 'error' };
    }

    setCurrentUser(ROOT_USER);
    setIsAuthenticated(true);
    return { output: `Switched to ${ROOT_USER}`, type: 'output' };
  };

  const date = (args: string[]): { output: string; type: EntryType } => {
    let output = new Date().toLocaleString();
    if (args.length > 0) {
      const format = args[0].toLowerCase();
      let dateFormatOptions: Intl.DateTimeFormatOptions = {};

      switch (format) {
        case 'mm/dd/yyyy':
          dateFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
          break;
        case 'yyyy-mm-dd':
          dateFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
          break;
        case 'dd-mm-yyyy':
          dateFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
          break;
        case 'long':
          dateFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          break;
        case 'time':
          dateFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
          break;
        default:
          return {
            output: `Invalid date format. Supported formats:
  mm/dd/yyyy
  yyyy-mm-dd
  dd-mm-yyyy
  long
  time`,
            type: 'error'
          };
      }

      output = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(new Date());
    }
    return { output: output, type: 'output' };

  }

  const handleCommand = (cmd: string): { output: string; type: EntryType } => {
    const command = cmd.trim();
    const [baseCommand, ...args] = command.split(' ');

    switch (baseCommand) {
      case 'clear':
        if (args.length > 0) return { output: 'Usage: clear', type: 'error' };
        setTimeout(() => setHistory([]), 0);
        return { output: '', type: 'output' };
      case 'help':
        if (args.length > 0) return { output: 'Usage: help', type: 'error' };
        return { output: HELP_TEXT, type: 'output' };
      case 'date':
        return date(args);
      case 'pwd':
        if (args.length > 0) return { output: 'pwd: expected 0 arguments; got 1', type: 'error' };
        return { output: currentPath, type: 'output' };
      case 'ls':
        return { output: ls(currentPath, args), type: 'output' };
      case 'whoami':
        if (args.length > 0) return { output: 'whoami: extra operand ‘asd’', type: 'error' };
        return { output: currentUser, type: 'output' };
      case 'echo':
        return { output: args.join(' '), type: 'output' };
      case 'cd':
        return { output: cd(args), type: 'output' };
      case 'history':
        //TODO: Add support for pattern matching
        if (args.length > 0) return { output: 'Usage: history', type: 'error' };
        return { output: commandHistory.map((cmd, i) => `${i + 1}  ${cmd}`).join('\n'), type: 'output' };
      case 'cat':
        return cat(args);
      case 'su':
        return su(args);
      case 'exit':
        if (args.length > 0) return { output: 'Usage: exit', type: 'error' };
        if (currentUser === ROOT_USER) {
          setCurrentUser('user');
          setIsAuthenticated(false);
          return { output: 'Logged out from root', type: 'output' };
        }
        return { output: 'Not logged in as root', type: 'error' };
      default:
        return {
          output: `Command not found: ${baseCommand}\nType "help" for available commands.`,
          type: 'error'
        };
    }
  };

  const handleTabCompletion = () => {
    const [baseCommand, ...args] = input.split(' ');

    if (args.length === 0) {
      const matchingCommands = AVAILABLE_COMMANDS.filter(cmd =>
        cmd.startsWith(baseCommand.toLowerCase())
      );

      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
        setCaretPosition(matchingCommands[0].length);
      } else if (matchingCommands.length > 1) {
        setHistory(prev => [
          ...prev,
          { content: matchingCommands.join('  '), type: 'system', timestamp: new Date() }
        ]);
      }
    } else if (args.length === 1 && ['cd', 'cat'].includes(baseCommand)) {
      const currentDir = getDirectory(currentPath);
      if (currentDir && currentDir.type === 'dir') {
        const matchingItems = Object.keys(currentDir.contents).filter(item =>
          item.startsWith(args[0])
        );

        if (matchingItems.length === 1) {
          setInput(`${baseCommand} ${matchingItems[0]}`);
          setCaretPosition(`${baseCommand} ${matchingItems[0]}`.length);
        } else if (matchingItems.length > 1) {
          setHistory(prev => [
            ...prev,
            { content: matchingItems.join('  '), type: 'system', timestamp: new Date() }
          ]);
        }
      }
    }
  };

  const navigateHistory = (direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return;

    let newIndex = historyIndex;

    if (direction === 'up') {
      if (historyIndex === 0) {
        newIndex = 0;
      } else {
        newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      }
    } else {
      if (historyIndex === commandHistory.length - 1) {
        newIndex = commandHistory.length - 1;
      } else {
        newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
      }
    }

    setHistoryIndex(newIndex);
    setInput(newIndex === -1 ? '' : commandHistory[newIndex]);
    setCaretPosition(newIndex === -1 ? 0 : commandHistory[newIndex].length);
  };

  const getOS = () => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('win')) return 'windows';
    if (platform.includes('mac')) return 'macOS';
    if (platform.includes('linux')) return 'linux';
    if (platform.includes('iphone') || platform.includes('ipad')) return 'iOS';
    if (platform.includes('android')) return 'android';
    return 'unknownOS';
  };

  const getPrompt = () => {
    const os = getOS();
    return `${currentUser}@${os}:${currentPath} `;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const newCaretPosition = textareaRef.current?.selectionStart || 0;
    setCaretPosition(Math.max(0, newCaretPosition - getPrompt().length));

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        const existingIndex = commandHistory.findIndex(entry => entry === input);

        if (existingIndex !== -1) {
          const newCommandHistory = [...commandHistory];
          newCommandHistory.splice(existingIndex, 1);
          newCommandHistory.push(input);
          setCommandHistory(newCommandHistory);
        } else {
          setCommandHistory(prev => [...prev, input]);
        }

        const { output, type } = handleCommand(input);
        setHistory((prev) => [
          ...prev,
          { content: input, type: 'input', timestamp: new Date(), prompt: getPrompt() },
          { content: output, type, timestamp: new Date() },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          { content: '', type: 'input', timestamp: new Date(), prompt: getPrompt() },
          { content: '', type: 'output', timestamp: new Date() },
        ]);
      }
      setHistoryIndex(-1);
      setInput('');
      setCaretPosition(0);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === 'Backspace') {
      const cursorPosition = textareaRef.current?.selectionStart || 0;
      if (cursorPosition <= getPrompt().length) {
        e.preventDefault();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory('down');
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setHistory((prev) => [
        ...prev,
        { content: '', type: 'input', timestamp: new Date(), prompt: getPrompt() },
        { content: '', type: 'output', timestamp: new Date() },
      ]);
      setHistoryIndex(-1);
      setInput('');
      setCaretPosition(0);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = e.target.value;
    const promptPrefix = getPrompt();

    if (!newValue.startsWith(promptPrefix)) {
      // Instead of clearing the input entirely, restore the prompt and append the new character
      setInput(newValue.replace(/^[^\s]* /, '')); // Remove unexpected prefix
      setCaretPosition(newValue.length - promptPrefix.length); // Correct caret position
    } else {
      setInput(newValue.slice(promptPrefix.length));
      setCaretPosition(Math.max(0, e.target.selectionStart - promptPrefix.length));
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  return {
    input,
    history,
    isFullscreen,
    currentPath,
    currentUser,
    isAuthenticated,
    caretPosition,
    getPrompt,
    handleKeyDown,
    handleInputChange,
    setIsFullscreen,
  };
}
