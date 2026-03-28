'use client'

import { useState } from 'react'
import { useStore } from '@/store'
import { ChevronDown, Sparkles } from 'lucide-react'

interface ModelInfo {
  id: string
  name: string
  provider: string
  description: string
  context: string
}

const MODELS: ModelInfo[] = [
  // ── Google ──
  {
    id: 'google/gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    description: 'Strong reasoning + coding',
    context: '1M'
  },
  {
    id: 'google/gemini-2.5-pro-preview',
    name: 'Gemini 2.5 Pro Preview',
    provider: 'Google',
    description: 'Preview of Gemini 2.5 Pro',
    context: '1M'
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    description: 'Fast and efficient',
    context: '1M'
  },
  {
    id: 'google/gemini-2.5-flash-lite',
    name: 'Gemini 2.5 Flash Lite',
    provider: 'Google',
    description: 'Lightweight fast model',
    context: '1M'
  },
  {
    id: 'google/gemini-2.0-flash-001',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    description: 'Fast multimodal model',
    context: '1M'
  },
  {
    id: 'google/gemini-3-flash-preview',
    name: 'Gemini 3 Flash Preview',
    provider: 'Google',
    description: 'Next-gen fast model',
    context: '1M'
  },
  {
    id: 'google/gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro Preview',
    provider: 'Google',
    description: 'Latest Gemini 3.1 flagship',
    context: '1M'
  },
  {
    id: 'google/gemma-3-27b-it',
    name: 'Gemma 3 27B',
    provider: 'Google',
    description: 'Multimodal open model',
    context: '128K'
  },
  // ── xAI ──
  {
    id: 'x-ai/grok-4',
    name: 'Grok 4',
    provider: 'xAI',
    description: 'xAI frontier model',
    context: '256K'
  },
  {
    id: 'x-ai/grok-4-fast',
    name: 'Grok 4 Fast',
    provider: 'xAI',
    description: 'Fast Grok 4',
    context: '256K'
  },
  {
    id: 'x-ai/grok-3',
    name: 'Grok 3',
    provider: 'xAI',
    description: 'xAI flagship',
    context: '131K'
  },
  {
    id: 'x-ai/grok-3-beta',
    name: 'Grok 3 Beta',
    provider: 'xAI',
    description: 'xAI flagship beta',
    context: '131K'
  },
  {
    id: 'x-ai/grok-3-mini',
    name: 'Grok 3 Mini',
    provider: 'xAI',
    description: 'Efficient reasoning model',
    context: '131K'
  },
  {
    id: 'x-ai/grok-3-mini-beta',
    name: 'Grok 3 Mini Beta',
    provider: 'xAI',
    description: 'Efficient reasoning beta',
    context: '131K'
  },
  {
    id: 'x-ai/grok-code-fast-1',
    name: 'Grok Code Fast',
    provider: 'xAI',
    description: 'Fast coding model',
    context: '128K'
  },
  // ── Anthropic ──
  {
    id: 'anthropic/claude-opus-4.6',
    name: 'Claude Opus 4.6',
    provider: 'Anthropic',
    description: 'Latest Anthropic flagship',
    context: '200K'
  },
  {
    id: 'anthropic/claude-sonnet-4.6',
    name: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    description: 'Best balance speed + quality',
    context: '200K'
  },
  {
    id: 'anthropic/claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    description: 'Powerful Anthropic model',
    context: '200K'
  },
  {
    id: 'anthropic/claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    description: 'Strong and reliable',
    context: '200K'
  },
  {
    id: 'anthropic/claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    description: 'Hybrid reasoning model',
    context: '200K'
  },
  {
    id: 'anthropic/claude-3.7-sonnet:thinking',
    name: 'Claude 3.7 Sonnet (Thinking)',
    provider: 'Anthropic',
    description: 'Extended thinking mode',
    context: '200K'
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Reliable workhorse',
    context: '200K'
  },
  {
    id: 'anthropic/claude-3.5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    description: 'Fast and affordable',
    context: '200K'
  },
  // ── OpenAI ──
  {
    id: 'openai/gpt-5',
    name: 'GPT-5',
    provider: 'OpenAI',
    description: 'OpenAI flagship',
    context: '128K'
  },
  {
    id: 'openai/gpt-5.3-chat',
    name: 'GPT-5.3 Chat',
    provider: 'OpenAI',
    description: 'Latest GPT-5 chat model',
    context: '128K'
  },
  {
    id: 'openai/gpt-5.2',
    name: 'GPT-5.2',
    provider: 'OpenAI',
    description: 'Strong GPT-5 model',
    context: '128K'
  },
  {
    id: 'openai/gpt-4.1',
    name: 'GPT-4.1',
    provider: 'OpenAI',
    description: 'Latest GPT-4 series',
    context: '1M'
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Reliable workhorse',
    context: '128K'
  },
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    description: 'Fast and affordable',
    context: '128K'
  },
  {
    id: 'openai/o4-mini',
    name: 'o4-mini',
    provider: 'OpenAI',
    description: 'Fast reasoning model',
    context: '200K'
  },
  {
    id: 'openai/o3',
    name: 'o3',
    provider: 'OpenAI',
    description: 'Powerful reasoning model',
    context: '200K'
  },
  {
    id: 'openai/o3-mini',
    name: 'o3-mini',
    provider: 'OpenAI',
    description: 'Efficient reasoning model',
    context: '200K'
  },
  {
    id: 'openai/gpt-oss-120b',
    name: 'GPT-OSS 120B',
    provider: 'OpenAI',
    description: 'Open-weight MoE, Apache 2.0',
    context: '131K'
  },
  {
    id: 'openai/gpt-oss-20b',
    name: 'GPT-OSS 20B',
    provider: 'OpenAI',
    description: 'Lightweight open-weight',
    context: '131K'
  },
  // ── DeepSeek ──
  {
    id: 'deepseek/deepseek-v3.2',
    name: 'DeepSeek V3.2',
    provider: 'DeepSeek',
    description: 'Latest DeepSeek V3',
    context: '128K'
  },
  {
    id: 'deepseek/deepseek-chat-v3-0324',
    name: 'DeepSeek V3 (0324)',
    provider: 'DeepSeek',
    description: 'Extremely capable V3',
    context: '128K'
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    description: 'Fast and capable',
    context: '128K'
  },
  {
    id: 'deepseek/deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    description: 'Strong reasoning model',
    context: '128K'
  },
  {
    id: 'deepseek/deepseek-r1-distill-llama-70b',
    name: 'DeepSeek R1 Distill 70B',
    provider: 'DeepSeek',
    description: 'Distilled reasoning model',
    context: '128K'
  },
  // ── Qwen ──
  {
    id: 'qwen/qwen3-235b-a22b',
    name: 'Qwen3 235B',
    provider: 'Qwen',
    description: 'Powerful MoE model',
    context: '131K'
  },
  {
    id: 'qwen/qwen3-coder',
    name: 'Qwen3 Coder',
    provider: 'Qwen',
    description: 'Frontier coding MoE',
    context: '262K'
  },
  {
    id: 'qwen/qwen3-30b-a3b',
    name: 'Qwen3 30B',
    provider: 'Qwen',
    description: 'Efficient MoE model',
    context: '131K'
  },
  {
    id: 'qwen/qwen3.5-plus-02-15',
    name: 'Qwen 3.5 Plus',
    provider: 'Qwen',
    description: 'Latest Qwen flagship',
    context: '131K'
  },
  {
    id: 'qwen/qwen-2.5-72b-instruct',
    name: 'Qwen 2.5 72B',
    provider: 'Qwen',
    description: 'Strong open model',
    context: '131K'
  },
  {
    id: 'qwen/qwen-2.5-coder-32b-instruct',
    name: 'Qwen 2.5 Coder 32B',
    provider: 'Qwen',
    description: 'Strong coding model',
    context: '131K'
  },
  {
    id: 'qwen/qwq-32b',
    name: 'QwQ 32B',
    provider: 'Qwen',
    description: 'Reasoning model',
    context: '131K'
  },
  // ── Meta ──
  {
    id: 'meta-llama/llama-4-maverick',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    description: 'Latest Meta flagship',
    context: '128K'
  },
  {
    id: 'meta-llama/llama-4-scout',
    name: 'Llama 4 Scout',
    provider: 'Meta',
    description: 'Efficient Meta model',
    context: '128K'
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    description: 'Solid all-rounder',
    context: '128K'
  },
  {
    id: 'meta-llama/llama-3.1-405b-instruct',
    name: 'Llama 3.1 405B',
    provider: 'Meta',
    description: 'Largest open model',
    context: '128K'
  },
  {
    id: 'meta-llama/llama-3.1-8b-instruct',
    name: 'Llama 3.1 8B',
    provider: 'Meta',
    description: 'Lightweight speed option',
    context: '128K'
  },
  // ── Mistral ──
  {
    id: 'mistralai/mistral-large-2411',
    name: 'Mistral Large',
    provider: 'Mistral',
    description: 'Mistral flagship model',
    context: '128K'
  },
  {
    id: 'mistralai/mistral-small-3.2-24b-instruct',
    name: 'Mistral Small 3.2',
    provider: 'Mistral',
    description: 'Efficient Mistral model',
    context: '128K'
  },
  {
    id: 'mistralai/mixtral-8x22b-instruct',
    name: 'Mixtral 8x22B',
    provider: 'Mistral',
    description: 'MoE powerhouse',
    context: '65K'
  },
  // ── Nous Research ──
  {
    id: 'nousresearch/hermes-4-405b',
    name: 'Hermes 4 405B',
    provider: 'Nous Research',
    description: 'Uncensored 405B',
    context: '131K'
  },
  {
    id: 'nousresearch/hermes-4-70b',
    name: 'Hermes 4 70B',
    provider: 'Nous Research',
    description: 'Uncensored champion',
    context: '128K'
  },
  {
    id: 'nousresearch/hermes-3-llama-3.1-70b',
    name: 'Hermes 3 70B',
    provider: 'Nous Research',
    description: 'Classic uncensored',
    context: '128K'
  },
  {
    id: 'nousresearch/hermes-3-llama-3.1-405b',
    name: 'Hermes 3 405B',
    provider: 'Nous Research',
    description: 'Uncensored 405B legacy',
    context: '128K'
  },
  // ── MiniMax ──
  {
    id: 'moonshotai/kimi-k2',
    name: 'Kimi K2',
    provider: 'Moonshot AI',
    description: '1T MoE instruct, tool-use',
    context: '256K'
  },
  {
    id: 'moonshotai/kimi-k2.5',
    name: 'Kimi K2.5',
    provider: 'Moonshot AI',
    description: 'Native multimodal, agent swarm',
    context: '256K'
  },
  // ── Xiaomi ──
  {
    id: 'xiaomi/mimo-v2-flash',
    name: 'MiMo-V2 Flash',
    provider: 'Xiaomi',
    description: '309B MoE, #1 open-source SWE-bench',
    context: '256K'
  },
  {
    id: 'xiaomi/mimo-v2-pro',
    name: 'MiMo-V2 Pro',
    provider: 'Xiaomi',
    description: '1T flagship, #1 Programming',
    context: '1M'
  },
  // ── Z.AI ──
  {
    id: 'z-ai/glm-5',
    name: 'GLM-5',
    provider: 'Z.AI',
    description: 'Latest GLM flagship',
    context: '128K'
  },
  {
    id: 'z-ai/glm-5-turbo',
    name: 'GLM-5 Turbo',
    provider: 'Z.AI',
    description: 'Fast agentic inference',
    context: '203K'
  },
  {
    id: 'z-ai/glm-4.7',
    name: 'GLM-4.7',
    provider: 'Z.AI',
    description: 'Strong coding + agent tasks',
    context: '128K'
  },
  // ── NVIDIA ──
  {
    id: 'nvidia/nemotron-3-super-120b-a12b',
    name: 'Nemotron 3 Super',
    provider: 'NVIDIA',
    description: 'Hybrid Mamba-Transformer',
    context: '262K'
  },
  // ── StepFun ──
  {
    id: 'stepfun/step-3.5-flash',
    name: 'Step 3.5 Flash',
    provider: 'StepFun',
    description: 'Fast open MoE',
    context: '256K'
  },
  // ── Other ──
  {
    id: 'perplexity/sonar',
    name: 'Perplexity Sonar',
    provider: 'Perplexity',
    description: 'Web-grounded answers',
    context: '128K'
  },
  {
    id: 'perplexity/sonar-pro',
    name: 'Perplexity Sonar Pro',
    provider: 'Perplexity',
    description: 'Advanced web search',
    context: '200K'
  },
  {
    id: 'cohere/command-a',
    name: 'Command A',
    provider: 'Cohere',
    description: 'Enterprise-grade model',
    context: '256K'
  },
  {
    id: 'amazon/nova-pro-v1',
    name: 'Amazon Nova Pro',
    provider: 'Amazon',
    description: 'Multimodal flagship',
    context: '300K'
  }
]

export function ModelSelector() {
  const { defaultModel, setDefaultModel } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  const activeModel = MODELS.find(m => m.id === defaultModel) || MODELS[0]

  return (
    <div className="relative">
      <label className="text-xs theme-secondary mb-1 block">Model</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2
          bg-theme-bg border border-theme-primary rounded-lg
          hover:glow-box transition-all text-sm"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="truncate">{activeModel.name}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-1 z-20
            bg-theme-dim border border-theme-primary rounded-lg
            shadow-lg max-h-80 overflow-y-auto"
          >
            {MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  setDefaultModel(model.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-start gap-3 px-3 py-3 text-left
                  hover:bg-theme-accent transition-colors
                  ${defaultModel === model.id ? 'bg-theme-accent' : ''}`}
              >
                <Sparkles className="w-4 h-4 mt-0.5 theme-secondary" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{model.name}</span>
                    <span className="text-xs px-1.5 py-0.5 bg-theme-accent rounded">
                      {model.context}
                    </span>
                  </div>
                  <div className="text-xs theme-secondary">
                    {model.provider} • {model.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export { MODELS }
