import type { Module } from "./types";

export const module5: Module = {
  id: "module-5",
  number: 5,
  title: "Advanced Topics",
  subtitle: "Agents, Scaling, and the Frontier",
  description:
    "Multi-agent systems, large codebase management, custom models, AI evaluation, enterprise workflows, and how to stay effective as the landscape evolves.",
  lessons: [
    {
      id: "5-1",
      title: "Multi-Agent Systems: Orchestrating AI Teams",
      estimatedMinutes: 18,
      content: [
        {
          type: "paragraph",
          text: "A single AI agent is powerful. A coordinated team of AI agents — each specialized for a different task, working in parallel or sequence — is something qualitatively different. Multi-agent systems can tackle problems that no single agent could handle: long-horizon projects that require planning, execution, review, and iteration across many steps; complex codebases where different agents handle different layers; quality assurance pipelines where one agent's output is reviewed by another.",
        },
        {
          type: "paragraph",
          text: "This is the frontier of practical AI-assisted development in 2026. Rene Turcios has spoken extensively about 'Agentcies' — multi-agent systems where different agents coordinate to build complete products. The concept is moving from theoretical to practical as tools improve and the patterns become better understood.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Architecture of Multi-Agent Systems",
        },
        {
          type: "paragraph",
          text: "Multi-agent systems follow a few fundamental architectural patterns:",
        },
        {
          type: "list",
          items: [
            "ORCHESTRATOR + WORKERS: A central orchestrator agent breaks down a complex task into subtasks and delegates to specialized worker agents. The orchestrator synthesizes results. Analogous to a tech lead coordinating an engineering team.",
            "PIPELINE: Agents arranged in sequence, where each agent's output is the next agent's input. Planning agent → Implementation agent → Review agent → Testing agent. Similar to an assembly line.",
            "PARALLEL EXECUTION: Multiple agents work independently on different aspects of a problem simultaneously. Output is merged at the end. Useful when tasks are genuinely independent.",
            "ADVERSARIAL PAIRS: Two agents with opposing mandates — one builds, one critiques. The tension produces higher quality output than either would alone. Analogous to red team / blue team security exercises.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "A Practical Multi-Agent Workflow",
        },
        {
          type: "paragraph",
          text: "Here is a practical orchestrator/worker pattern you can implement manually today, without any framework, using standard AI tools:",
        },
        {
          type: "code",
          language: "text",
          caption: "Manual multi-agent orchestration workflow",
          code: `AGENT 1: ARCHITECT
Prompt: "You are a software architect. I need to build [feature]. 
Create a detailed implementation plan including: files to create/modify, 
data models, API endpoints, and sequence of operations. 
Output a structured plan in this format: [specify format]"

→ Review the plan output critically.
→ Approve or iterate.

AGENT 2: IMPLEMENTER (runs in parallel for independent subtasks)
Backend Agent: "Implement the backend portion of this plan: [paste backend section]"
Frontend Agent: "Implement the frontend portion of this plan: [paste frontend section]"

→ Collect outputs from both agents.

AGENT 3: REVIEWER
Prompt: "Review this implementation against the original plan. Check for:
1. Completeness — does it implement everything in the plan?
2. Correctness — does the logic match the spec?
3. Security — are there any security gaps?
4. Code quality — does it follow the conventions in .cursorrules?
[paste the implementation]"

→ Feed review findings back to the implementer agent for corrections.

AGENT 4: TEST WRITER
Prompt: "Write comprehensive tests for this implementation. 
Cover all edge cases, error paths, and integration points.
[paste the implementation]"`,
        },
        {
          type: "heading",
          level: 2,
          text: "Agent Communication and Context",
        },
        {
          type: "paragraph",
          text: "The biggest challenge in multi-agent systems is context management: how does each agent know what the other agents did? There are several approaches:",
        },
        {
          type: "list",
          items: [
            "SHARED FILES: Agents read and write to shared files (architecture doc, API spec, test results). Each agent starts by reading the files that represent the current state.",
            "STRUCTURED OUTPUTS: Require each agent to produce structured output (JSON, markdown with specific sections) that subsequent agents can parse and consume.",
            "ORCHESTRATOR CONTEXT: The orchestrator maintains the state and passes relevant context to each worker agent as it delegates tasks.",
          ],
        },
        {
          type: "insight",
          title: "The Context Problem Is the Real Challenge",
          text: "Most multi-agent system failures are context failures: one agent doesn't know what another decided, so it makes an incompatible choice. The solution is explicit, structured handoffs — not implicit shared understanding. Design your multi-agent workflows so that every agent receives only the context it needs to do its specific task, in a structured format it can reliably interpret.",
        },
        {
          type: "heading",
          level: 2,
          text: "Agent Frameworks",
        },
        {
          type: "paragraph",
          text: "Several frameworks have emerged for building automated multi-agent systems programmatically. These are useful when you want to build a system that runs without constant human orchestration:",
        },
        {
          type: "list",
          items: [
            "LANGGRAPH (Python): Graph-based agent orchestration from the LangChain team. Excellent for complex workflows with conditional branching and loops. Best-in-class for state management.",
            "AUTOGEN (Microsoft): Conversational multi-agent framework where agents communicate through structured conversations. Good for adversarial and collaborative agent patterns.",
            "CREWAI: Role-based multi-agent framework. Define agents by their role and tools, then define the workflow. Good beginner entry point for multi-agent systems.",
            "OPENAI SWARM: Lightweight framework for handoff-based agent orchestration. Simple and effective for sequential pipelines.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "When Multi-Agent Systems Are Worth It",
        },
        {
          type: "paragraph",
          text: "Multi-agent systems add complexity. They are worth that complexity for tasks that genuinely require it:",
        },
        {
          type: "list",
          items: [
            "Long-horizon tasks where a single context window cannot hold the full problem",
            "Tasks requiring genuine parallel execution (multiple features being built simultaneously)",
            "Quality-critical work where independent review is essential",
            "Repeated workflows that justify the setup cost",
          ],
        },
        {
          type: "warning",
          title: "Don't Over-Engineer",
          text: "Multi-agent systems are an advanced technique that adds coordination overhead, debugging complexity, and cost. For most development tasks, a single well-prompted agent is faster and more reliable. Reach for multi-agent patterns when a single agent is genuinely unable to handle the scope — not because it sounds more impressive.",
        },
        {
          type: "exercise",
          title: "Build a Manual Multi-Agent Pipeline",
          description:
            "Take a feature that is complex enough to benefit from structured planning and review. Run it through a three-agent pipeline: (1) Architect agent: produce a detailed implementation plan. (2) Implementer agent: implement from the plan (use a fresh conversation with the plan as context). (3) Reviewer agent: review the implementation against the plan (use a third fresh conversation). Document what each agent caught or produced that the others missed.",
          hints: [
            "Use fresh conversation windows for each agent — don't let context from one bleed into another.",
            "The reviewer agent's findings are the most valuable output of this exercise. Document them carefully.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Multi-agent patterns: orchestrator/workers, pipeline, parallel, adversarial pairs",
            "Context management is the core challenge — explicit structured handoffs beat implicit shared understanding",
            "Manual orchestration (you as the coordinator) works well before investing in framework automation",
            "Frameworks: LangGraph, AutoGen, CrewAI, OpenAI Swarm — each with different tradeoffs",
            "Only use multi-agent when a single agent is genuinely insufficient — don't over-engineer",
          ],
        },
      ],
    },
    {
      id: "5-2",
      title: "Taming Large Codebases: RAG, Indexing, and Context",
      estimatedMinutes: 16,
      content: [
        {
          type: "paragraph",
          text: "AI coding tools shine on small-to-medium codebases where the relevant context fits in a single conversation. Large codebases — hundreds of thousands of lines, dozens of contributors, years of history — require different techniques. The challenge is not that AI cannot understand large code; it is that AI cannot see code it has not been shown. The techniques in this lesson solve the 'what to show the AI' problem.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Context Window Problem",
        },
        {
          type: "paragraph",
          text: "Large language models have a context window — a maximum amount of text they can process in a single interaction. As of 2026, frontier models have context windows of 100,000 to 2,000,000 tokens (roughly 75,000 to 1.5 million words). This seems large, but a production codebase can easily be 500,000+ lines of code, far exceeding even the largest context windows.",
        },
        {
          type: "paragraph",
          text: "More importantly: even when a codebase fits in the context window, including all of it in every request is expensive (both in time and cost) and often counterproductive — large amounts of irrelevant context can reduce accuracy. The goal is to provide the right context, not all context.",
        },
        {
          type: "heading",
          level: 2,
          text: "Retrieval-Augmented Generation (RAG) for Code",
        },
        {
          type: "paragraph",
          text: "RAG is a technique where relevant documents are retrieved from a database and included in the AI context. Applied to codebases, it works like this: the codebase is indexed into a vector database, where each file or function is stored as a semantic embedding. When you make a request, the most semantically relevant files are retrieved and included in the context automatically.",
        },
        {
          type: "paragraph",
          text: "Cursor's codebase indexing implements this automatically. When you @-reference your codebase or use Agent mode, Cursor retrieves relevant files based on semantic similarity to your request. You don't need to build this yourself — but understanding how it works helps you write better prompts that produce better retrieval.",
        },
        {
          type: "tip",
          title: "Help the Retrieval System",
          text: "Cursor's retrieval works by semantic similarity. You can improve retrieval quality by being specific about the domain of your request: instead of 'add a feature', say 'add a feature to the user authentication system' or 'modify the payment processing pipeline.' Domain-specific language in your request will retrieve the most relevant files from the codebase.",
        },
        {
          type: "heading",
          level: 2,
          text: "Manual Context Management",
        },
        {
          type: "paragraph",
          text: "Even with automatic retrieval, you often need to manually specify which files to include. The art is knowing which files are relevant — both the files you are changing and the files whose patterns you should follow.",
        },
        {
          type: "list",
          items: [
            "@file — include a specific file (or portion of it)",
            "@folder — include all files in a folder",
            "@codebase — search the full codebase for relevant context",
            "@docs — include documentation from a URL",
            "@git — include recent git history or specific commits",
          ],
        },
        {
          type: "code",
          language: "text",
          caption: "Explicit context specification in Cursor",
          code: `I need to add a new payment method to the checkout flow.

@src/payments/stripe.ts — existing payment implementation to pattern-match
@src/payments/paypal.ts — example of another payment method
@src/models/order.ts — the order model that will need updating
@src/api/routes/checkout.ts — the route that handles checkout
@src/components/CheckoutForm.tsx — the UI component to update

Add Apple Pay as a new payment option following the same patterns as 
PayPal. The UI should follow the same button style as the PayPal button.`,
        },
        {
          type: "heading",
          level: 2,
          text: "The CODEBASE.md Pattern",
        },
        {
          type: "paragraph",
          text: "One of the most high-leverage techniques for large codebase AI work is maintaining a CODEBASE.md file — a human-readable map of the codebase that gives AI orientation before diving into specific files.",
        },
        {
          type: "code",
          language: "markdown",
          caption: "CODEBASE.md template",
          code: `# Codebase Map

## High-Level Architecture
[2-3 paragraph description of what the app does and how it's structured]

## Directory Structure
\`\`\`
src/
  api/        — Express routes and middleware
  services/   — Business logic (no direct DB access)
  models/     — Drizzle schema and types
  utils/      — Pure utility functions (no side effects)
  config/     — Environment and application configuration
client/
  pages/      — Route-level components
  components/ — Reusable UI components
  hooks/      — Custom React hooks
  stores/     — Zustand state stores
\`\`\`

## Key Patterns
- All database access goes through services/, never from routes
- Services are transaction-aware: pass a db connection parameter
- Validation happens in routes using Zod, before calling services
- All async operations use try/catch, logging errors with context

## Critical Files
- src/config/index.ts — All environment variables are validated here
- src/models/schema.ts — The complete database schema
- src/services/auth.ts — Authentication logic
- src/middleware/authenticate.ts — The auth middleware applied to protected routes

## Known Debt
- The UserService needs to be split into UserService and AuthService (#123)
- The payment route is too long and should be refactored (#145)`,
        },
        {
          type: "heading",
          level: 2,
          text: "Incremental Changes in Large Codebases",
        },
        {
          type: "paragraph",
          text: "When working on large codebases, resist the temptation to make large sweeping changes in a single AI session. The larger the change, the harder it is to review, the more likely it is to have unintended consequences, and the harder it is to debug if something goes wrong. Incremental changes are safer and produce better outcomes.",
        },
        {
          type: "list",
          items: [
            "LAYER ISOLATION: Make changes that stay within a single layer (only the service layer, only the UI components) to minimize blast radius.",
            "BACKWARD COMPATIBILITY: When changing an API or data structure, consider versioning or backward compatibility to avoid breaking other parts of the system.",
            "FEATURE FLAGS: For large feature additions, use feature flags to deploy to production without activating the feature, then activate gradually.",
            "STRANGLER FIG PATTERN: For large refactors, build the new system alongside the old one and migrate traffic incrementally, rather than big-bang replacements.",
          ],
        },
        {
          type: "exercise",
          title: "Map Your Codebase",
          description:
            "Take a codebase you work on (or have access to). Create a CODEBASE.md file for it: describe the high-level architecture, map the directory structure, document the key patterns, list the critical files, and note the known debt. Then use this file as context in an AI session and observe the quality improvement in responses.",
          hints: [
            "Use AI to help write the CODEBASE.md — ask it to analyze the directory structure and draft the documentation based on what it can see.",
            "The patterns section is the most valuable part. Document the patterns that exist, even if they're imperfect — AI will follow what's documented.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Large codebase AI work is a context management problem — provide the right context, not all context",
            "Cursor's codebase indexing implements RAG automatically — use domain-specific language to improve retrieval",
            "Manual context: @file, @folder, @codebase, @docs, @git — specify what's relevant explicitly",
            "CODEBASE.md: a map of the codebase that orients AI before it sees specific files",
            "Incremental changes: layer isolation, backward compatibility, feature flags, strangler fig pattern",
          ],
        },
      ],
    },
    {
      id: "5-3",
      title: "Custom Models and Fine-Tuning",
      estimatedMinutes: 14,
      content: [
        {
          type: "paragraph",
          text: "The frontier models — Claude, GPT-4, Gemini — are trained on the broadest possible corpus of code. They know Python, JavaScript, Rust, Go, and hundreds of other languages and frameworks. But they do not know your company's proprietary framework, your internal APIs, your codebase's specific patterns, or the domain vocabulary of your industry. Fine-tuning and custom model training address this gap — at the cost of significant investment.",
        },
        {
          type: "heading",
          level: 2,
          text: "When Fine-Tuning Is Worth It",
        },
        {
          type: "paragraph",
          text: "Fine-tuning is not a magic improvement — it is a specialized tool for specific situations. Before investing, evaluate whether your use case actually requires it:",
        },
        {
          type: "list",
          items: [
            "PROPRIETARY FRAMEWORK: Your company has built a custom framework that no frontier model has seen. Prompt engineering cannot substitute for training on real examples.",
            "DOMAIN-SPECIFIC VOCABULARY: Your industry has specialized terminology, formats, or conventions that are systematically misunderstood by general models.",
            "CONSISTENT STYLE AT SCALE: You need every AI-generated piece of code to match a specific style, and prompt engineering produces inconsistent results at high volume.",
            "LATENCY AND COST: You process millions of requests and a smaller, fine-tuned model would be 10x cheaper and 3x faster than a frontier model for your specific task.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "What Fine-Tuning Actually Does",
        },
        {
          type: "paragraph",
          text: "Fine-tuning takes a pre-trained model and continues training on a curated dataset of examples. It adjusts the model's weights to make it better at the specific task represented by those examples. It does NOT: give the model new knowledge, update the knowledge cutoff date, or fundamentally change the model's reasoning capabilities.",
        },
        {
          type: "paragraph",
          text: "The analogy: fine-tuning is like an experienced professional who learns the specific processes and vocabulary of a new company. They do not become more intelligent — they become better calibrated to this specific environment.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Data Requirement",
        },
        {
          type: "paragraph",
          text: "Fine-tuning requires training data — pairs of (input, expected output) that demonstrate the behavior you want. The quality of this data determines the quality of the fine-tuned model, perhaps even more than the quantity. Producing high-quality training data is the most time-consuming part of the process:",
        },
        {
          type: "list",
          items: [
            "Minimum viable: 50-100 high-quality examples for a simple style or format adaptation",
            "Moderate complexity: 500-2,000 examples for domain-specific vocabulary and conventions",
            "Complex behavior: 5,000-50,000+ examples for complex coding tasks or multi-step reasoning",
            "Data quality: one high-quality example is worth 10 low-quality ones — invest in curation",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Fine-Tuning Platforms",
        },
        {
          type: "list",
          items: [
            "OPENAI FINE-TUNING: The most accessible. GPT-4o and GPT-3.5 Turbo available for fine-tuning via API. Good documentation, managed infrastructure. Start here.",
            "TOGETHER.AI: Fine-tune open-source models (Llama, Mistral, etc.) with reasonable pricing. More flexible than OpenAI but requires more expertise.",
            "HUGGING FACE + PEFT: Full control via open-source tooling. Use Parameter-Efficient Fine-Tuning (LoRA, QLoRA) to reduce compute requirements. Requires ML expertise.",
            "AMAZON BEDROCK / GOOGLE VERTEX: Enterprise-grade fine-tuning with security and compliance features. High cost, high support.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Alternatives to Fine-Tuning",
        },
        {
          type: "paragraph",
          text: "Before investing in fine-tuning, exhaust these alternatives — they are cheaper, faster, and often sufficient:",
        },
        {
          type: "list",
          items: [
            "FEW-SHOT PROMPTING: Include 3-10 examples directly in the prompt. Effective for style and format adaptation without any training.",
            "RETRIEVAL-AUGMENTED GENERATION (RAG): Store your codebase, documentation, and examples in a vector database. Retrieve relevant context for each request. Covers the knowledge gap without fine-tuning.",
            "SYSTEM PROMPTS: A well-crafted system prompt with detailed instructions can handle most style and convention requirements at zero training cost.",
            ".cursorrules / CLAUDE.md: For development workflows, these files serve the same purpose as fine-tuning — establishing consistent conventions — at zero cost.",
          ],
        },
        {
          type: "insight",
          title: "RAG Before Fine-Tuning",
          text: "The vast majority of cases where teams think they need fine-tuning are actually RAG problems: the model doesn't know specific things (documentation, proprietary code, domain knowledge). RAG provides that specific knowledge at query time, dynamically. Fine-tuning bakes knowledge into model weights, which is more expensive and less flexible. Start with RAG.",
        },
        {
          type: "exercise",
          title: "Evaluate Your Fine-Tuning Need",
          description:
            "Think about a coding task where AI consistently falls short for your use case. Work through this decision tree: (1) Could better prompting fix it? Try the RTCFE framework. (2) Could .cursorrules/CLAUDE.md fix it? Write or improve your configuration file. (3) Could RAG fix it? What documents or examples would you retrieve? (4) Only if all three are genuinely insufficient — design the training data you would need for fine-tuning.",
          hints: [
            "Most cases resolve at steps 1 or 2. If you reach step 3, RAG almost always solves it. Fine-tuning is rarely the right answer.",
            "If you do design training data, remember: quality over quantity. A curated set of 50 perfect examples is better than 500 mediocre ones.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Fine-tuning is for proprietary frameworks, domain vocabulary, consistent style at scale, or cost/latency optimization",
            "Fine-tuning adjusts style and calibration — it does not give the model new reasoning capabilities",
            "Data quality is the bottleneck: curated examples beat raw volume",
            "Exhaust alternatives first: few-shot prompting, RAG, system prompts, configuration files",
            "The decision tree: better prompting → .cursorrules → RAG → fine-tuning (in that order)",
          ],
        },
      ],
    },
    {
      id: "5-4",
      title: "Evaluating AI Output: Quality, Benchmarks, and Human Review",
      estimatedMinutes: 15,
      content: [
        {
          type: "paragraph",
          text: "Trusting AI output without evaluation is like shipping code without testing. AI systems can be confidently wrong, can produce plausible-but-subtly-broken code, and can optimize for metrics that are not what you care about. A systematic evaluation framework — both for individual outputs and for AI systems as a whole — is essential for building on AI reliably.",
        },
        {
          type: "heading",
          level: 2,
          text: "Levels of AI Output Evaluation",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "DOES IT RUN? The baseline: does the code execute without errors? This catches syntax errors, import failures, and obvious runtime exceptions. Necessary but far from sufficient.",
            "DOES IT DO WHAT IT SAYS? Functional correctness: does the output match the specification? Test with real inputs, including edge cases.",
            "DOES IT DO ONLY WHAT IT SAYS? Security and correctness under adversarial input: does it do unexpected things? Are there hidden behaviors?",
            "IS IT MAINTAINABLE? Code quality: is it readable, well-structured, and consistent with the codebase's patterns? Would another engineer understand it?",
            "IS IT CORRECT AT SCALE? Performance and reliability: does it work correctly under load? Are there failure modes that only appear at scale?",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "SWE-bench: The Gold Standard Benchmark",
        },
        {
          type: "paragraph",
          text: "SWE-bench is an academic benchmark for evaluating AI software engineering capabilities. It consists of real GitHub issues from popular open-source repositories, requiring an AI to read the issue, understand the codebase, and produce a patch that fixes the problem. SWE-bench tests multi-file reasoning, codebase navigation, and practical problem-solving — the kinds of tasks that matter for real software development.",
        },
        {
          type: "paragraph",
          text: "As of 2025, frontier models with scaffolding achieve 40-50% on SWE-bench full (the harder version), meaning they successfully resolve roughly half of real-world engineering issues. This is remarkable compared to 2-3% in 2023, but it also means AI fails on half of real engineering tasks — context that should calibrate your trust appropriately.",
        },
        {
          type: "heading",
          level: 2,
          text: "Building Your Own Evaluation",
        },
        {
          type: "paragraph",
          text: "For your specific use case, SWE-bench scores are less relevant than your own evaluation on your specific tasks. Building a private evaluation set:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Collect 20-50 tasks representative of your real work",
            "For each task, write a clear specification and the criteria for a correct solution",
            "Run each task through your AI tool and score the output against the criteria",
            "Repeat as you change tools, models, or prompting strategies",
            "Track your scores over time to measure improvement",
          ],
        },
        {
          type: "code",
          language: "text",
          caption: "Evaluation rubric template",
          code: `TASK: [description]
SPECIFICATION: [what a correct solution looks like]

EVALUATION CRITERIA:
1. CORRECTNESS (0-3): Does it implement what was specified?
   0 = Does not run
   1 = Runs but has functional errors
   2 = Functionally correct with minor gaps
   3 = Fully correct
   
2. QUALITY (0-3): Is the code well-written?
   0 = Unreadable or extremely poor quality
   1 = Works but poor quality
   2 = Acceptable quality
   3 = High quality, matches codebase standards
   
3. SECURITY (0-2): Are there security issues?
   0 = Has serious security vulnerabilities
   1 = Has minor security concerns
   2 = No security issues
   
4. EDGE CASES (0-2): Does it handle edge cases?
   0 = Ignores most edge cases
   1 = Handles some edge cases
   2 = Handles all obvious edge cases

TOTAL SCORE: /10`,
        },
        {
          type: "heading",
          level: 2,
          text: "Human Review as the Final Layer",
        },
        {
          type: "paragraph",
          text: "No automated evaluation replaces human review for code that matters. The checklist for human review of AI-generated code:",
        },
        {
          type: "list",
          items: [
            "Read every line: not to understand every detail, but to catch structural issues",
            "Check the tests: do the tests actually test what they claim to? AI can write tests that pass trivially without testing the behavior",
            "Verify the security model: trace authorization checks end-to-end",
            "Run it: with real data, including edge cases",
            "Check imports and dependencies: verify every library used is appropriate",
          ],
        },
        {
          type: "tip",
          title: "The Two-Reading Rule",
          text: "Read AI-generated code twice: once to understand what it does, once to check whether that's what you wanted. These are different cognitive modes. The first reading is comprehension. The second is verification. Most review failures happen when people try to do both at once and only do the first.",
        },
        {
          type: "exercise",
          title: "Build Your Evaluation Set",
          description:
            "Collect 10 tasks representative of your real AI coding use case. Write a specification and scoring rubric for each one. Run them through your current AI tool and score the results. Identify the category where scores are lowest — that's where to invest in better prompting, configuration, or tooling.",
          hints: [
            "Include tasks at varying difficulty levels so you can track where the AI excels and where it struggles.",
            "The scoring process itself is educational — articulating what 'correct' looks like for each task sharpens your ability to write better specifications.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Five levels of evaluation: runs → does what it says → only what it says → maintainable → correct at scale",
            "SWE-bench: frontier models solve ~50% of real engineering tasks — calibrate trust appropriately",
            "Build your own evaluation set: 20-50 tasks, scored criteria, tracked over time",
            "Automated evaluation is not sufficient — human review is the final layer for code that matters",
            "Two-reading rule: once for comprehension, once for verification — different cognitive modes",
          ],
        },
      ],
    },
    {
      id: "5-5",
      title: "Team and Enterprise AI Workflows",
      estimatedMinutes: 15,
      content: [
        {
          type: "paragraph",
          text: "Individual developer AI productivity is well-understood by now. Team and enterprise AI productivity is more complex — it requires consistent conventions, shared context, governance around what AI can and cannot do, and ways to share learnings across the team. This lesson addresses the organizational dimension of AI coding.",
        },
        {
          type: "heading",
          level: 2,
          text: "Shared Configuration as Team Infrastructure",
        },
        {
          type: "paragraph",
          text: "The .cursorrules / CLAUDE.md files are individual by default — each developer might have different settings. But the highest-leverage version of these files is shared team infrastructure: committed to the repository, maintained by the team, and applied consistently to every AI interaction by every developer.",
        },
        {
          type: "list",
          items: [
            "Commit .cursorrules to the repository root — every developer gets the same AI behavior",
            "Establish a process for updating it: proposed changes go through review just like code changes",
            "Include team-specific knowledge: the patterns that exist in this codebase, the debt that should not be extended, the security requirements for this domain",
            "Version and changelog it: major changes should be communicated to the team",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "AI-Assisted Code Review",
        },
        {
          type: "paragraph",
          text: "AI can be integrated into the PR review process to provide a consistent first-pass review before human reviewers see the code. This catches mechanical issues (missing tests, inconsistent naming, obvious security gaps) and allows human reviewers to focus on architectural and design questions.",
        },
        {
          type: "code",
          language: "yaml",
          caption: "GitHub Actions AI review workflow",
          code: `# .github/workflows/ai-review.yml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Generate diff
        run: |
          git diff origin/main...HEAD > pr_diff.txt
      
      - name: AI Review
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Use Claude to review the diff
          # (implement with your preferred AI SDK)
          node scripts/ai-review.js pr_diff.txt > review_output.txt
      
      - name: Post review comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review_output.txt', 'utf8');
            github.rest.issues.createComment({
              ...context.repo,
              issue_number: context.issue.number,
              body: review
            });`,
        },
        {
          type: "heading",
          level: 2,
          text: "Knowledge Bases for Consistent Prompting",
        },
        {
          type: "paragraph",
          text: "One of the biggest challenges in team AI adoption is inconsistency: different developers prompt differently, get different quality outputs, and solve the same problems in incompatible ways. A team prompt library solves this by documenting proven prompts for common tasks.",
        },
        {
          type: "list",
          items: [
            "Document prompts that consistently produce good output for your team's common tasks",
            "Include the context and constraints that make each prompt work",
            "Version the library like code — improvements go through review",
            "Measure prompt quality: track which prompts produce first-pass-correct output vs require iteration",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "AI Usage Governance",
        },
        {
          type: "paragraph",
          text: "Enterprise AI adoption requires governance — policies about what AI can be used for, what data can be shared with AI systems, and what output requires review before deployment. The key dimensions:",
        },
        {
          type: "list",
          items: [
            "DATA CLASSIFICATION: What code and data can be shared with external AI APIs? In most organizations, proprietary business logic, customer data, and security configurations are restricted.",
            "MODEL SELECTION: Which AI providers and models are approved? Legal and security teams care about data retention, model training policies, and vendor agreements.",
            "REVIEW REQUIREMENTS: What AI-generated code requires human review before deployment? (Answer: all of it — but the depth of review scales with risk.)",
            "AUDIT TRAIL: Can you track which code was AI-generated? Some organizations require this for compliance.",
          ],
        },
        {
          type: "insight",
          title: "Local Models for Sensitive Code",
          text: "For organizations with strict data governance requirements, local AI models (Ollama, LM Studio, Code Llama, DeepSeek Coder) allow running models on-premise with no data leaving the organization. Quality is lower than frontier models, but improving rapidly. This is the right path for codebases with regulatory or contractual data handling requirements.",
        },
        {
          type: "heading",
          level: 2,
          text: "Onboarding New Team Members with AI",
        },
        {
          type: "paragraph",
          text: "AI dramatically accelerates onboarding for new engineers. The combination of a well-maintained CODEBASE.md, good .cursorrules, and a prompt library means new engineers can be productive on an unfamiliar codebase much faster than before. Design onboarding to leverage AI:",
        },
        {
          type: "list",
          items: [
            "Create an onboarding prompt: 'Read CODEBASE.md, then answer these questions about the architecture...'",
            "Use AI to explain existing code: 'Explain this service's responsibilities and how it relates to the rest of the system'",
            "Generate onboarding tasks: small, self-contained features that let new engineers learn the codebase through production work",
          ],
        },
        {
          type: "exercise",
          title: "Design Your Team's AI Infrastructure",
          description:
            "Imagine you are setting up AI coding infrastructure for a 5-person engineering team from scratch. Design: (1) The shared .cursorrules file — what would it contain? (2) The governance policy — what can be shared with external AI APIs, what requires review? (3) The prompt library structure — what are the 5 most common tasks that would benefit from proven prompts? (4) The onboarding sequence — how would a new engineer use AI to ramp up on your codebase?",
          hints: [
            "The governance policy is often the blocker for AI adoption in larger organizations. Getting ahead of data classification concerns allows broader adoption.",
            "A prompt library doesn't need to be fancy — even a Markdown file in the repo with well-documented prompts is enormously valuable.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Shared .cursorrules is team infrastructure — commit to the repo, review changes like code",
            "AI-assisted PR review: automated first-pass catches mechanical issues, frees humans for design review",
            "Prompt libraries solve team inconsistency — document and version proven prompts",
            "Governance: data classification, model selection, review requirements, audit trail",
            "Local models (Ollama, Code Llama) for sensitive code that cannot leave the organization",
          ],
        },
      ],
    },
    {
      id: "5-6",
      title: "Future-Proofing Your Skills in a Rapidly Changing Landscape",
      estimatedMinutes: 14,
      content: [
        {
          type: "paragraph",
          text: "The AI landscape changes faster than any previous technology wave in software development. Tools that are dominant today may be superseded in 18 months. Models that seem like a ceiling today will seem like a floor in two years. In this environment, the question 'what should I learn?' is a trap — specific tools will become obsolete. The right question is: 'what skills remain valuable regardless of how tools change?'",
        },
        {
          type: "heading",
          level: 2,
          text: "The Half-Life of AI Tool Knowledge",
        },
        {
          type: "paragraph",
          text: "Different kinds of knowledge have different half-lives in the AI era:",
        },
        {
          type: "list",
          items: [
            "SHORTEST HALF-LIFE (months): Specific prompt templates for specific tools; UI workflows for specific IDEs; specific model comparisons and rankings",
            "MEDIUM HALF-LIFE (years): Which tools are dominant; which frameworks AI tools know best; agentic workflow patterns",
            "LONGEST HALF-LIFE (decades or forever): Algorithms and data structures; database design principles; systems thinking; security fundamentals; how networks work; how humans learn and communicate",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "What to Learn That Compounds Forever",
        },
        {
          type: "paragraph",
          text: "The fundamentals that do not depreciate in the AI age — and in fact become more valuable as AI handles more implementation:",
        },
        {
          type: "list",
          items: [
            "ALGORITHMS AND DATA STRUCTURES: The ability to reason about time and space complexity, choose the right data structure, and recognize algorithmic patterns. AI can implement a sorting algorithm; understanding which sorting algorithm to use, and why, is the human layer.",
            "DATABASE DESIGN: How to model data correctly, what indexes to use, how to write efficient queries, what the failure modes of different consistency models are. AI generates SQL; knowing whether the SQL is correct at scale is human work.",
            "SYSTEMS THINKING: How distributed systems fail, what the CAP theorem implies, how to design for graceful degradation, what the failure modes of stateful vs stateless architectures are.",
            "SECURITY FUNDAMENTALS: The OWASP categories, why cryptography works the way it does, how authentication and authorization should be designed. AI can generate auth code; knowing whether it's actually secure requires deep understanding.",
            "COMMUNICATION AND SPECIFICATION: The ability to describe systems precisely, decompose complex problems, and communicate intent to AI. This is the meta-skill that determines everything else.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Staying Current Without Being Distracted",
        },
        {
          type: "paragraph",
          text: "The challenge of a fast-moving landscape is that staying current is a full-time job that would crowd out actual building. A sustainable approach:",
        },
        {
          type: "list",
          items: [
            "Follow 3-5 high-signal sources, not 30 moderate-signal ones: Twitter/X accounts of practitioners (not commentators), release notes of the tools you use, one or two research blogs",
            "Allocate specific time for exploration: 2-4 hours per month to try new tools or techniques, not more",
            "Evaluate changes by first principles: 'Is this meaningfully better for my use case or just different?'",
            "Let early adopters bear the switching cost: most new tools are improvements but rarely revolutionary. Wait for the 1.0 version.",
          ],
        },
        {
          type: "insight",
          title: "The Best Developers Will Be Great Decomposers",
          text: "As AI handles more implementation, the highest-value skill becomes problem decomposition: breaking a complex, ambiguous real-world problem into a sequence of well-specified, executable tasks. This is what separates someone who can direct AI effectively from someone who produces mediocre output despite using the same tools. Invest heavily in this skill.",
        },
        {
          type: "heading",
          level: 2,
          text: "Building in Public as a Learning Strategy",
        },
        {
          type: "paragraph",
          text: "Building in public — sharing your projects, your process, and your learnings openly — is one of the most effective learning strategies in the AI era for two reasons: (1) The act of explaining what you built and how forces clarity that private building does not. (2) Public building attracts feedback, collaborators, and opportunities that private building cannot.",
        },
        {
          type: "tip",
          title: "The Learning Document",
          text: "After each significant AI-assisted project, write a short document: What did I build? What AI tools did I use and for what? What worked well? What didn't work? What would I do differently? This reflection practice compounds rapidly — you develop explicit knowledge of your own AI collaboration patterns that most people leave implicit and therefore don't improve.",
        },
        {
          type: "exercise",
          title: "Design Your Learning Strategy",
          description:
            "Write your personal AI skills development plan: (1) List the 3 fundamentals (from the long-half-life list) you most need to strengthen. (2) Identify 5 high-signal sources you will follow. (3) Commit to a monthly exploration time budget. (4) Choose one project you will build in public (even if 'public' is just your team). (5) Write the reflection document for the last AI-assisted project you completed.",
          hints: [
            "Be honest about the fundamentals gap. The skills with the longest half-life are often the ones that feel most abstract and therefore easiest to skip.",
            "Building in public doesn't require an audience. Writing for an audience of one (yourself-in-six-months) is enough to gain the clarity benefits.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Half-life of knowledge: tool specifics (months) < workflow patterns (years) < fundamentals (forever)",
            "Invest in: algorithms, database design, systems thinking, security, and communication/specification",
            "Stay current sustainably: 3-5 high-signal sources, 2-4 hours/month exploration, evaluate by first principles",
            "Problem decomposition is the highest-value skill as AI handles more implementation",
            "Build in public + learning documents = compounding reflection that improves your AI collaboration over time",
          ],
        },
      ],
    },
  ],
};
