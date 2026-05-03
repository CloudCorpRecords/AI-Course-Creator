import type { Module } from "./types";

export const module6: Module = {
  id: "module-6",
  number: 6,
  title: "Projects & Practice Path",
  subtitle: "Building Your Way to Mastery",
  description:
    "A concrete progression from your first todo app to production AI-powered systems, with hackathon strategy, project templates, and a framework for measuring your growth.",
  lessons: [
    {
      id: "6-1",
      title: "The Project Ladder: From Todo App to Production SaaS",
      estimatedMinutes: 15,
      content: [
        {
          type: "paragraph",
          text: "The most common mistake in learning any skill is choosing projects that are either too easy (reinforcing what you already know) or too difficult (producing frustration and incomplete work). The project ladder is a structured progression that keeps you in the learning zone: consistently challenged but never overwhelmed. Each level introduces new concepts, new complexity, and new skills — but builds on everything below it.",
        },
        {
          type: "heading",
          level: 2,
          text: "Level 1: The Fundamentals (Week 1–2)",
        },
        {
          type: "paragraph",
          text: "Level 1 projects focus on the basics of the vibe coding loop: describe, build, test, iterate, deploy. The goal is not to build something impressive — it is to complete the loop successfully at least 3 times.",
        },
        {
          type: "list",
          items: [
            "TODO APP: The canonical beginner project. Add a twist to make it interesting — a todo app with priority levels and deadline warnings, or a todo app that generates AI suggested subtasks for each item.",
            "PERSONAL BOOKMARK MANAGER: Save URLs with tags and notes. Search by tag. More interesting than it sounds — teaches you about CRUD, search, and tagging.",
            "RANDOM MEAL PLANNER: User inputs dietary restrictions, app suggests a week of meals with a grocery list. Uses an AI API for the first time.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Level 2: Frontend Depth (Week 3–4)",
        },
        {
          type: "paragraph",
          text: "Level 2 projects push on UI/UX quality. The backend remains simple; the challenge is building interfaces that feel polished and professional.",
        },
        {
          type: "list",
          items: [
            "PERSONAL BLOG: Static content with a good reading experience. Focus on typography, reading time, tag filtering, and RSS. Learn about static site generation.",
            "PORTFOLIO SITE: Your own site with projects, about, and contact. The constraint: it should look better than 90% of developer portfolios you've seen.",
            "HABIT TRACKER: Daily check-ins, streak tracking, visual progress. Focus on micro-interactions — the satisfying 'check' animation, the streak counter.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Level 3: Full-Stack (Week 5–8)",
        },
        {
          type: "paragraph",
          text: "Level 3 introduces the complete backend stack: database, authentication, and real APIs. This is where the advanced workflow (planning → architecture → data model → API contract → implementation) becomes essential.",
        },
        {
          type: "list",
          items: [
            "NOTES APP WITH AUTHENTICATION: Create, organize, search, and share notes. Multi-user with private and public notes. Teaches you the full auth flow.",
            "EXPENSE TRACKER: Track income and expenses, visualize by category, monthly summaries. Introduces data aggregation and charts.",
            "JOB APPLICATION TRACKER: Track applications, interviews, status. Email reminders. A tool you might actually use.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Level 4: Payments and Real Products (Week 9–12)",
        },
        {
          type: "paragraph",
          text: "Level 4 introduces payments — the feature that transforms a project into a potential business. This level requires careful testing because mistakes involve real money.",
        },
        {
          type: "list",
          items: [
            "SUBSCRIPTION SAAS: Any useful tool with a free tier and a paid upgrade. The point is not the tool — it is building the billing flow end to end.",
            "MARKETPLACE: Two-sided marketplace where one party creates and another pays. Introduces payment splitting, escrow, and seller onboarding.",
            "DIGITAL PRODUCT STORE: Sell PDFs, templates, or courses. Simple payment flow, digital delivery, license management.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Level 5: AI-Powered Tools (Week 13–16)",
        },
        {
          type: "paragraph",
          text: "Level 5 integrates AI capabilities — language models, image generation, embeddings — as first-class product features rather than implementation tools.",
        },
        {
          type: "list",
          items: [
            "AI WRITING ASSISTANT: Specialized for a specific domain (legal, marketing, technical). Teach the AI about your domain's conventions and help users write better content.",
            "DOCUMENT ANALYZER: Users upload documents, AI answers questions about them. Teaches you RAG and embedding-based retrieval.",
            "PERSONAL AI AGENT: An AI assistant that can take actions on behalf of the user — sending emails, updating spreadsheets, searching the web. Teaches you tool use and agent architecture.",
          ],
        },
        {
          type: "insight",
          title: "The Twist Rule",
          text: "Every project in the ladder should have a twist — something that makes it different from the canonical example. A todo app with AI-generated subtasks is more interesting than a plain todo app, and the interesting part forces you to learn something genuinely new. Pick your twists based on what you're most curious about.",
        },
        {
          type: "exercise",
          title: "Choose Your Next Project",
          description:
            "Identify which level you are currently at on the project ladder. Choose the next project one level above your current comfort zone. Write a vision document for it (one page: what it does, who uses it, what makes it interesting). Then schedule a specific time to start building. The start is the hardest part.",
          hints: [
            "If you are unsure which level you are at, look at the projects you have completed. The highest level where you have shipped something to production is your current level.",
            "The 'twist' should be driven by your own interests, not what sounds impressive. The projects you care about, you will actually finish.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "The project ladder: fundamentals → frontend depth → full-stack → payments → AI-powered",
            "Stay in the learning zone: one level above current comfort, not two",
            "Each level introduces specific new concepts — build the scaffold, then fill in the novelty",
            "The twist rule: every project needs something that makes it distinct and forces new learning",
            "Ship each project before moving to the next — incomplete projects don't produce real learning",
          ],
        },
      ],
    },
    {
      id: "6-2",
      title: "Building Your First Full-Stack App from Scratch",
      estimatedMinutes: 17,
      content: [
        {
          type: "paragraph",
          text: "This lesson is a hands-on walkthrough of building a complete full-stack application from scratch using everything from this course. We will build a job application tracker: a tool where users can track job applications, interviews, and outcomes. It has authentication, a database, a real API, and a polished UI. By the end, you will have built something you can actually use.",
        },
        {
          type: "heading",
          level: 2,
          text: "Step 1: Vision and Requirements",
        },
        {
          type: "code",
          language: "text",
          caption: "Vision document: Job Application Tracker",
          code: `APP: JobTrack
WHAT IT DOES: Track job applications from first submission to offer/rejection
WHO USES IT: Job seekers managing multiple active applications
THE MAIN THING A USER DOES: Add a new application and update its status as they progress
WHAT MAKES IT INTERESTING: Timeline view of each application + AI-generated interview prep tips

CORE SCREENS:
1. Dashboard: overview of all applications by status (Applied/Interview/Offer/Rejected)
2. Application detail: full history of each application with status updates
3. Add/edit application form
4. Interview prep: AI-generated tips based on company and role

CORE ENTITIES:
- User (id, email, name, created_at)
- Application (id, user_id, company, role, url, status, applied_at, notes)
- StatusUpdate (id, application_id, status, notes, created_at)

REQUIREMENTS:
- Authentication (email/password)
- Data persists across sessions (PostgreSQL)
- Mobile-friendly
- No payment/billing for the initial version`,
        },
        {
          type: "heading",
          level: 2,
          text: "Step 2: Architecture Decisions",
        },
        {
          type: "list",
          items: [
            "STACK: React + TypeScript + Tailwind (frontend), Express + TypeScript (backend), PostgreSQL + Drizzle (database), JWT for auth",
            "STATE MANAGEMENT: React Query for server state (all data from the API), Zustand only for UI state (current user, modals)",
            "API DESIGN: REST with OpenAPI spec. Endpoints: /auth/register, /auth/login, /applications (CRUD), /applications/:id/status-updates",
            "DEPLOYMENT: Railway (manages both the Node.js server and PostgreSQL together)",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Step 3: Database Schema",
        },
        {
          type: "code",
          language: "typescript",
          caption: "Database schema with Drizzle ORM",
          code: `import { pgTable, text, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('application_status', [
  'applied', 'phone_screen', 'technical', 'onsite', 'offer', 'rejected', 'withdrawn'
]);

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const applicationsTable = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  company: text('company').notNull(),
  role: text('role').notNull(),
  url: text('url'),
  status: statusEnum('status').notNull().default('applied'),
  appliedAt: timestamp('applied_at').notNull().defaultNow(),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const statusUpdatesTable = pgTable('status_updates', {
  id: uuid('id').primaryKey().defaultRandom(),
  applicationId: uuid('application_id').notNull()
    .references(() => applicationsTable.id, { onDelete: 'cascade' }),
  status: statusEnum('status').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});`,
        },
        {
          type: "heading",
          level: 2,
          text: "Step 4: The First Build Prompt (for Replit Agent)",
        },
        {
          type: "code",
          language: "text",
          caption: "Complete first build prompt",
          code: `Build a full-stack job application tracker called JobTrack.

TECH STACK:
- Frontend: React 19 + TypeScript + Tailwind CSS + React Query
- Backend: Node.js + Express 5 + TypeScript
- Database: PostgreSQL (use the built-in Replit database)
- Auth: JWT tokens stored in httpOnly cookies

DATABASE SCHEMA:
[paste the schema from Step 3]

FEATURES TO BUILD:
1. AUTH: Register with email/name/password, login, logout. 
   Protect all non-auth routes. Redirect unauthenticated users to /login.

2. DASHBOARD: Show all applications grouped by status. 
   Include counts per status. Quick "add new" button.

3. APPLICATION LIST: Searchable list. Filter by status. 
   Each row shows company, role, status, and days since applied.

4. APPLICATION DETAIL: Full application info + timeline of all status updates.
   "Update status" button opens a dialog with the new status + notes.

5. ADD/EDIT FORM: Company, role, job URL, initial notes. Date defaults to today.

DESIGN REQUIREMENTS:
- Clean, professional design. Color palette: slate/indigo.
- Mobile-friendly.
- Empty states: show helpful messages when there are no applications.
- Loading states: show skeletons while data loads.

Include 3 example applications in the seed data so I can see 
how it looks with real content.`,
        },
        {
          type: "heading",
          level: 2,
          text: "Step 5: Testing Checklist",
        },
        {
          type: "list",
          items: [
            "Register a new user → lands on dashboard",
            "Add a new application → appears in the list immediately",
            "Update application status → timeline shows the new status",
            "Search for an application by company name → filter works",
            "Log out → cannot access protected routes",
            "Log back in → data is still there",
            "View on mobile → no broken layout",
            "Add application with missing required fields → shows validation errors",
          ],
        },
        {
          type: "tip",
          title: "Test With a Second User Account",
          text: "Create two separate user accounts and verify that User A cannot see User B's applications. This is the authorization test that many developers skip — and the one that most commonly reveals security gaps in early builds.",
        },
        {
          type: "exercise",
          title: "Build JobTrack",
          description:
            "Use this lesson as a template to build JobTrack (or a variant with a twist you find more interesting). Follow the steps exactly: vision doc, architecture decisions, schema first, build prompt, test checklist. Complete the full cycle and deploy it. Then use it for your actual job search for one week and note what you wish it did differently — those are the features for version 2.",
          hints: [
            "If the build prompt produces a first version that's 70% right, that's a success. Iterate from there.",
            "The authorization test (two user accounts) is not optional. Do it before you use this app with real data.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Full-stack development follows a sequence: vision → architecture → schema → build → test → deploy",
            "The schema is the foundation — get it right before writing any application code",
            "Include seed data in the first build — seeing real content reveals UX issues that an empty state hides",
            "Test checklist: complete the core loop, test auth/authz, test mobile, test validation",
            "The authorization test (multi-user) is the most commonly skipped and most important test",
          ],
        },
      ],
    },
    {
      id: "6-3",
      title: "Hackathon Strategy: The Turcios Playbook",
      estimatedMinutes: 16,
      content: [
        {
          type: "paragraph",
          text: "Hackathons are the most compressed, high-feedback learning environments available to builders. In 24–48 hours, you go from idea to demo — with real judges, real competition, and real stakes. Rene Turcios has won prizes at hundreds of hackathons, and his playbook is studied by serious builders. This lesson extracts the transferable principles from his approach.",
        },
        {
          type: "heading",
          level: 2,
          text: "Pre-Hackathon Preparation",
        },
        {
          type: "paragraph",
          text: "Most teams show up to hackathons with no preparation and spend the first 2-3 hours on setup and ideation. The winning teams have done work before the event starts:",
        },
        {
          type: "list",
          items: [
            "STACK MASTERY: Have one stack you can bootstrap instantly. Turcios uses Replit because he can go from zero to running app in under 5 minutes. You should have the same.",
            "TEMPLATE LIBRARY: Maintain a personal library of starting points — a full-stack template with auth, a landing page template, an API template. Do not build from scratch under time pressure.",
            "DOMAIN KNOWLEDGE: The best hackathon ideas come from pain points you understand deeply. Before any hackathon, identify 5-10 problems you could solve with software.",
            "JUDGE RESEARCH: Who are the judges? What do they care about? Technical sophistication, market potential, design quality? Optimize for your judges.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The First Hour: Idea Selection",
        },
        {
          type: "paragraph",
          text: "The idea selection process should take no more than 60 minutes. The Turcios criterion for a good hackathon idea:",
        },
        {
          type: "list",
          items: [
            "DEMOMABLE: Can you show it working in a 3-minute demo? If the idea requires 10 minutes of context before the demo makes sense, it's the wrong idea for a hackathon.",
            "TECHNICALLY FEASIBLE: Can you build a meaningful version in the time available? 24-hour hackathon ideas should have a working core in 6-8 hours, leaving time for polish and unexpected problems.",
            "GENUINELY INTERESTING: The best demos create an 'I want that' reaction in judges. Does this idea create that reaction?",
            "DIFFERENTIABLE: Is there something specific about your approach that competitors won't have? A unique dataset, a specific domain insight, a technology integration?",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The Build Phase: Speed First",
        },
        {
          type: "paragraph",
          text: "In a hackathon, perfectionism is the enemy. The building strategy:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "WORKING IN 2 HOURS: Get the core feature working in the first 2 hours. Not polished, not full-featured — working. This is your safety net if everything else goes wrong.",
            "FEATURES BY DEMO IMPACT: Add features in order of demo impact, not technical logic. What will make the biggest impression on judges in a 3-minute demo?",
            "AVOID OVER-ENGINEERING: No complex architecture, no premature optimization. Prototype-quality code is fine for a hackathon.",
            "HAVE BACKUP DATA: If your feature might fail live, prepare a version that works with static/mock data. Live demos failing is one of the most common hackathon failure modes.",
          ],
        },
        {
          type: "code",
          language: "text",
          caption: "24-hour hackathon timeline",
          code: `HOUR 0-1: Idea selection and team alignment
HOUR 1-3: Setup and core feature skeleton
HOUR 3-8: Core feature working end-to-end (sleep checkpoint)
HOUR 8-16: Additional features by demo impact
HOUR 16-20: UI polish and error handling
HOUR 20-22: Demo preparation and practice
HOUR 22-24: Buffer for unexpected issues
SUBMISSION: Working, stable, demoed`,
        },
        {
          type: "heading",
          level: 2,
          text: "The Demo: Storytelling Over Features",
        },
        {
          type: "paragraph",
          text: "The demo is as important as the build — arguably more important. A mediocre product with a great demo beats a great product with a mediocre demo almost every time. The Turcios demo playbook:",
        },
        {
          type: "list",
          items: [
            "START WITH THE PROBLEM: 30 seconds on why this matters. Make it visceral — a story, a statistic, a personal experience.",
            "DEMO THE MAGIC MOMENT: Every great product has a moment where someone thinks 'wow, that's clever.' Get to that moment within 60 seconds of starting the demo.",
            "SHOW THE HAPPY PATH ONLY: Never demo a broken feature. Never explore the UI while the judges watch. Know exactly what you will click and in what order.",
            "END WITH SCALE: Close with a sentence about where this goes. Not a 10-year vision — a believable next step that makes judges excited.",
          ],
        },
        {
          type: "insight",
          title: "The Hackathon as Learning Accelerant",
          text: "Turcios frames hackathons not primarily as competitions but as compressed learning environments. In 24 hours, you learn more about what it takes to build and demo something real than in weeks of isolated practice. Even if you don't win, the experience of trying to ship something complete under time pressure is irreplaceable. Enter hackathons to learn, not to win — winning follows.",
        },
        {
          type: "exercise",
          title: "Run a Personal Hackathon",
          description:
            "Block a Saturday from 9am to 9pm (12 hours). Pick an idea the night before. Build and deploy a working app during those 12 hours. At 9pm, record a 3-minute demo video as if you were presenting to judges. Watch the video and evaluate: would you vote for this? What was the 'magic moment'?",
          hints: [
            "The constraint is the point. 12 hours is enough to build something real if you stay focused.",
            "If you get stuck, use the AI debugging protocol rather than thrashing. Describe the exact error and iterate.",
            "The demo video is non-negotiable. The act of recording it shows you immediately what the weak points of your demo are.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Pre-hackathon: master one stack, maintain templates, identify pain points, research judges",
            "Idea selection criteria: demoable, feasible, interesting, differentiable",
            "Build strategy: working core in 2 hours, add features by demo impact, avoid over-engineering",
            "Demo: problem → magic moment → happy path only → believable scale",
            "Hackathons are compressed learning — enter to learn, not to win; winning follows learning",
          ],
        },
      ],
    },
    {
      id: "6-4",
      title: "AI-Powered Tools and Agent Systems",
      estimatedMinutes: 18,
      content: [
        {
          type: "paragraph",
          text: "The previous project levels focused on building conventional software with AI assistance. This level is different: the product you are building IS an AI system. You are not using AI to write code — you are building something that uses AI as a core component of its value proposition. This is the frontier of product development and represents enormous opportunity.",
        },
        {
          type: "heading",
          level: 2,
          text: "Categories of AI-Powered Products",
        },
        {
          type: "list",
          items: [
            "AI WRITING TOOLS: Specialized for a domain — legal, medical, marketing, technical. The AI's training is general; the product's value is in the domain-specific prompts, the UI workflow, and the community of practitioners who use it.",
            "DOCUMENT INTELLIGENCE: Extract, summarize, query, and act on document contents. Contracts, financial reports, research papers, emails. Combines PDF parsing with RAG.",
            "WORKFLOW AUTOMATION: Connect AI to actions — send emails, update databases, create calendar events, post to social media. The AI decides what to do; the integrations make it real.",
            "DATA ANALYSIS: Natural language queries over structured data. 'Show me sales by region for Q3' translates to SQL, runs against the database, and returns a visualization.",
            "PERSONALIZED AI AGENTS: Agents that learn user preferences over time and take on recurring tasks autonomously.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Building a RAG Application",
        },
        {
          type: "paragraph",
          text: "Retrieval-Augmented Generation (RAG) is the pattern behind most practical AI document intelligence applications. A user uploads documents, the documents are chunked and embedded, embeddings are stored in a vector database, and user questions are answered by retrieving the most relevant chunks and passing them to a language model.",
        },
        {
          type: "code",
          language: "typescript",
          caption: "RAG pipeline implementation outline",
          code: `// 1. Document ingestion
async function ingestDocument(file: File, userId: string) {
  // Parse text from PDF/docx/txt
  const text = await extractText(file);
  
  // Split into overlapping chunks (1000 chars, 200 char overlap)
  const chunks = splitIntoChunks(text, { size: 1000, overlap: 200 });
  
  // Generate embeddings for each chunk
  const embeddings = await Promise.all(
    chunks.map(chunk => generateEmbedding(chunk))
  );
  
  // Store chunks + embeddings in vector database (e.g., pgvector, Pinecone)
  await vectorDb.upsert(
    embeddings.map((embedding, i) => ({
      id: generateId(),
      userId,
      documentId: file.name,
      content: chunks[i],
      embedding,
    }))
  );
}

// 2. Query answering
async function answerQuestion(question: string, userId: string) {
  // Generate embedding for the question
  const questionEmbedding = await generateEmbedding(question);
  
  // Retrieve the most relevant chunks
  const relevantChunks = await vectorDb.similaritySearch({
    embedding: questionEmbedding,
    userId,
    limit: 5,
  });
  
  // Generate an answer using the context
  const answer = await llm.complete({
    messages: [
      { role: 'system', content: 'Answer questions based on the provided context.' },
      { role: 'user', content: \`Context:\n\${relevantChunks.join('\n\n')}\n\nQuestion: \${question}\` }
    ]
  });
  
  return answer;
}`,
        },
        {
          type: "heading",
          level: 2,
          text: "Building an Agent with Tool Use",
        },
        {
          type: "paragraph",
          text: "Tool use (also called function calling) allows AI to execute actions, not just generate text. The AI receives a list of available tools with descriptions and parameters. It decides which tools to call, in what order, and how to use the results to answer the user's request.",
        },
        {
          type: "code",
          language: "typescript",
          caption: "Agent with tool use (Claude API pattern)",
          code: `const tools = [
  {
    name: "search_web",
    description: "Search the web for current information",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "The search query" }
      },
      required: ["query"]
    }
  },
  {
    name: "send_email",
    description: "Send an email to a specified recipient",
    input_schema: {
      type: "object",
      properties: {
        to: { type: "string", description: "Recipient email address" },
        subject: { type: "string" },
        body: { type: "string" }
      },
      required: ["to", "subject", "body"]
    }
  }
];

// Agentic loop
async function runAgent(userMessage: string) {
  const messages = [{ role: 'user', content: userMessage }];
  
  while (true) {
    const response = await claude.messages.create({ 
      model: 'claude-3-5-sonnet-20241022',
      tools, 
      messages 
    });
    
    // If the model is done, return the result
    if (response.stop_reason === 'end_turn') {
      return extractTextContent(response);
    }
    
    // Execute tool calls
    const toolResults = await Promise.all(
      response.content
        .filter(block => block.type === 'tool_use')
        .map(async (toolCall) => {
          const result = await executeTool(toolCall.name, toolCall.input);
          return { type: 'tool_result', tool_use_id: toolCall.id, content: result };
        })
    );
    
    // Add the model's response and tool results to the conversation
    messages.push({ role: 'assistant', content: response.content });
    messages.push({ role: 'user', content: toolResults });
  }
}`,
        },
        {
          type: "heading",
          level: 2,
          text: "Responsible AI Product Development",
        },
        {
          type: "paragraph",
          text: "Building products that use AI as a core component introduces specific responsibilities that conventional software does not have:",
        },
        {
          type: "list",
          items: [
            "ACCURACY: AI can generate confident falsehoods. Products must be designed with guardrails — clearly marking uncertain outputs, showing sources, allowing user verification.",
            "BIAS: AI models reflect patterns in their training data, which can include societal biases. If your product makes decisions that affect people, audit for bias systematically.",
            "SAFETY: Products with agent capabilities can take actions. Implement confirmation requirements for consequential actions. Let users review and approve before execution.",
            "TRANSPARENCY: Users should know they are interacting with AI, what data is used, and how decisions are made.",
            "COST CONTROL: LLM API costs can escalate unexpectedly. Implement per-user rate limiting, usage dashboards, and cost alerts before costs exceed revenue.",
          ],
        },
        {
          type: "warning",
          title: "The Agentic Action Risk",
          text: "Agents that can take actions in the real world (send emails, make purchases, modify files, call APIs) need careful safety design. A confused agent that takes the wrong action can cause real harm. Always design for: confirmation requirements for irreversible actions, easy undo for reversible ones, clear audit logs of every action taken, and the ability to pause or disable the agent.",
        },
        {
          type: "exercise",
          title: "Build a Simple RAG App",
          description:
            "Build a document Q&A application: users upload a PDF (or paste text), and can then ask questions about it. Use any AI provider with an API (Anthropic, OpenAI, or Gemini). Store embeddings in a simple in-memory vector store for the first version (not a database — just an array of {text, embedding} objects). Answer questions by finding the most similar chunks. Deploy it.",
          hints: [
            "For embedding generation, use text-embedding-3-small (OpenAI) or voyage-3-lite (Voyager, via Anthropic). Both are cheap and fast.",
            "Cosine similarity is the standard distance metric for embeddings — several libraries implement it, or you can implement it yourself in 3 lines of math.",
            "Start with text pasting (skip file parsing). Get the Q&A working first, then add PDF parsing as a second step.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "AI-powered products use AI as a core component of the value proposition, not just as an implementation tool",
            "RAG pattern: chunk → embed → store → retrieve → generate — the backbone of document intelligence",
            "Tool use (function calling) enables agents to take actions, not just generate text",
            "Responsible AI: accuracy guardrails, bias auditing, action confirmation, transparency, cost control",
            "Agents with real-world actions need confirmation, undo, audit logs, and pause capability",
          ],
        },
      ],
    },
    {
      id: "6-5",
      title: "Measuring Progress and Shipping in Public",
      estimatedMinutes: 13,
      content: [
        {
          type: "paragraph",
          text: "The final lesson addresses two things that most builders systematically underinvest in: measuring your own progress (so you know you're improving, not just busy) and shipping in public (so you get real feedback, real users, and real accountability). Both feel uncomfortable. Both compound massively.",
        },
        {
          type: "heading",
          level: 2,
          text: "What Progress Looks Like",
        },
        {
          type: "paragraph",
          text: "Progress in AI-assisted development is multidimensional. Tracking only 'what I built' misses the skill improvements that make future building faster and better. Track these dimensions:",
        },
        {
          type: "list",
          items: [
            "TIME TO MVP: How long does it take you to go from idea to deployed working app? This should decrease. Track it for every project.",
            "FIRST-PASS QUALITY: Of the last 10 AI-generated code blocks you used, how many required significant correction? This should decrease as your prompting improves.",
            "REVIEW CONFIDENCE: When you review AI-generated code, how confident are you in catching issues? This improves with deliberate practice.",
            "SCOPE ACCURACY: How close are your initial effort estimates to actual effort? This improves as you develop better intuitions about complexity.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The Shipping in Public Mindset",
        },
        {
          type: "paragraph",
          text: "Building in public means sharing your work, process, and learnings openly — on Twitter/X, on a blog, in a Discord community, or at a local meetup. This practice feels vulnerable, especially before you have something impressive to show. Do it anyway, and do it before you think you are ready.",
        },
        {
          type: "paragraph",
          text: "The benefits of building in public are not primarily about audience or attention. They are about accountability (you ship things when people know about them), feedback (early users find problems you would not have found alone), and connections (other builders find you and offer collaboration, advice, and opportunities).",
        },
        {
          type: "quote",
          text: "The best marketing for a product is a founder who shares the build process honestly — including the failures.",
          attribution: "Common wisdom in the indie hacker / build-in-public community",
        },
        {
          type: "heading",
          level: 2,
          text: "How to Share Without Being Annoying",
        },
        {
          type: "paragraph",
          text: "The reason most people avoid building in public is they fear being promotional or irrelevant. The solution: share process, not just product.",
        },
        {
          type: "list",
          items: [
            "Share a mistake you made and what you learned from it",
            "Share a specific prompting technique that worked especially well",
            "Share a 'build log' — what you built today, what you learned",
            "Share a question you're wrestling with — ask for help",
            "Share a tool or technique you discovered",
            "Share the link to a project you deployed — even if it's rough",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The Learning Document Practice",
        },
        {
          type: "paragraph",
          text: "After every significant project or learning cycle, write a short learning document. This is not a portfolio piece or a blog post — it is a private or semi-private reflection that captures what you learned while it is still fresh. Over time, this becomes your personal knowledge base for AI-assisted development.",
        },
        {
          type: "code",
          language: "text",
          caption: "Learning document template",
          code: `PROJECT/CYCLE: [Name]
DATE: [Date]

WHAT I BUILT:
[2-3 sentences]

AI TOOLS USED AND FOR WHAT:
- [Tool]: [What I used it for]
- [Tool]: [What I used it for]

WHAT WORKED WELL:
- [Specific thing]
- [Specific thing]

WHAT DIDN'T WORK:
- [Specific problem and why]

WHAT I WOULD DO DIFFERENTLY:
- [Specific change]

KEY LEARNINGS (things I now know that I didn't know before):
- [Learning]
- [Learning]

NEXT: [What I'm building next and what I'll experiment with]`,
        },
        {
          type: "heading",
          level: 2,
          text: "The Community Multiplier",
        },
        {
          type: "paragraph",
          text: "Solo building is powerful. Building within a community is more powerful. Communities for AI-assisted builders that are worth joining as of 2026:",
        },
        {
          type: "list",
          items: [
            "Replit Discord and forums: active community of builders ranging from beginners to professionals",
            "Cursor Discord: high-signal discussion of advanced AI coding techniques",
            "Indie Hackers: the original build-in-public community, especially strong for SaaS builders",
            "Hackathon communities: SF, NYC, and other tech hub hackathon scenes",
            "Twitter/X #buildinpublic: the largest build-in-public community, noisy but valuable",
          ],
        },
        {
          type: "tip",
          title: "Give Before You Take",
          text: "The most effective community participation strategy: before asking for help or attention, spend time helping others. Answer questions in Discord. Give feedback on other people's builds. Share your knowledge generously. Communities reward contributors. The ratio of giving to taking that produces the best results is roughly 10:1.",
        },
        {
          type: "exercise",
          title: "Your First Public Post",
          description:
            "Write your first build-in-public post about something you have built or learned in this course. Choose a platform (Twitter, a blog, Indie Hackers, or the Replit community). Share something specific and honest: a project you built, a technique that worked, a mistake you made and what you learned. Post it. Then share the link in one relevant community. Do this once a week for the next month.",
          hints: [
            "The first post is the hardest. The discipline of posting consistently matters more than the quality of any individual post.",
            "If you have nothing to share yet, share that you are learning AI-assisted development and what you are working on. Beginners sharing their journey is genuinely interesting and relatable.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Track multidimensional progress: time to MVP, first-pass quality, review confidence, scope accuracy",
            "Build in public: accountability, feedback, connections — all compound over time",
            "Share process not just product: mistakes, learnings, questions, techniques are more valuable than launch announcements",
            "The learning document: private reflection after every project, becomes your personal knowledge base",
            "Community multiplier: give before you take, 10:1 contribution ratio produces the best outcomes",
          ],
        },
      ],
    },
  ],
};
