import "../styles/global.css";
import { useRef, useState, useEffect } from "react";
import { useTerminal } from "../utils/useTerminal";

export default function Terminal() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  const handleFocus = () => {
    if (textareaRef.current) {
      const promptText = getPrompt();
      textareaRef.current.value = promptText + input;
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
    }
  };

  return (
    <div
      className={`
        ${
          isFullscreen
            ? "fixed inset-0 z-50"
            : "md:w-3/4 w-full h-[400px] border-2 border-gray-800 rounded-xl"
        }
        text-sm md:text-base bg-gray-950 overflow-hidden font-mono shadow-xl transition-opacity duration-700
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="bg-gray-800 p-2 flex items-center justify-between select-none relative">
        <div className="flex items-center space-x-3">
          <button
            aria-label="Close"
            className="w-3 h-3 rounded-full bg-red-500 cursor-not-allowed"
          />
          <button
            aria-label="Minimize"
            className="w-3 h-3 rounded-full bg-yellow-500 cursor-not-allowed"
          />
          <button
            aria-label="Maximize"
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            onClick={() => setIsFullscreen(!isFullscreen)}
          />
        </div>
        <div
          id="terminal-label"
          className="absolute left-1/2 transform -translate-x-1/2 text-white text-sm opacity-50"
        >
          🚀 Reactivitty
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
              className={`whitespace-pre-wrap mb-1 ${
                entry.type === "system"
                  ? "text-blue-400"
                  : entry.type === "input"
                    ? "text-green-400"
                    : "text-gray-400"
              }`}
            >
              {entry.type === "input" ? (
                <pre className="pointer-events-none whitespace-pre-wrap text-green-400 break-words">
                  <span
                    className={`whitespace-nowrap ${
                      entry.prompt?.includes("root")
                        ? "text-red-500"
                        : "text-green-400"
                    }`}
                  >
                    {entry.prompt}
                  </span>
                  <span className="text-white break-words select-text">
                    {entry.content}
                  </span>
                </pre>
              ) : (
                entry.content
              )}
            </div>
          ))}

          <div className="relative w-full overflow-hidden">
            <pre
              className="relative pointer-events-auto whitespace-pre-wrap text-green-400 break-words"
              aria-hidden="true"
            >
              <span
                className={`whitespace-nowrap select-none ${
                  getPrompt().includes("root")
                    ? "text-red-500"
                    : "text-green-400"
                }`}
              >
                {getPrompt()}
              </span>
              <span className="text-white break-words select-text relative group">
                {input === "" ? " " : input}
                <span
                  className="absolute w-[8px] h-[1.2em] bg-gray-400 animate-blink pointer-events-none"
                  style={{
                    left: `${caretPosition}ch`,
                    top: "0",
                  }}
                />
              </span>
            </pre>
            <textarea
              name="terminal"
              aria-labelledby="terminal-label"
              ref={textareaRef}
              value={`${getPrompt()}${input}`}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              spellCheck={false}
              className="w-full bg-transparent outline-none text-transparent caret-transparent resize-none overflow-hidden break-words select-none absolute top-0 left-0"
              style={{
                minHeight: "1.5rem",
                lineHeight: "1.5rem",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
              }}
              rows={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
