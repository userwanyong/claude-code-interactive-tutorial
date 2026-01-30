import { useEffect, useRef } from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import { FiTerminal, FiTrash2, FiCopy } from 'react-icons/fi';
import type { CommandResult } from '../../types';
import WelcomeBanner from './WelcomeBanner';
import ContextVisualization from './ContextVisualization';
import StatsVisualization from './StatsVisualization';

interface TerminalProps {
  onCommandExecuted?: (command: string, result: CommandResult) => void;
  presetCommands?: string[];
  className?: string;
}

export default function Terminal({ onCommandExecuted, presetCommands = [], className = '' }: TerminalProps) {
  const { output, inputRef, executeCommand, handleKeyDown, handleSubmit, clearTerminal } = useTerminal(onCommandExecuted);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    // Auto focus on mount
    inputRef.current?.focus();
  }, [inputRef]);

  const handlePresetClick = (command: string) => {
    executeCommand(command);
  };

  const handleCopy = () => {
    const text = output.join('\n');
    navigator.clipboard.writeText(text);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className={`flex flex-col bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-[#333] ${className}`}
      onClick={handleContainerClick}
    >
      <div className="relative flex items-center justify-center px-4 py-3 bg-[#2d2d2d] border-b border-[#333]">
        <div className="absolute left-4 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors"></div>
        </div>
        
        <div className="flex items-center gap-2">
          <FiTerminal className="text-[#D97757]" size={16} />
          <span className="text-gray-400 font-medium text-sm select-none">Claude Code 终端</span>
        </div>
        
        <div className="absolute right-4 flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all"
            title="复制输出"
          >
            <FiCopy size={16} />
          </button>
          <button
            onClick={clearTerminal}
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-md transition-all"
            title="清空终端"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      <div
        ref={outputRef}
        className="p-4 overflow-y-auto h-[500px] font-mono text-sm scrollbar-thin"
      >
        {output.map((line, index) => (
          <div key={index} className="mb-1 whitespace-pre-wrap">
            {line === '__WELCOME_BANNER__' ? (
              <WelcomeBanner />
            ) : line === '__CONTEXT_VISUALIZATION__' ? (
              <ContextVisualization />
            ) : line === '__COMPACT_OUTPUT__' ? (
              <span className="text-gray-500">Compacted (ctrl+o to see full summary)</span>
            ) : line === '__EXPORT_OUTPUT__' ? (
              <div className="text-gray-300">
                <div className="text-blue-400 font-bold mb-2">Export Conversation</div>
                <div className="mb-2">Select export method:</div>
                <div className="mb-1"><span className="text-gray-500">{'>'}</span> <span className="font-bold text-white">1. Copy to clipboard</span>  Copy the conversation to your system clipboard</div>
                <div>  2. Save to file       Save the conversation to a file in the current directory</div>
              </div>
            ) : line === '__HELP_OUTPUT__' ? (
              <div className="text-gray-300 font-mono text-sm">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                  <span className="text-blue-400 font-bold">Claude Code v2.1.19</span>
                  <span className="bg-blue-400 text-black px-1 font-bold">general</span>
                  <span className="text-gray-500">commands</span>
                  <span className="text-gray-500">custom-commands</span>
                  <span className="text-gray-600">(←/→ or tab to cycle)</span>
                </div>

                <div className="mb-6 text-gray-300">
                  Claude understands your codebase, makes edits with your permission, and executes commands - right from your terminal.
                </div>

                <div className="mb-2 font-bold text-white">Shortcuts</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1 mb-6 text-gray-300">
                  <div>! for bash mode</div>
                  <div>double tap esc to clear input</div>
                  <div>ctrl + shift + - to undo</div>
                  
                  <div>/ for commands</div>
                  <div>ctrl + o for verbose outputedits</div>
                  <div>alt + v to paste images</div>
                  
                  <div>& for background</div>
                  <div>backslash (\) + return (↵) for newline</div>
                  <div>ctrl + s to stash prompt</div>
                </div>

                <div>
                  For more help: <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://code.claude.com/docs/en/overview</a>
                </div>
              </div>
            ) : line === '__INIT_OUTPUT__' ? (
              <div className="text-gray-300 font-mono text-sm space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-green-500">●</span>
                    <span>Bash(ls -la)</span>
                  </div>
                  <div className="pl-4 text-gray-400 border-l border-gray-700 ml-1.5">
                    <div className="pl-2">total 4</div>
                    <div className="pl-2">drwxr-xr-x 1 20268 197609 0  1月 30 15:33 .</div>
                    <div className="pl-2">drwxr-xr-x 1 20268 197609 0  1月 30 18:44 ..</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">●</span>
                  <span className="text-gray-300">The directory is empty. There is no codebase to analyze here. Let me check if there might be any hidden files or if we're in the wrong directory:</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-500">●</span>
                    <span>Bash(pwd && ls -la && echo "---" && echo "Parent directory contents:" && ls -la ..)</span>
                  </div>
                  <div className="pl-4 text-gray-400 border-l border-gray-700 ml-1.5">
                    <div className="pl-2">Running...</div>
                  </div>
                </div>

                <div className="border-t border-gray-700 my-4"></div>

                <div>
                  <div className="text-blue-400 font-bold mb-2">Bash command</div>
                  <div className="mb-2 text-gray-400">pwd && ls -la && echo "---" && echo "Parent directory contents:" && ls -la ..</div>
                  <div className="text-gray-500">Check current directory and parent contents</div>
                </div>

                <div>
                  <div className="mb-2">Do you want to proceed?</div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{'>'}</span>
                    <span className="font-bold text-white">1. Yes</span>
                  </div>
                  <div className="pl-4 text-gray-400">2. Yes, allow reading from Desktop\ from this project</div>
                  <div className="pl-4 text-gray-400">3. No</div>
                </div>
              </div>
            ) : line === '__MCP_OUTPUT__' ? (
              <div className="text-gray-300 font-mono text-sm">
                <div className="text-blue-400 font-bold mb-1">Manage MCP servers</div>
                <div className="text-gray-400 mb-4">2 servers</div>

                <div className="mb-2">User MCPs (C:\Users\example\.claude.json)</div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-500">{'>'}</span>
                  <span className="text-blue-400 font-bold">context7</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-green-500">√ connected</span>
                </div>
                <div className="flex items-center gap-2 mb-4 pl-4">
                  <span className="text-gray-300">github</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-green-500">√ connected</span>
                </div>

                <div>
                  <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:underline">https://code.claude.com/docs/en/mcp</a> for help
                 </div>
               </div>
             ) : line === '__MEMORY_OUTPUT__' ? (
               <div className="text-gray-300 font-mono text-sm">
                 <div className="mb-6">
                   Learn more: <a href="https://code.claude.com/docs/en/memory" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:underline">https://code.claude.com/docs/en/memory</a>
                 </div>
 
                 <div className="border border-blue-400 rounded p-4">
                   <div className="text-blue-400 font-bold mb-4">Select memory to edit:</div>
                   
                   <div className="flex items-center gap-2 mb-1">
                     <span className="text-gray-500">{'>'}</span>
                     <span className="font-bold text-white">1. User memory</span>
                     <span className="text-gray-400 ml-4">Saved in ~/.claude/CLAUDE.md</span>
                   </div>
                   <div className="flex items-center gap-2 pl-4">
                     <span className="text-gray-300">2. Project memory</span>
                     <span className="text-gray-400 ml-1">Saved in ./CLAUDE.md</span>
                   </div>
                  </div>
                </div>
              ) : line === '__MODEL_OUTPUT__' ? (
                <div className="text-gray-300 font-mono text-sm">
                  <div className="text-blue-400 font-bold mb-1">Select model</div>
                  <div className="text-gray-400 mb-4">
                    Switch between Claude models. Applies to this session and future Claude Code sessions. For other/previous model names, specify with --model.
                  </div>
  
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-500">{'>'}</span>
                    <span className="font-bold text-white">1.</span>
                    <span className="font-bold text-green-500">Default (recommended)</span>
                    <span className="text-green-500">√</span>
                    <span className="text-gray-400">Use the default model (currently Sonnet 4.5) · $3/$15 per Mtok</span>
                  </div>
                  <div className="flex items-center gap-2 pl-4 mb-1">
                    <span className="font-bold text-white">2. Opus</span>
                    <span className="text-gray-400 ml-8">Opus 4.5 · Most capable for complex work · $5/$25 per Mtok</span>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                     <span className="font-bold text-white">3. Haiku</span>
                     <span className="text-gray-400 ml-7">Haiku 4.5 · Fastest for quick answers · $1/$5 per Mtok</span>
                   </div>
                 </div>
               ) : line === '__PERMISSIONS_OUTPUT__' ? (
                 <div className="text-gray-300 font-mono text-sm">
                   <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                     <span className="text-blue-400 font-bold">Permissions:</span>
                     <span className="bg-blue-300 text-black px-1 font-bold">Allow</span>
                     <span className="text-gray-400">Ask</span>
                     <span className="text-gray-400">Deny</span>
                     <span className="text-gray-400">Workspace</span>
                     <span className="text-gray-600">(←/→ or tab to cycle)</span>
                   </div>
   
                   <div className="mb-4">Claude Code won't ask before using allowed tools.</div>
   
                   <div className="border border-gray-600 rounded px-3 py-2 mb-6 flex items-center gap-2 text-gray-500 w-full max-w-md">
                     <span>⚲</span>
                     <span>Search...</span>
                   </div>
   
                   <div className="flex items-center gap-2 mb-6">
                     <span className="text-gray-500">{'>'}</span>
                     <span className="text-white">1. Add a new rule...</span>
                   </div>
   
                   <div className="text-gray-500 text-xs">
                      Press ↑↓ to navigate · Enter to select · Type to search · Esc to cancel
                    </div>
                  </div>
                ) : line === '__RESUME_OUTPUT__' ? (
                  <div className="text-gray-300 font-mono text-sm">
                    <div className="text-blue-400 font-bold mb-4">Resume Session</div>
    
                    <div className="border border-gray-600 rounded px-3 py-2 mb-6 flex items-center gap-2 text-gray-500 w-full">
                      <span>⚲</span>
                      <span>Search...</span>
                    </div>
    
                    <div className="mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">{'>'}</span>
                        <span className="text-white">[Request interrupted by user for tool use]</span>
                      </div>
                      <div className="text-gray-500 text-xs ml-4 mt-1">
                        1 minute ago · 9 messages · —
                      </div>
                    </div>
    
                    <div className="text-gray-500 text-xs flex flex-wrap gap-x-2">
                      <span>Ctrl+A to show all projects</span> · 
                      <span>Ctrl+V to preview</span> · 
                      <span>Ctrl+R to rename</span> · 
                      <span>Type to search</span> · 
                      <span>Esc to cancel</span> ·
                    </div>
                  </div>
                ) : line === '__REWIND_OUTPUT__' ? (
                  <div className="text-gray-300 font-mono text-sm">
                    <div className="text-blue-400 font-bold mb-4">Rewind</div>
    
                    <div className="mb-6">
                      Restore the code and/or conversation to the point before...
                    </div>
    
                    <div className="mb-4 pl-2">
                      <div className="text-gray-300 mb-1">/export</div>
                      <div className="text-gray-500">No code changes</div>
                    </div>
    
                    <div className="mb-4 pl-2">
                      <div className="text-gray-300 mb-1">/init</div>
                      <div className="text-gray-500">No code changes</div>
                    </div>
    
                    <div className="mb-4 pl-2">
                      <div className="text-gray-300 mb-1">/plan</div>
                      <div className="text-gray-500">No code changes</div>
                    </div>
    
                    <div className="mb-4 pl-2">
                      <div className="text-gray-300 mb-1">/rename</div>
                      <div className="text-gray-500">No code changes</div>
                    </div>
    
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-gray-500">{'>'}</span>
                      <span className="text-blue-400">(current)</span>
                    </div>
    
                    <div className="text-gray-500 text-xs">
                      Enter to continue · Esc to exit
                    </div>
                  </div>
                ) : line === '__STATS_OUTPUT__' ? (
                  <StatsVisualization />
                ) : line === '__STATUS_OUTPUT__' ? (
                  <div className="text-gray-300 font-mono text-sm">
                    <div className="flex gap-4 mb-6">
                      <span className="text-gray-400">Settings:</span>
                      <span className="bg-blue-300 text-black px-1 font-bold">Status</span>
                      <span className="text-gray-400">Config</span>
                      <span className="text-gray-400">Usage</span>
                      <span className="text-gray-600 ml-2">(←/→ or tab to cycle)</span>
                    </div>
    
                    <div className="mb-4 space-y-1">
                      <div><span className="font-bold text-white">Version:</span> 2.1.19</div>
                      <div><span className="font-bold text-white">Session name:</span> /rename to add a name</div>
                      <div><span className="font-bold text-white">Session ID:</span> 00893ebc-c0c5-4e10-aef4-54469cd2adeb</div>
                  <div><span className="font-bold text-white">cwd:</span> D:\Users\example\cc</div>
                  <div><span className="font-bold text-white">Auth token:</span> ANTHROPIC_AUTH_TOKEN</div>
                      <div><span className="font-bold text-white">Anthropic base URL:</span> https://open.bigmodel.cn/api/anthropic</div>
                    </div>
    
                    <div className="mb-4 space-y-1">
                      <div><span className="font-bold text-white">Model:</span> Default (claude-sonnet-4-5-20250929)</div>
                  <div>
                    <span className="font-bold text-white">MCP servers:</span> 
                    <span className="text-gray-400"> context7 <span className="text-green-500">√</span>, github <span className="text-green-500">√</span></span>
                  </div>
                  <div><span className="font-bold text-white">Memory:</span></div>
                      <div><span className="font-bold text-white">Setting sources:</span> User settings</div>
                    </div>
    
                    <div className="mb-6">
                      <div className="font-bold text-white mb-1">System Diagnostics</div>
                      <div className="text-red-400">!! Found invalid settings files: . They will be ignored.</div>
                    </div>
    
                    <div className="text-gray-500 text-xs">
                      Esc to cancel
                    </div>
                  </div>
                ) : line === '__STATUSLINE_OUTPUT__' ? (
                  <div className="text-gray-300 font-mono text-sm">
                    <div className="mb-4">
                      ● I see the directory is currently empty. It looks like you're planning to initialize a new project in this directory.
                      <br />
                      Let me ask a clarifying question to understand what you need:
                    </div>

                    <div className="border-t border-gray-700 my-4"></div>

                    <div className="mb-2">
                      <span className="bg-blue-300 text-black px-1 font-bold">[ ] Project type</span>
                    </div>

                    <div className="font-bold text-white mb-4">
                      What would you like to do with this empty directory?
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="text-blue-400">
                        &gt; 1. Initialize a new project
                        <div className="text-gray-400 pl-6 text-xs mt-1">
                          Set up a new software project from scratch (e.g., Node.js, Python, etc.)
                        </div>
                      </div>

                      <div className="text-gray-300">
                        &nbsp;&nbsp;2. Just creating a plan document
                        <div className="text-gray-500 pl-6 text-xs mt-1">
                          You want to create a CLAUDE.md for planning purposes before any code exists
                        </div>
                      </div>

                      <div className="text-gray-300">
                        &nbsp;&nbsp;3. Clone an existing repository
                        <div className="text-gray-500 pl-6 text-xs mt-1">
                          Clone code from an existing Git repository to analyze
                        </div>
                      </div>

                      <div className="text-gray-300">
                        &nbsp;&nbsp;4. Type something.
                      </div>
                    </div>

                    <div className="border-t border-gray-700 my-4"></div>

                    <div className="mb-6 space-y-1 text-gray-400">
                       <div>Chat about this</div>
                       <div>Skip interview and plan immediately</div>
                    </div>

                    <div className="text-gray-500 text-xs">
                      Enter to select · ↑/↓ to navigate · Esc to cancel
                    </div>
                  </div>
                ) : line === '__TASKS_OUTPUT__' ? (
                  <div className="font-mono text-sm">
                    <div className="border border-cyan-400 rounded-sm p-3 mb-2">
                      <div className="text-cyan-400 font-bold mb-1">Background tasks</div>
                      <div className="text-gray-400">No tasks currently running</div>
                    </div>
                    <div className="text-gray-500 text-xs">
                      ↑/↓ to select · Enter to view · Esc to close
                    </div>
                  </div>
                ) : line === '__THEME_OUTPUT__' ? (
                  <div className="font-mono text-sm">
                    <div className="text-[#a78bfa] font-bold mb-4">Theme</div>
                    <div className="text-white mb-4">Choose the text style that looks best with your terminal</div>
                    
                    <div className="space-y-1 mb-6">
                      <div className="text-green-500 font-bold">&gt; 1. Dark mode √</div>
                      <div className="text-gray-400 ml-4">2. Light mode</div>
                      <div className="text-gray-400 ml-4">3. Dark mode (colorblind-friendly)</div>
                      <div className="text-gray-400 ml-4">4. Light mode (colorblind-friendly)</div>
                      <div className="text-gray-400 ml-4">5. Dark mode (ANSI colors only)</div>
                      <div className="text-gray-400 ml-4">6. Light mode (ANSI colors only)</div>
                    </div>

                    <div className="border-t border-dashed border-gray-600 my-4"></div>

                    <div className="font-mono text-sm mb-4">
                      <div className="text-gray-300">1  function greet() {'{'}</div>
                      <div className="bg-[#4a1d1d] text-white"><span className="text-gray-400 select-none">2 - </span>  console.log("Hello, World!");</div>
                      <div className="bg-[#1d4a1d] text-white"><span className="text-gray-400 select-none">2 + </span>  console.log("Hello, Claude!");</div>
                      <div className="text-gray-300">3  {'}'}</div>
                    </div>

                    <div className="text-gray-500 mb-6">
                      Syntax highlighting available only in native build
                    </div>

                    <div className="text-gray-500 text-xs">
                      Enter to select · Esc to cancel
                    </div>
                  </div>
                ) : line.startsWith('$') ? (
              <span className="text-[#D97757]">{line}</span>
            ) : line.startsWith('Claude') || line.startsWith('Type') || line.includes('Available') ? (
              <span className="text-blue-400">{line}</span>
            ) : line.startsWith('Command executed') ? (
              <span className="text-green-500">{line}</span>
            ) : line.includes('Unknown command') ? (
              <span className="text-red-400">{line}</span>
            ) : (
              <span className="text-gray-300">{line}</span>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-t border-[#333]">
        <span className="font-mono text-[#D97757]">$</span>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent text-white font-mono text-sm outline-none placeholder-gray-600"
          placeholder="在此输入..."
          onKeyDown={handleKeyDown}
        />
      </form>

      {presetCommands.length > 0 && (
        <div className="p-3 bg-[#252525] border-t border-[#333]">
          <div className="text-xs text-gray-400 mb-2 flex flex-wrap gap-2 items-center">
            <span>预设命令：</span>
            {presetCommands.map((cmd, index) => (
              <button
                key={index}
                onClick={() => handlePresetClick(cmd)}
                className="px-3 py-1.5 bg-[#D97757] hover:bg-[#c06545] text-white text-xs rounded-md transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}