import type { Module } from "./types";

export const module4: Module = {
  id: "module-4",
  number: 4,
  title: "Full Development Workflow",
  subtitle: "From Idea to Production",
  description:
    "The complete iterative building process — from vision to deployed app — covering both the beginner path and the advanced professional workflow with AI at every stage.",
  lessons: [
    {
      id: "4-1",
      title: "The Beginner Flow: Describe, Build, Test, Deploy",
      estimatedMinutes: 13,
      content: [
        {
          type: "paragraph",
          text: "The beginner flow for AI-assisted development is beautifully simple: describe what you want, let the AI build it, test it in the browser, describe what's wrong, repeat until it works, then deploy. This loop is the foundation that Rene Turcios and thousands of other vibe coders use to ship real applications without writing most of the code themselves.",
        },
        {
          type: "heading",
          level: 2,
          text: "Step 1: Vision Clarity",
        },
        {
          type: "paragraph",
          text: "Before opening any AI tool, spend 5 minutes writing down exactly what you want to build. This is not planning in the engineering sense — you don't need architecture diagrams. It is clarity about the user experience: what does someone do when they open this app? What is the one thing that makes it useful?",
        },
        {
          type: "code",
          language: "text",
          caption: "Vision clarity template",
          code: `App: [Name]
What it does in one sentence: [...]
Who uses it: [...]
The main thing a user does: [...]
What makes it interesting/useful: [...]

Core screens or sections:
1. [First thing a user sees]
2. [Main action]
3. [Result or output]`,
        },
        {
          type: "heading",
          level: 2,
          text: "Step 2: The First Build Prompt",
        },
        {
          type: "paragraph",
          text: "Your first prompt to Replit Agent (or whichever tool you're using) should describe the app at a medium level of detail — enough to get a meaningful first version, not so detailed that it constrains every decision. The AI fills in reasonable defaults for things you don't specify.",
        },
        {
          type: "code",
          language: "text",
          caption: "Effective first-build prompt",
          code: `Build a web app called [Name] that [one sentence description].

Core features:
- [Feature 1]
- [Feature 2]  
- [Feature 3]

Technical requirements:
- [Stack preference, or leave blank to let AI choose]
- [Any specific constraints: mobile-friendly, specific colors, etc.]

Make it look clean and modern. Include example/sample data so I can 
see how it looks when there's real content.`,
        },
        {
          type: "heading",
          level: 2,
          text: "Step 3: Testing Like a User",
        },
        {
          type: "paragraph",
          text: "When the AI produces the first build, resist the urge to immediately look at the code. Instead, test it like a real user would: open the app, try to complete the main task it was designed for, and note every point of friction, confusion, or broken behavior.",
        },
        {
          type: "list",
          items: [
            "Does the main action work? (Submit a form, save data, navigate between screens)",
            "Does data persist? (Refresh the page — is your data still there?)",
            "Does it look right on your phone? (Resize the browser window to mobile size)",
            "Are there any console errors? (Open browser DevTools — F12 or Cmd+Option+I)",
            "Does the copy and content make sense?",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Step 4: Describing Problems",
        },
        {
          type: "paragraph",
          text: "When you find something broken or missing, describe it to the AI with the same specificity you would use to describe it to a developer you've hired. 'It doesn't work' tells the AI nothing useful. 'When I click the Submit button, the form disappears but the data doesn't appear in the list below' gives the AI exactly what it needs.",
        },
        {
          type: "tip",
          title: "The Bug Report Format",
          text: "Use this format for every problem description: WHAT I DID → WHAT HAPPENED → WHAT I EXPECTED. 'I clicked Save → the page went blank → I expected to see my new entry in the list.' This three-part structure eliminates almost all ambiguity and dramatically speeds up the correction cycle.",
        },
        {
          type: "heading",
          level: 2,
          text: "Step 5: One-Click Deploy",
        },
        {
          type: "paragraph",
          text: "In Replit, when your app is working well enough to share, click the Deploy button. Replit handles HTTPS, the domain name, and uptime. The first time you do this and get a real URL you can share with anyone in the world — not a localhost URL, a real public URL — is a genuinely exciting moment. Ship early. Get real feedback. The app will be imperfect. Ship anyway.",
        },
        {
          type: "exercise",
          title: "Full Beginner Flow, Start to Finish",
          description:
            "Build and deploy a complete app using only the beginner flow. Complete all five steps: write a vision doc, write a first build prompt, test it like a user, iterate until the main feature works, and deploy it. Share the URL with one real person and ask for one piece of feedback.",
          hints: [
            "The goal is completing the full cycle, not building a perfect app. A deployed imperfect app is worth infinitely more than a perfect app in progress.",
            "When asking for feedback, ask a specific question: 'Is it clear what this app is for?' or 'Could you figure out how to add a new item?'",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Five steps: vision clarity → first build prompt → test like a user → describe problems → deploy",
            "Test as a user first — don't look at the code until you know what the experience is like",
            "Bug report format: WHAT I DID → WHAT HAPPENED → WHAT I EXPECTED",
            "Deploy early — a live URL enables real feedback you cannot get any other way",
            "Imperfect and deployed beats perfect and unshipped, every time",
          ],
        },
      ],
    },
    {
      id: "4-2",
      title: "The Advanced Flow: Planning and Architecture with AI",
      estimatedMinutes: 17,
      content: [
        {
          type: "paragraph",
          text: "The beginner flow — describe, build, iterate — is excellent for prototypes and MVPs. For production software, it is not enough. Production software has requirements that can't be iterated away: security, scalability, maintainability, and correctness at scale. The advanced flow addresses these systematically, using AI as a collaborator across the entire process rather than just an implementation machine.",
        },
        {
          type: "heading",
          level: 2,
          text: "Phase 1: Requirements and Problem Definition",
        },
        {
          type: "paragraph",
          text: "Before any AI tool is opened, the requirements must be clear. This is not about writing a formal specification document — it is about having clear answers to five questions:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "What user problem does this solve? (Not what feature does it have — what problem.)",
            "Who specifically is the user, and what do they currently do instead of using this?",
            "What does success look like in 6 months? (User numbers, behavior metrics, business outcomes.)",
            "What are the hard constraints? (Compliance, performance SLAs, existing system integrations, budget.)",
            "What is explicitly out of scope for this version? (This is as important as what's in scope.)",
          ],
        },
        {
          type: "paragraph",
          text: "Use AI here as a Socratic partner: 'I am planning to build X. Ask me probing questions that will help me clarify the requirements and identify things I might have missed.' This is a high-value use of AI that most people skip entirely.",
        },
        {
          type: "heading",
          level: 2,
          text: "Phase 2: Architecture Planning",
        },
        {
          type: "paragraph",
          text: "Architecture decisions have the highest cost of change — a wrong call on your data model or your authentication architecture can require a full rewrite months later. Invest time here before implementation.",
        },
        {
          type: "code",
          language: "text",
          caption: "Architecture planning prompt",
          code: `I am building [app description]. Here are the requirements:
[paste requirements]

Help me design the architecture. For each of these dimensions, give me 2-3 
options with genuine tradeoff analysis (not just the popular choice):

1. DATA MODEL: What are the core entities and their relationships?
2. STATE MANAGEMENT: Where does state live? (Client, server, cache?)
3. API DESIGN: REST vs GraphQL vs tRPC? Synchronous vs async?
4. AUTHENTICATION: What authentication model? (JWT, sessions, OAuth, SSO?)
5. DEPLOYMENT: Where and how does this run in production?

For each dimension, identify what factors should drive the decision.
Then give me your recommendation for each given the specific requirements above.`,
        },
        {
          type: "heading",
          level: 2,
          text: "Phase 3: Data Model First",
        },
        {
          type: "paragraph",
          text: "One of the most important first-principles insights about software: get the data model right before anything else. The data model is the schema of what you store and how entities relate. If the data model is wrong, the entire application built on top of it will be structurally flawed. The UI can be redesigned. APIs can be refactored. The data model is much harder to change once data exists in it.",
        },
        {
          type: "code",
          language: "text",
          caption: "Data model planning prompt",
          code: `Design a PostgreSQL schema for [app description]. 

Requirements:
[list your requirements]

For each table, include:
- All columns with types and constraints (NOT NULL, UNIQUE, etc.)
- Primary and foreign key relationships
- Indexes that would be needed for the expected query patterns
- Any soft-delete or audit trail considerations

After the schema, identify: 
- What are the most common queries this schema supports?
- What queries would be expensive and might need optimization?
- What would change if we needed to add [likely future requirement]?`,
        },
        {
          type: "heading",
          level: 2,
          text: "Phase 4: API Contract Before Implementation",
        },
        {
          type: "paragraph",
          text: "Define the API contract — what endpoints exist, what they accept, and what they return — before implementing either the frontend or the backend. This contract is the interface between two complex systems. When both sides are built to the same contract, integration is smooth. When they drift independently, integration becomes a debugging exercise.",
        },
        {
          type: "insight",
          title: "Contract-First Development",
          text: "Tools like OpenAPI allow you to define the API contract in a machine-readable format that can be used to: auto-generate TypeScript types for both client and server, validate request/response shapes at runtime, generate interactive API documentation, and run contract tests. The investment in an OpenAPI spec pays dividends through the entire development lifecycle.",
        },
        {
          type: "heading",
          level: 2,
          text: "Phase 5: Iterative Implementation",
        },
        {
          type: "paragraph",
          text: "With architecture planned and data model defined, implementation can proceed iteratively. The key discipline: implement one logical unit at a time, verify it works, commit it, move to the next. Do not implement the entire application and then test — each feature should be testable in isolation.",
        },
        {
          type: "list",
          items: [
            "Backend first for data-intensive features: verify the API works before building the UI on top",
            "UI first for user-facing features where the interaction model might change: validate the UX before investing in backend logic",
            "Tests alongside implementation, not after: writing tests after produces tests that match the implementation; writing them first or alongside forces clearer specifications",
          ],
        },
        {
          type: "exercise",
          title: "Architecture Before Implementation",
          description:
            "Take an app you want to build. Before writing any code, produce: (1) A written requirements document (5 questions answered), (2) An architecture decision for each dimension (data model, state, API, auth, deployment), (3) A full database schema. Only after all three are complete, start implementation. At the end, reflect: what mistakes did you catch in the planning phase that would have been expensive in code?",
          hints: [
            "Use AI as the Socratic partner for requirements — ask it to challenge your assumptions.",
            "The schema review is the most valuable part. Ask AI to identify what's missing and what query patterns might be expensive.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Advanced flow: requirements → architecture → data model → API contract → iterative implementation",
            "Data model first — this is the most expensive mistake to fix later",
            "Use AI as a Socratic partner for requirements: ask it to probe your assumptions",
            "Contract-first API design prevents integration friction and enables parallel frontend/backend development",
            "One logical unit at a time: implement, verify, commit, repeat",
          ],
        },
      ],
    },
    {
      id: "4-3",
      title: "Scaffolding and Iterative Building",
      estimatedMinutes: 15,
      content: [
        {
          type: "paragraph",
          text: "Scaffolding is the practice of generating the structural skeleton of an application before filling in the details. Done well, it accelerates all subsequent development by establishing conventions, file structure, and boilerplate that every subsequent feature can build on. AI is exceptionally good at scaffolding — it has seen thousands of project structures and can generate a clean, well-organized skeleton in minutes.",
        },
        {
          type: "heading",
          level: 2,
          text: "What Good Scaffolding Includes",
        },
        {
          type: "list",
          items: [
            "Project structure: directory organization that will accommodate growth",
            "Configuration: TypeScript config, build tools, linting, formatting",
            "Base types and interfaces: the TypeScript shapes that define the domain",
            "Database schema: the table definitions (for apps with a backend)",
            "API structure: the routing pattern and middleware setup",
            "Component patterns: the design system components and layout primitives",
            "Testing setup: the test runner config and example tests",
            "Environment handling: the .env.example and environment validation",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The Scaffolding Prompt",
        },
        {
          type: "code",
          language: "text",
          caption: "Scaffolding prompt for a full-stack app",
          code: `Scaffold a full-stack TypeScript application with these specifications:

STACK:
- Frontend: React 19 + TypeScript + Tailwind CSS + React Query
- Backend: Node.js + Express 5 + TypeScript
- Database: PostgreSQL + Drizzle ORM
- Testing: Vitest (both frontend and backend)

PROJECT STRUCTURE:
Create a monorepo with:
- /client — React frontend
- /server — Express API
- /shared — Types and utilities shared between client and server

GENERATE THESE FILES (but not the business logic — just the structure):
1. Root package.json with workspaces
2. TypeScript configs for each package
3. Vite config for the client
4. ESLint and Prettier configs
5. Example .env.example with placeholder values
6. Base DB schema file (empty, ready for tables)
7. Express app setup with CORS, auth middleware placeholder, error handler
8. React app setup with QueryClient, Router, and a basic layout
9. One example test in each package showing the test setup

After scaffolding, describe what the developer should do next to start 
adding business logic.`,
        },
        {
          type: "heading",
          level: 2,
          text: "Iterative Building: The Right Granularity",
        },
        {
          type: "paragraph",
          text: "After scaffolding, building proceeds iteratively. The question of granularity — how much to build before testing — is crucial. Too large (build the entire feature before testing) and debugging becomes difficult because any of dozens of things could be wrong. Too small (implement and test every single line) and overhead drowns productivity.",
        },
        {
          type: "paragraph",
          text: "The right granularity for AI-assisted development is the logical unit: a complete user story or feature that can be tested end-to-end. 'User can add an item to their list' is a logical unit. It is small enough to debug but large enough to be meaningful.",
        },
        {
          type: "heading",
          level: 2,
          text: "Feature Development Sequence",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Start with the data: add the schema changes and run the migration",
            "Build the API endpoint: implement and test with a REST client (Postman, curl, or Hoppscotch)",
            "Build the UI: implement the component using real API calls, not mocked data",
            "Handle loading and error states: these are often forgotten until QA",
            "Write the test: verify the feature works correctly with an automated test",
            "Commit: a clean commit with a meaningful message",
          ],
        },
        {
          type: "tip",
          title: "Database-First for Each Feature",
          text: "For each new feature, start with the database schema change. If the feature requires a new table or column, add it first. This forces you to think about data design before UI design, which usually produces better both. It also means your API is built against a real schema from the start, not a mocked one.",
        },
        {
          type: "heading",
          level: 2,
          text: "Managing AI Session Context",
        },
        {
          type: "paragraph",
          text: "In long development sessions, AI context can drift — the model may lose track of earlier decisions, start making different choices, or contradict itself. Strategies to manage this:",
        },
        {
          type: "list",
          items: [
            "Session summaries: at the end of each session, ask AI to 'summarize the decisions made and the current state of the implementation in a format I can paste at the start of the next session.'",
            "Reference files: keep an ARCHITECTURE.md file current. Start each session by referencing it.",
            "Small, focused sessions: rather than one 4-hour session, prefer four 1-hour sessions each with a single clear goal.",
            "Git as context: the commit history and diff from the last commit give AI excellent context about recent changes.",
          ],
        },
        {
          type: "exercise",
          title: "Build Feature by Feature",
          description:
            "Take an app you are building (or start a new one). Plan out 3 features. Build each one using the feature development sequence: schema change → API endpoint → UI → error states → test → commit. After all three are done, compare the experience to your previous approach of building everything at once.",
          hints: [
            "If you don't have a test setup, the test step can be replaced with 'write the curl command to manually verify this feature works.'",
            "The loading and error state step is the one most tempting to skip. Don't. These are what make an app feel professional vs amateurish.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Scaffold first: establish project structure, config, and patterns before business logic",
            "The right granularity is the logical unit — a complete user story, testable end-to-end",
            "Feature sequence: schema → API → UI → loading/errors → test → commit",
            "Manage AI context: session summaries, reference files, small focused sessions",
            "Database-first per feature forces data design before UI design — produces better both",
          ],
        },
      ],
    },
    {
      id: "4-4",
      title: "Code Review and Testing with AI",
      estimatedMinutes: 16,
      content: [
        {
          type: "paragraph",
          text: "AI is an excellent author of code. It is also an excellent reviewer of code — perhaps more consistent than humans, who tire, have blind spots, and miss things under time pressure. Using AI for code review and test generation creates a quality loop that catches bugs before they reach production.",
        },
        {
          type: "heading",
          level: 2,
          text: "AI as Code Reviewer",
        },
        {
          type: "paragraph",
          text: "Unlike human reviewers, AI can be asked to review code against a specific checklist, and it will check every item every time, without fatigue. The key is giving it the right checklist for the context.",
        },
        {
          type: "code",
          language: "text",
          caption: "Security-focused code review prompt",
          code: `Review this code for security vulnerabilities. Check specifically for:

1. AUTHENTICATION: Is every non-public endpoint protected? Can the auth be bypassed?
2. AUTHORIZATION: Does the code verify the user has permission to act on the specific resource 
   (not just that they are logged in)?
3. INPUT VALIDATION: Is all user input validated before processing? Can a user inject 
   malicious data (SQL injection, XSS, command injection)?
4. SECRETS: Are any API keys, passwords, or tokens hardcoded or logged?
5. ERROR HANDLING: Do error messages reveal internal details that could help an attacker?
6. RATE LIMITING: Are there endpoints that could be abused without rate limiting?

For each category, either confirm it is handled correctly or describe the specific vulnerability.

\`\`\`typescript
[paste the code to review]
\`\`\``,
        },
        {
          type: "code",
          language: "text",
          caption: "Performance-focused code review prompt",
          code: `Review this code for performance issues:

1. DATABASE QUERIES: Are there N+1 query patterns? Are queries indexed?
2. UNNECESSARY COMPUTATION: Is any expensive operation in a loop or render cycle?
3. MEMORY: Are there unbounded data structures that could grow without limit?
4. ASYNC: Are synchronous operations blocking that should be async?
5. CACHING: Is frequently-accessed data being fetched on every request?

\`\`\`typescript
[paste the code to review]
\`\`\``,
        },
        {
          type: "heading",
          level: 2,
          text: "Test Generation with AI",
        },
        {
          type: "paragraph",
          text: "AI generates tests quickly and covers cases that humans often miss. The key to effective AI test generation is specifying what to test, not leaving it entirely open-ended:",
        },
        {
          type: "code",
          language: "text",
          caption: "Test generation prompt",
          code: `Write comprehensive tests for this function using Vitest. Cover:

HAPPY PATHS:
- Normal operation with valid inputs
- Edge values at the boundaries of valid ranges

ERROR PATHS:
- Invalid input types
- Empty/null inputs
- Values that violate business rules

INTEGRATION:
- If this function calls external dependencies, test with mocked versions
- Verify the function handles dependency failures gracefully

Here is the function:
\`\`\`typescript
[paste the function]
\`\`\`

Here is the function's TypeScript type signature for reference:
[paste the types]`,
        },
        {
          type: "heading",
          level: 2,
          text: "Test-Driven Development with AI",
        },
        {
          type: "paragraph",
          text: "A powerful pattern: write tests first, then implement. With AI, this is especially effective because you can ask AI to write the tests based on the specification, then implement the code to pass those tests. The tests become the specification for the implementation.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Write the specification in natural language: 'The validateEmail function should return true for valid emails, false for invalid ones, and throw for non-string inputs.'",
            "Ask AI to write tests from the specification: 'Write comprehensive Vitest tests for this specification.'",
            "Review and approve the tests — make sure they actually test what you care about",
            "Ask AI to implement the function to pass the tests: 'Implement validateEmail to make these tests pass.'",
            "Run the tests and iterate if any fail",
          ],
        },
        {
          type: "insight",
          title: "AI Makes TDD Practical",
          text: "Traditional Test-Driven Development requires significant discipline and time — writing tests first feels slow. With AI, the test-writing step is fast enough that the TDD loop becomes practical. The result: better-specified code, comprehensive test coverage, and fewer production bugs.",
        },
        {
          type: "heading",
          level: 2,
          text: "Code Refactoring with AI",
        },
        {
          type: "paragraph",
          text: "AI is excellent at refactoring — improving code structure without changing behavior. The best refactoring prompts specify both what to improve and what constraints to maintain:",
        },
        {
          type: "code",
          language: "text",
          caption: "Refactoring prompt",
          code: `Refactor this code to improve [specific quality: readability / maintainability / performance].

Constraints:
- Do not change the function's external API (inputs and outputs must remain identical)
- All existing tests must continue to pass
- Do not add new dependencies

Specifically, I want to improve:
- [Issue 1: e.g., "this function is too long — split it into smaller units"]
- [Issue 2: e.g., "the nested if statements are hard to follow"]
- [Issue 3: e.g., "there are magic numbers that should be named constants"]

\`\`\`typescript
[paste the code to refactor]
\`\`\``,
        },
        {
          type: "exercise",
          title: "Full Code Review Cycle",
          description:
            "Take a significant piece of code you have written (or AI-generated). Run it through three review passes: (1) Security review using the security checklist prompt. (2) Performance review using the performance checklist prompt. (3) Ask AI to generate comprehensive tests for the most important function. Fix everything flagged. Reflect on what you would have missed without this process.",
          hints: [
            "Be honest — the security review will likely find something. Almost all codebases have at least one authorization gap.",
            "When AI generates tests, run them immediately. Failing tests on existing code means either the tests or the code is wrong — both are worth knowing.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "AI is a tireless, consistent reviewer — give it a specific checklist for security and performance",
            "Test generation: specify happy paths, error paths, and integration scenarios explicitly",
            "AI-assisted TDD: write spec → AI writes tests → review tests → AI implements to pass tests",
            "Refactoring: specify what to improve AND what to preserve (external API, test suite)",
            "The review cycle catches bugs that would be expensive in production — never skip it",
          ],
        },
      ],
    },
    {
      id: "4-5",
      title: "Debugging: The AI Rubber Duck",
      estimatedMinutes: 14,
      content: [
        {
          type: "paragraph",
          text: "Rubber duck debugging is a classic programmer technique: explaining your problem to a rubber duck (or any inanimate object) forces you to articulate exactly what you believe is happening, which often reveals the bug through the act of explanation alone. AI makes this technique dramatically more powerful: instead of a duck that can only listen, you have a collaborator that can analyze your explanation, spot logical inconsistencies, and suggest investigations you wouldn't have thought of.",
        },
        {
          type: "heading",
          level: 2,
          text: "The AI Debugging Protocol",
        },
        {
          type: "paragraph",
          text: "Effective AI debugging has a specific structure. The biggest mistake is jumping to 'fix this bug' without providing the context the AI needs. The debugging protocol:",
        },
        {
          type: "code",
          language: "text",
          caption: "Complete debugging prompt",
          code: `I'm debugging a problem. Please help me reason through it systematically.

SYMPTOM: [Exactly what happens — error message, wrong behavior, missing output]

EXPECTED: [What should happen instead]

ENVIRONMENT: [Browser / Node version, OS if relevant, any recent changes]

RELEVANT CODE: 
\`\`\`typescript
[Paste the relevant function, component, or route handler]
\`\`\`

ERROR OUTPUT:
\`\`\`
[Paste the exact error message and stack trace if available]
\`\`\`

THINGS I'VE ALREADY TRIED:
1. [What you tried and what happened]
2. [What you tried and what happened]

Please:
1. List 3-5 possible root causes, ordered by likelihood
2. For the most likely cause, describe how to verify it definitively
3. Do not suggest the fix until we have verified the cause`,
        },
        {
          type: "heading",
          level: 2,
          text: "Common Debugging Scenarios",
        },
        {
          type: "heading",
          level: 3,
          text: "The Silent Failure",
        },
        {
          type: "paragraph",
          text: "Something should happen and doesn't — no error, just nothing. This is the hardest class of bug because there are no clues. The debugging approach: add logging at every decision point to find where execution stops.",
        },
        {
          type: "code",
          language: "text",
          caption: "Debugging prompt for silent failures",
          code: `The following function is supposed to [describe expected behavior] but nothing 
happens when I call it — no errors, no output.

Add console.log statements at every logical step to help me trace execution:
- Log when the function is called and with what arguments
- Log after each major decision/branch
- Log before and after any async operations
- Log the final return value

\`\`\`typescript
[paste the function]
\`\`\``,
        },
        {
          type: "heading",
          level: 3,
          text: "The Intermittent Bug",
        },
        {
          type: "paragraph",
          text: "Works sometimes, fails sometimes. This is often a race condition, a timing issue, or a state management problem. These require systematic elimination of non-determinism.",
        },
        {
          type: "code",
          language: "text",
          caption: "Intermittent bug prompt",
          code: `This bug happens intermittently — not every time, only sometimes. 
This usually indicates a race condition, a timing issue, or state mutation.

The code in question:
\`\`\`typescript
[paste code]
\`\`\`

Analyze this code for:
1. Race conditions: any async operations that could complete in different orders?
2. Shared mutable state: any variables that could be mutated by concurrent operations?
3. Timing dependencies: any behavior that assumes events happen in a specific order?
4. Event listener cleanup: any listeners that might fire multiple times?`,
        },
        {
          type: "heading",
          level: 2,
          text: "Using AI to Trace Execution",
        },
        {
          type: "paragraph",
          text: "One of the most powerful debugging techniques: ask AI to simulate the execution of your code with specific inputs. Walk through what each line does, what variables contain, and where execution diverges from expectation.",
        },
        {
          type: "code",
          language: "text",
          caption: "Execution tracing prompt",
          code: `Trace the execution of this function step by step when called with these inputs:

Input: { userId: "123", action: "delete", resourceId: "456" }

For each line of code, tell me:
- What the line does
- What value any variables have after this line executes
- Any conditional branches that are taken or skipped

\`\`\`typescript
[paste the function]
\`\`\`

At what point does the execution diverge from what you'd expect for these inputs?`,
        },
        {
          type: "tip",
          title: "Bisect to Find the Bug",
          text: "When a bug is hard to isolate, use git bisect (or a manual binary search approach): find the last known good commit, find the first known bad commit, then systematically narrow down which change introduced the bug. Ask AI: 'Which change in this diff could have introduced [symptom]?' The specific culprit is almost always smaller than you expect.",
        },
        {
          type: "exercise",
          title: "Debug Something Real",
          description:
            "Find a bug in a project you're working on (or introduce one intentionally — commenting out one line of a working feature is a reliable way to create a debuggable bug). Use the complete debugging protocol: write the full context prompt, work through the root cause analysis, verify the cause before fixing, then implement the fix.",
          hints: [
            "The most common mistake in debugging with AI is providing too little context. The debugging protocol forces you to provide enough.",
            "If AI's first root cause hypothesis is wrong, don't abandon the process — work through the list systematically.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "The AI debugging protocol: symptom + expected + environment + code + error + already tried",
            "Three analysis steps: possible causes → verification method → fix only after verified",
            "Silent failures: add logging at every decision point to find where execution stops",
            "Intermittent bugs: analyze for race conditions, shared mutable state, timing dependencies",
            "Execution tracing: ask AI to simulate your code step by step with specific inputs",
          ],
        },
      ],
    },
    {
      id: "4-6",
      title: "Security, Tech Debt, and Continuous Improvement",
      estimatedMinutes: 16,
      content: [
        {
          type: "paragraph",
          text: "Two forces work against software quality over time: security vulnerabilities that accumulate as threat landscapes change and as new code is added, and technical debt that accumulates as quick solutions pile up and the codebase becomes harder to change. AI is exceptionally good at both finding and addressing these issues — but only if you ask it to.",
        },
        {
          type: "heading",
          level: 2,
          text: "The OWASP Top 10: A Security Checklist",
        },
        {
          type: "paragraph",
          text: "The OWASP Top 10 is a regularly updated list of the most critical web application security risks. Every web application should be evaluated against these categories. AI can check your code against each one:",
        },
        {
          type: "list",
          items: [
            "BROKEN ACCESS CONTROL: Users accessing resources they shouldn't — missing authorization checks",
            "CRYPTOGRAPHIC FAILURES: Sensitive data exposed — passwords in plaintext, unencrypted storage, weak encryption",
            "INJECTION: User input used directly in SQL, commands, or evaluators — classic SQL injection, command injection",
            "INSECURE DESIGN: Flawed architecture that cannot be made secure with implementation alone",
            "SECURITY MISCONFIGURATION: Default credentials, unnecessary features enabled, verbose error messages",
            "VULNERABLE COMPONENTS: Outdated libraries with known CVEs in your dependency tree",
            "IDENTIFICATION AND AUTHENTICATION FAILURES: Weak passwords, missing brute-force protection, insecure session management",
            "SOFTWARE AND DATA INTEGRITY FAILURES: Code or data pipelines without integrity checks — supply chain attacks",
            "SECURITY LOGGING AND MONITORING FAILURES: Not detecting, logging, or alerting on security events",
            "SERVER-SIDE REQUEST FORGERY: User-controlled URLs that trigger server-side requests to internal systems",
          ],
        },
        {
          type: "code",
          language: "text",
          caption: "OWASP audit prompt",
          code: `Perform an OWASP Top 10 security audit on this codebase section.

For each OWASP category, evaluate whether this code is:
- SAFE: Properly defended, with a brief explanation of how
- AT RISK: Has a specific vulnerability, with a description of the attack vector
- UNKNOWN: Cannot be evaluated from this code alone, and what additional context is needed

Be specific about vulnerabilities — describe exactly how an attacker could exploit each one.

\`\`\`typescript
[paste the code section]
\`\`\``,
        },
        {
          type: "heading",
          level: 2,
          text: "Dependency Auditing",
        },
        {
          type: "paragraph",
          text: "Your application's security is only as good as its weakest dependency. Outdated packages with known vulnerabilities are one of the most common attack vectors. npm (and similar tools) have built-in audit capabilities:",
        },
        {
          type: "code",
          language: "bash",
          caption: "Dependency security audit",
          code: `# Run a security audit
npm audit

# Show only high and critical severity
npm audit --audit-level=high

# Fix automatically where possible
npm audit fix

# For a full report with remediation suggestions
npm audit --json | [paste output to AI for prioritized remediation plan]`,
        },
        {
          type: "heading",
          level: 2,
          text: "Identifying and Managing Technical Debt",
        },
        {
          type: "paragraph",
          text: "Technical debt is not bad code — it is intentional trade-offs made under time pressure that create future costs. The problem with debt is that it is invisible until it is painful. AI can help surface debt systematically:",
        },
        {
          type: "code",
          language: "text",
          caption: "Technical debt audit prompt",
          code: `Analyze this codebase for technical debt. Categorize findings as:

CRITICAL DEBT: Issues that will cause significant problems in the near term
(e.g., a pattern that breaks when the team grows, a query that will fail at scale)

MEDIUM DEBT: Issues that will slow development and increase bug risk
(e.g., duplicate code, overly complex functions, missing error handling)

LOW DEBT: Cosmetic or convenience issues
(e.g., inconsistent naming, missing documentation, outdated comments)

For each issue:
- What is the current state?
- What is the risk if left unaddressed?
- What is the estimated effort to fix?
- What is the recommended fix approach?

\`\`\`
[paste the code or directory structure]
\`\`\``,
        },
        {
          type: "heading",
          level: 2,
          text: "The Debt Payment Strategy",
        },
        {
          type: "paragraph",
          text: "Addressing technical debt systematically requires a strategy — otherwise it accumulates faster than it's paid down. A practical approach:",
        },
        {
          type: "list",
          items: [
            "Debt register: maintain a list of known debt items with severity and estimated effort. AI can help generate this from a code audit.",
            "Debt payment budget: reserve 20% of each sprint for debt payment. This prevents debt from compounding indefinitely.",
            "Fix-it-while-you're-there: when you touch a function for a feature, fix its debt at the same time. The context switching cost is zero.",
            "Never ship new debt knowingly without logging it: if you make a quick solution intentionally, add a TODO comment with the proper solution described.",
          ],
        },
        {
          type: "insight",
          title: "AI Dramatically Reduces Debt Repayment Cost",
          text: "Technical debt that would take days to pay down manually often takes hours with AI. AI can refactor a 500-line function into well-structured smaller ones, convert a callback-based codebase to async/await, add TypeScript types to an untyped codebase, or extract duplicated code into shared utilities — all tasks that are tedious but straightforward for AI.",
        },
        {
          type: "exercise",
          title: "Security and Debt Audit",
          description:
            "Pick a real project. Run two audits: (1) Ask AI to check it against the OWASP Top 10. (2) Ask AI to identify technical debt by category. For each finding, write a priority (P1/P2/P3) and a one-sentence remediation plan. Then fix at least two findings — choose the highest-impact ones.",
          hints: [
            "Run npm audit alongside the AI audit. The combination of dependency scanning and code analysis gives more complete coverage.",
            "When fixing, use AI to write the fix — that's the whole point. Security fixes should be reviewed carefully even when AI-generated.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "OWASP Top 10 is your security checklist — audit against it explicitly, not generically",
            "Dependency auditing catches vulnerability in your dependency tree — run npm audit regularly",
            "Debt audit: classify as critical/medium/low with risk, effort, and remediation for each",
            "Debt strategy: debt register + payment budget + fix-while-touching + no silent debt",
            "AI makes debt repayment dramatically cheaper — refactors that took days take hours",
          ],
        },
      ],
    },
    {
      id: "4-7",
      title: "Deployment, CI/CD, and Monitoring",
      estimatedMinutes: 15,
      content: [
        {
          type: "paragraph",
          text: "A working application on your local machine is not a product — it is a prototype. A product runs in production, handles real user traffic, recovers from failures, and can be updated without downtime. Closing the gap from prototype to product requires deployment infrastructure, automated quality checks (CI/CD), and ongoing monitoring. AI accelerates all three.",
        },
        {
          type: "heading",
          level: 2,
          text: "Deployment Fundamentals",
        },
        {
          type: "paragraph",
          text: "Modern deployment has two models: managed platforms (Replit, Vercel, Railway, Render) and infrastructure platforms (AWS, GCP, Azure). For most applications — especially early-stage — managed platforms are the right choice. They handle the operations work that distracts from building.",
        },
        {
          type: "list",
          items: [
            "REPLIT DEPLOYMENTS: Zero-config, one click. Best for apps built in Replit. Handles HTTPS, domains, uptime.",
            "VERCEL: Best for frontend-heavy applications. Exceptional performance for static and SSR React/Next.js apps. Auto-deploys from Git.",
            "RAILWAY: Best for full-stack applications with databases. Manages PostgreSQL, Redis, and app containers together.",
            "FLY.IO: Best when you need more control over runtime environment. Docker-based, global edge deployment.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Environment Configuration",
        },
        {
          type: "paragraph",
          text: "Production deployments require managing secrets and configuration that differ between environments. The universal pattern: store configuration in environment variables, never in code. Every deployment platform has a way to set environment variables securely.",
        },
        {
          type: "code",
          language: "bash",
          caption: "Environment validation on startup",
          code: `// src/config.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  STRIPE_SECRET_KEY: z.string().optional(),
});

// This will throw if any required env var is missing or invalid
// Fail fast at startup rather than in the middle of handling a request
export const config = envSchema.parse(process.env);`,
        },
        {
          type: "heading",
          level: 2,
          text: "Setting Up CI/CD with GitHub Actions",
        },
        {
          type: "paragraph",
          text: "CI/CD (Continuous Integration/Continuous Deployment) automates the quality checks that should happen every time code is pushed. A basic CI pipeline: on every push, run tests, run linting, build the app, and report success or failure. A basic CD pipeline: on push to main, if CI passes, deploy automatically.",
        },
        {
          type: "code",
          language: "yaml",
          caption: ".github/workflows/ci.yml — basic CI pipeline",
          code: `name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type check
        run: npm run typecheck
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: \${{ secrets.TEST_DATABASE_URL }}
      
      - name: Build
        run: npm run build`,
        },
        {
          type: "heading",
          level: 2,
          text: "Production Monitoring",
        },
        {
          type: "paragraph",
          text: "Monitoring answers the question: is my application healthy right now? There are three layers of monitoring that every production application needs:",
        },
        {
          type: "list",
          items: [
            "ERROR TRACKING: Capture, aggregate, and alert on application errors. Sentry is the standard choice. It catches uncaught exceptions, records context (user, request, breadcrumbs), and alerts you via email or Slack.",
            "UPTIME MONITORING: Alert when your service is unreachable. Simple tools (UptimeRobot, Better Uptime) ping your health endpoint every minute and alert if it fails.",
            "PERFORMANCE MONITORING: Track response times, database query times, and throughput. Helps identify performance regressions before users notice.",
          ],
        },
        {
          type: "code",
          language: "typescript",
          caption: "Sentry integration for Express",
          code: `import * as Sentry from "@sentry/node";
import express from "express";

const app = express();

// Initialize Sentry before any other middleware
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
});

// Request handler creates a span for each request
app.use(Sentry.Handlers.requestHandler());

// Your routes
app.use('/api', router);

// Error handler must be after routes but before other error handlers
app.use(Sentry.Handlers.errorHandler());

// Custom error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: 'Internal server error' });
});`,
        },
        {
          type: "tip",
          title: "The Structured Logging Habit",
          text: "Structured logging — logging JSON objects instead of strings — makes production debugging dramatically easier. Instead of 'User login failed', log: { level: 'error', event: 'login_failed', userId: req.body.email, reason: 'invalid_password', requestId: req.id }. When something goes wrong in production, structured logs are searchable and filterable. Log strings are just noise.",
        },
        {
          type: "exercise",
          title: "Deploy and Monitor",
          description:
            "Take an app you have built. (1) Set up a deployment to any managed platform of your choice. (2) Add environment variable validation using Zod on startup. (3) Set up Sentry error tracking. (4) Create a /healthz endpoint that returns 200 OK when the app is healthy. (5) Sign up for UptimeRobot to monitor the health endpoint. After completing all five, you have a production-ready deployment.",
          hints: [
            "The health endpoint is required for uptime monitoring and for load balancers. Return: { status: 'ok', timestamp: new Date().toISOString() }.",
            "Test Sentry by throwing a test error and verifying it appears in the Sentry dashboard before relying on it for real errors.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Managed platforms (Replit, Vercel, Railway) are right for most applications — avoid infrastructure work until you need to",
            "Validate environment variables with Zod on startup — fail fast rather than fail in handling a request",
            "CI pipeline: typecheck → lint → test → build on every push",
            "Three monitoring layers: error tracking (Sentry), uptime monitoring, performance monitoring",
            "Structured logging (JSON objects) makes production debugging searchable and filterable",
          ],
        },
      ],
    },
  ],
};
