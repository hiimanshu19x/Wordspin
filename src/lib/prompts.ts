import type { PromptCategory } from "./constants";

export interface Prompt {
  id: string;
  text: string;
  category: PromptCategory;
}

export interface WritingResponse {
  id: string;
  promptId: string;
  prompt: Prompt;
  body: string;
  wordCount: number;
  author: string | null; // null = anonymous
  createdAt: string;
  readingTimeSeconds: number;
  reactions?: number;
  saved?: boolean;
}

/**
 * Curated writing prompts — designed to be evocative, open-ended,
 * and to surface genuinely different perspectives from different people.
 */
export const SAMPLE_PROMPTS: Prompt[] = [
  // ── Observation ─────────────────────────────
  {
    id: "p1",
    text: "Describe a sound you heard today that you'll forget by tomorrow.",
    category: "Observation",
  },
  {
    id: "p8",
    text: "What does the light look like where you are right now?",
    category: "Observation",
  },
  {
    id: "p9",
    text: "Describe the hands of someone you love without naming them.",
    category: "Observation",
  },
  {
    id: "p10",
    text: "Write about something beautiful you saw that nobody else noticed.",
    category: "Observation",
  },

  // ── Reflection ──────────────────────────────
  {
    id: "p2",
    text: "Write about a door you chose not to open.",
    category: "Reflection",
  },
  {
    id: "p11",
    text: "What is the lie you tell most often, and who do you tell it to?",
    category: "Reflection",
  },
  {
    id: "p12",
    text: "Describe the version of yourself that exists in other people's memories.",
    category: "Reflection",
  },
  {
    id: "p13",
    text: "What did you unlearn this year?",
    category: "Reflection",
  },

  // ── Imagination ─────────────────────────────
  {
    id: "p3",
    text: "You find a handwritten note in a borrowed book. What does it say?",
    category: "Imagination",
  },
  {
    id: "p14",
    text: "A stranger on a train hands you an envelope and says 'You'll know when to open it.' What happens next?",
    category: "Imagination",
  },
  {
    id: "p15",
    text: "Write the last paragraph of a novel you'll never finish.",
    category: "Imagination",
  },
  {
    id: "p16",
    text: "Invent a word for a feeling that doesn't have one yet. Define it.",
    category: "Imagination",
  },

  // ── Question ────────────────────────────────
  {
    id: "p4",
    text: "What is the smallest thing that changed your entire day?",
    category: "Question",
  },
  {
    id: "p17",
    text: "If you could only keep one memory from your entire life, which would it be and why?",
    category: "Question",
  },
  {
    id: "p18",
    text: "What would you do differently if no one was watching?",
    category: "Question",
  },
  {
    id: "p19",
    text: "What conversation are you avoiding, and what would you say if you finally had it?",
    category: "Question",
  },

  // ── Memory ──────────────────────────────────
  {
    id: "p5",
    text: "Tell the story of a meal you still think about.",
    category: "Memory",
  },
  {
    id: "p20",
    text: "Describe the last time you laughed so hard you couldn't breathe.",
    category: "Memory",
  },
  {
    id: "p21",
    text: "Write about a place that no longer exists except in your memory.",
    category: "Memory",
  },
  {
    id: "p22",
    text: "What song takes you back to a specific moment? Describe that moment.",
    category: "Memory",
  },

  // ── Scenario ────────────────────────────────
  {
    id: "p6",
    text: "You wake up and the city is completely silent. What happened?",
    category: "Scenario",
  },
  {
    id: "p23",
    text: "You receive a letter from your future self, dated ten years from now. What does it say?",
    category: "Scenario",
  },
  {
    id: "p24",
    text: "Everyone in the world forgets who you are. How do you introduce yourself?",
    category: "Scenario",
  },
  {
    id: "p25",
    text: "You're given 24 hours with no consequences. You choose to do something kind. What is it?",
    category: "Scenario",
  },

  // ── Emotion ─────────────────────────────────
  {
    id: "p7",
    text: "Write about a feeling you've never been able to name.",
    category: "Emotion",
  },
  {
    id: "p26",
    text: "Describe what loneliness looks like, without using the word lonely.",
    category: "Emotion",
  },
  {
    id: "p27",
    text: "Write about the last time you felt genuinely brave.",
    category: "Emotion",
  },
  {
    id: "p28",
    text: "What does comfort feel like in your body? Describe it as precisely as you can.",
    category: "Emotion",
  },

  // ── Observation (bonus) ─────────────────────
  {
    id: "p29",
    text: "Watch someone doing something they're good at. Describe what their body knows that their mind doesn't.",
    category: "Observation",
  },
  {
    id: "p30",
    text: "Describe the sky right now without using any color words.",
    category: "Observation",
  },
  {
    id: "p31",
    text: "Write about the oldest thing in your room and how it got there.",
    category: "Observation",
  },

  // ── Reflection (bonus) ─────────────────────
  {
    id: "p32",
    text: "What are you pretending not to know?",
    category: "Reflection",
  },
  {
    id: "p33",
    text: "Write about a time you were wrong and it changed you.",
    category: "Reflection",
  },
  {
    id: "p34",
    text: "What would the child version of you think of who you are now?",
    category: "Reflection",
  },

  // ── Imagination (bonus) ─────────────────────
  {
    id: "p35",
    text: "A museum opens an exhibit about your life. What's in the first room?",
    category: "Imagination",
  },
  {
    id: "p36",
    text: "Write the opening line of your autobiography, then abandon it and write a better one.",
    category: "Imagination",
  },
  {
    id: "p37",
    text: "You can send one sentence back in time to yourself at age fifteen. What do you send?",
    category: "Imagination",
  },

  // ── Question (bonus) ────────────────────────
  {
    id: "p38",
    text: "What do you do when no one is watching that reveals who you really are?",
    category: "Question",
  },
  {
    id: "p39",
    text: "If your home burned down and everyone was safe, what would you look for in the ashes?",
    category: "Question",
  },
  {
    id: "p40",
    text: "What kindness are you still carrying from a stranger?",
    category: "Question",
  },

  // ── Memory (bonus) ──────────────────────────
  {
    id: "p41",
    text: "Describe the smell of a place you haven't been in years.",
    category: "Memory",
  },
  {
    id: "p42",
    text: "Write about a goodbye you didn't know was a goodbye until later.",
    category: "Memory",
  },
  {
    id: "p43",
    text: "What's a recipe you know by heart? Where did you learn it and from whom?",
    category: "Memory",
  },

  // ── Scenario (bonus) ────────────────────────
  {
    id: "p44",
    text: "You find a voicemail on your phone from a number you don't recognize. The voice is yours. What does it say?",
    category: "Scenario",
  },
  {
    id: "p45",
    text: "A bookshop appears on your street that wasn't there yesterday. Inside, every book is about you. Pick one off the shelf.",
    category: "Scenario",
  },
  {
    id: "p46",
    text: "You're allowed to live one day of your life over again, but you can't change anything. Which day do you choose?",
    category: "Scenario",
  },

  // ── Emotion (bonus) ─────────────────────────
  {
    id: "p47",
    text: "Write about something that makes you angry that you think should make you sad.",
    category: "Emotion",
  },
  {
    id: "p48",
    text: "Describe the exact moment hope returns after you thought it was gone.",
    category: "Emotion",
  },
  {
    id: "p49",
    text: "What's the heaviest thing you carry that doesn't weigh anything?",
    category: "Emotion",
  },
  {
    id: "p50",
    text: "Write about a joy so quiet that nobody else noticed it.",
    category: "Emotion",
  },
];

/**
 * Static featured responses for the homepage.
 * Each one is crafted to feel like a genuine, literary micro-essay.
 */
export const FEATURED_RESPONSES: WritingResponse[] = [
  {
    id: "r1",
    promptId: "p1",
    prompt: SAMPLE_PROMPTS[0],
    body: "The coffee grinder at 6:47 AM — not mine, but the neighbor's, bleeding through plaster walls built in 1923. It has this particular wheeze at the end, like the machine is catching its breath. I've heard it every morning for three years and I still couldn't describe the pitch. It lives in that space between sleep and waking where sounds don't have names yet, just textures. Tomorrow I'll hear it again and it will be brand new. That's the thing about sounds we forget — they get to surprise us twice.",
    wordCount: 91,
    author: null,
    createdAt: "2026-08-07T08:30:00Z",
    readingTimeSeconds: 25,
  },
  {
    id: "r2",
    promptId: "p2",
    prompt: SAMPLE_PROMPTS[4],
    body: "There was a side street in Lisbon, narrow enough that the laundry lines from opposite buildings almost touched. I was walking back to the hostel after too much vinho verde, and this door — cracked blue paint, no handle visible — was open just a sliver. Light poured out, warm and amber, and I could hear someone playing piano. Not performing. Practicing. The same four bars, over and over, each time a little different. I stood there for maybe two minutes. The music stopped. I kept walking. I think about those four bars more than any concert I've attended. The unfinished things stay.",
    wordCount: 105,
    author: "marina",
    createdAt: "2026-08-06T22:15:00Z",
    readingTimeSeconds: 30,
  },
  {
    id: "r3",
    promptId: "p4",
    prompt: SAMPLE_PROMPTS[12],
    body: "My daughter drew a circle this morning. Not on purpose — she was reaching for a crayon and her elbow dragged the red one across the paper in a wobbly, almost-closed loop. She stared at it like she'd discovered gravity. 'Moon,' she said. She's two. She's never drawn anything recognizable before. I cried in the kitchen while making her toast. The circle is on the fridge now, held up by a magnet shaped like a strawberry. Every time I open the fridge I see the moon and the strawberry and I think: today was the day she started seeing shapes in the mess.",
    wordCount: 108,
    author: null,
    createdAt: "2026-08-07T14:45:00Z",
    readingTimeSeconds: 32,
  },
  {
    id: "r4",
    promptId: "p11",
    prompt: SAMPLE_PROMPTS[5],
    body: "'I'm fine.' I say it to my mother every Sunday when she calls. She asks how work is, how the apartment is, if I'm eating enough. I tell her everything is great. The truth is I eat cereal for dinner three nights a week and sometimes the silence in my apartment gets so thick I turn on podcasts I don't even like just to hear another human voice. But she worries. She's always worried. And the distance between us is already 800 miles of highway and a timezone. I don't want it to also be the weight of her knowing I'm still figuring it out at thirty-one.",
    wordCount: 107,
    author: "j.",
    createdAt: "2026-08-08T09:10:00Z",
    readingTimeSeconds: 30,
  },
  {
    id: "r5",
    promptId: "p26",
    prompt: SAMPLE_PROMPTS[25],
    body: "It looks like a kitchen table with one placemat. A toothbrush standing alone in a cup meant for two. It looks like walking through a farmers market and realizing you have no one to text a photo of the weird-shaped tomato to. It's the phantom vibration of a phone that hasn't rung. It looks like knowing all the baristas by name but none of your neighbors. Like being the person who always takes the group photo because no one notices you're not in it. It's not dramatic. It's just a chair that's always empty at the right angle to catch the afternoon light.",
    wordCount: 109,
    author: null,
    createdAt: "2026-08-08T16:20:00Z",
    readingTimeSeconds: 31,
  },
  {
    id: "r6",
    promptId: "p22",
    prompt: SAMPLE_PROMPTS[19],
    body: "'Fast Car' by Tracy Chapman. I'm sixteen, riding shotgun in my best friend's rusted Civic. Windows down, August heat, the kind of sticky evening where the sky can't decide between orange and purple. We're driving nowhere — literally, just doing loops around the lake because we both got our hearts broken the same week and didn't know what else to do with all that feeling. She turned up the volume during the second verse and we both started singing without looking at each other. We weren't sad anymore. We weren't happy either. We were just moving, which was enough.",
    wordCount: 104,
    author: "alexis k",
    createdAt: "2026-08-07T20:30:00Z",
    readingTimeSeconds: 29,
  },
];
