import { useRef } from 'react';
import { useTerminal } from '../utils/useTerminal';

export default function Terminal() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const {
    input,
    history,
    isFullscreen,
    caretPosition,
    getPrompt,
    handleKeyDown,
    handleInputChange,
    setIsFullscreen,
  } = useTerminal({ terminalRef, textareaRef });

  return (
    <div
      className={`${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl w-[600px] h-96 border-2 border-gray-800/50'}
        bg-gray-950 overflow-hidden font-mono shadow-xl transition-all duration-200`}
    >
      <div className="bg-gray-800/50 p-2 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <button
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-not-allowed"
          />
          <button
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-not-allowed"
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
        <div className="break-words cursor-text">
          {history.map((entry, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap mb-1 ${entry.type === 'system'
                ? 'text-blue-400'
                : entry.type === 'input'
                  ? 'text-green-400'
                  : 'text-gray-400'
                }`}
            >
              {entry.type === 'input' ? (
                <pre className="inset-0 pointer-events-none whitespace-pre-wrap text-green-400">
                  <span className={` whitespace-nowrap ${entry.prompt?.includes('root') ? 'text-red-500' : 'text-green-400'}`}>
                    {entry.prompt}
                  </span>
                  <span className="text-white break-words select-text">{entry.content}</span>
                </pre>
              ) : (
                entry.content
              )}
            </div>
          ))}

          <div className="relative w-full overflow-hidden">
            <pre
              className="absolute inset-0 pointer-events-auto whitespace-pre-wrap text-green-400"
              aria-hidden="true"
            >
              <span className={`text-green-400 whitespace-nowrap select-none ${getPrompt().includes('root') ? 'text-red-500' : 'text-green-400'}`}>
                {getPrompt()}
              </span>
              <span className="text-white break-words select-text relative group">
                {input === '' ? ' ' : input}
                <span
                  className="absolute w-[8px] h-[1.2em] bg-gray-400 animate-blink pointer-events-none"
                  style={{
                    left: `${caretPosition}ch`,
                    top: '0',
                  }}
                />
              </span>
            </pre>
            <textarea
              ref={textareaRef}
              value={`${getPrompt()}${input}`}
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

