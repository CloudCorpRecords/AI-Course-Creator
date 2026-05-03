import type { Module } from "./types";

export const module2: Module = {
  id: "module-2",
  number: 2,
  title: "Essential Tools & Setup",
  subtitle: "Building Your AI-Powered Development Stack",
  description:
    "A deep-dive tour of every major AI coding tool in 2026 — from beginner-friendly Replit to power-user Cursor — plus the configuration secrets that make them 10x more effective.",
  lessons: [
    {
      id: "2-1",
      title: "The Landscape: Choosing Your AI Coding Stack",
      estimatedMinutes: 13,
      content: [
        {
          type: "paragraph",
          text: "The AI coding tools landscape in 2026 is crowded, fast-moving, and genuinely confusing. New tools launch weekly, existing tools add major features monthly, and benchmarks shift constantly as underlying models improve. Trying to evaluate every tool is a losing game. Instead, this lesson gives you a stable framework for choosing tools based on first principles — what actually matters for your specific situation — so you can make good choices regardless of what the landscape looks like when you're reading this.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Three Axes of AI Coding Tools",
        },
        {
          type: "paragraph",
          text: "Every AI coding tool can be evaluated on three fundamental dimensions. Master these and you can evaluate any new tool quickly:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "CONTEXT WINDOW & CODEBASE AWARENESS: How much of your codebase can the AI 'see' at once? Tools range from single-file context (basic chat interfaces) to full codebase indexing (Cursor, Claude Code). Larger context means fewer hallucinations about your specific codebase and better multi-file changes.",
            "EXECUTION CAPABILITY: Can the AI run code, see the output, and iterate? This is the difference between a text editor and an agent. Execution capability is the biggest predictor of how autonomously you can operate.",
            "MODEL QUALITY & CHOICE: What underlying AI model powers the tool? Can you switch models? For most coding tasks, model quality is roughly comparable across frontier models (Claude, GPT-4o, Gemini Ultra), but there are real differences in code generation quality, reasoning depth, and instruction-following.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The Beginner-to-Pro Spectrum",
        },
        {
          type: "paragraph",
          text: "Tools cluster into two broad categories based on required technical sophistication:",
        },
        {
          type: "list",
          items: [
            "ZERO-SETUP TOOLS: Replit, v0, bolt.new — browser-based, no installation, immediate results. Great for beginners and rapid prototyping. Handle deployment automatically. Trade-off: less control over environment.",
            "POWER-USER TOOLS: Cursor, Claude Code, Aider — require installation and configuration. Give you full control over your development environment. Far more powerful for large or complex codebases. Trade-off: steeper learning curve.",
          ],
        },
        {
          type: "insight",
          title: "The Turcios Starting Point",
          text: "Rene Turcios' default stack is Replit — zero setup, immediate building, one-click deploy. This is not a lack of sophistication; it is a deliberate optimization for speed-to-demo. For hackathons and MVPs, the right tool is the one that gets you to a working demo fastest. For production software, you graduate to more powerful tools.",
        },
        {
          type: "heading",
          level: 2,
          text: "Choosing Your Entry Point",
        },
        {
          type: "paragraph",
          text: "The right starting point depends on your current situation, not on which tool has the highest benchmark scores:",
        },
        {
          type: "list",
          items: [
            "No technical background, want to build something quickly → Start with Replit Agent. Get to shipping. Learn tools as you need them.",
            "Some technical background, comfortable with a terminal → Start with Cursor and Claude. Steeper setup, much more power for anything non-trivial.",
            "Experienced engineer, evaluating AI for a professional project → Use Cursor with Claude Max or API access. Pair with Claude Code for complex reasoning tasks.",
            "Building a UI-heavy app → Consider v0 for component generation alongside your primary tool.",
          ],
        },
        {
          type: "tip",
          title: "Master One Tool Before Adding Another",
          text: "The biggest mistake when starting is tool-hopping — trying every new thing without getting good at any of them. Pick one primary tool, use it until you know its strengths and limitations deeply, then evaluate whether another tool would genuinely help. Every tool switch has a context-switching cost that is easy to underestimate.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Economics of AI Coding Tools",
        },
        {
          type: "paragraph",
          text: "Most AI coding tools have subscription costs ranging from $10-$100/month for individual plans, with API usage on top for heavy users. The question is not whether the cost is worth it in absolute terms — for anyone whose time has value, the math is obvious. The question is which tools give you the best return per dollar spent.",
        },
        {
          type: "paragraph",
          text: "A reasonable starting configuration for most builders: Replit Core ($20/month) for browser-based work and deployment, and Cursor Pro ($20/month) for serious codebase work. That $40/month is competitive with one hour of contractor time and replaces tens of hours of slower development per month.",
        },
        {
          type: "exercise",
          title: "Tool Audit",
          description:
            "List every AI coding tool you have used or heard of. For each one, write one sentence on where it excels and one on where it falls short. Then rank them by how well they match your current primary use case. This inventory will guide the rest of this module.",
          hints: [
            "Be specific about the use case. 'Good for prototyping' is less useful than 'good for building complete React UIs quickly from a description.'",
            "If you haven't used a tool, note that honestly. Don't rank based on marketing.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Evaluate tools on three axes: context window, execution capability, and model quality",
            "Zero-setup tools (Replit, v0) optimize for speed; power tools (Cursor, Claude Code) optimize for control",
            "Choose your entry point based on your current situation, not benchmark scores",
            "Master one tool deeply before adding another — tool-hopping is expensive",
            "The economics favor AI tools heavily: $40/month replaces tens of hours of slower work",
          ],
        },
      ],
    },
    {
      id: "2-2",
      title: "Replit Agent: Zero-Setup Prototyping",
      estimatedMinutes: 15,
      content: [
        {
          type: "paragraph",
          text: "Replit started as a browser-based IDE — a place where you could write and run code without installing anything. That alone was useful. But Replit Agent transformed it into something genuinely novel: a system where you describe what you want in plain English and a full-stack application is built, deployed, and running within minutes, entirely in the browser.",
        },
        {
          type: "paragraph",
          text: "For beginners, Replit is the best starting point for AI-assisted development that exists. There is no environment to configure, no package manager to fight, no deployment pipeline to set up. The Agent handles all of it. For experienced developers, Replit is an exceptional rapid prototyping and deployment environment, even if they use other tools for serious development.",
        },
        {
          type: "heading",
          level: 2,
          text: "What Replit Agent Can Do",
        },
        {
          type: "paragraph",
          text: "Replit Agent is a fully agentic system — meaning it does not just generate code, it runs it, reads the errors, and iterates. A typical Replit Agent session:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "You describe your application in a chat interface",
            "The Agent generates a full project structure — files, configuration, dependencies",
            "It installs packages and runs the application",
            "It reads any errors or runtime failures",
            "It makes corrections and reruns until the app is working",
            "You interact with the running app in the preview pane",
            "You describe fixes or additions in chat, and the loop repeats",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Replit's Architecture Advantage",
        },
        {
          type: "paragraph",
          text: "Replit's key architectural advantage is that your app is always running in a real environment — not a simulation, not a preview. The same container that the Agent uses to build is accessible from the internet through a unique URL. This means:",
        },
        {
          type: "list",
          items: [
            "You can share a link to your working prototype immediately, even before 'deployment'",
            "APIs and backend services are real, not mocked — they handle actual requests",
            "The database (PostgreSQL, via Replit's built-in provisioning) is real — data persists across sessions",
            "Deployment is one click — Replit takes the existing container and makes it production-grade",
          ],
        },
        {
          type: "tip",
          title: "Use the Share Link Early",
          text: "One of Replit's most underused features is the always-on preview URL. Even in development mode, your Repl has a public URL. Share it with potential users the moment you have something working — even if it's rough. Real feedback from real use is worth 100x the feedback you'd get from describing the concept.",
        },
        {
          type: "heading",
          level: 2,
          text: "Replit's Built-in Database and Storage",
        },
        {
          type: "paragraph",
          text: "Replit provides a managed PostgreSQL database that requires zero configuration. The Agent knows how to provision it, write schema migrations, and use it in your application. For beginners, this eliminates one of the most complex parts of building a real application. For experienced developers, it's a fast-path to a real persistent backend without infrastructure work.",
        },
        {
          type: "code",
          language: "text",
          caption: "Prompting Replit Agent to add a database",
          code: `Add a PostgreSQL database to store user submissions. Each submission should have:
- A unique ID (auto-generated)
- The user's name and email
- The content they submitted
- A timestamp of when it was created

Create the database table, add an endpoint to save new submissions, and display 
the 10 most recent submissions on the main page, sorted newest first.`,
        },
        {
          type: "heading",
          level: 2,
          text: "Replit for Deployment",
        },
        {
          type: "paragraph",
          text: "Replit's deployment infrastructure handles HTTPS, custom domains, auto-scaling, and uptime monitoring. Deploying an app that you built with the Agent takes one click from the Deployments tab. Replit's deployment uses the same container you built in, so there are no environment differences between development and production.",
        },
        {
          type: "heading",
          level: 2,
          text: "Replit's Limitations",
        },
        {
          type: "paragraph",
          text: "Replit is not the right tool for every job. Its limitations are real:",
        },
        {
          type: "list",
          items: [
            "Large codebases: Replit works best for applications that fit in a relatively small context. Very large projects with dozens of files may confuse the Agent.",
            "Team workflows: Replit does have collaboration features, but it is not designed for complex team Git workflows, PR reviews, or CI/CD pipelines.",
            "Performance requirements: Replit's containers have compute limits. Compute-intensive applications (video processing, ML training, high-throughput APIs) should use dedicated infrastructure.",
            "Offline access: Replit is entirely cloud-based. You need internet access to work.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The .replit Configuration File",
        },
        {
          type: "paragraph",
          text: "Every Replit project has a hidden configuration layer that controls how the environment is set up. You rarely need to touch it when using the Agent, but understanding it helps when things go wrong or when you need custom behavior.",
        },
        {
          type: "code",
          language: "toml",
          caption: "Example .replit configuration",
          code: `modules = ["nodejs-20"]

[nix]
channel = "stable-24_05"

[deployment]
run = ["sh", "-c", "node dist/server.js"]
build = ["sh", "-c", "npm run build"]

[[ports]]
localPort = 3000
externalPort = 80`,
        },
        {
          type: "exercise",
          title: "Build a Complete App in Replit",
          description:
            "Open Replit and build a complete mini-app from scratch using only the Agent. Your app must: (1) have a visible UI in the browser, (2) accept some kind of user input, (3) persist data to the built-in database, and (4) display stored data. Deploy it when done and share the URL with one real person.",
          hints: [
            "Examples: a quote-of-the-day curator where users submit quotes; a mood tracker; a poll with real-time results; a reading list app.",
            "Don't aim for polish — aim for functional and deployed. You can always iterate.",
            "When the Agent makes a mistake, describe exactly what you see that's wrong. 'The form doesn't save anything' is better than 'it doesn't work.'",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Replit Agent is fully agentic — it generates, runs, reads errors, and iterates without your help",
            "The always-on preview URL enables immediate sharing, even in development",
            "Built-in PostgreSQL with zero configuration — the Agent handles provisioning and schema",
            "Deployment is one click, same container, no environment differences",
            "Limitations: large codebases, complex team workflows, compute-intensive tasks",
          ],
        },
      ],
    },
    {
      id: "2-3",
      title: "Cursor: The Power User's IDE",
      estimatedMinutes: 18,
      content: [
        {
          type: "paragraph",
          text: "Cursor is a fork of Visual Studio Code that embeds AI assistance so deeply into the editing experience that it fundamentally changes how you work. Where Replit is built around the idea of 'describe an app, get an app,' Cursor is built around the idea of 'work with AI as an equal collaborator on code you already own.' It is the tool of choice for experienced developers who want to move faster without losing the control and transparency that come with a traditional development environment.",
        },
        {
          type: "paragraph",
          text: "As of 2026, Cursor has become the dominant tool for professional AI-assisted development. The community of power users is large, the model support is comprehensive (Claude, GPT-4o, Gemini, and others), and the feature set for large codebase work is unmatched.",
        },
        {
          type: "heading",
          level: 2,
          text: "Core Cursor Features",
        },
        {
          type: "heading",
          level: 3,
          text: "Tab Completion",
        },
        {
          type: "paragraph",
          text: "Cursor's Tab completion is aware of your entire project, not just the file you have open. It predicts multi-line edits, not just single words. When you start typing a function, it understands from context what the function should do and suggests the complete implementation. When you rename a variable, it predicts all the other places that need updating. This alone saves experienced developers significant time.",
        },
        {
          type: "heading",
          level: 3,
          text: "CMD-K (Inline Edit)",
        },
        {
          type: "paragraph",
          text: "Select any block of code, press CMD-K (or Ctrl-K on Windows/Linux), and describe what you want to do with it. The AI applies the transformation in place. This is the fastest way to refactor, translate, document, or fix a specific piece of code without context-switching to a chat interface.",
        },
        {
          type: "code",
          language: "text",
          caption: "Example CMD-K instructions",
          code: `-- Select a function, then type:
"Add comprehensive error handling with specific error types"
"Convert to async/await from Promise chains"
"Add TypeScript types for all parameters and return values"
"Rewrite this to be more readable — it's too clever"
"Add JSDoc documentation for this function"`,
        },
        {
          type: "heading",
          level: 3,
          text: "Composer / Agent Mode",
        },
        {
          type: "paragraph",
          text: "Cursor's Composer mode (also called Agent mode) allows you to describe a multi-file task and let the AI plan and execute it across your entire codebase. This is Cursor's most powerful feature and the most different from traditional IDE usage. Instead of editing files one at a time, you describe a feature or change at a high level, and the Agent plans which files to create, modify, or delete, then executes the plan.",
        },
        {
          type: "tip",
          title: "Agent Mode for Large Refactors",
          text: "Agent mode shines on tasks like 'rename all instances of X throughout the codebase,' 'add logging to every API endpoint,' or 'migrate from library A to library B.' These multi-file tasks that would take hours manually often take minutes in Agent mode — with the safety of seeing every change in a diff before accepting.",
        },
        {
          type: "heading",
          level: 3,
          text: "Codebase Indexing",
        },
        {
          type: "paragraph",
          text: "Cursor indexes your entire codebase and makes it semantically searchable. When you ask a question or give an instruction, Cursor retrieves the most relevant files and code sections automatically. This is the key to making Cursor useful on large projects — even with 100,000 lines of code, the AI can navigate to the relevant sections without you having to manually specify which files to look at.",
        },
        {
          type: "heading",
          level: 2,
          text: "The .cursorrules File",
        },
        {
          type: "paragraph",
          text: "The most overlooked feature of Cursor is the .cursorrules file. This is a plain text file at the root of your project that tells Cursor how you want it to behave. Every instruction in .cursorrules is automatically included in every AI interaction in that project. It is higher-leverage than any individual prompt because it shapes all of them.",
        },
        {
          type: "code",
          language: "text",
          caption: ".cursorrules for a TypeScript/React project",
          code: `# Project Rules for AI Assistant

## Stack
- TypeScript with strict mode
- React 18 with functional components only (no class components)
- Tailwind CSS for styling (no CSS modules or styled-components)
- PostgreSQL with Drizzle ORM (never raw SQL strings)
- Express.js for the API

## Code Style
- Use async/await, never .then().catch()
- Always handle errors explicitly — no silent failures
- Prefer named exports over default exports
- Component files: PascalCase. Utility files: camelCase.
- No console.log in production code (use the logger utility)

## Security
- Never put secrets in code — use environment variables
- Always validate user input with Zod before processing
- Authenticate all non-public endpoints

## When generating code:
- Always include TypeScript types
- Always handle error cases
- Always add meaningful comments for non-obvious logic
- If uncertain about requirements, ask before assuming`,
        },
        {
          type: "heading",
          level: 2,
          text: "Model Selection Strategy",
        },
        {
          type: "paragraph",
          text: "Cursor supports multiple AI models. The choice of model matters for different tasks:",
        },
        {
          type: "list",
          items: [
            "Claude 3.7 / Claude 4: Best for complex reasoning tasks, large context understanding, and following nuanced instructions. First choice for architecture planning and code review.",
            "GPT-4o: Strong all-rounder. Particularly good at following structured output formats and consistent instruction-following.",
            "gemini-2.0-flash: Fast and capable for routine tasks. Good for quick edits where response time matters.",
            "cursor-small: Cursor's fast built-in model. Best for Tab completions and quick inline edits where latency is critical.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Cursor for Large Codebases",
        },
        {
          type: "paragraph",
          text: "Cursor's codebase indexing and retrieval makes it genuinely useful on large projects where other tools struggle. Key practices for large codebase work:",
        },
        {
          type: "list",
          items: [
            "Use @file references explicitly when you know which files are relevant. Don't rely entirely on automatic retrieval.",
            "For very large files, use @[filename]:[line-range] to point to specific sections.",
            "Create a CODEBASE.md file documenting the architecture, key patterns, and where things live. Reference it in .cursorrules so the AI is always oriented.",
            "When working on a complex feature, start a Composer session with a planning phase before implementation.",
          ],
        },
        {
          type: "exercise",
          title: "Configure Cursor for Your Project",
          description:
            "Open an existing project (or create a new one) in Cursor. Write a .cursorrules file that captures at least: (1) the tech stack, (2) your code style preferences, (3) security requirements, and (4) one thing that AI tools commonly get wrong for your use case. Then test it by asking Cursor to add a new feature and see whether it follows your rules.",
          hints: [
            "Start with what bugs you about AI-generated code for your stack. Turn each bugbear into a rule.",
            "Be specific. 'Use good error handling' is less effective than 'always catch async errors with try/catch and log them with context using the logger utility.'",
            "After writing the rules, ask Cursor to review them and suggest additions you might have missed.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Cursor is VS Code with AI so deeply embedded that working style fundamentally changes",
            "Tab completion, CMD-K inline edit, and Composer/Agent mode are the three core interaction patterns",
            "Codebase indexing makes Cursor genuinely useful on large projects — semantic search across the whole codebase",
            ".cursorrules is the highest-leverage feature — shapes every AI interaction in the project",
            "Match model to task: Claude for deep reasoning, cursor-small for Tab completions, GPT-4o for structured output",
          ],
        },
      ],
    },
    {
      id: "2-4",
      title: "Claude Code, Chat Interfaces, and Specialized Tools",
      estimatedMinutes: 16,
      content: [
        {
          type: "paragraph",
          text: "Beyond Replit and Cursor, the AI coding tool ecosystem includes several tools worth understanding deeply. Some are full development environments. Others are specialized for a specific part of the workflow. Knowing which tool to reach for in which situation is itself a valuable skill.",
        },
        {
          type: "heading",
          level: 2,
          text: "Claude Code",
        },
        {
          type: "paragraph",
          text: "Claude Code is Anthropic's terminal-based coding agent. Unlike Cursor, which lives in a GUI IDE, Claude Code runs in your terminal and can be used anywhere you have a command line. It has two key advantages: (1) it can see and interact with your entire filesystem, not just files you open manually; and (2) it can run any shell command, making it extremely powerful for automation, scripting, and DevOps tasks.",
        },
        {
          type: "code",
          language: "bash",
          caption: "Starting a Claude Code session",
          code: `# Install
npm install -g @anthropic-ai/claude-code

# Start in your project directory
cd my-project
claude

# Claude Code opens a session aware of your codebase
# You can then give it natural language instructions
# It will read files, write files, run commands, and iterate`,
        },
        {
          type: "paragraph",
          text: "Claude Code uses the CLAUDE.md file (analogous to Cursor's .cursorrules) to understand your project conventions, architecture, and preferences. When you start a session, Claude Code reads this file and uses it to inform all subsequent actions.",
        },
        {
          type: "code",
          language: "markdown",
          caption: "Example CLAUDE.md",
          code: `# Project: PaymentProcessor API

## Architecture
This is a Node.js REST API using Express 5, PostgreSQL (via Drizzle ORM), 
and deployed on Railway. The project structure is:
- src/routes/ — API route handlers
- src/services/ — Business logic
- src/models/ — Database schema (Drizzle)
- src/middleware/ — Auth, validation, logging

## Critical Rules
1. Every route handler must validate inputs with Zod
2. Every database operation must be in a try/catch
3. Never log sensitive data (card numbers, passwords, keys)
4. Use the logger utility (src/lib/logger.ts) for all logging

## Testing
Run tests with: pnpm test
Test files are colocated with source files as *.test.ts

## Deployment
Deploy with: git push railway main
Migrations run automatically on deploy`,
        },
        {
          type: "heading",
          level: 2,
          text: "GitHub Copilot",
        },
        {
          type: "paragraph",
          text: "GitHub Copilot is the most widely deployed AI coding tool in professional settings, primarily because of its deep integration with VS Code and GitHub's enterprise relationships. Copilot's core offering is inline code suggestions — as you type, it predicts what comes next, from single tokens to entire functions.",
        },
        {
          type: "paragraph",
          text: "Copilot has evolved significantly since its 2021 launch. Copilot Chat adds a full chat interface within VS Code. Copilot Workspace (still evolving as of 2026) adds an agent-mode feature for multi-file tasks. For enterprise teams with GitHub Enterprise, Copilot is often the default choice because of existing procurement relationships and security compliance.",
        },
        {
          type: "insight",
          title: "Copilot vs Cursor for Teams",
          text: "For enterprise teams, Copilot's advantage is organizational: GitHub controls the security model, access management, and compliance certifications that IT departments require. For individual developers or small teams, Cursor typically delivers a better experience because of its codebase indexing, model flexibility, and Agent mode maturity. Both are legitimately good choices — the decision is often organizational rather than technical.",
        },
        {
          type: "heading",
          level: 2,
          text: "v0 by Vercel",
        },
        {
          type: "paragraph",
          text: "v0 is Vercel's tool for generating React UI components from natural language descriptions or screenshots. It outputs code using shadcn/ui components and Tailwind CSS — the most common modern React UI stack. The key advantage of v0 is the quality of its UI output: it generates pixel-perfect, accessible, responsive components that look like they were designed by a professional.",
        },
        {
          type: "paragraph",
          text: "v0 is not a replacement for Cursor or Replit — it does not manage a full application. It is a specialist tool: reach for it when you need to generate a complex UI component quickly. Many workflows use v0 for component generation and then copy the output into a Cursor or Replit project for integration.",
        },
        {
          type: "code",
          language: "text",
          caption: "Effective v0 prompts",
          code: `// Specific and detailed works best
"A data table component showing transaction history. Columns: Date, 
Description, Amount (with color coding: green for credits, red for debits), 
Status (badge: completed/pending/failed). Sortable columns. Pagination at 
bottom. Row hover highlights. 10 rows of realistic sample data."

// Screenshot-based generation
// Upload a screenshot of any UI and ask v0 to recreate it with real code`,
        },
        {
          type: "heading",
          level: 2,
          text: "Windsurf",
        },
        {
          type: "paragraph",
          text: "Windsurf (by Codeium) is another VS Code-based AI IDE, competing directly with Cursor. Its differentiating feature is Cascade — a deep agentic mode that can navigate codebases more autonomously than Cursor's Agent mode. Windsurf's context management is particularly strong for very large codebases.",
        },
        {
          type: "paragraph",
          text: "Windsurf's pricing has historically been more aggressive than Cursor's, making it attractive for budget-conscious users who want Agent-mode capabilities. The community is smaller but growing.",
        },
        {
          type: "heading",
          level: 2,
          text: "Aider",
        },
        {
          type: "paragraph",
          text: "Aider is a terminal-based coding assistant built by Paul Gauthier. It is the most developer-centric tool on this list — no GUI, pure command line, designed for developers who are deeply comfortable in the terminal. Aider's key advantage is its git integration: every change Aider makes is automatically committed with a descriptive message, creating a perfect audit trail.",
        },
        {
          type: "code",
          language: "bash",
          caption: "Aider basic workflow",
          code: `# Install
pip install aider-chat

# Start with specific files in context
aider src/api/users.ts src/models/user.ts

# Give instructions in natural language
# Aider writes the code and creates a git commit
# You can accept, edit, or undo each change`,
        },
        {
          type: "heading",
          level: 2,
          text: "Choosing Between These Tools",
        },
        {
          type: "paragraph",
          text: "Here is a practical decision framework:",
        },
        {
          type: "list",
          items: [
            "Primary dev environment: Cursor (individuals/small teams) or GitHub Copilot (enterprise)",
            "UI component generation: v0 — nothing else matches its component quality",
            "Terminal/automation/scripts: Claude Code or Aider",
            "Full-stack prototyping, deployment: Replit Agent",
            "Large codebase, autonomous navigation: Windsurf Cascade or Cursor Agent",
          ],
        },
        {
          type: "exercise",
          title: "The Three-Tool Experiment",
          description:
            "Take a simple task (generate a login form with validation). Complete it using three different tools: v0, Cursor (CMD-K), and a chat interface (Claude.ai or ChatGPT). Compare the results: which had the best output quality? Which was fastest? Which integrated most smoothly into a real project?",
          hints: [
            "Use the same description for all three tools to control for prompt quality.",
            "Judge on three dimensions: code quality, integration effort, and time to working result.",
            "Note which tool you would reach for first for this task in the future and why.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Claude Code: terminal-based, full filesystem access, powerful for automation and DevOps",
            "GitHub Copilot: enterprise default, inline completions, improving agent mode",
            "v0: specialist UI component generator — unmatched for React component quality",
            "Windsurf: strong for very large codebases, competitive pricing",
            "Aider: terminal-first, git-integrated, perfect audit trail of every change",
            "Build a multi-tool workflow: each tool has a specialty, use the right one for each task",
          ],
        },
      ],
    },
    {
      id: "2-5",
      title: "Supercharging Your Setup: .cursorrules, CLAUDE.md, and Git",
      estimatedMinutes: 17,
      content: [
        {
          type: "paragraph",
          text: "The single most underestimated aspect of AI coding tool setup is configuration. Most developers spend time choosing the right tool, then use it out of the box with no project-specific configuration. This is like buying a professional camera and only ever using Auto mode. The configuration layer — .cursorrules, CLAUDE.md, project-specific instructions — is where you go from 'AI that generates generic code' to 'AI that generates code that fits your specific stack, style, and constraints.'",
        },
        {
          type: "heading",
          level: 2,
          text: "Why Configuration Files Beat Prompts",
        },
        {
          type: "paragraph",
          text: "Here is a concrete comparison. Without a .cursorrules file, every time you ask Cursor to write a React component, you might get: a class component (outdated), a default export (against your convention), inline styles (not your stack), console.log for debugging (not production-safe). You then spend prompts correcting these mistakes.",
        },
        {
          type: "paragraph",
          text: "With a .cursorrules file that specifies 'functional components only, named exports, Tailwind for styling, use logger utility,' these corrections happen automatically. The configuration file is applied to every interaction, making the baseline quality much higher and reducing the correction overhead dramatically.",
        },
        {
          type: "insight",
          title: "Configuration Compounds",
          text: "Every hour you spend writing a good .cursorrules or CLAUDE.md file saves you minutes per AI interaction, indefinitely. On a project with 1,000 AI interactions, a .cursorrules file that saves 2 minutes per interaction saves 33+ hours. This is the highest-leverage investment you can make in your AI coding setup.",
        },
        {
          type: "heading",
          level: 2,
          text: "Anatomy of an Effective .cursorrules File",
        },
        {
          type: "paragraph",
          text: "The best .cursorrules files have five sections. Each section serves a specific purpose:",
        },
        {
          type: "code",
          language: "markdown",
          caption: "Full .cursorrules template",
          code: `# [Project Name] — AI Coding Rules

## 1. Stack Declaration
Explicitly state every technology in use. Be specific about versions.
- Runtime: Node.js 22 (use ES modules, not CommonJS)
- Framework: React 19 with hooks (no class components)
- Language: TypeScript 5.x strict mode
- Styling: Tailwind CSS 4 (no CSS-in-JS, no CSS modules)
- Database: PostgreSQL 16 via Drizzle ORM (never raw SQL)
- State: Zustand for global state, React Query for server state
- Testing: Vitest + React Testing Library

## 2. Architecture Patterns
Describe the structural patterns you follow.
- Feature-based folder structure: src/features/[feature-name]/
- Each feature owns: components/, hooks/, api/, types.ts
- Shared: src/components/ui/, src/lib/, src/types/
- API calls go through the generated client in src/api/

## 3. Code Style and Conventions
The specific choices that differentiate your codebase.
- Async: always async/await, never .then()
- Error handling: try/catch with typed errors, always log with context
- Exports: named exports only (no default exports except pages)
- Naming: PascalCase for components, camelCase for functions/variables
- No console.log — use src/lib/logger.ts

## 4. Security Requirements
Non-negotiable security rules.
- All API endpoints require authentication unless explicitly marked public
- Validate all user input with Zod before processing
- Never put secrets in code — always use environment variables
- Never log PII (emails, names, any user data)

## 5. What to Do When Uncertain
This is critical — tells AI how to handle ambiguity.
- If requirements are unclear, ask one specific clarifying question before coding
- If you see a potential bug in existing code while working, flag it but don't fix it without instruction
- If a library you'd reach for isn't in package.json, check before assuming it should be added`,
        },
        {
          type: "heading",
          level: 2,
          text: "The CLAUDE.md File",
        },
        {
          type: "paragraph",
          text: "CLAUDE.md is the equivalent for Claude Code (and increasingly for other Claude-based tools). It serves the same purpose but is written in a style that Claude interprets especially well. CLAUDE.md typically includes more architectural context — the why behind decisions, not just the what.",
        },
        {
          type: "code",
          language: "markdown",
          caption: "CLAUDE.md example — architectural context section",
          code: `## Architectural Decisions and Why

### Why Drizzle ORM, not Prisma
We chose Drizzle for type safety and performance. Drizzle generates zero overhead 
at runtime. When generating database code, use Drizzle's query builder, never 
raw SQL strings. The schema is in src/db/schema.ts.

### Why Zod for validation, not Yup or Joi
Zod's TypeScript integration is superior — inferred types flow into our API 
response types automatically. The validation schemas are in src/schemas/.

### Why Feature-based structure, not Layer-based
We've been burned by layer-based (components/, hooks/, utils/ at the top level) 
because features grow and cross-cutting dependencies become tangled. Keep all 
related code together in src/features/[name]/.`,
        },
        {
          type: "heading",
          level: 2,
          text: "Git as Your Safety Net",
        },
        {
          type: "paragraph",
          text: "With AI generating code at high volume, version control is more important than ever — not less. AI can make sweeping changes to your codebase in minutes that a human would take hours to make. Without Git, a bad AI session can be catastrophic. With Git, a bad AI session is a `git reset --hard` away from recovery.",
        },
        {
          type: "list",
          items: [
            "Commit before any significant AI session: before starting a Composer or Agent session, commit your current state. Label it 'pre-AI: [task description].'",
            "Commit after each logical unit: don't let AI accumulate unbounded changes. Commit when a feature is working, even if not perfect.",
            "Review diffs before committing: with AI making many changes, you need to review diffs carefully. Never commit blindly.",
            "Use branches for experimental sessions: if you are trying a significant AI refactor that might not work, do it on a branch.",
          ],
        },
        {
          type: "warning",
          title: "The AI Diff Problem",
          text: "AI agents can produce large diffs — 50, 100, even 500 file changes in a single session. It becomes easy to commit changes you haven't fully reviewed. Establish a discipline: never commit more files than you can meaningfully review. If an AI session produces a massive diff, split it into logical chunks and review each one before committing.",
        },
        {
          type: "heading",
          level: 2,
          text: "Git for Beginners Using AI",
        },
        {
          type: "paragraph",
          text: "If you are new to version control, here is the minimum Git knowledge you need for effective AI-assisted development:",
        },
        {
          type: "code",
          language: "bash",
          caption: "Essential Git commands for AI-assisted development",
          code: `# Initialize a repo
git init
git add .
git commit -m "initial: project setup"

# Before an AI session
git add . && git commit -m "pre-AI: starting work on [feature]"

# After a successful AI session
git add [specific files]  # or git add . for all
git diff --staged          # ALWAYS review before committing
git commit -m "feat: [what was accomplished]"

# If something went wrong — revert to the last commit
git reset --hard HEAD

# See what changed
git status
git diff

# Check history
git log --oneline`,
        },
        {
          type: "exercise",
          title: "Build Your Configuration Files",
          description:
            "Pick a real project you're working on or planning to build. Write a complete .cursorrules and/or CLAUDE.md file for it. Include all five sections: stack declaration, architecture patterns, code style, security requirements, and uncertainty handling. Then run a test: give Cursor or Claude a task without the file, then with it, and document the differences.",
          hints: [
            "Write the file for the project you wish you had, not the one you have. Aspirational rules guide AI toward better code even if the existing codebase doesn't yet follow them.",
            "The 'what to do when uncertain' section is the most important. It prevents AI from making assumptions and silently implementing the wrong thing.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Configuration files are higher-leverage than individual prompts — they improve every interaction",
            ".cursorrules: stack, architecture, code style, security, uncertainty handling",
            "CLAUDE.md adds architectural context — the why behind decisions, not just the what",
            "Git is your safety net: commit before AI sessions, review diffs carefully, never commit blindly",
            "The AI diff problem: large sessions produce large diffs — review in logical chunks",
          ],
        },
      ],
    },
    {
      id: "2-6",
      title: "Git Fundamentals for AI-Assisted Workflows",
      estimatedMinutes: 14,
      content: [
        {
          type: "paragraph",
          text: "Version control is not optional when you are using AI to write code at high volume. The pace at which AI can change a codebase means that without a strong version control discipline, a single confused AI session can leave you with a broken codebase you cannot undo. This lesson covers the Git concepts and workflows specifically relevant to AI-assisted development.",
        },
        {
          type: "heading",
          level: 2,
          text: "Why AI Makes Git More Important",
        },
        {
          type: "paragraph",
          text: "A human developer changes code in a relatively controlled, incremental way. A small set of files change in a focused area, and the developer has a mental map of all the changes. AI changes code differently: it might touch 20 files in a single session, make structural changes you haven't fully reviewed, and introduce subtle regressions while fixing a stated issue. Without Git, you have no safety net.",
        },
        {
          type: "list",
          items: [
            "AI can confidently refactor code incorrectly — Git lets you revert instantly",
            "AI sessions compound — a series of small errors can snowball; Git checkpoints prevent that",
            "AI does not have memory across sessions by default — Git history IS the project memory",
            "Code review of AI output is hard; Git diffs make it structured and auditable",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The AI Development Git Workflow",
        },
        {
          type: "paragraph",
          text: "Here is a Git workflow specifically optimized for AI-assisted development:",
        },
        {
          type: "code",
          language: "bash",
          caption: "The AI session Git workflow",
          code: `# 1. Start of a new feature or task
git checkout -b feature/[task-name]

# 2. Before starting an AI session
git add . && git commit -m "checkpoint: before AI session on [task]"

# 3. During the AI session
# Let the AI make changes. Don't commit during — wait for a logical unit.

# 4. Review all changes
git status              # See which files changed
git diff                # See what changed in unstaged files
git diff --staged       # See what's staged for commit

# 5. Commit thoughtfully
git add src/components/NewFeature.tsx  # Add specific files
git commit -m "feat(components): add NewFeature with validation"

# If the session went wrong
git reset --hard HEAD   # Nuclear option — revert all uncommitted changes

# 6. Merge back to main when the feature is complete
git checkout main
git merge feature/[task-name]`,
        },
        {
          type: "heading",
          level: 2,
          text: "Commit Message Conventions for AI-Assisted Work",
        },
        {
          type: "paragraph",
          text: "Conventional Commits is a specification for structured commit messages that makes Git history readable and automatically processable. It is especially valuable when AI generates commits, because it forces clarity about what changed and why.",
        },
        {
          type: "code",
          language: "text",
          caption: "Conventional Commits format",
          code: `<type>(<scope>): <short description>

Types:
  feat:     a new feature
  fix:      a bug fix
  refactor: code change that neither fixes a bug nor adds a feature
  docs:     documentation only changes
  test:     adding or correcting tests
  chore:    maintenance (updating dependencies, build config)
  perf:     a code change that improves performance

Examples:
  feat(auth): add JWT refresh token rotation
  fix(api): handle null user.preferences gracefully
  refactor(db): migrate from raw SQL to Drizzle ORM
  test(users): add integration tests for user creation endpoint`,
        },
        {
          type: "heading",
          level: 2,
          text: "Using .gitignore Effectively",
        },
        {
          type: "paragraph",
          text: "When AI generates a project from scratch, it often creates files that should not be committed: environment files with secrets, build artifacts, node_modules. A good .gitignore is essential:",
        },
        {
          type: "code",
          language: "text",
          caption: ".gitignore for AI-generated web projects",
          code: `# Environment files — NEVER commit these
.env
.env.local
.env.*.local

# Dependencies
node_modules/

# Build output
dist/
build/
.next/
out/

# Editor artifacts
.DS_Store
.cursorrules.local  # If you have local overrides of your project rules
*.swp
*.swo

# AI tool artifacts (tool-specific)
.aider*
.claude/

# Logs
*.log
npm-debug.log*`,
        },
        {
          type: "heading",
          level: 2,
          text: "Branching Strategies for AI-Assisted Teams",
        },
        {
          type: "paragraph",
          text: "When multiple people on a team are using AI to generate code, the risk of merge conflicts increases because AI-generated changes tend to be larger and less targeted than human changes. A simple branching strategy mitigates this:",
        },
        {
          type: "list",
          items: [
            "Feature branches for every significant AI task — never develop directly on main",
            "Short-lived branches — AI sessions are fast, so features should be completed and merged in days, not weeks",
            "Rebase over merge when possible — keeps history linear and easier to audit",
            "Pull before every session — always get the latest changes before starting an AI session to minimize conflicts",
          ],
        },
        {
          type: "tip",
          title: "Let AI Write Your Commit Messages",
          text: "One practical application of AI in your Git workflow: after making a set of changes, ask your AI assistant to 'write a commit message in Conventional Commits format for these changes' and paste in the diff. The AI will produce a well-structured commit message faster than you'd write one manually, and it forces you to review the diff in the process.",
        },
        {
          type: "exercise",
          title: "Set Up a Professional Git Workflow",
          description:
            "For your current or next project: (1) Initialize a Git repository if you haven't already. (2) Write a .gitignore that covers your stack. (3) Make your first commit with the message format 'chore: initial project setup.' (4) Create a branch named 'feature/test-ai-workflow.' (5) Make a small change using an AI tool. (6) Review the diff, write a proper Conventional Commits message, and merge the branch back to main.",
          hints: [
            "If this is your first time using Git, use GitHub Desktop for a GUI — the concepts are the same.",
            "The review step (git diff --staged) is the most important habit to build. Never skip it.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "AI generates code at high volume — Git safety net becomes non-optional",
            "Commit before AI sessions: create a restore point before any significant AI work",
            "Always review diffs before committing — AI changes can be subtle and far-reaching",
            "Conventional Commits format brings structure to Git history and forces clarity",
            ".gitignore must cover env files, build artifacts, node_modules — AI-generated projects often miss these",
          ],
        },
      ],
    },
  ],
};
