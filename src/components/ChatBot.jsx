import { useEffect, useRef, useState } from 'react'
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi'
import { profile, coreSkills, technicalSkills, designTools, certifications, projects } from '../data'
import logo from '../assets/logo.png'
import './ChatBot.css'

const SUGGESTIONS = [
  "What's she good at?",
  'Show me her projects',
  "Where'd she study?",
  'How do I reach her?',
]

function projectList() {
  return projects
    .map((p) => `• ${p.title} (${p.year})`)
    .join('\n')
}

// Common words long enough to pass the length filter but generic enough to false-match
// a project by accident (e.g. "real" inside "Real-time Facial Recognition" when someone
// just asks "are you real?").
const STOPWORDS = new Set([
  'about', 'tell', 'what', 'have', 'been', 'from', 'then', 'than', 'will', 'does', 'know',
  'want', 'need', 'real', 'made', 'work', 'this', 'that', 'person', 'human', 'people',
  'could', 'would', 'should', 'your', 'their', 'being', 'there', 'which',
])

function findProject(text) {
  const words = text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 4 && !STOPWORDS.has(w))
  return projects.find((p) => {
    const haystack = `${p.id} ${p.title} ${p.subtitle} ${p.tags.join(' ')}`.toLowerCase()
    return words.some((word) => haystack.includes(word))
  })
}

function projectReply(project) {
  return `${project.title} (${project.year})! ${project.summary} I used ${project.tags.join(', ')} for this one.${project.github ? ` Code's here if you want to peek: ${project.github}` : ''}`
}

// All responses speak AS Kathryn (first person) — she's an AI stand-in for me, not a
// separate assistant describing me from the outside.
const INTENTS = [
  {
    name: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'yo', 'sup', 'good morning', 'good afternoon', 'good evening'],
    respond: () => 'Heyy, good to meet you! 😊 What do you want to know about me?',
  },
  {
    name: 'thanks',
    keywords: ['thanks', 'thank you', 'thx', 'appreciate', 'nice', 'cool', 'great'],
    respond: () => "You're so welcome! Anything else you wanna ask? 💙",
  },
  {
    name: 'is-ai',
    // A custom predicate instead of fixed phrases: natural phrasing like "are you a real
    // person or an AI?" has words in between that a rigid "are you real" keyword would miss.
    test: (text) => /\bare you\b/.test(text) && /\b(ai|bot|robot|human|real|program|chatbot)\b/.test(text),
    respond: () =>
      "Haha, good question — I'm an AI chatbot version of Kathryn, not literally her typing right now 😄 But everything I tell you about her (me?) is 100% accurate, promise!",
  },
  {
    name: 'education',
    keywords: ['education', 'degree', 'school', 'study', 'studies', 'studying', 'polytechnic', 'diploma', 'university', 'where did she study', "where'd she study"],
    respond: () =>
      "I'm doing a Diploma in Computer Engineering at Singapore Polytechnic (2023–2026), specializing in Computer Application!",
  },
  {
    name: 'experience',
    keywords: ['experience', 'internship', 'intern', 'work experience', 'klp', 'job history', 'worked'],
    respond: () =>
      "I interned as an RPA Developer at KLP LLP — took their audit process from fully manual to a proper web app, and cut processing time by about 40%. Ask me about the 'audit automation' project if you want the full story!",
  },
  {
    name: 'skills',
    keywords: ['skill', 'skills', 'technical', 'programming', 'language', 'languages', 'tech stack', 'stack', 'framework', 'good at', 'know how to'],
    respond: () =>
      `I work across a bunch of stuff honestly — my strongest areas are ${coreSkills.slice(0, 3).map((s) => s.name).join(', ')}. Day-to-day I use ${technicalSkills.proficient.slice(0, 8).join(', ')}, and more. Tools-wise: ${technicalSkills.tools.slice(0, 6).join(', ')}... basically if it compiles, I've probably touched it 😅`,
  },
  {
    name: 'design',
    keywords: ['design', 'ui/ux', 'ux', 'figma', 'design tools'],
    respond: () => `Yep, I do some design work too — ${designTools.join(', ')}. Not purely a code person!`,
  },
  {
    name: 'certifications',
    keywords: ['certificate', 'certification', 'certifications', 'award', 'awards', 'prize', 'championship', 'won'],
    respond: () => `I've got a few! 🏆\n${certifications.map((c) => `• ${c}`).join('\n')}`,
  },
  {
    name: 'resume',
    keywords: ['resume', 'cv', 'download'],
    respond: () => 'Yep! There\'s a Resume button up in the Home section — just click it and it downloads right away.',
  },
  {
    name: 'contact',
    keywords: ['contact', 'email', 'reach', 'hire', 'linkedin', 'phone', 'whatsapp', 'get in touch', 'hire her', 'is she available'],
    respond: () =>
      `Easiest way is email — ${profile.email} — I read those myself! I'm on LinkedIn too (${profile.linkedin.replace('https://', '')}), or WhatsApp at ${profile.phone} if you wanna be quick about it.`,
  },
  {
    name: 'projects',
    keywords: ['project', 'projects', 'built', 'work', 'portfolio items', 'made', 'created'],
    respond: () =>
      `I've built a bunch of things I'm proud of:\n${projectList()}\n\nAsk me about any of these by name and I'll happily talk your ear off, or scroll down to see the demos yourself!`,
  },
  {
    // Checked last on purpose: its keywords ("about her", "who is she", ...) are broad
    // enough to overlap with more specific questions like "tell me about her skills".
    // Placing it last means a tie in keyword score never beats an earlier, more specific intent.
    name: 'who',
    keywords: [
      'who are you', 'who is she', 'who is he', 'who is her', 'who is kathryn', 'who is ei',
      'who is this', 'about you', 'about her', 'about him', 'about kathryn', 'about ei',
      'tell me about her', 'tell me about him', 'tell me about kathryn', 'tell me about ei',
      'introduce yourself', 'introduce her', 'yourself', 'her background', 'background', 'bio',
      'tell me about yourself',
    ],
    respond: () =>
      "That's me! 😄 I'm Ei Pyae Kyaw, also known as Kathryn Ei. I'm the kind of developer who can't leave a messy, manual process alone until I've automated it — I've done RPA work, built facial recognition and robotics projects on the side, and I move pretty fluidly between RPA, full-stack, and embedded systems. Basically: I like tech that quietly makes someone's day easier.",
  },
]

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function matchesKeyword(text, keyword) {
  return new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'i').test(text)
}

function getResponse(rawText) {
  const text = rawText.toLowerCase().trim()
  if (!text) return "Sorry, didn't catch that — could you say it again?"

  const project = findProject(text)
  if (project && /project|tell me|what is|about|explain/.test(text)) {
    return projectReply(project)
  }

  // Each intent scores 1 if it matches at all, not a count of matches — otherwise an intent
  // with several overlapping synonyms (like "who", which lists both "about her" and "tell me
  // about her") wins purely by having more redundant phrasings, even against a more specific
  // intent like "skills" that only needed one keyword to match.
  let best = null
  let bestScore = 0
  for (const intent of INTENTS) {
    const matched = intent.test ? intent.test(text) : intent.keywords.some((k) => matchesKeyword(text, k))
    const score = matched ? 1 : 0
    if (score > bestScore) {
      best = intent
      bestScore = score
    }
  }

  if (best) return best.respond()
  if (project) return projectReply(project)

  return `Hmm, I'm not totally sure about that one! I mostly know about my skills, projects, education, and how to reach me — try asking one of those? Or just email me directly: ${profile.email}`
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hii! I'm an AI version of Kathryn 👋 Ask me about my skills, projects, education, or how to reach me — or just tap a suggestion below!" },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typing])

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { from: 'user', text: trimmed }])
    setInput('')
    setTyping(true)
    const delay = 450 + Math.random() * 350
    setTimeout(() => {
      const reply = getResponse(trimmed)
      setMessages((m) => [...m, { from: 'bot', text: reply }])
      setTyping(false)
    }, delay)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="chatbot">
      {open && (
        <div className="chatbot__window" role="dialog" aria-label="Chat with an AI version of Kathryn">
          <div className="chatbot__header">
            <div className="chatbot__profile">
              <span className="chatbot__avatar">
                <img src={logo} alt="" />
                <span className="chatbot__avatar-dot" />
              </span>
              <div>
                <p className="chatbot__header-title">Kath <span className="chatbot__ai-badge">AI</span></p>
                <p className="chatbot__header-sub">AI version of me · ask me anything!</p>
              </div>
            </div>
            <button className="chatbot__close" onClick={() => setOpen(false)} aria-label="Close chat">
              <FiX size={20} />
            </button>
          </div>

          <div className="chatbot__messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chatbot__bubble chatbot__bubble--${m.from}`}>
                {m.text.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
            ))}
            {typing && (
              <div className="chatbot__bubble chatbot__bubble--bot chatbot__typing">
                <span className="chatbot__dot" />
                <span className="chatbot__dot" />
                <span className="chatbot__dot" />
              </div>
            )}
          </div>

          <div className="chatbot__suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="chatbot__chip" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>

          <form className="chatbot__input-row" onSubmit={onSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question..."
              aria-label="Type a question"
            />
            <button type="submit" aria-label="Send message">
              <FiSend size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        className="chatbot__fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <FiX size={26} /> : <FiMessageCircle size={26} />}
      </button>
    </div>
  )
}
