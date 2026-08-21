// Central content for the portfolio — edit here to update copy across the site.

const base = import.meta.env.BASE_URL

export const profile = {
  name: 'Ei Pyae Kyaw',
  nickname: 'Kathryn Ei',
  roles: [
    'Software Developer',
    'RPA Developer',
    'IT Technician',
    'Web Developer',
  ],
  location: 'Singapore',
  phone: '+65 8085 4754',
  whatsapp: '6580854754',
  email: 'eipyae.1112004@gmail.com',
  linkedin: 'https://linkedin.com/in/ei-pyae-kyaw',
  github: 'https://github.com/eipyae1112004-ui',
  tagline:
    "I build software that quietly makes people's lives easier — automating the tedious, connecting the disconnected, and turning real-world problems into working products.",
  arcText: 'We believe every line of code should make someone’s day a little easier',
  objective:
"My belief is simple: the best way to understand systems is to build them, and the best reason to build is to make someone's life easier. Full-stack, RPA, and embedded developer solving real-world friction."}

export const about = {
  bio: "Hello! I'm Ei Pyae Kyaw, also known as Kathryn Ei — a developer who genuinely enjoys the moment a messy, manual process turns into something clean and automatic. From automating audits at KLP LLP to building facial recognition, robotics, and ML projects on the side, I move fluidly between RPA, full-stack web, and embedded systems, always chasing tech that quietly makes someone's day easier.",
  education: {
    degree: 'Diploma in Computer Engineering',
    school: 'Singapore Polytechnic',
    period: '2023 — 2026',
    note: 'Specialized in Computer Application',
  },
  interests: ['Automation', 'New Tech', 'Gadgets', 'Problem Solving', 'Robotics', 'UI/UX'],
  philosophy: {
    title: 'How I think about building things',
    points: [
      {
        heading: 'Solve real problems first',
        text: "Code is just the vehicle, not the destination. I look for the places where life gets unnecessarily frustrating—a bottlenecked audit, a chaotic system — and work backwards to the tech.",
      },
      {
        heading: 'Automate the boring, protect the human',
        text: "I build automations to eliminate cognitive clutter, not human value. The goal is always to hand people back their time, focus, and energy for the work and connections that actually matter.",
      },
      {
        heading: 'Learn by building, not just reading',
        text: 'Tutorials build familiarity, but shipping builds intuition. Whether wiring edge devices for real-time vision or architecting full-stack platforms, I believe you only truly understand how a system behaves when you get your hands dirty and make it work in the real world.',
      },
      {
        heading: 'Polish is respect in disguise',
        text: "The smallest details—clean database constraints, thoughtful UI spacing — are what separate a fragile prototype from a reliable tool. Caring about the invisible craft is how I show respect to the person on the other end of the screen.",
      },
    ],
  },
  lifestyle: {
    title: 'Beyond the screen',
    intro:
      "Dear whoever's reading this — thanks for making it this far. Beyond the screen, I'm still pretty much the same person you've seen so far: curious, a little restless, and happiest when something I've touched works a bit better than before.",
    steps: [
      {
        title: 'Curiosity',
        text: "Outside of coding, I'm the person who reorganizes a workflow just because it feels inefficient. I'm curious by default — new tools, new frameworks, new gadgets, I want to take them apart and understand how they tick.",
      },
      {
        title: 'Care',
        text: "I'm quietly proud when an automation saves someone even ten minutes. I care about building technology that considers real people at the edges — seniors, small teams, everyday users who just want something that works.",
      },
    ],
  },
}

export const coreSkills = [
  { name: 'Problem Solving & Adaptability', level: 95 },
  { name: 'Attention to Detail', level: 92 },
  { name: 'Fast Learning', level: 94 },
  { name: 'Professional Communication', level: 88 },
  { name: 'Team Collaboration', level: 90 },
  { name: 'Systematic Debugging', level: 93 },
]

export const technicalSkills = {
  proficient: [
    'Java (Android)',
    'Python',
    'C++',
    'JavaScript',
    'HTML',
    'CSS',
    'React.js',
    'Angular',
    'Node.js',
    'SQL (MySQL / PostgreSQL)',
    'PHP',
    'Kotlin',
    'Spring Framework',
    'Flask',
  ],
  tools: [
    'Docker',
    'Linux',
    'Git',
    'GitHub',
    'AWS',
    'Azure',
    'CI/CD',
    'DevOps',
    'Firebase',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Roboflow',
    'UiPath',
    'Excel VBA',
    'RESTful APIs',
    'PowerBI',
    'Arduino / ESP32',
    'Robotics',
  ],
}

export const designTools = [
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Sketch',
  'Canva',
  'UI/UX Design',
  'Responsive Layouts',
  'Design Systems',
  'Prototyping',
  'User Research Basics',
]

export const projects = [
  {
    id: 'agentic-rpa-assistant',
    title: 'Agentic RPA Assistant',
    subtitle: 'LLM-Driven Browser Automation',
    tags: ['Python', 'Claude API', 'Playwright', 'Agentic AI'],
    summary:
      'An AI agent that drives a real browser to complete tasks from plain-English instructions, deciding each step itself.',
    description:
      "A proof-of-concept for agentic RPA: instead of scripting a browser workflow step by step, you describe a task in plain English — for example, \"go to Wikipedia, search for Alan Turing, and tell me his date of birth\" — and Claude figures out and drives a real Chromium browser itself, click by click. Built six browser tools (navigate, read text, find interactive elements, click, fill, press key) that Claude calls through the Anthropic SDK's tool-use loop, with each visible element tagged a reliable selector so Claude never has to guess page-specific CSS. The loop is capped at 15 steps per task as a safety limit, and finishes with a plain-text answer once Claude decides the task is done.",
    github: 'https://github.com/eipyae1112004-ui/agentic-rpa-assistant',
    year: '2026',
    media: [],
  },
  {
    id: 'audit-automation',
    title: 'Web-based Audit Automation System',
    subtitle: 'RPA Internship — KLP LLP',
    tags: ['React.js', 'Python', 'SQL', 'Docker', 'UiPath'],
    summary:
      'A full-stack platform extending manual audit workflows into an automated, web-based system with AI integration.',
    description:
      'Engineered a full-stack audit automation platform using React.js, Python, SQL and Docker to extend RPA workflows with a web-based UI and AI integration. Automated repetitive manual audit workflows with UiPath and Excel VBA, cutting processing time by roughly 40% and eliminating recurring manual data entry. Architected RESTful backend APIs in Python to automate audit data flows for auditors and management teams, and optimised relational SQL database models for complex multi-entity audit data to ensure high data integrity and long-term query performance.',
    github: 'https://github.com/eipyae1112004-ui/audit-automation-system',
    year: '2025',
    media: [],
  },
  {
    id: 'facial-recognition',
    title: 'Real-time Facial Recognition Access System',
    subtitle: 'Edge AI · 5G · AIoT',
    tags: ['Raspberry Pi', 'RTSP', '5G', 'MEC', 'Computer Vision'],
    summary:
      'Live facial-recognition access control streamed over 5G and processed at the network edge for ultra-low latency.',
    description:
      'Integrated a Pi Camera with Raspberry Pi, configuring a command-line setup to stream live H.264 compressed video via RTSP over a 5G network. Optimised processing by performing facial recognition at the Multi-access Edge Computing (MEC) layer, achieving ultra-low latency compared to traditional cloud processing, and demonstrated the benefits of 5G for AIoT — including 10x faster data speeds and support for high device density in smart infrastructure.',
    github: 'https://github.com/eipyae1112004-ui/facial-recognition-access',
    year: '2024',
  },
  {
    id: 'ev-carousel',
    title: 'EV Carousel — Rotating Parking with Integrated EV Charging',
    subtitle: 'Smart Urban Infrastructure',
    tags: ['Arduino', 'IR Sensors', 'Sustainability', 'Embedded Systems'],
    summary:
      'A vertical carousel parking concept combining space efficiency with seamless EV charging for dense cities.',
    description:
      "Deployed microcontrollers, utilisation sensors, IR sensors, and LCD interfaces to enable real-time parking management, efficient space utilisation, and user-friendly interactions in compact urban areas. Developed an EV-friendly vertical carousel parking system to optimise urban space, integrate seamless EV charging, and align with Singapore's Green Plan 2030 for sustainable transportation (SDG 7 & 11).",
    github: 'https://github.com/eipyae1112004-ui/ev-carousel-parking',
    year: '2024',
  },
  {
    id: 'food-classification',
    title: 'ML-based Food Image Classification System',
    subtitle: 'Deep Learning · Computer Vision',
    tags: ['TensorFlow', 'Keras', 'CNN', 'Python'],
    summary:
      'A custom CNN reaching 92.8% test accuracy, deployed as an interactive web app with live camera inference.',
    description:
      'Engineered a custom CNN image-classification pipeline using Keras/TensorFlow to classify multi-class food items and unknown baselines with 92.8% test accuracy. Architected a ~1.24M parameter deep learning model using the Keras Functional API — incorporating batch normalisation, double convolution layers, and global average pooling to balance model capacity and generalisation — then evaluated it against pre-trained architectures (ResNet50, MobileNetV2, InceptionV3) and deployed an interactive web app with live camera feed inference.',
    github: 'https://github.com/eipyae1112004-ui/food-image-classification',
    year: '2024',
    media: [
      { type: 'video', src: `${base}media/food-classification/live-camera-demo.mp4`, label: 'Live Camera Demo' },
      { type: 'video', src: `${base}media/food-classification/upload-image-demo.mp4`, label: 'Upload Image Demo' },
    ],
  },
  {
    id: 'sp-bot',
    title: 'SP-Bot — Embedded Assistive Robot for Senior Care',
    subtitle: 'Embedded Systems · Social Good',
    tags: ['C++', 'Arduino', 'Ultrasonic Sensors', 'Assistive Tech'],
    summary:
      'An Arduino-based companion robot designed to ease loneliness and support medication adherence in seniors.',
    description:
      'Designed and built an Arduino-based assistive robot to support seniors by reducing loneliness and improving medication adherence. Developed C++ embedded control logic for the robot and integrated ultrasonic sensors, IR sensors, and an LCD interface for real-time interaction and space awareness — first prize winner at the SP Robotics Innovation & Technology Enterprise Championship.',
    github: 'https://github.com/eipyae1112004-ui/sp-bot-assistive-robot',
    year: '2023',
    media: [
      { type: 'video', src: `${base}media/sp-bot/demo.mp4`, label: 'SP-Bot Demo' },
    ],
  },
  {
    id: 'unicycle',
    title: 'UniCycle — Web & Mobile App for Recycling Academic Materials',
    subtitle: 'Full-Stack Web & Mobile',
    tags: ['HTML/CSS/JS', 'Firebase', 'Java', 'Figma', 'RESTful APIs'],
    summary:
      'A web and mobile platform helping students recycle and resell academic materials, from browsing to checkout.',
    description:
      'Built the web platform (HTML, CSS, JavaScript) including the landing page, home page, payment flow, and shopping features, plus backend infrastructure using Firebase, Python, and SQL to support both the app and web platforms. Designed Figma UI mockups for the mobile app and guided teammates on interface improvements; the companion Android app was built with Java, RESTful APIs, Gradle, and responsive XML layouts, featuring QR code scanning and payment integration.',
    github: 'https://github.com/eipyae1112004-ui/unicycle',
    year: '2023',
    media: [
      { type: 'video', src: `${base}media/unicycle/demo.mp4`, label: 'UniCycle Demo' },
    ],
  },
]

export const certifications = [
  'Docker Foundations Professional Certificate — LinkedIn x Docker',
  'Exploring a Career in User Experience Design — LinkedIn',
  'Google AI Essentials Specialization — Google',
  'First Prize — SP Robotics Innovation & Technology Enterprise Championship',
]
