import type { Module } from "./types";

export const module3: Module = {
  id: "module-3",
  number: 3,
  title: "Prompt Engineering Mastery",
  subtitle: "Prompting Is Your New Syntax",
  description:
    "From basic descriptions to sophisticated chain-of-thought frameworks — master the skill that determines the quality of everything AI builds for you.",
  lessons: [
    {
      id: "3-1",
      title: "Prompting as Your New Syntax",
      estimatedMinutes: 12,
      content: [
        {
          type: "paragraph",
          text: "When programming languages were invented, 'knowing how to code' meant knowing the syntax — the precise grammar rules of the language. A misplaced semicolon caused a syntax error. A wrong keyword caused a compilation failure. Mastering the language meant memorizing its rules.",
        },
        {
          type: "paragraph",
          text: "In the age of AI coding, prompting is your new syntax. The quality of what you produce is directly determined by the quality of your prompts. A vague prompt produces vague output. A precise, contextual, well-structured prompt produces code that is closer to what you actually want, with fewer correction cycles.",
        },
        {
          type: "heading",
          level: 2,
          text: "Why Prompting Is a Learnable Skill",
        },
        {
          type: "paragraph",
          text: "There is a widespread misconception that good prompting is about 'tricking' the AI or finding magic phrases. It is not. Good prompting is about communication — specifically, the kind of communication that transfers intent precisely and leaves little room for misinterpretation. The skills that make someone a good writer, a good technical communicator, or a good manager all contribute to prompt quality.",
        },
        {
          type: "paragraph",
          text: "Like any skill, prompting improves with deliberate practice. The practice loop is short: write a prompt, observe the output, identify what was misunderstood or missing, refine the prompt. Doing this 50 times with the same AI tool teaches you its patterns — what it interprets well, where it makes assumptions, where it needs more context.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Four Dimensions of Prompt Quality",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "SPECIFICITY: Does your prompt give enough information for the AI to produce the right output without guessing? Generic prompts produce generic results. 'Add a button' vs 'Add a primary action button labeled Submit in the bottom-right corner of the form that triggers the handleSubmit function when clicked and shows a loading spinner while the async operation is in progress.'",
            "CONTEXT: Does the AI have the information it needs to make good decisions? Context includes: the tech stack, the user's level, the constraints, what already exists, what has already been tried.",
            "SCOPE: Is the task appropriately sized? Very large tasks in a single prompt produce code that is difficult to validate. Very tiny tasks miss the opportunity for AI to see the bigger picture and make good structural decisions.",
            "FORMAT: Are you specifying the output format when it matters? 'Return a JSON object,' 'add TypeScript types,' 'write tests alongside the implementation' — these formatting instructions dramatically affect usability.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Prompt Length: More Is Not Always Better",
        },
        {
          type: "paragraph",
          text: "A common mistake when learning to prompt is assuming that longer prompts always produce better results. This is not true. Excessively long prompts can obscure the core request, introduce contradictions, and overwhelm the AI with information that is not relevant to the task. The goal is not length — it is precision.",
        },
        {
          type: "tip",
          title: "The One-Sentence Test",
          text: "Before writing a prompt, try to state the core request in one sentence. If you can, that sentence should be the first thing in your prompt. All additional context should support that core sentence. If you cannot state the request in one sentence, you may not have a clear enough goal yet — spend more time clarifying what you actually want before prompting.",
        },
        {
          type: "heading",
          level: 2,
          text: "Prompt Iteration: The Real Skill",
        },
        {
          type: "paragraph",
          text: "The most important prompting skill is not writing perfect first prompts — it is effective iteration. AI tools are designed for multi-turn conversations. The first prompt is a starting point, not a final instruction. Skilled prompters treat the first response as a draft to refine, not a deliverable to accept or reject.",
        },
        {
          type: "list",
          items: [
            "When output is wrong in a specific way: describe exactly what's wrong and what you expected instead",
            "When output is missing something: specify exactly what's missing and where it belongs",
            "When output is structurally off: explain the structural issue and the preferred structure",
            "When you don't know what's wrong but it feels off: describe the feeling and ask the AI to diagnose",
          ],
        },
        {
          type: "exercise",
          title: "The Prompt Quality Ladder",
          description:
            "Write four versions of the same prompt, at increasing quality levels: (1) The vague version — one sentence, no context. (2) The specific version — includes what you want and where it goes. (3) The contextual version — adds stack, constraints, and existing code. (4) The formatted version — specifies output format, error handling, and edge cases. Submit all four and compare the outputs.",
          hints: [
            "Use the same AI tool for all four versions. The goal is to isolate the impact of prompt quality.",
            "Start with something you actually need to build — the practice is more useful when it produces real output.",
            "Document which aspects of the output changed most dramatically between each level.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Prompting is learnable: precision, context, scope, and format are the four dimensions",
            "Prompt quality determines output quality — vague in, vague out",
            "Longer is not always better: the goal is precision, not volume",
            "Iteration is the real skill: use multi-turn conversations to refine toward the right output",
            "The one-sentence test: if you can't state the core request in one sentence, clarify your goal first",
          ],
        },
      ],
    },
    {
      id: "3-2",
      title: "Beginner Prompting: Specificity, Context, and Iteration",
      estimatedMinutes: 14,
      content: [
        {
          type: "paragraph",
          text: "The gap between a beginner's first prompts and their prompts six months later is enormous. Not because beginners are bad at it — they aren't — but because the specific patterns that make prompts effective are not intuitive and require exposure to develop. This lesson codifies those patterns explicitly so you can shortcut the learning curve.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Specificity Upgrade",
        },
        {
          type: "paragraph",
          text: "The most common beginner mistake is insufficient specificity. Compare these two prompts for the same intent:",
        },
        {
          type: "code",
          language: "text",
          caption: "Before and after: specificity upgrade",
          code: `--- VAGUE ---
Build a registration form.

--- SPECIFIC ---
Build a user registration form with these fields:
- First name, Last name (text inputs, required)
- Email (email input, required, must be valid email format)
- Password (password input, required, min 8 characters)
- Confirm password (must match password field)

Behavior:
- Show validation errors inline under each field as the user types
- Disable the Submit button until all fields are valid
- On successful submission, call the handleRegister(data) function
- Show a loading spinner on the Submit button during the async call

Stack: React with react-hook-form and Zod for validation, Tailwind for styling`,
        },
        {
          type: "paragraph",
          text: "The specific prompt takes 30 seconds longer to write and produces an output that requires 80% less correction. The return on investment for specificity is enormous.",
        },
        {
          type: "heading",
          level: 2,
          text: "Providing Context: The Stack, the File, the Function",
        },
        {
          type: "paragraph",
          text: "Context is the information the AI needs to make decisions that fit your situation. Without context, it makes assumptions — sometimes correct, often not. The most important context to provide:",
        },
        {
          type: "list",
          items: [
            "STACK CONTEXT: 'This is a React app using TypeScript, Tailwind, and Zustand for state.' Without this, AI might use class components, plain CSS, and Redux.",
            "FILE CONTEXT: Paste in the relevant file or function the change should integrate with. AI cannot guess your existing code structure.",
            "BEHAVIOR CONTEXT: 'This form submits to the /api/register endpoint which expects { email, password } and returns { userId, token }.'",
            "CONSTRAINT CONTEXT: 'Do not add any new dependencies. Use only what's in the existing package.json.'",
          ],
        },
        {
          type: "code",
          language: "text",
          caption: "Context-rich prompt template",
          code: `CONTEXT:
I'm building [app description]. The stack is [tech stack].
The relevant existing code is:
[paste the function/component/file this change integrates with]

TASK:
[Clear statement of what you want to add or change]

CONSTRAINTS:
- [List any hard constraints: no new dependencies, specific patterns, etc.]
- [Performance requirements if any]
- [Security requirements if any]

OUTPUT FORMAT:
- [TypeScript types required / not required]
- [Tests required alongside implementation / not needed]
- [Comments needed for complex logic / not needed]`,
        },
        {
          type: "heading",
          level: 2,
          text: "The Iteration Protocol",
        },
        {
          type: "paragraph",
          text: "When the first output is not right, the iteration prompt is just as important as the original. Bad iteration prompts ('this doesn't work', 'try again', 'that's wrong') produce bad responses. Effective iteration prompts diagnose the specific problem:",
        },
        {
          type: "list",
          items: [
            "Wrong behavior: 'The form submits even when the email is invalid. The validation should prevent submission if any field has an error.'",
            "Missing feature: 'The loading spinner is missing. Add it to the Submit button: show a spinning icon and disable the button while isLoading is true.'",
            "Wrong structure: 'The component is too large — it should be split into a Form component and separate FieldInput components.'",
            "Performance issue: 'The component re-renders on every keystroke. The expensive calculation on line 42 should be wrapped in useMemo.'",
          ],
        },
        {
          type: "tip",
          title: "Describe the Expected Behavior, Not the Fix",
          text: "When iterating, describe what you expect to happen, not how to fix it. 'The password field should show a strength indicator as the user types — weak (red), medium (yellow), strong (green)' is better than 'add an if/else that checks password length and sets a color.' You don't need to know the fix — the AI does. You need to communicate the intent.",
        },
        {
          type: "heading",
          level: 2,
          text: "Common Beginner Prompt Mistakes",
        },
        {
          type: "list",
          items: [
            "Conflating multiple tasks in one prompt: 'build the form AND add routing AND set up the database' — each task should have its own prompt",
            "Describing the solution instead of the problem: 'add a useState hook' instead of 'the form needs to track whether it has been submitted'",
            "Not specifying the stack: AI defaults to the most common stack (often React + CSS + basic fetch), which may not be what you need",
            "Ignoring error messages: when the AI's code has an error, paste the exact error message into the next prompt — it is essential context",
            "Accepting without testing: always test AI output before accepting it and moving on",
          ],
        },
        {
          type: "exercise",
          title: "The Error Message Exercise",
          description:
            "Build something deliberately simple, run it, and find an error (or introduce one intentionally). Then practice the error iteration loop: paste the exact error message into your AI tool, describe what you were trying to do, and let the AI diagnose and fix it. Repeat 5 times with different types of errors.",
          hints: [
            "Common error types to practice with: missing import, wrong prop type, undefined variable, async/await mistake, CSS layout issue",
            "Always include: the error message, the file and line number, what you were trying to do, and the code around the error",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Specificity is the highest-ROI improvement: 30 seconds more in the prompt, 80% less correction",
            "Context: always specify stack, relevant existing code, behavior, and constraints",
            "Iteration: describe expected behavior, not the fix — let AI determine how",
            "Include the exact error message when iterating on broken code — it is critical context",
            "Common mistakes: conflating tasks, describing solutions not problems, ignoring errors, not testing output",
          ],
        },
      ],
    },
    {
      id: "3-3",
      title: "The RTCFE Framework: Advanced Prompt Architecture",
      estimatedMinutes: 16,
      content: [
        {
          type: "paragraph",
          text: "The RTCFE framework is a structured approach to constructing high-quality prompts for complex tasks. RTCFE stands for Role, Task, Constraints, Format, and Examples. When all five components are present, prompts produce dramatically better output — particularly for multi-step tasks, architectural decisions, and situations where AI needs to make judgment calls.",
        },
        {
          type: "heading",
          level: 2,
          text: "R — Role",
        },
        {
          type: "paragraph",
          text: "The Role component tells the AI what expertise and perspective to adopt when responding. This is not just 'pretend to be X' — it primes the AI to draw on the relevant knowledge and to calibrate the technical depth of its response.",
        },
        {
          type: "code",
          language: "text",
          caption: "Role examples",
          code: `"Act as a senior backend engineer with deep expertise in PostgreSQL 
performance optimization and Node.js architecture."

"You are a security engineer reviewing code for OWASP Top 10 vulnerabilities."

"You are an experienced React developer who specializes in component API design 
and performance optimization."

"You are a DevOps engineer who has designed CI/CD pipelines for production 
Node.js applications at scale."`,
        },
        {
          type: "heading",
          level: 2,
          text: "T — Task",
        },
        {
          type: "paragraph",
          text: "The Task is the core request — what you want done. It should be specific, scoped, and stated upfront. The Task component benefits from being broken into sub-tasks when the request is complex:",
        },
        {
          type: "code",
          language: "text",
          caption: "Task decomposition",
          code: `"Your task is to design and implement a rate limiting middleware for our Express API.

The middleware should:
1. Track requests per IP address using Redis
2. Allow 100 requests per 15 minutes per IP
3. Return HTTP 429 with a Retry-After header when the limit is exceeded
4. Exclude health check endpoints from rate limiting
5. Log rate limit violations with the IP address and timestamp"`,
        },
        {
          type: "heading",
          level: 2,
          text: "C — Constraints",
        },
        {
          type: "paragraph",
          text: "Constraints are the boundaries within which the solution must operate. Without explicit constraints, AI will optimize for the most obvious solution — which may violate important requirements you have but didn't state.",
        },
        {
          type: "list",
          items: [
            "Technology constraints: 'Use ioredis for Redis access. Do not add any other dependencies.'",
            "Performance constraints: 'Redis lookups must be non-blocking and should not add more than 5ms to response time.'",
            "Compatibility constraints: 'Must work with our existing Express 5 middleware chain, applied after cors and before authentication.'",
            "Security constraints: 'IP addresses are sensitive. Never log full IPs in production — log only the first three octets.'",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "F — Format",
        },
        {
          type: "paragraph",
          text: "Format specifies how you want the output structured. This applies both to code output (TypeScript types, JSDoc comments, test coverage) and to explanatory text (bullet points, step-by-step, summary then detail).",
        },
        {
          type: "code",
          language: "text",
          caption: "Format specification examples",
          code: `"Format your response as:
1. A brief explanation of the approach and why you chose it
2. The implementation code with TypeScript types
3. A test file covering: normal operation, rate limit exceeded, Redis failure fallback
4. A usage example showing how to apply the middleware in our app.ts"`,
        },
        {
          type: "heading",
          level: 2,
          text: "E — Examples",
        },
        {
          type: "paragraph",
          text: "Examples are the most powerful component of the RTCFE framework. Showing the AI one or two examples of the pattern you want eliminates an enormous amount of ambiguity. Examples can be: existing code you want the new code to match, input/output pairs demonstrating expected behavior, or analogous implementations from a related feature.",
        },
        {
          type: "code",
          language: "text",
          caption: "Using examples in prompts",
          code: `"Here is our existing authentication middleware for reference — match this style 
and pattern for the rate limiting middleware:

\`\`\`typescript
// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt';
import { logger } from '../lib/logger';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  
  try {
    req.user = await verifyToken(token);
    next();
  } catch (error) {
    logger.error({ error }, 'Token verification failed');
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
\`\`\`

Follow this exact pattern: same import style, same error response format, 
same logging approach, same TypeScript types."`,
        },
        {
          type: "heading",
          level: 2,
          text: "Putting RTCFE Together",
        },
        {
          type: "code",
          language: "text",
          caption: "A complete RTCFE prompt",
          code: `ROLE: You are a senior backend engineer with deep expertise in Express.js 
middleware design and Redis-based caching.

TASK: Implement a rate limiting middleware for our Express API that:
1. Tracks requests per IP using Redis (ioredis)
2. Allows 100 requests per 15 minutes per IP
3. Returns HTTP 429 with Retry-After header when exceeded
4. Excludes /healthz from rate limiting
5. Gracefully degrades if Redis is unavailable (allow all requests, log warning)

CONSTRAINTS:
- Only use ioredis (already in package.json) — no new dependencies
- Non-blocking: must not add more than 5ms to response time
- Follow the exact code style of our existing auth middleware (shown below)
- All errors must use our logger utility, never console.log

FORMAT:
1. Brief explanation of the sliding window algorithm used
2. Implementation in TypeScript with full types
3. Test file with: normal operation, limit exceeded, Redis failure

EXAMPLES:
[paste existing auth.ts middleware]`,
        },
        {
          type: "exercise",
          title: "RTCFE in Practice",
          description:
            "Take a real feature you need to build. Write a complete RTCFE prompt for it: Role, Task (with sub-steps), Constraints (technology, performance, security, style), Format (how you want the output structured), and at least one Example (existing code for the AI to pattern-match). Compare the output to what you would have gotten from a simple description.",
          hints: [
            "The Examples section is usually the most impactful. Find one piece of existing code that represents the style and pattern you want, and paste it in.",
            "Constraints are where most prompts are weakest. For each constraint, ask: would the AI have guessed this without me stating it?",
          ],
        },
        {
          type: "takeaways",
          items: [
            "RTCFE: Role sets expertise, Task defines the request, Constraints set boundaries",
            "Format specifies output structure; Examples are the highest-impact component",
            "Examples eliminate ambiguity better than any amount of description",
            "Constraints protect against AI optimizing for the obvious when you need something specific",
            "A complete RTCFE prompt takes 5 minutes to write and saves 30+ minutes of correction",
          ],
        },
      ],
    },
    {
      id: "3-4",
      title: "Chain-of-Thought and Planning Prompts",
      estimatedMinutes: 15,
      content: [
        {
          type: "paragraph",
          text: "For complex tasks — architectural decisions, multi-step implementations, debugging difficult problems — the single most powerful prompting technique is chain-of-thought: asking the AI to reason step by step before producing an answer. This technique works because AI, like human experts, produces better output when it thinks before it writes.",
        },
        {
          type: "heading",
          level: 2,
          text: "Why Chain-of-Thought Works",
        },
        {
          type: "paragraph",
          text: "AI language models generate text sequentially — each token is influenced by all previous tokens in the response. When a model generates code directly, it has to simultaneously reason about the solution AND produce the output. When it reasons first, all that reasoning becomes context for the implementation. The implementation benefits from having a plan.",
        },
        {
          type: "paragraph",
          text: "Research on chain-of-thought prompting shows measurable improvements in accuracy for complex tasks. For coding, the improvement is most pronounced on tasks that require: multiple files, architectural choices, algorithms that require careful logic, or integration of multiple systems.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Planning Prompt Pattern",
        },
        {
          type: "paragraph",
          text: "The most useful form of chain-of-thought for coding is the planning prompt: ask the AI to produce a plan before it writes any code. Review the plan, correct it if needed, then ask for implementation.",
        },
        {
          type: "code",
          language: "text",
          caption: "The planning prompt pattern",
          code: `I need to implement [feature description].

Before writing any code, create a detailed implementation plan that includes:
1. What files will be created or modified, and why
2. The data model — what data structures are involved
3. The API design — what endpoints or functions are needed
4. The sequence of operations — what happens in what order
5. The error cases — what can go wrong and how it should be handled
6. Any dependencies or integrations with existing code

Only after I approve the plan will we write the actual code.
If you are uncertain about any aspect of the plan, ask before planning.`,
        },
        {
          type: "paragraph",
          text: "After the AI produces the plan, review it critically: does the sequence make sense? Are the data structures correct? Are there any error cases it missed? Correct the plan in the conversation before implementation starts. This is dramatically more efficient than correcting the code after it's been written.",
        },
        {
          type: "heading",
          level: 2,
          text: "Stepwise Thinking for Debugging",
        },
        {
          type: "paragraph",
          text: "When debugging a complex problem, chain-of-thought is especially valuable. Instead of 'why is this broken?', walk the AI through a systematic analysis:",
        },
        {
          type: "code",
          language: "text",
          caption: "Chain-of-thought debugging prompt",
          code: `I have a bug I cannot figure out. Let me describe it and I want you to reason 
through it step by step before suggesting a fix.

SYMPTOM: [Exactly what happens — error message, wrong behavior, etc.]

EXPECTED: [What should happen instead]

RELEVANT CODE:
[paste the relevant functions/components]

THINGS I'VE ALREADY TRIED:
[List what you've tried — prevents the AI from suggesting the same things]

Please:
1. Hypothesize 3 possible root causes
2. Rank them by likelihood with your reasoning
3. For the most likely cause, describe how to verify it with a test
4. Then propose a fix ONLY for the verified cause

Do not jump to the fix — reason through the diagnosis first.`,
        },
        {
          type: "heading",
          level: 2,
          text: "Architecture Planning with Chain-of-Thought",
        },
        {
          type: "paragraph",
          text: "For architectural decisions, chain-of-thought forces the AI to consider tradeoffs explicitly rather than jumping to a default recommendation:",
        },
        {
          type: "code",
          language: "text",
          caption: "Architectural decision prompt",
          code: `I need to decide how to implement [architectural challenge] for our application.

Context: [describe your application, scale, team, constraints]

Please analyze this decision using the following structure:
1. What are the 3 most reasonable approaches to this problem?
2. For each approach, what are the genuine advantages?
3. For each approach, what are the genuine disadvantages and failure modes?
4. What information would change your recommendation between approaches?
5. Given our specific context (above), which do you recommend and why?

Be genuinely analytical — don't just recommend the most popular approach.`,
        },
        {
          type: "insight",
          title: "The Review-Before-Code Discipline",
          text: "The planning prompt pattern requires discipline: you must actually review the plan before approving it. The temptation is to read it quickly and move on. But the plan review is the highest-leverage moment in the process — errors caught here cost zero lines of wrong code. Errors caught in code review cost a rewrite.",
        },
        {
          type: "heading",
          level: 2,
          text: "When NOT to Use Chain-of-Thought",
        },
        {
          type: "paragraph",
          text: "Chain-of-thought adds overhead — an extra turn in the conversation, a plan to review. For simple, well-defined tasks, this overhead is not worth it. Use planning prompts for:",
        },
        {
          type: "list",
          items: [
            "New features that touch multiple files or components",
            "Architectural decisions with significant long-term consequences",
            "Complex debugging where the cause is not obvious",
            "Refactors that change the structure of existing code",
          ],
        },
        {
          type: "paragraph",
          text: "Skip the planning prompt for simple, targeted tasks: fix a specific bug you've diagnosed, add a single field to an existing form, update a specific API endpoint's response format. The task is small enough that a direct implementation prompt is faster.",
        },
        {
          type: "exercise",
          title: "Plan Before You Code",
          description:
            "Take your next non-trivial coding task. Use the planning prompt pattern: ask for the plan first, review it, and make at least one specific correction or clarifying question before approving it for implementation. After implementation, reflect: were there any problems that would have been avoided if you had caught them in the plan phase?",
          hints: [
            "The correction is the point. If the first plan is perfect, you haven't challenged it enough.",
            "Good corrections: 'You're missing the error case where the user is not authenticated.' 'The data flow in step 3 is wrong — the component receives data from the store, not the API directly.'",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Chain-of-thought: force the AI to reason before coding — plans produce better code",
            "The planning prompt: specify files, data model, API design, sequence, error cases before implementation",
            "Review plans critically — errors caught in planning cost zero wrong code",
            "Debugging with chain-of-thought: hypothesize causes, rank likelihood, verify, then fix",
            "Skip planning for simple targeted tasks — the overhead is not worth it for clear, small requests",
          ],
        },
      ],
    },
    {
      id: "3-5",
      title: "Anti-Hallucination Techniques",
      estimatedMinutes: 14,
      content: [
        {
          type: "paragraph",
          text: "AI hallucination — confidently generating false information — is one of the most dangerous properties of language models for software development. A hallucinated function call compiles, runs, and produces no output or an inscrutable error. A hallucinated library version installs the wrong package. A hallucinated API endpoint returns 404 in production. These failures are subtle, hard to diagnose, and costly.",
        },
        {
          type: "paragraph",
          text: "The good news: hallucination is not random. It follows predictable patterns, and there are specific techniques for reducing it. This lesson covers both the patterns (where hallucination is most likely) and the techniques (how to minimize it).",
        },
        {
          type: "heading",
          level: 2,
          text: "Where Hallucination Is Most Common",
        },
        {
          type: "list",
          items: [
            "LIBRARY APIS: AI may generate function calls that don't exist in the library, or exist in an older version that has been deprecated. Always check generated library API calls against documentation.",
            "EXTERNAL APIS: Third-party API signatures change. AI's training data for an API may be months or years old. Authentication flows, endpoint paths, and response shapes all drift.",
            "RECENT FEATURES: AI knowledge has a cutoff date. Features, frameworks, and tools released after that cutoff will be hallucinated or absent.",
            "YOUR SPECIFIC CODEBASE: AI cannot see code it has not been shown. It will hallucinate function names, variable names, and structures that 'should' exist in your codebase based on what it has seen in similar codebases.",
            "CONFIGURATION: Default configuration values, environment variable names, and tool settings are hallucination-prone — these are not prominently featured in training data.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Anti-Hallucination Technique 1: Constrain to Known Libraries",
        },
        {
          type: "paragraph",
          text: "The simplest anti-hallucination technique: explicitly list the libraries the AI is allowed to use, and prohibit anything else. This prevents the AI from introducing dependencies you don't have or using library APIs it is uncertain about.",
        },
        {
          type: "code",
          language: "text",
          caption: "Library constraint prompt",
          code: `Implement the following using ONLY these libraries (already in package.json):
- express@5 for the HTTP layer
- drizzle-orm@0.35 with pg driver for database access
- zod@3 for input validation
- ioredis@5 for Redis

Do NOT use any library not listed above. If you believe an additional library 
is required, ask before proceeding. If you are uncertain about any API from 
these libraries, say so and I will provide the relevant documentation.`,
        },
        {
          type: "heading",
          level: 2,
          text: "Anti-Hallucination Technique 2: Provide Documentation Snippets",
        },
        {
          type: "paragraph",
          text: "When working with a library or API the AI might hallucinate, paste the relevant documentation section directly into the prompt. AI cannot search the web unless explicitly given that capability, so current documentation must come from you.",
        },
        {
          type: "code",
          language: "text",
          caption: "Documentation-anchored prompt",
          code: `I need to implement Stripe webhook verification. Here is the exact code from 
the current Stripe Node.js documentation:

\`\`\`javascript
// From Stripe docs (stripe-node v15)
const event = stripe.webhooks.constructEvent(
  req.body, 
  sig, 
  process.env.STRIPE_WEBHOOK_SECRET
);
\`\`\`

Use this exact pattern for the webhook handler. Do not use any other method 
for webhook verification — constructEvent is the only supported approach.`,
        },
        {
          type: "heading",
          level: 2,
          text: "Anti-Hallucination Technique 3: Explicit Uncertainty Requests",
        },
        {
          type: "paragraph",
          text: "Ask the AI to flag its own uncertainty. This does not eliminate hallucination, but it surfaces cases where the AI is guessing and gives you a signal to verify:",
        },
        {
          type: "code",
          language: "text",
          caption: "Uncertainty flagging prompt",
          code: `Implement the following feature. Important: 
- If you are uncertain about ANY function signature, API endpoint, or library 
  behavior, say "UNCERTAIN:" before that part and explain what you're unsure about
- Do not hallucinate — if you don't know something with confidence, say so
- Only use standard, well-established patterns you know to be correct`,
        },
        {
          type: "heading",
          level: 2,
          text: "Anti-Hallucination Technique 4: Show the Real Code",
        },
        {
          type: "paragraph",
          text: "The most effective technique for codebase-specific hallucinations: show the AI the real code. If you want the AI to use a specific utility function, paste the function. If you want it to follow a specific pattern, paste an example. If you want it to import from a specific path, show the path in existing code.",
        },
        {
          type: "heading",
          level: 2,
          text: "Anti-Hallucination Technique 5: Verify Before Trust",
        },
        {
          type: "paragraph",
          text: "Regardless of techniques used, certain categories of AI output should always be manually verified:",
        },
        {
          type: "list",
          items: [
            "Any import that includes a library you haven't explicitly installed",
            "Any function call from an external library — cross-reference with current docs",
            "Any external API endpoint — verify the current endpoint path and authentication method",
            "Any environment variable name — verify it matches what's actually set",
            "Any security-related code — authentication, authorization, encryption, validation",
          ],
        },
        {
          type: "warning",
          title: "Never Trust Security-Critical Code Blindly",
          text: "Security vulnerabilities in AI-generated code are the highest-stakes hallucination risk. A hallucinated authorization check that seems to work will pass every test but fail in production under specific conditions. All authentication, authorization, and validation code generated by AI should be reviewed line by line by someone who understands the security model.",
        },
        {
          type: "exercise",
          title: "Hallucination Hunting",
          description:
            "Take a recent AI-generated code block (or generate one now). Systematically check it for hallucinations: (1) Look up every library API call in the current documentation. (2) Verify every import exists in your package.json. (3) Trace every function call to see if the function it calls actually exists. (4) Check any external API endpoints against current documentation. Document what you find.",
          hints: [
            "This exercise is most valuable on a task that seemed to work but had subtle bugs. Hallucinations often produce plausible-but-wrong code.",
            "If you find a hallucination, document the pattern so you know to check it in future AI sessions.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Hallucination is predictable: library APIs, external APIs, recent features, and your specific codebase are highest-risk",
            "Constrain AI to a list of known libraries — prevents importing things that don't exist",
            "Paste documentation snippets directly into prompts for APIs you want used correctly",
            "Ask for uncertainty flags — imperfect but surfaces the AI's own uncertainty",
            "Security-critical code must be reviewed line by line — never accept it blindly",
          ],
        },
      ],
    },
    {
      id: "3-6",
      title: "Agentic Workflows: From Prompts to Autonomous Pipelines",
      estimatedMinutes: 17,
      content: [
        {
          type: "paragraph",
          text: "All of the prompting techniques we have covered so far describe a human-in-the-loop workflow: you write a prompt, review the output, write another prompt, repeat. This is the correct default. But as AI tools mature and you build familiarity with their strengths and failure modes, you can extend to agentic workflows — where AI plans and executes multiple steps autonomously, with human review at higher-level checkpoints rather than every step.",
        },
        {
          type: "heading",
          level: 2,
          text: "What Makes a Workflow Agentic",
        },
        {
          type: "paragraph",
          text: "A workflow becomes agentic when the AI has the ability to: (1) plan a sequence of steps, (2) execute those steps using tools (read files, write files, run code, call APIs), and (3) observe results and adapt the plan. This is fundamentally different from generating a single response — an agent persists through a task.",
        },
        {
          type: "list",
          items: [
            "NON-AGENTIC: 'Write me a function that validates emails.' AI produces the function. You copy it.",
            "AGENTIC: 'Add email validation to the registration flow.' AI reads the existing registration code, identifies where validation should be added, writes the validation function, imports it in the right place, writes tests, and runs them to verify everything works.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "High-Level Goals vs Low-Level Instructions",
        },
        {
          type: "paragraph",
          text: "The key skill in agentic workflows is specifying goals at the right level of abstraction. Too low-level ('create a file called validators.ts, import zod, define a function emailSchema...') and you are essentially prompting the implementation yourself. Too high-level ('make the app better') and the AI lacks the specificity to make good decisions.",
        },
        {
          type: "paragraph",
          text: "The sweet spot: specify the end state and the constraints, not the steps. 'Add email validation to the registration form — it should validate format, show errors inline, and prevent submission when invalid. Use zod for validation. Follow the existing form pattern in LoginForm.tsx.' The agent figures out the steps.",
        },
        {
          type: "code",
          language: "text",
          caption: "Effective agentic prompt structure",
          code: `GOAL: [What should be true when this is done]

SUCCESS CRITERIA:
- [Specific, testable outcome 1]
- [Specific, testable outcome 2]
- [Specific, testable outcome 3]

CONSTRAINTS:
- [Hard limits on how the goal can be achieved]

REFERENCE:
- [Files or patterns that show the style/approach to follow]

VERIFICATION:
- Run [specific test command] to verify the implementation
- If tests fail, diagnose and fix before reporting completion`,
        },
        {
          type: "heading",
          level: 2,
          text: "Review Plans Before Execution",
        },
        {
          type: "paragraph",
          text: "The most important safety practice for agentic workflows: ask the agent to show its plan before executing. Once an agent starts executing — writing files, running commands — the changes accumulate quickly and become hard to reverse. Reviewing the plan first catches misunderstandings before they produce a large, complex diff.",
        },
        {
          type: "code",
          language: "text",
          caption: "Plan-first agentic workflow",
          code: `Before you start implementing, give me a numbered plan of exactly what you intend 
to do — which files you'll create, which files you'll modify, and what each change 
will do. Wait for my approval before making any changes.

[Then give the goal and constraints]`,
        },
        {
          type: "heading",
          level: 2,
          text: "Feedback Loops in Agentic Systems",
        },
        {
          type: "paragraph",
          text: "A truly agentic system has a feedback loop: it can observe the results of its actions and adjust. The most powerful version of this in coding tools is run-observe-fix: the agent writes code, runs it, reads the error output, and fixes the error — automatically. Tools like Replit Agent, Cursor Agent, and Claude Code all implement this loop.",
        },
        {
          type: "paragraph",
          text: "To use the feedback loop effectively, you need to give the agent the ability to run code. In Replit, this is automatic. In Cursor Agent mode, enable 'run code' in the agent settings. In Claude Code, the terminal access enables this by default.",
        },
        {
          type: "tip",
          title: "Give Agents Explicit Termination Criteria",
          text: "One failure mode of agentic workflows is loops that never terminate — the agent keeps trying variations without making progress. Include explicit termination criteria: 'If you cannot resolve the error after 3 attempts, stop and describe what you've tried and what you think the root cause is.' This prevents expensive, unproductive loops.",
        },
        {
          type: "heading",
          level: 2,
          text: "Building Multi-Step Pipelines",
        },
        {
          type: "paragraph",
          text: "For complex projects, you can chain agentic sessions: each session has a specific goal, produces a verified output, and the next session builds on it. This is manual multi-agent orchestration — you are the coordinator.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Session 1: Plan the architecture. Output: architecture document, file structure, API contract.",
            "Session 2: Build the backend. Input: architecture doc. Output: working API endpoints with tests.",
            "Session 3: Build the frontend. Input: architecture doc + API contract. Output: working UI.",
            "Session 4: Integration and polish. Input: both outputs + test results. Output: complete application.",
          ],
        },
        {
          type: "exercise",
          title: "Run Your First Agentic Session",
          description:
            "Take a non-trivial feature (something that requires changes to at least 3 files). Write an agentic prompt using the goal/success criteria/constraints structure. First, ask for the plan and review it. Make at least one correction. Then approve and let the agent execute. After it's done, verify the success criteria are met.",
          hints: [
            "Good agentic tasks: 'Add pagination to the user list — 10 items per page, with next/prev navigation, showing current page and total.'; 'Add a search feature to the existing item list — search by name, live filtering as the user types.'",
            "Verify by actually using the feature, not just reading the code.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Agentic: AI plans, executes, and adapts — not just generates a single response",
            "Specify end states and constraints, not steps — let the agent figure out how",
            "Always review the plan before execution — catch misunderstandings before they become large diffs",
            "Feedback loops (run-observe-fix) are the power of agentic systems — enable code execution",
            "Give explicit termination criteria — prevent expensive loops that make no progress",
          ],
        },
      ],
    },
  ],
};
