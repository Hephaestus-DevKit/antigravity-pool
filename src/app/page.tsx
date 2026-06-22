'use client';

import Link from 'next/link';
import { useState } from 'react';

const hermesConfig = `model:
  default: gemini-3-flash
  provider: custom
  base_url: http://localhost:18080/api/v1
  api_key: dummy_token
  context_length: 1048576`;

const availableModels = [
  { name: 'Gemini 3 Flash (High)', id: 'gemini-3-flash', type: 'Google Daily Preview', color: 'from-blue-400 to-indigo-500' },
  { name: 'Gemini 3.5 Flash (Medium)', id: 'gemini-3.5-flash-low', type: 'Google Daily Preview', color: 'from-indigo-400 to-purple-500' },
  { name: 'Gemini 3.1 Pro (Low)', id: 'gemini-3.1-pro-low', type: 'Google Daily Preview', color: 'from-purple-400 to-pink-500' },
  { name: 'Gemini 2.5 Pro', id: 'gemini-2.5-pro', type: 'Google Daily Preview', color: 'from-pink-400 to-rose-500' },
  { name: 'Claude Sonnet 4.6 (Thinking)', id: 'claude-sonnet-4-6', type: 'Anthropic Vertex', color: 'from-orange-400 to-amber-500' },
  { name: 'Claude Opus 4.6 (Thinking)', id: 'claude-opus-4-6-thinking', type: 'Anthropic Vertex', color: 'from-rose-400 to-orange-500' },
];

export default function LandingPage() {
  const [copied, setCopied] = useState(false);

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(hermesConfig);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy config:', err);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden flex flex-col justify-between">
      {/* Background glowing decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] opacity-30">
          <div className="absolute -top-[30%] left-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-900 to-purple-900 blur-[130px]"></div>
          <div className="absolute -top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-fuchsia-800 via-purple-900 to-slate-950 blur-[130px]"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[300px] opacity-10 bg-gradient-to-t from-indigo-900 to-transparent blur-[80px]"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-24 space-y-16 flex-1 flex flex-col justify-center">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-950/60 px-4 py-1.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30 backdrop-blur-md shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>Direct REST API Proxy Pool</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
              Antigravity Pool
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 leading-relaxed font-normal">
            极速、稳定的 Google/Gemini 账户流转代理池。通过原生 OAuth 自动刷新令牌，免去命令行开销，合并多账号并发额度为统一的 OpenAI 兼容端点。
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Link
            href="/admin/dashboard"
            className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] active:scale-[0.98]"
          >
            进入管理面板 
            <span className="transition-transform group-hover:translate-x-1.5 duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Config and Models Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Config Block */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md shadow-2xl flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
                <h2 className="font-bold text-slate-200 text-xs tracking-wider uppercase">Hermes / Cline 配置示例</h2>
              </div>
              <button
                type="button"
                onClick={copyConfig}
                className="rounded-lg border border-slate-700 bg-slate-800/80 px-3.5 py-1.5 text-xs font-semibold text-slate-300 shadow-sm transition hover:bg-slate-700 hover:text-white active:scale-95 cursor-pointer"
              >
                {copied ? '已复制 ✔' : '复制配置'}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-slate-950/80 p-5 font-mono text-[11px] leading-5 text-slate-300 border border-slate-900">
              <code>{hermesConfig}</code>
            </pre>
          </div>

          {/* Model Mapping Block */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
              <h2 className="font-bold text-slate-200 text-xs tracking-wider uppercase">支持与流转模型</h2>
            </div>
            <div className="divide-y divide-slate-800/60 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
              {availableModels.map((model) => (
                <div key={model.id} className="py-3 flex justify-between items-center text-xs group">
                  <div>
                    <div className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">{model.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{model.id}</div>
                  </div>
                  <span className={`rounded-md bg-gradient-to-r ${model.color} px-2.5 py-1 text-[9px] font-bold text-white shadow-sm opacity-90`}>
                    {model.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integration Instructions */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md shadow-2xl space-y-6">
          <h2 className="font-bold text-white text-base flex items-center gap-2">
            🚀 快速上手指南
          </h2>
          <div className="grid gap-6 md:grid-cols-3 text-xs text-slate-400 leading-relaxed">
            <div className="space-y-2.5 p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 hover:border-slate-700/50 transition">
              <div className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <span className="text-indigo-400">01.</span> 启动服务
              </div>
              <p>在项目目录中运行 <code>npm run dev</code>。服务将默认监听本机的 <code>18080</code> 端口，并自动初始化数据库。</p>
            </div>
            <div className="space-y-2.5 p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 hover:border-slate-700/50 transition">
              <div className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <span className="text-indigo-400">02.</span> 导入凭据
              </div>
              <p>进入管理面板，点击“导入本地 Active 凭据”。它会自动解析并载入您本地的 <code>gemini:antigravity</code> 登录凭证。</p>
            </div>
            <div className="space-y-2.5 p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 hover:border-slate-700/50 transition">
              <div className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <span className="text-indigo-400">03.</span> 客户端配置
              </div>
              <p>将客户端 (如 Cline, Cursor) 的 Base URL 修改为 <code>http://localhost:18080/api/v1</code>，输入任意 Key 即可直接使用。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full text-center text-xs text-slate-600 border-t border-slate-900 py-8 mt-12 bg-slate-950/80">
        Antigravity Pool Proxy v1.0 | Google Cloud Code Companion REST Engine
      </div>
    </main>
  );
}
