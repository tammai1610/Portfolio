import React, { useMemo, useState, useEffect } from 'react';
import {
  Book,
  Mail,
  Linkedin,
  Github,
  FileText,
  Coffee,
  Circle,
  Users,
  Award,
  Briefcase,
  Code,
  UtensilsCrossed
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optional: highlight active section based on scroll
  useEffect(() => {
    const ids = ['home', 'about', 'education', 'experience', 'projects', 'books', 'contact'];
    const handler = () => {
      const y = window.scrollY + 120;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;
        if (el.offsetTop <= y) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const sections = {
    home: 'Home',
    about: 'About',
    education: 'Education',
    experience: 'Experience',
    projects: 'Projects',
    books: 'Books',
    contact: 'Contact'
  };

  // Floating dots animation (memoized so they don't re-randomize on rerenders)
  const dots = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5
      })),
    []
  );

  // Update these with your real links
  const LINKS = {
    email: 'mailto:your.email@usf.edu', // UPDATE THIS
    resume: '/resume.pdf', // UPDATE THIS - place your resume PDF in the public folder
    linkedin: 'https://linkedin.com/in/yourprofile', // UPDATE THIS
    github: 'https://github.com/yourusername' // UPDATE THIS
  };

  const coursework = [
    'Big Data for AI & Analytics',
    'Database Management & SQL',
    'Data Mining & Predictive Analytics',
    'Data Visualization',
    'Statistical Analysis in R',
  ];

  const projects = [
    {
      title: 'Honors College Analytics Suite',
      subtitle: 'Power BI Data Modelling',
      tech: 'Power BI, SQL, Data Modeling',
      dots: {
        scattered:
          'Built dashboards to help advisors and leadership spot patterns early (probation risk, engagement signals, and cohort trends).',
        connecting:
          'Created clean datasets with SQL (joins, CTEs, validations) and designed a consistent semantic model for self-serve reporting.',
        clear:
          'Improved decision-making speed and reduced manual tracking—supporting earlier interventions and better student outcomes.'
      }
    },
    {
      title: 'Airbnb dbt Project',
      subtitle: 'Analytics Engineering',
      tech: 'Python, SQL, Snowflake, dbt',
      dots: {
        scattered:
          'Raw listings + booking data was messy: duplicates, inconsistent formats, unclear business definitions.',
        connecting:
          'Modeled the warehouse with dbt, wrote tests, and built a reliable mart layer aligned to stakeholder questions.',
        clear:
          'Created trustworthy metrics (occupancy, revenue, seasonality) that are easy to reuse across dashboards.'
      }
    },
    {
      title: 'Student Analytics',
      subtitle: 'Data Analysis',
      tech: 'Databricks, SQL, Python',
      dots: {
        scattered:
          'Multiple sources captured student behavior and outcomes but lived in silos.',
        connecting:
          'Used notebooks to explore, clean, and join datasets; built repeatable queries for key cohorts.',
        clear:
          'Produced insights leaders could act on—especially around engagement patterns and risk signals.'
      }
    },
    {
      title: 'Spark ETL Pipeline',
      subtitle: 'Building Python ETL Pipeline',
      tech: 'Python, Apache Spark, ETL',
      dots: {
        scattered:
          'Large datasets needed faster processing and a consistent pipeline structure.',
        connecting:
          'Built transformations in Spark and structured the pipeline around reusable, testable steps.',
        clear:
          'Reduced processing time and made outputs more consistent for downstream reporting.'
      }
    }
  ];

  const books = [
    {
      title: 'Die with Zero',
      author: 'Bill Perkins',
      insight:
        'A reminder to be intentional with time and energy—optimize for meaningful experiences, not just accumulating more.'
    },
    {
      title: 'The Courage to be Disliked',
      author: 'Ichiro Kishimi & Fumitake Koga',
      insight:
        'Helped me separate what I can control from what I can\'t—and communicate with more calm confidence.'
    },
    {
      title: 'Fundamentals of Data Engineering',
      author: 'Joe Reis & Matt Housley',
      insight:
        'Taught me to understand data ecosystems holistically and think about data infrastructure strategically.'
    },
    {
      title: 'My Friends',
      author: 'Fredrik Backman',
      insight:
        'A thoughtful lens on relationships, belonging, and what we owe to the people who shape us.'
    },
    {
      title: '7 Habits of Highly Effective People',
      author: 'Stephen Covey',
      insight:
        'Shaped how I work and collaborate effectively—and honestly, just how to be a better person.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 text-stone-800 relative overflow-hidden">
      {/* Floating Dots Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full bg-stone-300/20"
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              transform: `translateY(${scrollY * 0.1 * (dot.id % 3)}px)`,
              transition: 'transform 0.3s ease-out',
              animationDelay: `${dot.delay}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <Circle className="w-2 h-2 fill-amber-600 text-amber-600" />
              <Circle className="w-2 h-2 fill-stone-400 text-stone-400" />
              <Circle className="w-2 h-2 fill-amber-600 text-amber-600" />
            </div>
            <span className="ml-3 font-serif text-lg text-stone-700">Tam Mai</span>
          </div>

          <div className="hidden md:flex gap-6 items-center">
            {Object.entries(sections).map(([key, label]) => (
              <a
                key={key}
                href={`#${key}`}
                className={`text-sm transition-colors duration-300 ${
                  activeSection === key ? 'text-amber-800' : 'text-stone-600 hover:text-amber-700'
                }`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-xs px-3 py-1 rounded-full border border-stone-300 hover:bg-stone-100 transition-all duration-300"
              aria-label="Toggle sound"
            >
              {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="mb-6 flex justify-center gap-2 flex-nowrap">
              {[...Array(7)].map((_, i) => (
                <Circle
                  key={i}
                  className="w-3 h-3 text-amber-600/40 fill-amber-600/40 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>

            {/* Profile Photo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-stone-400/20 blur-xl"></div>
                
                {/* Photo container */}
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img 
                    src="/profile-photo.jpg" 
                    alt="Tam Mai" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Small accent dots around photo */}
                <Circle className="absolute -top-2 -right-2 w-4 h-4 fill-amber-600 text-amber-600" />
                <Circle className="absolute -bottom-2 -left-2 w-3 h-3 fill-stone-400 text-stone-400" />
              </div>
            </div>

            <h1 className="font-serif text-6xl mb-6 text-stone-800 leading-tight">
              Hi, I&apos;m <span className="text-amber-700">Tam Mai</span>
            </h1>

            <p className="text-2xl text-stone-600 mb-4 font-light">I connect the dots between data systems</p>
            <p className="text-2xl text-stone-600 mb-12 font-light">and the people who need them</p>

            <p className="text-base text-stone-500 mb-8 max-w-2xl mx-auto">
              Business Analytics Junior at USF | Aspiring Analytics Engineer
            </p>

            <a
              href="#about"
              className="inline-block px-8 py-3 bg-amber-700 text-stone-50 rounded-full hover:bg-amber-800 transition-all duration-300 transform hover:scale-105"
            >
              Learn more about me
            </a>

            {/* Mouse indicator - Fixed position below button */}
            <div className="mt-12 flex justify-center animate-bounce">
              <div className="w-6 h-10 border-2 border-stone-300 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-stone-400 rounded-full"></div>
              </div>
            </div>
            </div>
            </section>
  

      {/* About Section */}
      <section id="about" className="min-h-screen py-24 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex gap-1">
              <Circle className="w-2 h-2 fill-amber-600 text-amber-600" />
              <Circle className="w-2 h-2 fill-stone-400 text-stone-400" />
            </div>
            <h2 className="font-serif text-4xl text-stone-800">About Me</h2>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-stone-200/50 shadow-xl">
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p className="text-lg">
                I collect patterns instinctively. My energy peaks in the morning and drains at night—so I schedule
                my hardest work before noon. The campus coffee shop is always packed at 2pm Tuesdays—so I go at 3pm
                instead. At the Honors College, I spotted that probationary students shared two patterns: low GPAs and
                minimal advisor contact, which helped us intervene earlier. Connecting dots helps me understand myself,
                optimize my routines, and build better systems for others.
              </p>

              <p className="text-2xl font-serif text-stone-700 my-8 leading-relaxed">
                I&apos;m Tam Mai, an incoming Business Analytics senior at the University of South Florida. I aim to become an
                analytics engineer who builds scalable data systems while partnering with stakeholders to deliver
                insights they can act on.
              </p>

              <div className="my-8 border-l-2 border-amber-600/30 pl-6 space-y-6">
                <h3 className="font-serif text-xl text-stone-800 mb-4">How I got here:</h3>

                <div>
                  <p className="font-semibold text-stone-800 mb-2">Started in my first internship:</p>
                  <p>
                    I learned to work smarter, not harder. Instead of waiting days for ticket responses and filling time
                    with more tickets, I started organizing quick 30-minute cross-functional meetings. Getting everyone
                    in one room saved hours of back-and-forth emails and duplicate work. That&apos;s when I understood that
                    productivity isn&apos;t about staying busy, it&apos;s about managing time strategically.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-stone-800 mb-2">Refined through feedback:</p>
                  <p>
                    Every project is a new challenge that pushes me to improve. I build small, test early, and iterate
                    based on what people actually use. Each one exposes me to different data solutions and helps me refine
                    my technical approach.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-stone-800 mb-2">Reinforced by reading:</p>
                  <p>
                    Books like <em>Fundamentals of Data Engineering</em> taught me to understand data ecosystems holistically;
                    <em> The 7 Habits of Highly Effective People</em> shaped how I work and collaborate effectively—and honestly,
                    just how to be a better person.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                  <h4 className="font-serif text-lg text-stone-800 mb-3">Languages</h4>
                  <p className="text-sm">SQL (HackerRank Advanced Certified), Python (NumPy, Pandas, Matplotlib, Seaborn, Polars), R.</p>
                </div>
                <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                  <h4 className="font-serif text-lg text-stone-800 mb-3">BI & Visualization</h4>
                  <p className="text-sm">Power BI, Tableau, AWS Quicksight, Excel. </p>
                </div>
                <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                  <h4 className="font-serif text-lg text-stone-800 mb-3">Data Stack</h4>
                  <p className="text-sm">Databricks, Snowflake, AWS (S3, Lambda, Athena), dbt. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Leadership Section */}
      <section id="education" className="py-24 bg-white/40 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-amber-700" />
            <h2 className="font-serif text-4xl text-stone-800">Education & Leadership</h2>
          </div>

          {/* Education */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-stone-200/50 mb-8 shadow-xl">
            <div className="flex justify-between items-start mb-6 gap-6">
              <div>
                <h3 className="font-serif text-2xl text-stone-800">University of South Florida</h3>
                <p className="text-amber-700 text-lg">B.S. in Business Analytics</p>
              </div>
              <div className="text-right">
                <p className="text-stone-600">Expected: May 2027</p>
                <p className="text-lg font-semibold text-stone-800">GPA: 3.92/4.0</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-stone-800 mb-3">Relevant Coursework:</h4>
              <div className="flex flex-wrap gap-2">
                {coursework.map((course, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-amber-50 rounded-full text-sm text-stone-700 border border-amber-100"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Leadership */}
          <h3 className="font-serif text-2xl text-stone-800 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-700" />
            Campus Involvement
          </h3>

          <div className="space-y-6">
            {/* GDG */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4 gap-6">
                <div>
                  <h4 className="font-serif text-xl text-stone-800">Community Chair</h4>
                  <p className="text-amber-700">Google Developer Group on Campus at USF</p>
                </div>
                <span className="text-sm text-stone-500">Jan 2025 - Present</span>
              </div>
              <div className="mb-4">

          {/* Photo Grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <img 
              src="/devfest-photo-1.jpg" 
              alt="DevFest 2025" 
              className="w-full h-48 object-cover rounded-xl border border-amber-100"
              loading="eager"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
            <img 
              src="/devfest-photo-2.jpg" 
              alt="DevFest Conference" 
              className="w-full h-48 object-cover rounded-xl border border-amber-100"
              loading="eager"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
          </div>
          
          {/* Links */}
          <div className="flex gap-3 text-xs text-center justify-center">
            <a href="https://devfesttampabay.com/" className="text-amber-700 hover:underline">
              devfesttampabay.com
            </a>
            <a href="https://hackusf.com/" className="text-amber-700 hover:underline">
              hackusf.com
            </a>
          </div>
        </div>

              <ul className="space-y-2 text-stone-600 text-sm">
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Organized DevFest 2025 conference serving 230 participants, coordinating 4 cross-functional teams
                    (marketing, finance, technology, professional development) to secure 9 speakers and achieve 36%
                    attendance growth year-over-year.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Leading HackUSF 2026 hackathon planning for 400 expected participants, managing 8-member team using
                    Microsoft Planner and collaborating across marketing, finance, and technology teams to ensure milestone
                    delivery.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Developed and delivered 6 sponsorship pitch training workshops, improving team outreach effectiveness
                    5x (0.75% → 3.75% conversion rate) through structured Excel/Google Sheets tracking and presentation
                    coaching.
                  </span>
                </li>
              </ul>
            </div>

            {/* Investment Club */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4 gap-6">
                <div>
                  <h4 className="font-serif text-xl text-stone-800">Professional Development Associate</h4>
                  <p className="text-amber-700">Investment Club at USF</p>
                </div>
                <span className="text-sm text-stone-500">May 2024 - May 2025</span>
              </div>

              <div className="mb-4">
              {/* PDF Preview Grid */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <a href="/investment-club-onepager-1.pdf" target="_blank" rel="noopener noreferrer" className="group">
                  <img 
                    src="/onepager-1-preview.jpg" 
                    alt="Networking & Behavioral Strategies" 
                    className="w-full h-40 object-cover rounded-lg border border-amber-100 group-hover:border-amber-300 transition-all shadow-sm hover:shadow-md"
                  />
                  <p className="text-xs text-stone-500 text-center mt-1">Networking Strategies</p>
                </a>
                
                <a href="/investment-club-onepager-2.pdf" target="_blank" rel="noopener noreferrer" className="group">
                  <img 
                    src="/onepager-2-preview.jpg" 
                    alt="Technical Finance Strategies" 
                    className="w-full h-40 object-cover rounded-lg border border-amber-100 group-hover:border-amber-300 transition-all shadow-sm hover:shadow-md"
                  />
                  <p className="text-xs text-stone-500 text-center mt-1">Technical Finance Interview Strategies</p>
                </a>
              </div>
              
              <p className="text-xs text-stone-500 text-center italic">Click to view full one-pagers</p>
            </div>

              <ul className="space-y-2 text-stone-600 text-sm">
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Analyzed 100+ attendees per event using Excel dashboards to identify top 5% frequent participants,
                    highlighting potential candidates for future club applications.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Led 2 analysts to develop data-backed one-pagers on networking, behavioral, and technical finance
                    interview strategies for 1,800+ members using PowerPoint.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-8 h-8 text-amber-700" />
            <h2 className="font-serif text-4xl text-stone-800">Experience</h2>
          </div>

          <div className="space-y-8">
            {/* Honors College */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4 gap-6">
                <div>
                  <h3 className="font-serif text-2xl text-stone-800">Business Intelligence Developer</h3>
                  <p className="text-amber-700">Judy Genshaft Honors College, University of South Florida</p>
                </div>
                <span className="text-sm text-stone-500">June 2024 - Present</span>
              </div>

              <ul className="space-y-3 text-stone-600">
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Develop <strong className="text-stone-800">15 Power BI dashboards</strong> analyzing <strong className="text-stone-800">100K+ student records</strong> using star schema models and DAX, partnering with <strong className="text-stone-800">4 cross-functional teams</strong> to define requirements and enable self-service reporting exceeding quality standards.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Validate dashboard metrics through <strong className="text-stone-800">50+ SQL queries</strong> in DBeaver, cross-checking all visuals and DAX calculations against source data to ensure data integrity.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Transform <strong className="text-stone-800">5 leadership ad-hoc requests</strong> into automated dashboards within <strong className="text-amber-700">48-hour deadlines</strong>, eliminating recurring manual reporting work and enabling faster executive decision-making.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Create <strong className="text-stone-800">15 in-dashboard user guides</strong> and <strong className="text-stone-800">15 technical documentation files</strong> on GitHub, reducing onboarding time by <strong className="text-amber-700">2 weeks</strong> and enabling <strong className="text-amber-700">30% increase</strong> in self-service adoption across IT and advisory teams.
                  </span>
                </li>
              </ul>
            </div>

            {/* VSP Vision */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4 gap-6">
                <div>
                  <h3 className="font-serif text-2xl text-stone-800">Business Intelligence Analyst Intern</h3>
                  <p className="text-amber-700">VSP Vision</p>
                </div>
                <span className="text-sm text-stone-500">June 2025 - August 2025</span>
              </div>

              <ul className="space-y-3 text-stone-600">
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Built <strong className="text-stone-800">automated expense reconciliation dashboard</strong> consolidating <strong className="text-stone-800">40 cost centers</strong> across <strong className="text-stone-800">3 ERP systems</strong> using Power Query M Code and DAX, eliminating <strong className="text-amber-700">20 hours/month</strong> manual work.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Redesigned <strong className="text-stone-800">9-tab resource forecasting dashboard</strong> into <strong className="text-stone-800">2 streamlined role-based solutions</strong> serving 7 executives and 25 managers, reducing navigation complexity and improving decision-making speed through targeted metrics.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Performed exploratory analysis on <strong className="text-stone-800">17K+ financial records</strong> using Excel, identifying <strong className="text-stone-800">±15% variance patterns</strong> and anomalies that flagged <strong className="text-amber-700">$2M in expense discrepancies</strong> for leadership review.
                  </span>
                </li>
              </ul>
            </div>

            {/* Elevance Health */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4 gap-6">
                <div>
                  <h3 className="font-serif text-2xl text-stone-800">Business Information Analyst Intern</h3>
                  <p className="text-amber-700">Elevance Health</p>
                </div>
                <span className="text-sm text-stone-500">Summer 2023</span>
              </div>

              <ul className="space-y-3 text-stone-600">
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Resolved <strong className="text-stone-800">10 reporting tickets</strong> processing <strong className="text-stone-800">1.8M claim records</strong> through SQL stored procedures with complex joins and CTEs, restoring data accuracy for <strong className="text-stone-800">15 claims operations stakeholders</strong>.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Initiated cross-functional meetings to replace asynchronous ticket communications, reducing resolution time by <strong className="text-amber-700">30%</strong>.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>
                    Enhanced claims monitoring dashboard processing <strong className="text-stone-800">100K+ daily records</strong> by optimizing DAX measures and date filtering logic, improving load time while maintaining 30/60/90-day rolling windows for executive risk assessment.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white/40 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Code className="w-8 h-8 text-amber-700" />
            <h2 className="font-serif text-4xl text-stone-800">Projects</h2>
          </div>

          <div className="space-y-12">
            {projects.map((project, i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 border border-stone-200/50 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-serif text-3xl text-stone-800 mb-2">{project.title}</h3>
                <p className="text-amber-700 mb-6">{project.subtitle}</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
                      <Circle className="w-2 h-2 fill-amber-600" />
                      THE SCATTERED DOTS
                    </h4>
                    <p className="text-stone-600 pl-4">{project.dots.scattered}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
                      <Circle className="w-2 h-2 fill-amber-600" />
                      CONNECTING THE DOTS
                    </h4>
                    <p className="text-stone-600 pl-4">{project.dots.connecting}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
                      <Circle className="w-2 h-2 fill-amber-600" />
                      THE CLEAR PICTURE
                    </h4>
                    <p className="text-stone-600 pl-4">{project.dots.clear}</p>
                  </div>

                  <div className="border-t border-stone-200 pt-4 flex flex-wrap gap-4 text-sm text-stone-500">
                    <span>{project.tech}</span>
                    <span>•</span>
                    <a href="#" className="text-amber-700 hover:underline">
                      View Details →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-24 bg-gradient-to-br from-amber-50/50 to-stone-50 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Book className="w-8 h-8 text-amber-700" />
            <h2 className="font-serif text-4xl text-stone-800">What I&apos;m Reading</h2>
          </div>

          <p className="text-stone-600 mb-12 text-lg">Books that shape how I think and work</p>

          <div className="grid md:grid-cols-2 gap-8">
            {books.map((book, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-200/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-3 mb-4">
                  <Book className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-xl text-stone-800">{book.title}</h3>
                    <p className="text-sm text-stone-500 italic">{book.author}</p>
                  </div>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">{book.insight}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-2xl text-stone-800 mb-6 flex items-center gap-2">
              <Coffee className="w-6 h-6 text-amber-700" />
              Off the Clock
            </h3>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50">
              <div className="mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <UtensilsCrossed className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-stone-800 mb-2">Vietnamese Cuisine & Home Cooking</h4>
                    <p className="text-stone-600 mb-4">
                      I love cooking—the kind of meals that feel like home, where warmth and gathering come together. 
                      I'm still on my way to discovering other cuisines, but there's something special about creating moments 
                      around a shared table.
                    </p>
                    <p className="text-stone-600 text-sm italic">📸 Insert your cooking photos here</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50/60 rounded-2xl px-6 py-4 border border-amber-100">
                <p className="text-sm text-stone-600">
                  You might find me at a coffee shop sipping matcha and reading books with my headphones on—or I could be 
                  the friend walking down the street every weekend, yapping with the girls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex gap-1">
              <Circle className="w-2 h-2 fill-amber-600 text-amber-600" />
              <Circle className="w-2 h-2 fill-stone-400 text-stone-400" />
            </div>
            <h2 className="font-serif text-4xl text-stone-800">Let&apos;s Connect</h2>
          </div>

          <p className="text-stone-600 mb-12 text-lg max-w-2xl mx-auto">
            Looking for someone who can bridge technical work and business impact? Let&apos;s talk.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <a
              href={LINKS.email}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-700 text-stone-50 rounded-full hover:bg-amber-800 transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <a
              href={LINKS.resume}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-stone-300 text-stone-700 rounded-full hover:bg-stone-50 transition-all duration-300"
            >
              <FileText className="w-5 h-5" />
              Resume
            </a>
          </div>

          <div className="flex justify-center gap-6 text-stone-500">
            <a
              href={LINKS.linkedin}
              className="hover:text-amber-700 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={LINKS.github}
              className="hover:text-amber-700 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>

          <p className="mt-10 text-xs text-stone-400">© {new Date().getFullYear()} Tam Mai</p>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
