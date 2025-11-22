import React, { useState, useEffect, useRef, useCallback } from 'react';
import { parseCommand, getCommandSuggestions, registerDefaultCommands, registerThemeCommands } from '../utils/commandParser';
import { useCommandHistory } from '../hooks/useCommandHistory';
import { useAutoComplete } from '../hooks/useAutoComplete';
import { useDebounce } from '../hooks/useDebounce';
import { terminalConfig } from '../config/terminalConfig';
import { useTheme } from '../context/ThemeContext';
import MobileKeyboard from './MobileKeyboard';
import { OutputItem } from './OutputItem';

// Register commands on load
registerDefaultCommands();

/**
 * Terminal Component
 * Enterprise-grade implementation with performance optimizations
 */
const Terminal = () => {
  // State management
  const [outputHistory, setOutputHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Custom Hooks
  const {
    history: commandHistory,
    addToHistory,
    navigateHistory
  } = useCommandHistory(terminalConfig.maxCommandHistory);

  // Theme Context
  const { theme, currentTheme, changeTheme, availableThemes } = useTheme();

  // Register theme commands with context access
  useEffect(() => {
    registerThemeCommands({ currentTheme, changeTheme, availableThemes });
  }, [currentTheme, changeTheme, availableThemes]);

  // Debounce input for autocomplete
  const debouncedInput = useDebounce(currentInput, terminalConfig.debounceDelay);

  // Refs for DOM manipulation
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  // Constants
  const { prompt, welcomeMessage } = terminalConfig;

  /**
   * Initialize terminal with welcome message
   */
  useEffect(() => {
    setOutputHistory([{
      type: 'system',
      content: welcomeMessage,
      timestamp: Date.now()
    }]);
  }, [welcomeMessage]);

  /**
   * Auto-scroll to bottom on new output
   */
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputHistory]);

  /**
   * Focus input on component mount
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * Handle autocomplete suggestions with debounce
   */
  useEffect(() => {
    if (debouncedInput) {
      const newSuggestions = getCommandSuggestions(debouncedInput);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedInput]);

  /**
   * Handle command submission
   */
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const input = currentInput.trim();
    if (!input) return;

    // Execute command
    const result = parseCommand(input);

    // Handle special command types
    if (result.output?.type === 'CLEAR_SCREEN') {
      setOutputHistory([]);
      setCurrentInput('');
      return;
    }

    // Add to output history
    setOutputHistory(prev => {
      const newHistory = [
        ...prev,
        {
          type: 'command',
          content: input,
          timestamp: Date.now()
        },
        {
          type: result.error ? 'error' : 'output',
          content: result.output,
          timestamp: Date.now() + 1
        }
      ];

      // Limit output history size
      if (newHistory.length > terminalConfig.maxOutputItems) {
        return newHistory.slice(-terminalConfig.maxOutputItems);
      }
      return newHistory;
    });

    // Update command history
    addToHistory(input);

    // Reset state
    setCurrentInput('');
    setSuggestions([]);
  }, [currentInput, addToHistory]);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevCmd = navigateHistory('up');
      if (prevCmd !== null && prevCmd !== '') setCurrentInput(prevCmd);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextCmd = navigateHistory('down');
      setCurrentInput(nextCmd || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const suggs = getCommandSuggestions(currentInput);
      if (suggs.length === 1) {
        setCurrentInput(suggs[0]);
        setSuggestions([]);
      } else if (suggs.length > 1) {
        setSuggestions(suggs);
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
    }
  }, [currentInput, navigateHistory]);

  /**
   * Handle input changes
   */
  const handleInputChange = useCallback((e) => {
    setCurrentInput(e.target.value);
  }, []);

  /**
   * Apply autocomplete suggestion
   */
  const applySuggestion = useCallback((suggestion) => {
    setCurrentInput(suggestion);
    setSuggestions([]);
    inputRef.current?.focus();
  }, []);

  const handleMobileCommand = (cmd) => {
    setCurrentInput(cmd);
    inputRef.current?.focus();
  };

  return (
    <div
      className={`h-screen bg-transparent ${theme.colors.text} font-mono flex flex-col terminal-screen`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output Area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 pb-24 md:pb-4 scrollbar-hide"
        style={{ minHeight: 0 }}
      >
        {outputHistory.map((item, index) => (
          <div key={`${item.timestamp}-${index}`} className="mb-2">
            <OutputItem item={item} />
          </div>
        ))}
      </div>

      {/* Autocomplete Suggestions */}
      {suggestions.length > 0 && (
        <div className={`px-4 py-2 border-t ${theme.colors.border} flex flex-wrap gap-2 bg-black/80 sticky bottom-[60px]`}>
          {suggestions.map(suggestion => (
            <button
              key={suggestion}
              onClick={() => applySuggestion(suggestion)}
              className={`px-2 py-1 text-sm ${theme.colors.system} hover:${theme.colors.text} hover:${theme.colors.highlight} rounded transition-colors`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input Area - Fixed at bottom with margin */}
      <div className={`px-4 py-3 border-t ${theme.colors.border} bg-black/80 sticky bottom-0 mb-4`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <span className={theme.colors.text}>{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent outline-none ${theme.colors.text} caret-current font-mono`}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>

      <MobileKeyboard onCommand={handleMobileCommand} />
    </div>
  );
};

export default Terminal;
