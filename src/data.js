/* Every word on the site lives here. Edit copy in this file only; layout files never need touching for copy changes. */

export const LINKS = {
  email:    'mailto:tammaingocphuong@gmail.com',
  resume:   '/resume.pdf',
  linkedin: 'https://www.linkedin.com/in/tammaingoc/',
  github:   'https://github.com/tammai1610',
};

export const NAV = [
  ['keychains', 'Keychains'],
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
  label: 'Keychains · who I am',
  title: 'Keychains.',
  items: ['vietnam', 'aodai', 'books', 'trails', 'data', 'baking'],
  labels: {
    vietnam: 'Vietnam',
    aodai: 'Áo dài',
    books: 'Books',
    trails: 'Trails',
    data: 'Data + product',
    baking: 'Baking',
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
  label: 'Film roll · my journey so far',
  title: 'Film roll.',
  frames: [
    {
      year: '2024', type: 'pro', place: 'Elevance Health', role: 'Business Information Analyst Intern',
      dates: 'June 2024 – August 2024', photo: '/photos/elevance-1.jpeg',
      line: 'My first internship, still green: I learned how corporate works one SQL ticket at a time, and that one meeting can beat a week of emails.',
    },
    {
      year: '2024', type: 'extra', place: 'Investment Club at USF', role: 'Professional Development Associate',
      dates: 'May 2024 – May 2025', photo: '/photos/onepager-1-preview.jpg',
      line: 'My first time leading: I used data to see how the club really ran, then led with empathy and gave my analysts real ownership.',
    },
    {
      year: '2024', type: 'pro', place: 'USF Judy Genshaft Honors College', role: 'Product Analyst',
      dates: 'June 2024 – Present', photo: '/photos/honors-1.jpeg',
      line: 'Here my data got real users: I listened to advisors and faculty first, then built what they would actually open every week.',
    },
    {
      year: '2025', type: 'extra', place: 'GDG on Campus @ USF', role: 'Community Chair',
      dates: 'January 2025 – Present', photo: '/photos/devfest-photo-1.jpg',
      line: 'Leadership got bigger: I trained 50 volunteers and turned plans into real programs for 350 people.',
    },
    {
      year: '2025', type: 'pro', place: 'VSP Vision', role: 'Business Intelligence Analyst Intern',
      dates: 'June 2025 – August 2025', photo: '/photos/vsp-1.jpeg',
      line: 'I started treating dashboards like products: I asked leaders what they used, then cut 9 tabs down to 2.',
    },
    {
      year: '2026', type: 'pro', place: 'Micron Technology', role: 'Technical Product Manager Intern',
      dates: 'May 2026 – August 2026', photo: '/photos/micron-1.jpeg',
      line: 'The dots connected: as a PM, I built AI agents and workflows from 0 to 1, and learned that killing v1 is part of shipping.',
    },
  ],
};

export const LETTERS = {
  label: 'Letters · voices in the room',
  title: 'Letters.',
  letters: [
    {
      no: '01', stamp: 'BOISE · 2026', name: 'Jyotika Roychowdhury',
      title: 'Staff Program Manager, PMO', org: 'Micron Technology', pdf: '/micron-letter.pdf',
      quote: 'She did a great job of balancing the technical details while keeping the broader objectives and priorities in mind. Her resourcefulness, tenacity and dedication are commendable.',
    },
    {
      no: '02', stamp: 'VSP · 2025', name: 'Brianne Melrose',
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

export const MAGNETS = {
  label: 'Magnets · personal projects',
  title: 'Magnets.',
  projects: [
    {
      name: 'Quiescent', status: 'Currently building', meta: 'Technical Product Manager · Team of 5',
      dates: 'September 2026 – Present', image: '/photos/quiescent-1.jpeg',
      line: 'A Chrome extension helping readers track and revisit what they read.',
      links: [
        { label: 'GitHub', href: 'https://github.com/quiescent-app/quiescent' },
        { label: 'View deck', href: '/readify-deck.pdf' },
      ],
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
  label: 'Bookshelf · the reading corner',
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
  cta: 'Say hello',
};
