import "../styles/global.css";
import { useEffect, useRef, useState } from "react";
import { useTerminal } from "../utils/useTerminal";

export default function Terminal() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

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

  const handleTerminalClick = () => {
    textareaRef.current?.focus();
    setIsFocused(true);
  };

  const handleTextareaFocus = () => {
    setIsFocused(true);
    if (textareaRef.current) {
      const promptText = getPrompt();
      textareaRef.current.value = promptText + input;
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
    }
  };

  const handleTextareaBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const isTextareaFocused =
          document.activeElement === textareaRef.current;
        if (isTextareaFocused !== isFocused) {
          setIsFocused(isTextareaFocused);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isFocused]);

  return (
    <div
      className={`
        ${
          isFullscreen
            ? "fixed inset-0 z-50"
            : "w-full md:w-3/4 h-[400px] border-2 border-gray-800 rounded-sm"
        }
        text-sm md:text-base bg-gray-950 overflow-hidden font-mono shadow-xl
        opacity-0 animate-fade-in
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
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"
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
        onClick={handleTerminalClick}
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
                  <code
                    className={`whitespace-nowrap ${
                      entry.prompt?.includes("root")
                        ? "text-red-500"
                        : "text-green-400"
                    }`}
                  >
                    {entry.prompt}
                  </code>
                  <code className="text-white break-words select-text">
                    {entry.content}
                  </code>
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
              <code
                className={`whitespace-nowrap select-none ${
                  getPrompt().includes("root")
                    ? "text-red-500"
                    : "text-green-400"
                }`}
              >
                {getPrompt()}
              </code>
              <code className="text-white break-words select-text relative group">
                {input === "" ? " " : input}
                <span
                  className={`absolute w-[8px] h-[1.2em] bg-gray-400 pointer-events-none ${
                    isFocused ? "animate-blink" : "opacity-0"
                  }`}
                  style={{
                    left: `${caretPosition}ch`,
                    top: "0",
                  }}
                />
              </code>
            </pre>
            <textarea
              name="terminal"
              aria-labelledby="terminal-label"
              ref={textareaRef}
              value={`${getPrompt()}${input}`}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleTextareaFocus}
              onBlur={handleTextareaBlur}
              spellCheck={false}
              className="w-full bg-transparent outline-hidden text-transparent caret-transparent resize-none overflow-hidden break-words select-none absolute top-0 left-0"
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
