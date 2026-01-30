import { useState, useCallback, useRef, useEffect } from 'react';
import type { CommandResult } from '../types';
import { commands, getSimilarCommands } from '../data/commands';

export const useTerminal = (onCommandExecuted?: (command: string, result: CommandResult) => void) => {
  const [output, setOutput] = useState<string[]>(() => {
    const saved = localStorage.getItem('terminal_output');
    return saved ? JSON.parse(saved) : ['__WELCOME_BANNER__', ''];
  });
  
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('terminal_history');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persist output
  useEffect(() => {
    localStorage.setItem('terminal_output', JSON.stringify(output));
  }, [output]);

  // Persist history
  useEffect(() => {
    localStorage.setItem('terminal_history', JSON.stringify(history));
    setHistoryIndex(history.length);
  }, [history]);

  const executeCommand = useCallback((input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newOutput = [...output, `$ ${trimmed}`];
    const newHistory = [...history, trimmed];

    const commandName = trimmed.split(' ')[0];

    const command = commands.find(c => c.name === commandName);

    if (command) {
      if (commandName === '/clear') {
        setOutput(['__WELCOME_BANNER__', '']);
        
        const result: CommandResult = {
          success: true,
          output: 'Conversation history cleared.',
          type: 'success'
        };
        onCommandExecuted?.(trimmed, result);
        
        setHistory(newHistory);
        setHistoryIndex(newHistory.length);
        return;
      }

      const example = command.examples.find(e => e.command === commandName || e.command.startsWith(commandName + ' '));
      if (example) {
        setOutput([...newOutput, example.output, '']);
      } else {
        setOutput([...newOutput, 'Command executed successfully!', '']);
      }

      const result: CommandResult = {
        success: true,
        output: 'Command executed successfully!',
        type: 'success'
      };

      onCommandExecuted?.(trimmed, result);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length);
      return;
    } else {
      const suggestions = getSimilarCommands(commandName);
      const errorText = suggestions.length > 0
        ? `Unknown command: ${commandName}\nDid you mean: ${suggestions.join(', ')}?`
        : `Unknown command: ${commandName}`;
      setOutput([...newOutput, errorText, '']);

      const result: CommandResult = {
        success: false,
        output: errorText,
        type: 'error'
      };

      onCommandExecuted?.(trimmed, result);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length);
    }
  }, [output, history, onCommandExecuted]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      const command = inputRef.current.value;
      inputRef.current.value = '';
      executeCommand(command);
    }
  }, [executeCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        if (inputRef.current) {
          inputRef.current.value = history[historyIndex - 1];
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        if (inputRef.current) {
          inputRef.current.value = history[historyIndex + 1];
        }
      } else {
        setHistoryIndex(history.length);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentValue = inputRef.current?.value || '';
      const matches = commands.filter(c => c.name.startsWith(currentValue)).map(c => c.name);
      if (matches.length === 1) {
        if (inputRef.current) {
          inputRef.current.value = matches[0];
        }
      }
    }
  }, [history, historyIndex]);

  const clearTerminal = useCallback(() => {
    setOutput(['__WELCOME_BANNER__', '']);
  }, []);

  return {
    output,
    inputRef,
    executeCommand,
    handleKeyDown,
    handleSubmit,
    clearTerminal,
    vimMode: false
  };
};
