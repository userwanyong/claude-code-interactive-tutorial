import type { Command } from '../types';

export const commands: Command[] = [
  {
    name: '/clear',
    description: '清除对话历史',
    examples: [
      {
        command: '/clear',
        description: '清除对话',
        output: 'Conversation history cleared.\n\nClaude Code - Ready'
      }
    ]
  },
  {
    name: '/compact',
    description: '压缩对话历史',
    examples: [
      {
        command: '/compact',
        description: '压缩对话历史',
        output: '__COMPACT_OUTPUT__'
      },
      {
        command: '/compact 关注当前 API 集成任务',
        description: '使用焦点指令压缩',
        output: '__COMPACT_OUTPUT__'
      }
    ]
  },
  {
    name: '/config',
    description: '打开设置界面',
    examples: [
      {
        command: '/config',
        description: '打开配置',
        output: `> Auto-compact                                  true
  Show tips                                     true
  Thinking mode                                 true
  Prompt suggestions                            true
  Rewind code (checkpoints)                     true
  Verbose output                                false
  Terminal progress bar                         true
  Default permission mode                       Default
  Respect .gitignore in file picker             true
  Auto-update channel                           disabled
                                                (CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC set)
  Theme                                         Dark mode
  Notifications                                 Auto
  Output style                                  default
  Language                                      Default (English)
  Editor mode                                   normal
  Model                                         Default (recommended)
  Auto-connect to IDE (external terminal)       false
  Claude in Chrome enabled by default           true`
      }
    ]
  },
  {
    name: '/context',
    description: '将当前上下文使用情况可视化为彩色网格',
    examples: [
      {
        command: '/context',
        description: '查看上下文使用',
        output: '__CONTEXT_VISUALIZATION__'
      }
    ]
  },
  {
    name: '/cost',
    description: '显示令牌使用统计信息',
    examples: [
      {
        command: '/cost',
        description: '查看成本',
        output: `Total cost:             $0.1268
Total duration (API):   31s
Total duration (wall):  3h 38m 14s
Total code changes:     0 lines added, 0 lines removed
Usage by model:
    claude-haiku:   50 input, 18 output, 327 cache read, 0 cache write ($0.0002)
    claude-sonnet:  35.4k input, 436 output, 46.2k cache read, 0 cache write ($0.1266)`
      }
    ]
  },
  {
    name: '/doctor',
    description: '检查您的 Claude Code 安装的健康状况',
    examples: [
      {
        command: '/doctor',
        description: '运行诊断',
        output: `Diagnostics
└ Currently running: unknown (2.1.19)
└ Path: D:\\Program Files\\nodejs\\node.exe
└ Invoked: D:\\Program Files\\nodejs\\node_modules\\@anthropic-ai\\claude-code\\cli.js
└ Config install method: unknown
└ Search: OK (vendor)

Updates
└ Auto-updates: disabled (CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC set)
└ Auto-update channel: latest
└ Stable version: 2.1.7
└ Latest version: 2.1.25

MCP Config Diagnostics

For help configuring MCP servers, see: https://code.claude.com/docs/en/mcp`
      }
    ]
  },
  {
    name: '/exit',
    description: '退出',
    examples: [
      {
        command: '/exit',
        description: '退出交互模式',
        output: 'Goodbye!'
      }
    ]
  },
  {
    name: '/export',
    description: '将当前对话导出到文件或剪贴板',
    examples: [
      {
        command: '/export',
        description: '导出到剪贴板',
        output: '__EXPORT_OUTPUT__'
      },
      {
        command: '/export conversation.md',
        description: '导出到文件',
        output: 'Conversation exported to conversation.md'
      }
    ]
  },
  {
    name: '/help',
    description: '获取使用帮助',
    examples: [
      {
        command: '/help',
        description: '显示帮助',
        output: '__HELP_OUTPUT__'
      }
    ]
  },
  {
    name: '/init',
    description: '使用 CLAUDE.md 指南初始化项目',
    examples: [
      {
        command: '/init',
        description: '初始化项目',
        output: '__INIT_OUTPUT__'
      }
    ]
  },
  {
    name: '/mcp',
    description: '管理 MCP server 连接和 OAuth 身份验证',
    examples: [
      {
        command: '/mcp',
        description: '管理 MCP 连接',
        output: '__MCP_OUTPUT__'
      }
    ]
  },
  {
    name: '/memory',
    description: '编辑 CLAUDE.md 内存文件',
    examples: [
      {
        command: '/memory',
        description: '编辑内存文件',
        output: '__MEMORY_OUTPUT__'
      }
    ]
  },
  {
    name: '/model',
    description: '选择或更改 AI 模型',
    examples: [
      {
        command: '/model',
        description: '查看可用模型',
        output: '__MODEL_OUTPUT__'
      }
    ]
  },
  {
    name: '/permissions',
    description: '查看或更新权限',
    examples: [
      {
        command: '/permissions',
        description: '查看权限',
        output: '__PERMISSIONS_OUTPUT__'
      }
    ]
  },
  {
    name: '/plan',
    description: '直接从提示进入 Plan Mode',
    examples: [
      {
        command: '/plan',
        description: '进入规划模式',
        output: 'Enabled plan mode'
      }
    ]
  },
  {
    name: '/rename',
    description: '重命名当前会话',
    examples: [
      {
        command: '/rename',
        description: '重命名会话',
        output: 'Please provide a name for the session. Usage: /rename <name>'
      }
    ]
  },
  {
    name: '/resume',
    description: '按 ID 或名称恢复对话，或打开会话选择器',
    examples: [
      {
        command: '/resume',
        description: '查看会话列表',
        output: '__RESUME_OUTPUT__'
      },
      {
        command: '/resume API 集成开发',
        description: '恢复指定会话',
        output: 'Resuming session: "API 集成开发"...'
      }
    ]
  },
  {
    name: '/rewind',
    description: '回退对话和/或代码',
    examples: [
      {
        command: '/rewind',
        description: '回退对话',
        output: '__REWIND_OUTPUT__'
      }
    ]
  },
  {
    name: '/stats',
    description: '可视化每日使用情况、会话历史、连胜和模型偏好',
    examples: [
      {
        command: '/stats',
        description: '查看统计',
        output: '__STATS_OUTPUT__'
      }
    ]
  },
  {
    name: '/status',
    description: '打开设置界面，显示版本、模型、帐户和连接性',
    examples: [
      {
        command: '/status',
        description: '查看状态',
        output: '__STATUS_OUTPUT__'
      }
    ]
  },
  {
    name: '/statusline',
    description: '设置 Claude Code 的状态行 UI',
    examples: [
      {
        command: '/statusline',
        description: '设置状态行',
        output: '__STATUSLINE_OUTPUT__'
      }
    ]
  },
  {
    name: '/tasks',
    description: '列出并管理后台任务',
    examples: [
      {
        command: '/tasks',
        description: '查看后台任务',
        output: '__TASKS_OUTPUT__'
      }
    ]
  },
  {
    name: '/teleport',
    description: '从 claude.ai 恢复远程会话',
    examples: [
      {
        command: '/teleport',
        description: '恢复远程会话',
        output: `Teleporting to claude.ai...

Available remote sessions:
1. Project Alpha - Last edited 2h ago
2. Feature Review - Last edited 1d ago

Press number to teleport, or /teleport <session-id> for specific session.`
      }
    ]
  },
  {
    name: '/theme',
    description: '更改颜色主题',
    examples: [
      {
        command: '/theme',
        description: '切换主题',
        output: '__THEME_OUTPUT__'
      }
    ]
  },
  {
    name: '/todos',
    description: '列出当前 TODO 项',
    examples: [
      {
        command: '/todos',
        description: '查看 TODO 列表',
        output: 'No todos currently tracked'
      }
    ]
  },
  {
    name: '/usage',
    description: '显示计划使用限制和速率限制状态',
    examples: [
      {
        command: '/usage',
        description: '查看订阅使用情况',
        output: `Subscription Usage (Premium):
Monthly quota: 1,000,000 tokens
Used this month: 15,234 tokens (1.5%)
Remaining: 984,766 tokens

Rate limits:
Requests/min: 60
Current: 12/min

Next billing: 2024-03-01`
      }
    ]
  }
];

export const getCommandByName = (name: string): Command | undefined => {
  return commands.find(c => c.name === name);
};

export const getSimilarCommands = (input: string): string[] => {
  const lowerInput = input.toLowerCase();
  return commands
    .filter(c => c.name.toLowerCase().includes(lowerInput))
    .map(c => c.name)
    .slice(0, 3);
};
