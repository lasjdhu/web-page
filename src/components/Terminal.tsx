import { useState, useEffect, useRef } from 'react';

const INITIAL_HISTORY = [
  {
    content: 'Welcome to Enhanced Terminal v1.0.0',
    type: 'system',
  },
  {
    content: 'Type "help" for available commands',
    type: 'system',
  },
];

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPath, setCurrentPath] = useState('~/user');
  const [caretPosition, setCaretPosition] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const newCaretPosition = textareaRef.current?.selectionStart || 0;
    setCaretPosition(Math.max(0, newCaretPosition - (currentPath.length + 2)));

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        const commandOutput = handleCommand(input);

        setHistory((prev) => [
          ...prev,
          { content: input, type: 'input' },
          { content: commandOutput, type: 'output' },
        ]);

        setInput('');
        setCaretPosition(0);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'clear', 'date', 'echo', 'pwd', 'ls'];
      const matchingCommand = commands.find(
        (cmd) => cmd.startsWith(input.toLowerCase()) && cmd !== input.toLowerCase()
      );
      if (matchingCommand) {
        setInput(matchingCommand);
        setCaretPosition(matchingCommand.length);
      }
    } else if (e.key === 'Backspace') {
      const cursorPosition = textareaRef.current?.selectionStart || 0;
      if (cursorPosition <= currentPath.length + 2) {
        e.preventDefault();
      }
    }
  };

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();

    switch (command.split(' ')[0]) {
      case 'clear':
        setTimeout(() => setHistory([]), 0);
        return '';
      case 'help':
        return `Available commands:
  help     Show this help
  clear    Clear terminal
  date     Show current date
  echo     Display text
  pwd      Print working directory
  ls       List directory contents
  whoami   Display current user`;
      case 'date':
        return new Date().toLocaleString();
      case 'pwd':
        return currentPath;
      case 'ls':
        return `Documents/
Downloads/
Pictures/
Projects/
.bashrc
.gitconfig`;
      case 'whoami':
        return 'user';
      default:
        if (command.startsWith('echo ')) {
          return cmd.trim().slice(5);
        }
        return `Command not found: ${command.split(' ')[0]}\nType "help" for available commands.`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (!newValue.startsWith(`${currentPath}$ `)) {
      setInput('');
      setCaretPosition(0);
    } else {
      setInput(newValue.replace(`${currentPath}$ `, ''));
      const newCaretPosition = e.target.selectionStart - (currentPath.length + 2);
      setCaretPosition(Math.max(0, newCaretPosition));
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div
      className={`${isFullscreen ? 'fixed inset-0 z-50' : 'w-[600px] h-96'
        } bg-gray-950 border-2 border-gray-800 rounded-xl overflow-hidden font-mono shadow-xl transition-all duration-200`}
    >
      <div className="bg-gray-800 p-2 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <button
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            onClick={() => setHistory(INITIAL_HISTORY)}
          />
          <button
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            onClick={() => setInput('')}
          />
          <button
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            onClick={() => setIsFullscreen(!isFullscreen)}
          />
        </div>
      </div>

      <div
        onClick={() => textareaRef.current?.focus()}
        ref={terminalRef}
        className="p-4 h-[calc(100%-2.5rem)] overflow-y-auto text-white cursor-text"
      >
        <div className="break-words cursor-text text-green-400">
          {history.map((entry, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap mb-1 ${entry.type === 'system'
                ? 'text-blue-400'
                : entry.type === 'input'
                  ? 'text-green-400'
                  : 'text-white'
                }`}
            >
              {entry.type === 'input' ? (
                <div className="inset-0 pointer-events-none whitespace-pre-wrap text-green-400">
                  <span className="text-green-400 whitespace-nowrap">{currentPath}$ </span>
                  <span className="text-gray-400 break-words select-text">{entry.content}</span>
                </div>
              ) : (
                entry.content
              )}
            </div>
          ))}

          <div className="relative w-full overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-auto whitespace-pre-wrap text-green-400"
              aria-hidden="true"
            >
              <span className="text-green-400 whitespace-nowrap select-none">{currentPath}$ </span>
              <span className="text-gray-400 break-words select-text relative group">
                {input == '' ? ' ' : input}
                <span
                  className="absolute w-[6px] h-[1.2em] bg-gray-400 animate-blink pointer-events-none"
                  style={{
                    left: `${caretPosition}ch`,
                    top: '0',
                  }}
                />
              </span>
            </div>
            <textarea
              ref={textareaRef}
              value={`${currentPath}$ ${input}`}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="w-full bg-transparent outline-none text-transparent caret-transparent resize-none overflow-hidden break-words select-none user-select-none"
              style={{
                minHeight: '1.5rem',
                lineHeight: '1.5rem',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
              }}
              rows={1}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
