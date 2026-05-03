import type { Module } from "./types";

export const module1: Module = {
  id: "module-1",
  number: 1,
  title: "Mindset Shift",
  subtitle: "Vibe Coding & First Principles",
  description:
    "Unlearn the assumption that you must master syntax before building. This module introduces vibe coding, first-principles thinking, and why hustle + iteration beats perfection in the AI age.",
  lessons: [
    {
      id: "1-1",
      title: "What Is Vibe Coding? The New Paradigm",
      estimatedMinutes: 12,
      content: [
        {
          type: "paragraph",
          text: "In 2025, Andrej Karpathy — one of the founding fathers of modern deep learning and a former director of AI at Tesla — posted a now-famous observation: he had started building software by describing what he wanted in plain English and letting AI handle the rest. He called it 'vibe coding.' The term caught fire immediately, but the practice had already been pioneered in hackathon circles by builders like Rene Turcios, who had been winning SF hackathons for years using exactly this approach — no traditional coding skills required.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Old Mental Model",
        },
        {
          type: "paragraph",
          text: "For decades, the barrier to building software was syntax. You had to learn the precise grammar of a programming language — its keywords, its semicolons, its indentation rules — before you could express even the simplest idea. Learning to code meant years of study before you could ship anything meaningful. The skill of programming was inseparable from the ability to remember and reproduce machine-readable syntax.",
        },
        {
          type: "paragraph",
          text: "This model made sense when computers were unforgiving: a misplaced bracket crashed everything. But AI systems trained on billions of lines of code can now translate human intent into working programs with remarkable accuracy. The bottleneck has shifted from 'can you write the syntax?' to 'can you describe the idea clearly?'",
        },
        {
          type: "heading",
          level: 2,
          text: "What Vibe Coding Actually Means",
        },
        {
          type: "paragraph",
          text: "Vibe coding is not about being lazy or producing low-quality software. It is about radically reordering the skill stack. Instead of asking 'how do I write a function that does X?' you ask 'what am I actually trying to build, and can I describe it precisely enough for an AI to understand?' The vibe is the vision — the feel, the intention, the goal — and the AI translates that vibe into working code.",
        },
        {
          type: "insight",
          title: "The Rene Turcios Definition",
          text: "Turcios' approach: describe the app you want in plain English, click build, test in the browser, describe the fix you need, repeat. The entire loop from idea to working prototype can take minutes. He has won prizes at hundreds of SF-area hackathons using this exact pattern — no CS degree, no years of syntax study, just clear thinking and fast iteration.",
        },
        {
          type: "paragraph",
          text: "Consider a concrete example. In the old model, building a web app where users can upload an audio file and convert it to lo-fi beats would require: setting up a Node.js server, understanding multipart form data, learning an audio processing library, writing frontend JavaScript, deploying to a cloud provider, and debugging each layer. Total time: days or weeks.",
        },
        {
          type: "paragraph",
          text: "In the vibe coding model: open Replit, type 'Build a web app where users upload an MP3, and the app converts it to a lo-fi version with vinyl crackle and slowed tempo. Include a waveform visualizer and a download button.' Press enter. The AI scaffolds the entire application. You test it, describe what's broken, and the AI fixes it. Total time: hours.",
        },
        {
          type: "heading",
          level: 2,
          text: "What Changed to Make This Possible",
        },
        {
          type: "paragraph",
          text: "Three things converged around 2024–2025 to make vibe coding genuinely viable: (1) Large language models reached a level of code generation quality that was 'good enough' for real applications, not just toy examples. (2) Agentic tools — systems where AI can not only write code but also run it, see the output, and iterate — became mainstream. (3) Cloud infrastructure became so abstracted that deployment no longer required infrastructure expertise.",
        },
        {
          type: "list",
          items: [
            "Modern LLMs can write production-quality React, Python, and SQL on the first attempt for most common patterns",
            "Agentic IDEs (Replit, Cursor, Claude Code) can run code, read errors, and self-correct in loops",
            "Deployment is often one click — Vercel, Replit, Railway handle the infrastructure",
            "Testing is integrated — you can describe what to test and the AI writes and runs the tests",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The Skill That Remains — and Grows More Valuable",
        },
        {
          type: "paragraph",
          text: "Here is the counterintuitive truth: as AI handles more syntax, human judgment becomes more valuable, not less. Someone has to decide what to build, why it matters, and whether the AI's output actually solves the problem. Someone has to validate the edge cases, make architecture decisions, and know when the AI is confidently wrong. These meta-skills — vision, judgment, decomposition, validation — are what vibe coding is really about developing.",
        },
        {
          type: "tip",
          title: "Vibe Coding Is a Starting Point, Not an End State",
          text: "For beginners, vibe coding is the on-ramp: build something real before you fully understand how it works, then learn by poking at it. For veterans, it is an amplifier: you provide architectural judgment and domain knowledge, the AI handles implementation speed. Both paths lead to the same place — shipping faster with higher leverage.",
        },
        {
          type: "exercise",
          title: "Your First Vibe-Coded App",
          description:
            "Open Replit (replit.com). Click 'Create Repl', then select 'AI Agent'. Describe an app you have actually wanted to exist — something simple but real. A habit tracker with a specific twist, a tool for a hobby, a mini-game. Don't describe the technology. Describe the experience. Press build and let it run.",
          hints: [
            "Focus on what the app does, not how it works. 'A todo app where each item has a priority color' not 'a React app with useState.'",
            "Let it finish fully before you start poking. Resist the urge to intervene mid-generation.",
            "When it's done, test it by actually trying to use it. Note every moment of friction.",
            "In a notes file, write down: what worked immediately, what was broken, what was missing.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "Vibe coding shifts the bottleneck from syntax to vision and description clarity",
            "The practice was pioneered in hackathons before Karpathy named it — results were real and competitive",
            "AI handles translation from intent to code; humans handle intent, judgment, and validation",
            "The skill that remains most valuable is clear thinking about what you want to build and why",
            "Start by building something real, even if you don't understand every line it generates",
          ],
        },
      ],
    },
    {
      id: "1-2",
      title: "The Rene Turcios Method: Ship First, Refine Later",
      estimatedMinutes: 14,
      content: [
        {
          type: "paragraph",
          text: "Rene Turcios is, by any objective measure, one of the most prolific builders in San Francisco's startup ecosystem. Without a traditional software engineering background, he has won prizes at hundreds of hackathons — events where teams typically include experienced engineers building for 24–48 hours straight. His secret is not a shortcut. It is a disciplined methodology that most trained engineers are too proud (or too afraid) to adopt: ship first, validate second, refine third.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Core Loop",
        },
        {
          type: "paragraph",
          text: "The Turcios method is fundamentally a tight feedback loop between human vision and AI execution. It looks simple on paper but requires genuine discipline to execute:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Define the vision clearly in 2-3 sentences — what does this app do, who uses it, what's the one thing that makes it interesting",
            "Prompt the AI to build a working version — not a wireframe, not a mockup, a running application",
            "Test it immediately in the browser or on a real device",
            "Note every broken thing, every missing feature, every awkward interaction",
            "Prompt the AI to fix each issue, one at a time",
            "Deploy early, get it in front of a real person within hours",
            "Repeat based on real feedback, not imagined edge cases",
          ],
        },
        {
          type: "insight",
          title: "The Hackathon Mindset in Everyday Building",
          text: "Hackathons enforce constraints that most professional development ignores: you ship in 24 hours or you don't ship at all. Turcios has internalized this constraint as a permanent operating mode. Every project has a 'hackathon phase' — the sprint to something real and demo-able — even if refinement comes later. Most professional projects die in planning. Turcios' projects ship.",
        },
        {
          type: "heading",
          level: 2,
          text: "Why 'Good Enough' Is Often Better Than Perfect",
        },
        {
          type: "paragraph",
          text: "There is a pathology common in software teams: endless refinement of something no one has validated. Engineers polish a feature for weeks before showing it to users, only to learn that users want something completely different. The cost of this mistake is enormous — not just the time spent building the wrong thing, but the opportunity cost of not building the right thing.",
        },
        {
          type: "paragraph",
          text: "Vibe coding with a ship-first methodology dramatically compresses the feedback loop. If you can get a working prototype in front of a real user within hours instead of weeks, you get real information about what matters before you've invested significant time. The rough edges don't matter if the core concept is wrong. And if the core concept is right, the rough edges can be fixed.",
        },
        {
          type: "quote",
          text: "The most dangerous product is one that was built carefully but for the wrong purpose. The most valuable product is one that exists.",
          attribution: "First-principles axiom from the lean startup tradition",
        },
        {
          type: "heading",
          level: 2,
          text: "Hustle as a Competitive Moat",
        },
        {
          type: "paragraph",
          text: "Turcios' competitive advantage in hackathons is not that he is smarter than teams of engineers. It is that he moves faster through the idea-to-demo loop because he is not slowed down by implementation anxiety. When you treat AI as your implementation layer, you can make architectural decisions more freely because the cost of changing your mind is lower. If the approach is wrong, you describe the new approach and the AI rebuilds. No sunk cost in hand-written code.",
        },
        {
          type: "paragraph",
          text: "This creates a genuine competitive moat. While a traditional team debates architecture choices for the first hour of a hackathon, Turcios has already built and tested two different approaches and knows which one works. Velocity compounds: early decisions get validated or invalidated faster, so later decisions are better informed.",
        },
        {
          type: "heading",
          level: 2,
          text: "Applying the Method Beyond Hackathons",
        },
        {
          type: "paragraph",
          text: "The ship-first methodology does not only apply to hackathons. Any project benefits from establishing a working, demonstrable state as early as possible. A startup's MVP, an internal tool, a personal project — all of these benefit from the same discipline: get to 'works enough to show someone' before optimizing for scale, elegance, or completeness.",
        },
        {
          type: "tip",
          title: "Define 'Ship' Before You Start",
          text: "Before starting any project, write one sentence that completes this: 'This project is shippable when...' Examples: 'when a user can create an account, add an item, and see it saved'; 'when the data pipeline runs end-to-end and produces the correct output'; 'when someone can land on the page and understand what this is.' Having this definition prevents scope creep and keeps momentum focused.",
        },
        {
          type: "heading",
          level: 2,
          text: "Iteration as a Practice, Not a Phase",
        },
        {
          type: "paragraph",
          text: "One of the most important insights from the Turcios methodology is that iteration is not a phase that comes after building — it IS the building. Every version of the app you build teaches you something that the next version incorporates. This means that the quality of your outcome is largely determined by how many iteration cycles you can complete in a given time window. AI dramatically increases the number of cycles possible per day.",
        },
        {
          type: "paragraph",
          text: "A traditional developer might complete 3-5 meaningful iterations on a feature per day, constrained by the time required to write, test, and debug each iteration. With AI assistance, 15-20 meaningful iterations in a day are achievable, because the implementation time per iteration shrinks dramatically. Over a week, this compounds: 100 iterations vs 25. The faster learner wins.",
        },
        {
          type: "exercise",
          title: "The 2-Hour Hackathon",
          description:
            "Set a timer for 2 hours. Pick an idea — something you could actually use or sell. Build a working version from scratch using an AI tool of your choice. At the 2-hour mark, stop. Evaluate: does it work? Can you demo it? What would be the next 3 iterations if you had more time?",
          hints: [
            "Pick an idea you can describe in one sentence. Complexity is the enemy in this exercise.",
            "When stuck, don't think — describe. Tell the AI exactly what's wrong and ask it to fix it.",
            "Don't aim for beautiful. Aim for functional. Polish is not the point.",
            "At the end, write down 3 things you learned about AI-assisted development that you couldn't have learned by reading about it.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "The Turcios method: describe, build, test, fix, deploy — in that exact order, fast",
            "Ship-first forces validation before over-investment in implementation",
            "AI removes implementation anxiety: changing your mind costs much less",
            "Iteration speed is a genuine competitive moat — 100 cycles beats 25",
            "Define 'shippable' before you start, then protect that definition from scope creep",
          ],
        },
      ],
    },
    {
      id: "1-3",
      title: "First-Principles Thinking for AI-Assisted Development",
      estimatedMinutes: 16,
      content: [
        {
          type: "paragraph",
          text: "Elon Musk famously describes first-principles thinking as boiling a problem down to its fundamental truths — the things you know for certain — and then reasoning up from there. He contrasts this with reasoning by analogy, which means copying what others do with slight modifications. In software development, reasoning by analogy is extremely common: 'We need a dashboard, so let's look at how other dashboards are built.' First-principles thinking asks instead: 'What information does the user actually need, in what format, and when? What does a dashboard even mean in this context?'",
        },
        {
          type: "paragraph",
          text: "For AI-assisted development, first-principles thinking is especially important because AI is excellent at reasoning by analogy — it has seen millions of dashboards and will give you a very reasonable one. But if your problem is not what other dashboards solve, you need a human layer of first-principles reasoning before you send the AI to work.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Three-Step First-Principles Framework",
        },
        {
          type: "paragraph",
          text: "When approaching any software problem with AI assistance, apply three steps before writing a single prompt:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "DECONSTRUCT: Break the problem to its atoms. What is the actual user action? What data is created, read, updated, or deleted? What are the real constraints (performance, security, scale, budget)? What does success look like from the user's perspective?",
            "REBUILD: Construct your solution from those atoms up. What is the minimum set of features that satisfies the constraints? What architecture does that imply? Which constraints are real and which are assumed?",
            "CHALLENGE: After AI generates a solution, interrogate it. Why this approach? What are the tradeoffs? What breaks at scale? What security assumptions are baked in? Treat the AI like a very confident junior engineer — smart but sometimes wrong in subtle ways.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Deconstruction in Practice",
        },
        {
          type: "paragraph",
          text: "Let's deconstruct a real example. Suppose you want to build 'a user authentication system.' Reasoning by analogy says: use JWT tokens, implement login/register/forgot-password, use bcrypt for passwords. That might be right, but it skips important questions.",
        },
        {
          type: "paragraph",
          text: "First-principles deconstruction asks: What are users actually authenticating to do? What happens if a user loses their password — how serious is that? Are users consumer-grade (expect social login) or enterprise (need SSO)? What is the session lifetime requirement? Is stateless auth (JWT) actually better than stateful (session cookies) for this use case? How many users? Where are they geographically?",
        },
        {
          type: "code",
          language: "text",
          caption: "First-principles deconstruction prompt template",
          code: `Before we implement [FEATURE], I need you to help me think through it from first principles.

1. What is the core user action this feature enables?
2. What data does this create, read, update, or delete?
3. What are the real constraints? (performance, security, scale, budget)
4. What could go wrong? (edge cases, failure modes, security risks)
5. What is the minimum viable version that satisfies the constraints?
6. What is the architecture you'd recommend, and why over alternatives?

Only after this analysis, propose an implementation plan.`,
        },
        {
          type: "heading",
          level: 2,
          text: "Why AI Makes First Principles More, Not Less, Important",
        },
        {
          type: "paragraph",
          text: "A common misconception is that AI removes the need for careful thinking because it generates solutions automatically. The opposite is true. AI generates plausible solutions, and the danger is that plausible looks like correct. A junior developer's code might be obviously broken, triggering review. An AI's code is often subtly broken in ways that only surface in production — wrong assumptions about data shape, missing authentication on an endpoint, an N+1 database query that works fine with 10 users but collapses with 10,000.",
        },
        {
          type: "warning",
          title: "The Confident Wrongness Problem",
          text: "AI generates responses with uniform confidence regardless of certainty. An AI will describe an incorrect architectural decision with exactly the same tone as a correct one. First-principles thinking is your defense: if you can't reason from fundamentals about why an approach is correct, you cannot safely accept it — regardless of how confidently it was presented.",
        },
        {
          type: "heading",
          level: 2,
          text: "Challenging AI Output Systematically",
        },
        {
          type: "paragraph",
          text: "After any significant AI-generated architectural decision or implementation, apply a systematic challenge protocol. This is not skepticism for its own sake — most AI output is good. It is pattern recognition: training yourself to notice the categories of mistakes AI commonly makes.",
        },
        {
          type: "list",
          items: [
            "SECURITY: Are there any endpoints or data operations that lack proper authorization? Is user input sanitized? Are secrets handled correctly?",
            "SCALE: What happens if this function is called 1000 times simultaneously? Is there a database query in a loop? Is state managed correctly under concurrent access?",
            "EDGE CASES: What happens with empty data? What if the network request fails? What if the user has special characters in their name?",
            "DEPENDENCIES: Are the libraries used well-maintained? Are any deprecated? Does the version match what's available?",
            "CORRECTNESS: Does the logic actually do what I described? Run through a mental simulation with real data.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The Veteran Advantage",
        },
        {
          type: "paragraph",
          text: "If you already have engineering experience, first-principles thinking is where your investment pays its highest dividend. AI amplifies your strengths: your instinct for when something is architecturally wrong, your knowledge of security pitfalls, your experience with what breaks in production. An experienced engineer using AI with first-principles thinking can build systems that are not just fast to build but genuinely well-designed — because they apply judgment to AI's raw output.",
        },
        {
          type: "insight",
          title: "The 10x Amplifier",
          text: "The naive version of 'AI makes you 10x faster' means you write code 10x faster. The sophisticated version means your judgment runs on 10x more surface area. You can review more code because AI writes more for review. You can explore more architectures because implementation is cheaper. You can be more ambitious about what you build because the cost of changing direction is lower. The amplification is on thinking, not just typing.",
        },
        {
          type: "exercise",
          title: "Deconstruct Before You Build",
          description:
            "Take the project you built in the first lesson (or pick a new idea). Before prompting any AI, spend 15 minutes answering these questions in writing: (1) What is the core user action? (2) What data is involved? (3) What are the real constraints? (4) What could go wrong? Then build it with AI, and compare the result to what you'd have gotten without the analysis.",
          hints: [
            "Write your answers before touching an AI tool. The discipline is in the pre-thinking.",
            "Be honest about what 'constraints' really are vs. what you are assuming. Are you assuming you need to handle 1 million users? Do you actually?",
            "After building, look at what the AI produced and ask: did it solve the right problem? Did it take any shortcuts I hadn't thought about?",
          ],
        },
        {
          type: "takeaways",
          items: [
            "First principles: deconstruct to atoms, rebuild from them, challenge what AI generates",
            "AI reasons by analogy excellently — but analogy fails when your problem is non-standard",
            "AI output has uniform confidence regardless of correctness — never accept architectural decisions without reasoning through them",
            "Systematic challenge: check security, scale, edge cases, dependencies, and correctness",
            "For veterans, first principles amplifies judgment across 10x more surface area",
          ],
        },
      ],
    },
    {
      id: "1-4",
      title: "The Beginner's Path: Dropping the 'Learn to Code First' Myth",
      estimatedMinutes: 11,
      content: [
        {
          type: "paragraph",
          text: "For decades, anyone who wanted to build software was given the same advice: learn to code. Take a Python course. Work through JavaScript fundamentals. Understand how computers work. Only after months or years of this preparation would you be ready to build something real. This advice made sense when it was given. It no longer does.",
        },
        {
          type: "paragraph",
          text: "The advice conflated two separate skills: the ability to program (translate thoughts into machine-readable syntax) and the ability to build software (have good ideas, design good systems, validate them with users, and iterate). AI has decoupled these skills. You can now be an excellent builder without being a good programmer, just as you can be an excellent director without being a good cinematographer.",
        },
        {
          type: "heading",
          level: 2,
          text: "What You Actually Need to Build",
        },
        {
          type: "paragraph",
          text: "When people say 'learn to code first,' they usually mean: learn Python, JavaScript, or similar. But the actual prerequisites for building useful software with AI are different and more accessible:",
        },
        {
          type: "list",
          items: [
            "Clear thinking: the ability to describe what you want with specificity",
            "User empathy: the ability to think from a user's perspective and identify pain points",
            "Domain knowledge: deep understanding of the problem space you are building for",
            "Debugging instinct: the ability to identify when something is not working and describe why",
            "Iteration tolerance: the willingness to go through many versions before something is right",
          ],
        },
        {
          type: "paragraph",
          text: "Notice that none of these are 'know how to write a for loop.' Someone with deep expertise in healthcare, logistics, music production, or education has far more valuable raw material for building useful software than a junior programmer with no domain knowledge — because AI provides the programming.",
        },
        {
          type: "insight",
          title: "Domain Expertise Is Your Moat",
          text: "In a world where anyone can build an app, the competitive advantage is knowing what app to build and for whom. A nurse who builds a medication management tool for home caregivers has insights that no engineering team will have. A restaurant manager who builds a shift-scheduling tool understands the constraints better than anyone who learned about restaurants from documentation. Use your expertise.",
        },
        {
          type: "heading",
          level: 2,
          text: "A Learning Sequence That Actually Works",
        },
        {
          type: "paragraph",
          text: "If you are starting from zero technical knowledge, here is a learning sequence that gets you to shipping real software faster than traditional coding courses:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Build something simple immediately (day 1): Use Replit Agent to create a basic version of something you actually want. Don't worry if you don't understand it.",
            "Learn to read output (week 1): Start skimming the code the AI generates. You don't need to understand every line — just enough to spot obvious gaps.",
            "Learn to debug by describing (weeks 1-2): When something breaks, practice describing exactly what's wrong and what you expected instead. This skill is transferable to all AI tools.",
            "Learn the basic web vocabulary (weeks 2-4): Understand what HTML, CSS, and JavaScript do at a high level. Understand what an API is. Understand what a database does. You don't need to write any of it — just understand the concepts.",
            "Build progressively more complex things (ongoing): Each new project should challenge you slightly more than the last. The learning comes from the building, not from studying.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "What 'Understand the Code' Really Means",
        },
        {
          type: "paragraph",
          text: "There is a legitimate concern that building without understanding creates fragility — apps that work until they break and then cannot be fixed because no one understands them. This concern is real but overstated, for two reasons. First, AI can explain any piece of code it generates, and you can ask for explanations of any part you don't understand. Second, understanding grows naturally through repeated exposure — the more code you see in context, the more you understand even without formal study.",
        },
        {
          type: "tip",
          title: "The 'Explain This' Habit",
          text: "Whenever you encounter code you don't understand, ask the AI to explain it. Develop the habit: 'Explain this section to me like I'm someone who is learning — what does it do, why is it done this way, and what would happen if it were written differently?' This passive learning compounds quickly and you'll find yourself understanding more and more without explicit study.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Goal: Productive Collaboration, Not Dependency",
        },
        {
          type: "paragraph",
          text: "The goal of the beginner path is not to remain perpetually dependent on AI to write every line. The goal is to reach a state where you are a productive collaborator with AI — where you can direct it effectively, validate its output, and develop increasingly sophisticated instincts about when to trust it and when to challenge it. Some beginners who started with AI assistance have become strong programmers; others have remained effective builders without ever writing much code themselves. Both are valid outcomes.",
        },
        {
          type: "exercise",
          title: "The Explain-It-Back Exercise",
          description:
            "Find any 20-line block of code in an app you've built or one you've found online. Ask an AI to explain every line in plain English. Then, close the AI conversation and write your own explanation of what the code does — not every line, but the overall behavior and why it matters.",
          hints: [
            "Don't just copy the AI's explanation. Try to internalize and restate it in your own words.",
            "Focus on 'what does this do for the user?' not 'what does this syntax mean?'",
            "If there are parts you still can't explain, go back and ask follow-up questions until you can.",
          ],
        },
        {
          type: "takeaways",
          items: [
            "AI decouples 'ability to program' from 'ability to build software'",
            "Domain expertise is the new competitive moat — know the problem better than engineers do",
            "The effective learning sequence: build first, understand incrementally, formalize later",
            "Develop the 'explain this' habit — passive learning from code you see compounds over time",
            "The goal is productive collaboration with AI, not elimination of understanding",
          ],
        },
      ],
    },
    {
      id: "1-5",
      title: "The Veteran's Advantage: 10x Amplification Without Losing Your Edge",
      estimatedMinutes: 15,
      content: [
        {
          type: "paragraph",
          text: "If you have been writing software for years, you may feel an ambivalence about AI coding tools. On one hand, the productivity gains are undeniable — tasks that took hours take minutes. On the other hand, there is a creeping concern: am I deskilling? Am I becoming dependent on something I don't control? Will my judgment matter if AI can generate solutions automatically?",
        },
        {
          type: "paragraph",
          text: "These concerns are worth taking seriously. The risks are real. But they are not the whole picture. The same experience that makes you cautious about AI also makes you far more effective at using it. Your years of building intuitions about what breaks in production, your architectural judgment, your hard-won understanding of security and performance — these do not become obsolete. They become the quality control layer that separates genuinely good AI-assisted software from the plausible-but-broken output that beginners accept.",
        },
        {
          type: "heading",
          level: 2,
          text: "The Risks Are Real — And Specific",
        },
        {
          type: "paragraph",
          text: "Before celebrating the advantages, name the risks clearly. They are more specific than 'AI is bad' or 'deskilling is inevitable':",
        },
        {
          type: "list",
          items: [
            "Hallucination risk: AI generates code that looks correct and subtly is not. Outdated library versions, incorrect API signatures, wrong algorithmic complexity, SQL injection vulnerabilities in generated queries — all real failure modes.",
            "Architecture drift: accepting AI's structural choices without challenge can lead to codebases that work today but are hard to maintain or scale. AI optimizes for the immediate task, not the long-term system.",
            "Mental model erosion: if you stop reasoning through problems yourself and just delegate to AI, you lose the internal models that make you effective at catching AI's mistakes. This is a genuine, slow-moving risk.",
            "Vendor/model lock-in: if your workflow depends heavily on a specific tool or model that changes its behavior, pricing, or availability, you are vulnerable.",
          ],
        },
        {
          type: "warning",
          title: "The Erosion Risk Is Real",
          text: "The most insidious risk for experienced engineers is gradual erosion of the mental models they've built over years. If you stop doing the reasoning and just review AI output, you become a worse reviewer over time — because reviewing requires the same muscles as writing. Maintain the habit of working through problems from first principles before handing them to AI, even when you don't strictly need to.",
        },
        {
          type: "heading",
          level: 2,
          text: "How Veteran Knowledge Amplifies AI",
        },
        {
          type: "paragraph",
          text: "Now the other side. Every piece of experience you have makes you better at directing AI and catching its errors. Here are the specific amplifications:",
        },
        {
          type: "list",
          items: [
            "Architectural judgment: you know when AI's proposed structure is wrong — when it's over-engineered, when it's under-engineered, when it will cause maintenance nightmares. A beginner accepts the structure; you reshape it.",
            "Security instinct: you have a trained eye for security issues. When AI generates an endpoint without authorization, you catch it immediately. When it handles user input unsafely, you recognize the pattern.",
            "Performance intuition: you know what an N+1 query looks like. You recognize when a synchronous operation should be async. You can estimate load implications before they hit production.",
            "Debugging expertise: when AI-generated code breaks in a subtle way, you have the mental models to trace execution, form hypotheses, and isolate causes. This is slower to develop and AI doesn't replace it.",
            "Domain depth: your knowledge of the business domain, the user behavior, the edge cases — this cannot be extracted from training data. You provide context that makes AI's output more correct.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "The 'Junior Dev Review' Mental Model",
        },
        {
          type: "paragraph",
          text: "The most useful mental model for experienced engineers using AI: treat every AI output as a pull request from a very fast, very confident, very capable junior engineer. This junior dev can implement anything you describe in minutes. They produce good code. But they sometimes make the mistakes that junior devs make: missing edge cases, incorrect assumptions about system behavior, slightly wrong library usage, inadequate error handling. Your job is not to write their code for them — it is to review their output and give precise feedback when it's wrong.",
        },
        {
          type: "code",
          language: "text",
          caption: "A review prompt for AI-generated code",
          code: `Review the code you just generated for the following concerns:
1. Security: Are there any endpoints missing authorization? Any SQL injection risks? Any secrets in code?
2. Performance: Are there any N+1 queries? Any synchronous operations that should be async? Any unbounded loops?
3. Error handling: Are all failure modes caught? Are errors logged with sufficient context?
4. Edge cases: What happens with empty inputs? Null values? Concurrent access?
5. Correctness: Does this implementation match the spec exactly, or did you make any assumptions?

Flag anything uncertain and explain your reasoning for each item.`,
        },
        {
          type: "heading",
          level: 2,
          text: "Maintaining Your Mental Models",
        },
        {
          type: "paragraph",
          text: "The concrete practice for avoiding mental model erosion: before submitting any significant task to AI, spend 5-10 minutes reasoning through the problem yourself. Write out your approach, the key decision points, the tradeoffs. Then compare what you reasoned to what AI produces. This serves two purposes: it keeps your reasoning muscles active, and it gives you a baseline to evaluate AI's approach against.",
        },
        {
          type: "tip",
          title: "The 5-Minute Pre-Think",
          text: "Before any significant AI prompt, write a brief: 'I'm going to ask AI to build X. I think it will approach it by doing Y because Z. The main risks are A, B, C.' This prediction exercise keeps your judgment active and trains you to notice when AI surprises you — surprises are often worth examining carefully.",
        },
        {
          type: "heading",
          level: 2,
          text: "Where to Deploy Your Judgment",
        },
        {
          type: "paragraph",
          text: "The strategic question for an experienced engineer using AI is: what should I think about, and what should I delegate? The answer is roughly: think about the things that are hard to reverse and easy to get subtly wrong. Architecture decisions, data model choices, security model, API contracts — these have high cost of change and benefit enormously from deep human reasoning. Implementation details, boilerplate, test writing, documentation — these have low cost of change and are excellent candidates for AI delegation.",
        },
        {
          type: "exercise",
          title: "The Prediction Exercise",
          description:
            "Take a real task you need to build. Before prompting AI, spend exactly 10 minutes writing: (1) How would you approach this traditionally? (2) What are the three biggest risks in your approach? (3) What would you expect AI to get right? (4) Where do you expect it to make mistakes or take shortcuts? Then build it with AI and compare your predictions to reality.",
          hints: [
            "Be specific in your predictions — 'AI might not handle the null case in user.preferences' not 'AI might make mistakes.'",
            "When AI surprises you (better OR worse than predicted), dig into why. The surprise is where learning happens.",
            "Track your predictions over multiple sessions. Are you getting better at anticipating AI's strengths and weaknesses?",
          ],
        },
        {
          type: "takeaways",
          items: [
            "The risks for veterans are specific: hallucination, architecture drift, mental model erosion, vendor lock-in",
            "Mental model erosion is the most insidious risk — counter it with deliberate pre-thinking before delegating",
            "The 'junior dev review' mental model: AI is a capable, fast, sometimes-wrong junior whose PRs you review",
            "Every piece of domain knowledge, architectural instinct, and security awareness is amplified, not depreciated",
            "Deploy your judgment on high-cost-of-change decisions: architecture, data model, security contracts",
          ],
        },
      ],
    },
  ],
};
