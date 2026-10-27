/* Every word on the site lives here. Edit copy in this file only; layout files never need touching for copy changes. */

export const LINKS = {
  email:    'mailto:tammaingocphuong@gmail.com',
  resume:   '/resume.pdf',
  linkedin: 'https://www.linkedin.com/in/tammaingoc/',
  github:   'https://github.com/tammai1610',
};

export const NAV = [
  ['keychains', 'Keychains'],
  ['quiescent', 'Now building'],
  ['film', 'Film roll'],
  ['letters', 'Letters'],
  ['magnets', 'Magnets'],
  ['shelf', 'Bookshelf'],
  ['thanks', 'Thank you'],
];

export const SHOPFRONT = {
  name: 'Tam Mai',
  signTop: 'OPEN',
  signBottom: 'to work',
  label: 'A little souvenir shop',
  title: "Tam's",
  tagline: 'A data person who cares about product, people, and the memories they make.',
  cta: 'Step inside',
  photo: '/photos/profile-photo.jpg',
};

export const KEYCHAINS = {
  label: 'Who I am',
  title: 'Keychains.',
  items: ['vietnam', 'books', 'trails', 'data', 'meditation'],
  labels: {
    vietnam: 'Vietnam',
    aodai: 'Áo dài',
    books: 'Books',
    trails: 'Trails',
    data: 'Data + product',
    meditation: 'Meditation',
  },
  trails: [
    { src: '/photos/rainier-1.jpeg', caption: 'Mt. Rainier' },
    { src: '/photos/grandteton.jpeg', caption: 'Grand Teton' },
  ],
  noteLabel: 'A note from the owner',
  note: "Hi, I'm Tam, and welcome to my little souvenir shop! My journey started in Vietnam and brought me to Florida, learning, making memories, and enjoying the process along the way. Everything here is a small souvenir of my work. I hope you enjoy it, and come back to visit again.",
  member: {
    school: 'University of South Florida',
    degree: 'B.S. in AI & Business Analytics',
    date: 'May 2027',
    gpa: '3.84 GPA',
  },
  tags: [
    { title: 'PRODUCT & GROWTH', body: 'Roadmapping · PRDs · User Interviews · Competitive Analysis · Agile · Jira · Figma' },
    { title: 'LANGUAGES', body: 'SQL · Python (Pandas, NumPy, Polars) · R' },
    { title: 'AI, BI & ANALYTICS', body: 'Claude · Copilot Studio · Atlassian Rovo · Power BI · Tableau · DAX · dbt' },
    { title: 'DATA PLATFORMS', body: 'Databricks · Snowflake · Spark · AWS · Docker · GitHub · Confluence' },
  ],
};

export const FILM = {
  label: 'My journey so far',
  title: 'Film roll.',
  startLine: 'It began with data at my first internship, and grew into building products from 0 to 1.',
  endLine: 'Where I am now: a data person who builds products, and cares about the people using them.',
  next: { year: 'Next', title: 'Your team?', line: 'Product and data, in one person. The next frame is still blank.', cta: 'Say hello' },
  /* start / end as 'YYYY-MM'; end: null means still there. Frames run by start date. */
  axis: { from: '2024-01', to: '2026-12' },
  now: '2026-10',
  mapLabel: 'How it all overlaps',
  todayLabel: 'Today',
  stillHere: 'Still here',
  frames: [
    {
      year: '2024', type: 'extra', place: 'Investment Club at USF', short: 'Investment Club', role: 'Professional Development Associate',
      start: '2024-05', end: '2025-05', dates: 'May 2024 – May 2025', photo: '/photos/onepager-1-preview.jpg',
      line: 'My first time leading: I used data to see how the club really ran, then led with empathy and gave my analysts real ownership.',
      docs: [
        { label: 'Interview one-pager', href: '/investment-club-onepager-1.pdf' },
        { label: 'Attendance report', href: '/investment-club-attendance-report.pdf' },
      ],
    },
    {
      year: '2024', type: 'pro', place: 'Elevance Health', short: 'Elevance Health', role: 'Business Information Analyst Intern',
      start: '2024-06', end: '2024-08', dates: 'June 2024 – August 2024', photo: '/photos/elevance-1.jpeg',
      line: 'My first internship, still green: I learned how corporate works one SQL ticket at a time, and that one meeting can beat a week of emails.',
    },
    {
      year: '2024', type: 'pro', place: 'USF Judy Genshaft Honors College', short: 'Honors College', role: 'Product Analyst',
      start: '2024-06', end: null, dates: 'June 2024 – Present', photo: '/photos/honors-1.jpeg',
      line: 'Here my data got real users: I listened to advisors and faculty first, then built what they would actually open every week.',
      docs: [{ label: 'Advisor training deck', href: 'https://claude.ai/artifact/4FxTc5KgppJYwko8UEiZTa' }],
    },
    {
      year: '2025', type: 'extra', place: 'GDG on Campus @ USF', short: 'GDG on Campus', role: 'Community Chair',
      start: '2025-01', end: '2026-05', dates: 'January 2025 – May 2026', photo: '/photos/devfest-photo-1.jpg',
      line: 'Leadership got bigger: I trained 50 volunteers and turned plans into real programs for 350 people.',
      docs: [
        { label: 'HackUSF 2026', href: 'https://2026.hackusf.com/' },
        { label: 'DevFest Tampa Bay', href: 'https://devfesttampabay.com' },
      ],
    },
    {
      year: '2025', type: 'pro', place: 'VSP Vision', short: 'VSP Vision', role: 'Business Intelligence Analyst Intern',
      start: '2025-06', end: '2025-08', dates: 'June 2025 – August 2025', photo: '/photos/vsp-1.jpeg',
      line: 'I started treating dashboards like products: I asked leaders what they used, then cut 9 tabs down to 2.',
    },
    {
      year: '2026', type: 'pro', place: 'Micron Technology', short: 'Micron', role: 'Technical Product Manager Intern',
      start: '2026-05', end: '2026-08', dates: 'May 2026 – August 2026', photo: '/photos/micron-1.jpeg',
      line: "The dots connected: as a PM, I built AI agents and workflows from 0 to 1, and learned that killing v1 is part of shipping.",
    },
  ],

};

export const LETTERS = {
  label: 'Voices in the room',
  title: 'Recommendation letters.',
  letters: [
    {
      no: '01', company: 'Micron', logo: '/logos/micron.png', badge: 'Exceeds Expectations', name: 'Jyotika Roychowdhury',
      title: 'Staff Program Manager, PMO', org: 'Micron Technology', pdf: '/micron-letter.pdf',
      quote: 'She did a great job of balancing the technical details while keeping the broader objectives and priorities in mind. Her resourcefulness, tenacity and dedication are commendable.',
    },
    {
      no: '02', company: 'VSP Vision', logo: '/logos/vsp.png', name: 'Brianne Melrose',
      title: 'GTS Business Management', org: 'VSP Vision', pdf: '/vsp-letter.pdf',
      quote: 'Tam presented her updates with clarity and confidence, earning praise for both her technical execution and her strategic thinking. She has my highest recommendation.',
    },
  ],
  teamLabel: 'FROM THE TEAM',
  postcards: [
    { name: 'Bruce', role: 'Solutions Architect', quote: 'Precise, thoughtful questioning reflects someone who is actually digesting the information and thinking a step ahead.' },
    { name: 'AJ', role: 'Staff Program Manager', quote: 'She asks great and valuable questions, really wants to get to know a full process, and comes up with creative and valuable solutions.' },
    { name: 'Brian', role: 'Staff Program Manager', quote: 'Rather than simply executing assigned tasks, she demonstrated initiative by proposing new ideas that increased the value of the solution.' },
  ],
};

/* Facts here come only from "Quiescent: Everything I Did". Its "do not claim" list is respected:
   co-led (not led) discovery, no launch or usage numbers, no live AI, no coding claims. */
export const QUIESCENT = {
  label: 'Now building',
  name: 'Quiescent',
  tagline: 'Turn world knowledge into your own.',
  status: 'Currently building',
  meta: 'Technical Product Manager · Team of 5 · September 2026 – Present',
  image: '/photos/quiescent-1.jpeg',
  role: 'My role: Technical Product Manager, across user research, product design, and adoption metrics.',
  embed: 'https://quiescenttest.netlify.app/signin',
  caseStudy: [
    { title: 'Summary', head: 'A reading app that helps you keep what you read.',
      body: 'Quiescent is a web reader and Chrome extension. You save articles and PDFs from anywhere, read them in one calm, focused space, and come back to them later, so reading turns into understanding you keep.' },
    { title: 'Problem', head: 'People read a lot, but little of it sticks.',
      body: 'Articles pile up in open tabs and read-later lists, PDFs sit in different folders, and notes end up scattered. When readers want to return to an idea, they can’t find it or don’t remember it.' },
    { title: 'Target user', head: 'Intentional readers.',
      body: 'People who read on purpose to learn something, not to pass time. Our interviews started with 3 competing personas, and we narrowed them down to this one segment.' },
    { title: 'Competitors', head: 'Each tool solves one piece.',
      chips: ['Readwise', 'Matter', 'NotebookLM', 'Duolingo', 'Goodreads'],
      body: 'They resurface highlights, save for later, summarize with AI, build streaks, or track finished books. We skipped what they already do well and focused on the gap: coming back to what you read.' },
    { title: 'Insight', head: 'Streaks made reading feel like a chore.',
      body: 'The team first assumed daily streaks would keep people reading. In our first round of interviews, 3 of 6 readers said habit trackers already wore them out. So we dropped streaks and built around reflection and retention instead.' },
    { title: 'Solution', head: 'A calm reader built for coming back.',
      bullets: [
        'Save from anywhere with the Chrome extension, or upload a file',
        'Read in a Focused Reader with highlights, notes, and a side panel',
        'Ask AI to look up a term, never to summarize for you',
        'Scoped from 18 ideas down to 6 features for the first launch',
      ] },
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/quiescent-app/quiescent' },
    { label: 'Live prototype', href: 'https://quiescenttest.netlify.app/signin' },
    { label: 'Sign-in flow prototype', href: 'https://claude.ai/artifact/HRonVqtQdXK6npNjyFdh4L' },
    { label: 'Design handoff', href: 'https://claude.ai/artifact/2y7j5FKa7k8EyKL1L5djg5' },
  ],
};

export const MAGNETS = {
  label: 'Personal projects',
  title: 'Magnets.',
  projects: [
    {
      name: "Tam's Souvenir Shop", meta: 'React · Vite · Vercel · Claude', dates: 'October 2026',
      poster: 'shop',
      line: 'This portfolio. I designed it with Claude as a little shop, so my work feels like something you can pick up and keep.',
      links: [{ label: 'GitHub', href: 'https://github.com/tammai1610/Portfolio' }],
    },
    {
      name: 'AI Displacement Observatory', meta: 'Python · DuckDB · dbt', dates: 'August 2026 – Present',
      poster: 'observatory',
      line: 'Cut extract runtime 6x with async I/O.',
      links: [{ label: 'GitHub', href: 'https://github.com/tammai1610/ai-displacement-observatory' }],
    },
    {
      name: 'FinPulse Fraud Detection Pipeline', meta: 'Python · Spark · HDFS · Docker', dates: 'April 2026',
      poster: 'finpulse',
      line: '5 fraud datasets into a 1.15M-row fact table.',
      links: [{ label: 'GitHub', href: 'https://github.com/alazzawiusf/Data-Wranglers-Final-Project' }],
    },
  ],
};

export const SHELF = {
  label: 'The reading corner',
  title: 'Bookshelf.',
  books: [
    { title: 'Die with Zero', author: 'Bill Perkins', insight: 'Be intentional with time and energy. Optimize for meaningful experiences, not just accumulating more.' },
    { title: 'The Courage to be Disliked', author: 'Kishimi & Koga', insight: "Separate what you can control from what you can't." },
    { title: 'Fundamentals of Data Engineering', author: 'Reis & Housley', insight: 'Understand data ecosystems holistically. Think about infrastructure strategically, not just technically.' },
    { title: 'My Friends', author: 'Fredrik Backman', insight: 'A thoughtful lens on relationships, belonging, and what we owe the people who shape us.' },
    { title: '7 Habits of Highly Effective People', author: 'Stephen Covey', insight: 'Shaped how I work and collaborate, and honestly, just how to be a better person.' },
    { title: 'Supercommunicators', author: 'Charles Duhigg', insight: "The best conversations aren't about being clever. They're about matching the kind of conversation the other person is trying to have." },
    { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', insight: 'Currently reading.', now: true },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', insight: 'Currently reading.', now: true },
  ],
  panelLabel: 'TAKEAWAY',
  panelHint: 'Tap a book for my thoughts.',
  homemade: {
    label: 'Homemade',
    small: "MADE IN TAM'S KITCHEN",
    text: "Sizzling, chopping, tasting. I found my peace in cooking and baking, and when I'm full, I'm ready to share the love.",
  },
  dishes: [
    { src: '/photos/dish-1.jpeg', caption: 'Caramelized pork belly and eggs' },
    { src: '/photos/dish-2.jpeg', caption: 'Warm home meal' },
    { src: '/photos/dish-3.jpeg', caption: 'Grilled pork vermicelli' },
    { src: '/photos/dish-4.jpeg', caption: 'Chocolate chip cookies' },
    { src: '/photos/dish-5.jpeg', caption: 'Tiramisu on Memorial Day, 2026' },
  ],
};

export const THANKS = {
  label: 'Thank you corner',
  title: ['Want to make', 'a memory together?'],
  body: "I'm looking for opportunities to learn, contribute, and build thoughtful products with good people. If that sounds like your team, I'd love to hear from you.",
  cta: 'Write me a letter',
  letter: {
    label: 'Write Tam a letter',
    greeting: 'Dear Tam,',
    placeholder: 'Say hi, tell me about your team, or ask me anything.',
    send: 'Send by air mail',
    sent: 'Your letter is on its way. I read every one, and I will write back.',
    error: "That letter didn't go through. Try again, or email me at tammaingocphuong@gmail.com.",
    /* Paste your Formspree form URL here, e.g. 'https://formspree.io/f/abcdwxyz'.
       Empty = the button opens the visitor's email app with the letter filled in. */
    endpoint: '',
  },
};
