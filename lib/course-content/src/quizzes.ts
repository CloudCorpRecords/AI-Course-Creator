export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface Quiz {
  lessonId: string;
  questions: QuizQuestion[];
}

const data: Record<string, QuizQuestion[]> = {
  "1-1": [
    {
      question: "According to Rene Turcios, vibe coding is best described as:",
      options: [
        "A replacement for learning fundamentals",
        "A starting point that gets you shipping fast",
        "A productivity hack only for experts",
        "A way to avoid all manual coding forever",
      ],
      correctIndex: 1,
      explanation:
        "Vibe coding is a starting point — it lowers the barrier to shipping and lets you refine from a working artifact.",
    },
    {
      question: "What is the primary mindset shift required for AI-assisted development?",
      options: [
        "Memorize syntax for more languages",
        "Treat AI as a junior engineer to be directed",
        "Avoid using AI for important code",
        "Wait until AI is perfect before adopting it",
      ],
      correctIndex: 1,
    },
  ],
  "1-2": [
    {
      question: "The Rene Turcios method emphasizes:",
      options: [
        "Plan exhaustively before writing any code",
        "Ship first, refine later",
        "Refactor before shipping anything",
        "Never deploy until tests are perfect",
      ],
      correctIndex: 1,
      explanation: "Ship first establishes feedback loops; refinement follows real usage.",
    },
    {
      question: "A '2-Hour Hackathon' is meant to:",
      options: [
        "Produce a polished product",
        "Force a working artifact under tight constraint",
        "Replace planning entirely",
        "Compete with other developers",
      ],
      correctIndex: 1,
    },
  ],
  "1-3": [
    {
      question: "First-principles thinking helps you avoid:",
      options: [
        "Writing too much code",
        "AI's confident wrongness",
        "Using third-party libraries",
        "Working with teammates",
      ],
      correctIndex: 1,
    },
    {
      question: "The '10x Amplifier' refers to:",
      options: [
        "A specific AI model",
        "A pricing tier",
        "AI's ability to multiply existing skill",
        "A keyboard shortcut",
      ],
      correctIndex: 2,
    },
  ],
  "1-4": [
    {
      question: "For beginners, domain expertise is described as your:",
      options: ["Bottleneck", "Moat", "Distraction", "Liability"],
      correctIndex: 1,
    },
    {
      question: "The 'Explain It Back' exercise is meant to:",
      options: [
        "Teach the AI new concepts",
        "Verify your own understanding of generated code",
        "Speed up code review",
        "Replace documentation",
      ],
      correctIndex: 1,
    },
  ],
  "1-5": [
    {
      question: "The biggest risk for veteran developers using AI heavily is:",
      options: [
        "Slower output",
        "Skill erosion if you stop thinking",
        "Higher API costs",
        "Less time for meetings",
      ],
      correctIndex: 1,
    },
    {
      question: "The '5-Minute Pre-Think' is a habit that:",
      options: [
        "Forces you to outline before prompting",
        "Times your prompts",
        "Selects the right model",
        "Reviews the AI's output",
      ],
      correctIndex: 0,
    },
  ],
  "2-1": [
    {
      question: "Choosing an AI coding stack should be guided primarily by:",
      options: [
        "What is most popular on Twitter",
        "Your workflow and project type",
        "The lowest price",
        "What your IDE defaults to",
      ],
      correctIndex: 1,
    },
    {
      question: "Which is NOT a typical layer of an AI coding stack?",
      options: ["Editor", "Agent", "Database driver", "Model"],
      correctIndex: 2,
    },
  ],
  "2-2": [
    {
      question: "Replit Agent's core strength is:",
      options: [
        "Local-first compilation",
        "Zero-setup prototyping in the browser",
        "Native mobile builds",
        "Custom GPU access",
      ],
      correctIndex: 1,
    },
    {
      question: "Replit Agent is best used for:",
      options: [
        "Production-only code",
        "Going from idea to running app quickly",
        "Replacing Git entirely",
        "Database administration only",
      ],
      correctIndex: 1,
    },
  ],
  "2-3": [
    {
      question: "Cursor is positioned as:",
      options: [
        "A no-code tool",
        "A power-user IDE built on VS Code",
        "A cloud notebook",
        "A terminal multiplexer",
      ],
      correctIndex: 1,
    },
    {
      question: "A power-user feature of Cursor is:",
      options: [
        "Built-in spreadsheets",
        "Composer / multi-file edits with context",
        "On-device LLM training",
        "Native CAD tooling",
      ],
      correctIndex: 1,
    },
  ],
  "2-4": [
    {
      question: "Claude Code is primarily a:",
      options: [
        "Web-only chat interface",
        "Terminal-based coding agent",
        "Mobile app",
        "Database tool",
      ],
      correctIndex: 1,
    },
    {
      question: "Specialized AI tools are most useful when:",
      options: [
        "You replace your IDE entirely",
        "Your workflow has a narrow, repeated task",
        "You only have a free tier",
        "You want a single model for everything",
      ],
      correctIndex: 1,
    },
  ],
  "2-5": [
    {
      question: "A .cursorrules or CLAUDE.md file is used to:",
      options: [
        "Override the model's weights",
        "Persist project conventions for the AI",
        "Run unit tests",
        "Configure linting only",
      ],
      correctIndex: 1,
    },
    {
      question: "Why pair AI tooling with Git?",
      options: [
        "Git makes AI faster",
        "Easy revert when AI changes break things",
        "Required to run any AI tool",
        "It improves model quality",
      ],
      correctIndex: 1,
    },
  ],
  "2-6": [
    {
      question: "What is the safest practice when an AI agent edits many files?",
      options: [
        "Force-push immediately",
        "Commit before, review the diff after",
        "Skip Git for speed",
        "Squash all history",
      ],
      correctIndex: 1,
    },
    {
      question: "Which Git command is most useful to undo a bad AI change locally?",
      options: ["git push --force", "git restore / git reset", "git rebase", "git fetch"],
      correctIndex: 1,
    },
  ],
  "3-1": [
    {
      question: "Prompting is described in this lesson as:",
      options: [
        "An optional skill",
        "Your new syntax",
        "A bug in current models",
        "A passing trend",
      ],
      correctIndex: 1,
    },
    {
      question: "Effective prompts treat the LLM as:",
      options: ["A database", "A collaborator with context limits", "A compiler", "A search engine"],
      correctIndex: 1,
    },
  ],
  "3-2": [
    {
      question: "Beginner prompting hinges on:",
      options: [
        "Specificity, context, and iteration",
        "Using as few words as possible",
        "Always asking for code only",
        "Avoiding examples",
      ],
      correctIndex: 0,
    },
    {
      question: "If a first prompt produces poor code, you should:",
      options: [
        "Give up",
        "Iterate with more context and constraints",
        "Switch tools immediately",
        "Always restart the conversation",
      ],
      correctIndex: 1,
    },
  ],
  "3-3": [
    {
      question: "What does RTCFE stand for in this lesson's framework?",
      options: [
        "Role, Task, Context, Format, Examples",
        "Read, Test, Code, Fix, Explain",
        "Refactor, Tune, Compile, Format, Edit",
        "Run, Type, Check, Fail, Escalate",
      ],
      correctIndex: 0,
    },
    {
      question: "RTCFE is most useful for:",
      options: [
        "One-line completions",
        "Complex prompts that need structure",
        "Replacing unit tests",
        "Picking models",
      ],
      correctIndex: 1,
    },
  ],
  "3-4": [
    {
      question: "Chain-of-thought prompting asks the model to:",
      options: [
        "Skip reasoning",
        "Show intermediate reasoning",
        "Only output JSON",
        "Use a smaller context",
      ],
      correctIndex: 1,
    },
    {
      question: "A planning prompt is best paired with:",
      options: [
        "An execution prompt that follows the plan",
        "A purely random prompt",
        "Deleting all prior context",
        "A different model every step",
      ],
      correctIndex: 0,
    },
  ],
  "3-5": [
    {
      question: "An effective anti-hallucination tactic is:",
      options: [
        "Trust the first answer",
        "Ground the model with retrieved sources",
        "Increase temperature",
        "Always ask for fiction",
      ],
      correctIndex: 1,
    },
    {
      question: "When the model is unsure, you should prompt it to:",
      options: ["Guess", "Say it doesn't know", "Generate code anyway", "Cite Wikipedia"],
      correctIndex: 1,
    },
  ],
  "3-6": [
    {
      question: "An agentic workflow typically:",
      options: [
        "Uses a single one-shot prompt",
        "Plans, executes, and verifies in a loop",
        "Avoids tool calls",
        "Cannot use APIs",
      ],
      correctIndex: 1,
    },
    {
      question: "Agents move beyond prompts by:",
      options: [
        "Adding tools and a control loop",
        "Picking a bigger model",
        "Removing context",
        "Avoiding evaluation",
      ],
      correctIndex: 0,
    },
  ],
  "4-1": [
    {
      question: "The beginner flow is best summarized as:",
      options: [
        "Describe, build, test, deploy",
        "Plan, plan, plan, ship",
        "Code, ignore, deploy",
        "Refactor, lint, ship",
      ],
      correctIndex: 0,
    },
    {
      question: "The 'describe' step exists to:",
      options: [
        "Lock in scope before building",
        "Skip thinking",
        "Generate marketing copy",
        "Talk to users only",
      ],
      correctIndex: 0,
    },
  ],
  "4-2": [
    {
      question: "AI-assisted architecture works best when you:",
      options: [
        "Hand the AI the whole repo with no context",
        "Describe constraints and ask for tradeoffs",
        "Only ask for one design",
        "Avoid diagrams",
      ],
      correctIndex: 1,
    },
    {
      question: "The advanced flow adds which step the beginner flow lacks?",
      options: ["Deploy", "Test", "Explicit planning and architecture", "Describe"],
      correctIndex: 2,
    },
  ],
  "4-3": [
    {
      question: "Iterative scaffolding means:",
      options: [
        "Generating the whole app at once",
        "Building, testing, and refining one slice at a time",
        "Skipping git commits",
        "Disabling lint",
      ],
      correctIndex: 1,
    },
    {
      question: "A common scaffolding mistake is:",
      options: [
        "Committing often",
        "Letting the AI build too much without verification",
        "Reading diffs",
        "Using small prompts",
      ],
      correctIndex: 1,
    },
  ],
  "4-4": [
    {
      question: "AI code review is most reliable when paired with:",
      options: [
        "A failing CI build",
        "Human review and tests",
        "A bigger model only",
        "Disabling tests",
      ],
      correctIndex: 1,
    },
    {
      question: "AI is good at writing tests because:",
      options: [
        "It guarantees coverage",
        "It can quickly enumerate edge cases",
        "It replaces QA",
        "It runs the tests itself",
      ],
      correctIndex: 1,
    },
  ],
  "4-5": [
    {
      question: "The 'AI Rubber Duck' technique uses AI to:",
      options: [
        "Auto-fix bugs without you",
        "Help you reason through bugs by explaining them",
        "Disable error logs",
        "Approve PRs",
      ],
      correctIndex: 1,
    },
    {
      question: "When debugging with AI, the best first step is:",
      options: [
        "Paste the stack trace and minimal repro",
        "Ask for a rewrite",
        "Send the entire repo",
        "Restart your machine",
      ],
      correctIndex: 0,
    },
  ],
  "4-6": [
    {
      question: "AI-generated code can accumulate tech debt because:",
      options: [
        "It is always wrong",
        "Speed without review hides shortcuts",
        "It is too well-tested",
        "It refuses to refactor",
      ],
      correctIndex: 1,
    },
    {
      question: "A continuous-improvement habit is:",
      options: [
        "Periodic AI-assisted refactoring with tests",
        "Never refactoring",
        "Rewriting from scratch monthly",
        "Avoiding linters",
      ],
      correctIndex: 0,
    },
  ],
  "4-7": [
    {
      question: "CI/CD with AI workflows benefits most from:",
      options: [
        "Manual deploys only",
        "Automated tests and previews",
        "Skipping staging",
        "Disabling secrets",
      ],
      correctIndex: 1,
    },
    {
      question: "Monitoring matters in AI-built apps because:",
      options: [
        "AI bugs surface in production with novel patterns",
        "It replaces logs",
        "It is required by AI tools",
        "It removes the need for tests",
      ],
      correctIndex: 0,
    },
  ],
  "5-1": [
    {
      question: "Multi-agent systems work by:",
      options: [
        "One model doing everything alone",
        "Specialized agents coordinating roles",
        "Replacing humans entirely",
        "Running locally only",
      ],
      correctIndex: 1,
    },
    {
      question: "A common multi-agent pattern is:",
      options: [
        "Planner + executor + critic",
        "One model, no tools",
        "Random delegation",
        "Single-shot prompts",
      ],
      correctIndex: 0,
    },
  ],
  "5-2": [
    {
      question: "RAG stands for:",
      options: [
        "Retrieval-Augmented Generation",
        "Rapid Agent Graph",
        "Recursive AI Gateway",
        "Reinforcement Adversarial Gradient",
      ],
      correctIndex: 0,
    },
    {
      question: "RAG helps with large codebases by:",
      options: [
        "Indexing and fetching relevant context",
        "Increasing context windows infinitely",
        "Removing the need for prompts",
        "Compressing the model",
      ],
      correctIndex: 0,
    },
  ],
  "5-3": [
    {
      question: "Fine-tuning is most useful when:",
      options: [
        "You need consistent style or domain behavior",
        "You only have 5 examples",
        "Prompting alone already works",
        "You want general knowledge",
      ],
      correctIndex: 0,
    },
    {
      question: "Before fine-tuning you should typically:",
      options: ["Skip prompting", "Exhaust prompt engineering and RAG first", "Buy a GPU", "Disable evals"],
      correctIndex: 1,
    },
  ],
  "5-4": [
    {
      question: "Evaluating AI output requires:",
      options: [
        "Trusting the model",
        "Benchmarks plus human review",
        "Only automated metrics",
        "Only vibes",
      ],
      correctIndex: 1,
    },
    {
      question: "A good eval set is:",
      options: [
        "Tiny and synthetic only",
        "Representative of real production cases",
        "Held by the model vendor",
        "Disposable",
      ],
      correctIndex: 1,
    },
  ],
  "5-5": [
    {
      question: "Enterprise AI workflows must consider:",
      options: ["Privacy, audit, access control", "Just speed", "Only cost", "Marketing"],
      correctIndex: 0,
    },
    {
      question: "A team adopting AI should start with:",
      options: [
        "A shared playbook and guardrails",
        "Banning AI entirely",
        "Each person freelancing",
        "Replacing all engineers",
      ],
      correctIndex: 0,
    },
  ],
  "5-6": [
    {
      question: "To future-proof your skills, focus on:",
      options: [
        "Memorizing one framework forever",
        "Fundamentals, taste, and shipping",
        "Avoiding AI tools",
        "Only using the newest model",
      ],
      correctIndex: 1,
    },
    {
      question: "Your durable advantage is most often:",
      options: ["Typing speed", "Judgment and context", "Tooling brand", "Hours worked"],
      correctIndex: 1,
    },
  ],
  "6-1": [
    {
      question: "The 'project ladder' suggests:",
      options: [
        "Start with production SaaS first",
        "Climb from small projects to bigger ones",
        "Avoid small projects",
        "Skip todos and dashboards",
      ],
      correctIndex: 1,
    },
    {
      question: "Each rung of the ladder should:",
      options: [
        "Add a new skill or constraint",
        "Repeat the previous one",
        "Use a new language",
        "Switch frameworks",
      ],
      correctIndex: 0,
    },
  ],
  "6-2": [
    {
      question: "Your first full-stack app should prioritize:",
      options: [
        "A working end-to-end slice",
        "Microservices",
        "Custom databases",
        "Kubernetes",
      ],
      correctIndex: 0,
    },
    {
      question: "A common beginner mistake is:",
      options: [
        "Shipping too fast",
        "Building too much before deploying once",
        "Using a hosted DB",
        "Using a framework",
      ],
      correctIndex: 1,
    },
  ],
  "6-3": [
    {
      question: "The Turcios hackathon playbook emphasizes:",
      options: [
        "Polish over function",
        "A demoable artifact above all",
        "Avoiding AI",
        "Long planning",
      ],
      correctIndex: 1,
    },
    {
      question: "In a hackathon, scope should be:",
      options: ["Maximal", "Brutally cut to fit time", "Decided after coding", "Defined by judges"],
      correctIndex: 1,
    },
  ],
  "6-4": [
    {
      question: "AI-powered tools you build yourself should start as:",
      options: ["A SaaS product", "A small internal script", "A research paper", "A patent filing"],
      correctIndex: 1,
    },
    {
      question: "Agent systems are valuable when:",
      options: [
        "Tasks are repetitive and tool-heavy",
        "Tasks are one-off",
        "There are no APIs",
        "Speed does not matter",
      ],
      correctIndex: 0,
    },
  ],
  "6-5": [
    {
      question: "Shipping in public works because:",
      options: [
        "It markets your work and creates accountability",
        "It guarantees revenue",
        "It removes the need to build",
        "It replaces version control",
      ],
      correctIndex: 0,
    },
    {
      question: "A useful weekly shipping metric is:",
      options: ["Lines of code", "Hours spent", "User-facing changes shipped", "Model API spend"],
      correctIndex: 2,
    },
  ],
};

export const quizzes: Quiz[] = Object.entries(data).map(([lessonId, questions]) => ({
  lessonId,
  questions,
}));

export function getQuizForLesson(lessonId: string): Quiz | null {
  const questions = data[lessonId];
  if (!questions) return null;
  return { lessonId, questions };
}
