import type { LearningModule } from '../types';

export const modules: LearningModule[] = [
  {
    id: 'module-1',
    title: '内置命令',
    description: '掌握 Claude Code 的所有内置命令',
    icon: '🚀',
    steps: [
      {
        id: 'step-1-5',
        title: '打开设置',
        description: '打开设置界面（配置选项卡）',
        instruction: '输入 /config 打开配置',
        commands: ['/config'],
        expectedOutput: 'Opening configuration interface...',
        hints: ['打开配置选项卡']
      },
      {
        id: 'step-1-2',
        title: '压缩对话',
        description: '压缩对话历史',
        instruction: '输入 /compact 压缩对话',
        commands: ['/compact'],
        expectedOutput: 'Conversation history compressed.',
        hints: ['可以使用可选焦点指令进行压缩']
      },
      {
        id: 'step-1-6',
        title: '查看上下文使用',
        description: '查看当前上下文使用情况',
        instruction: '输入 /context 查看上下文',
        commands: ['/context'],
        expectedOutput: 'Context usage: ...',
        hints: ['以彩色网格形式显示上下文使用情况']
      },
      {
        id: 'step-1-7',
        title: '查看成本统计',
        description: '查看令牌使用和成本统计',
        instruction: '输入 /cost 查看成本',
        commands: ['/cost'],
        expectedOutput: 'Token Usage Statistics...',
        hints: ['有关订阅详细信息，请参阅成本跟踪指南']
      },
      {
        id: 'step-1-1',
        title: '清除对话历史',
        description: '清除对话历史',
        instruction: '输入 /clear 清除对话',
        commands: ['/clear'],
        expectedOutput: 'Conversation history cleared.',
        hints: ['清除后对话历史将被重置']
      },
      {
        id: 'step-1-8',
        title: '检查健康状况',
        description: '检查安装健康状况',
        instruction: '输入 /doctor 运行诊断',
        commands: ['/doctor'],
        expectedOutput: 'Running diagnostics...',
        hints: ['检查 Claude Code 安装是否正常']
      },
      {
        id: 'step-1-10',
        title: '导出对话',
        description: '导出当前对话',
        instruction: '输入 /export 导出对话',
        commands: ['/export'],
        expectedOutput: 'Conversation exported...',
        hints: ['可导出到文件或剪贴板']
      },
      {
        id: 'step-1-10-b',
        title: '获取帮助',
        description: '获取使用帮助',
        instruction: '输入 /help 查看帮助信息',
        commands: ['/help'],
        expectedOutput: 'Claude Code Help...',
        hints: ['包含快速开始和常用命令说明']
      },
      {
        id: 'step-1-11',
        title: '初始化项目',
        description: '创建 CLAUDE.md 指南',
        instruction: '输入 /init 初始化项目',
        commands: ['/init'],
        expectedOutput: 'Created CLAUDE.md...',
        hints: ['创建项目文档和配置文件']
      },
      {
        id: 'step-1-12',
        title: '管理 MCP 连接',
        description: '管理 MCP server 连接',
        instruction: '输入 /mcp 查看连接状态',
        commands: ['/mcp'],
        expectedOutput: 'MCP Server Connections...',
        hints: ['管理 MCP server 和 OAuth 身份验证']
      },
      {
        id: 'step-1-13',
        title: '编辑内存文件',
        description: '编辑 CLAUDE.md 内存文件',
        instruction: '输入 /memory 编辑内存',
        commands: ['/memory'],
        expectedOutput: 'Opening CLAUDE.md...',
        hints: ['编辑项目的上下文和记忆']
      },
      {
        id: 'step-1-14',
        title: '切换模型',
        description: '快速切换 AI 模型',
        instruction: '输入 /model 查看并选择模型',
        commands: ['/model'],
        expectedOutput: 'Available models...',
        hints: ['在不清除提示的情况下切换模型']
      },
      {
        id: 'step-1-15',
        title: '查看权限',
        description: '查看或更新权限',
        instruction: '输入 /permissions 查看权限',
        commands: ['/permissions'],
        expectedOutput: 'Current Permissions...',
        hints: ['查看和更新各种权限']
      },
      {
        id: 'step-1-16',
        title: '进入 Plan Mode',
        description: '直接进入规划模式',
        instruction: '输入 /plan 进入 Plan Mode',
        commands: ['/plan'],
        expectedOutput: 'Entering Plan Mode...',
        hints: ['Plan Mode 帮助更系统地规划任务']
      },
      {
        id: 'step-1-17',
        title: '重命名会话',
        description: '重命名当前会话',
        instruction: '输入 /rename 重命名会话',
        commands: ['/rename'],
        expectedOutput: 'Session renamed...',
        hints: ['便于识别和管理会话']
      },
      {
        id: 'step-1-18',
        title: '会话管理',
        description: '恢复或查看会话',
        instruction: '输入 /resume 查看会话列表',
        commands: ['/resume'],
        expectedOutput: 'Recent sessions...',
        hints: ['可以按 ID 或名称恢复对话', '/rename 可以重命名会话']
      },
      {
        id: 'step-1-19',
        title: '回退对话',
        description: '回退对话和代码',
        instruction: '输入 /rewind 查看回退选项',
        commands: ['/rewind'],
        expectedOutput: 'Rewind options...',
        hints: ['可以回退指定轮数的对话']
      },
      {
        id: 'step-1-20',
        title: '查看使用统计',
        description: '可视化每日使用情况',
        instruction: '输入 /stats 查看统计',
        commands: ['/stats'],
        expectedOutput: 'Usage Statistics...',
        hints: ['显示使用情况、会话历史、连胜和模型偏好']
      },
      {
        id: 'step-1-21',
        title: '查看状态',
        description: '查看版本、模型和帐户信息',
        instruction: '输入 /status 查看状态',
        commands: ['/status'],
        expectedOutput: 'Claude Code Status...',
        hints: ['打开状态选项卡']
      },
      {
        id: 'step-1-22',
        title: '设置状态行',
        description: '设置状态行 UI',
        instruction: '输入 /statusline 配置状态行',
        commands: ['/statusline'],
        expectedOutput: 'Status Line Options...',
        hints: ['可选择 Minimal, Standard, Detailed']
      },
      {
        id: 'step-1-23',
        title: '管理后台任务',
        description: '管理后台运行的任务',
        instruction: '输入 /tasks 查看任务',
        commands: ['/tasks'],
        expectedOutput: 'Background Tasks...',
        hints: ['/bash 可以后台运行 bash 命令']
      },
      {
        id: 'step-1-24',
        title: '远程会话',
        description: '从 claude.ai 恢复远程会话',
        instruction: '输入 /teleport 恢复远程会话',
        commands: ['/teleport'],
        expectedOutput: 'Teleporting to claude.ai...',
        hints: ['仅限订阅者功能']
      },
      {
        id: 'step-1-25',
        title: '切换主题',
        description: '更改颜色主题',
        instruction: '输入 /theme 切换主题',
        commands: ['/theme'],
        expectedOutput: 'Available themes...',
        hints: ['可在 light, dark, solarized, dracula 之间切换']
      },
      {
        id: 'step-1-26',
        title: '查看 TODO 项',
        description: '列出当前 TODO 项',
        instruction: '输入 /todos 查看列表',
        commands: ['/todos'],
        expectedOutput: 'Current TODOs...',
        hints: ['显示待办事项列表']
      },
      {
        id: 'step-1-27',
        title: '查看订阅使用',
        description: '显示计划使用限制和速率限制',
        instruction: '输入 /usage 查看订阅使用情况',
        commands: ['/usage'],
        expectedOutput: 'Subscription Usage...',
        hints: ['仅适用于订阅计划']
      },
      {
        id: 'step-1-28',
        title: '退出 REPL',
        description: '退出 Claude Code',
        instruction: '输入 /exit 退出',
        commands: ['/exit'],
        expectedOutput: 'Exiting Claude Code...',
        hints: ['安全退出交互模式']
      }
    ],
    prerequisites: [],
    estimatedTime: 3
  }
];

export const getModuleById = (id: string): LearningModule | undefined => {
  return modules.find(m => m.id === id);
};

export const getNextModule = (currentId: string): LearningModule | undefined => {
  const currentIndex = modules.findIndex(m => m.id === currentId);
  if (currentIndex >= 0 && currentIndex < modules.length - 1) {
    return modules[currentIndex + 1];
  }
  return undefined;
};
