import { useEffect, useRef, useState } from 'react'
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi'
import { profile, about, coreSkills, technicalSkills, designTools, certifications, projects } from '../data'
import './ChatBot.css'

const SUGGESTIONS = [
  'What are your skills?',
  'Tell me about your projects',
  'What is your education?',
  'How can I contact you?',
]

function projectList() {
  return projects
    .map((p) => `• ${p.title} (${p.year})`)
    .join('\n')
}

function findProject(text) {
  return projects.find((p) => {
    const haystack = `${p.id} ${p.title} ${p.subtitle} ${p.tags.join(' ')}`.toLowerCase()
    return text.split(/\s+/).some((word) => word.length > 3 && haystack.includes(word))
  })
}

const INTENTS = [
  {
    name: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'yo', 'sup'],
    respond: () =>
      `Hi! I'm a quick FAQ bot for ${profile.name}'s portfolio. Ask me about her skills, projects, education, or how to get in touch.`,
  },
  {
    name: 'thanks',
    keywords: ['thanks', 'thank you', 'thx', 'appreciate'],
    respond: () => "You're welcome! Anything else you'd like to know?",
  },
  {
    name: 'education',
    keywords: ['education', 'degree', 'school', 'study', 'studies', 'polytechnic', 'diploma', 'university'],
    respond: () =>
      `${about.education.degree} at ${about.education.school} (${about.education.period}). ${about.education.note}.`,
  },
  {
    name: 'experience',
    keywords: ['experience', 'internship', 'intern', 'work experience', 'klp', 'job history'],
    respond: () =>
      "She interned as an RPA Developer at KLP LLP, building a web-based audit automation platform (React, Python, SQL, Docker, UiPath) that cut audit processing time by ~40%. Ask about the 'audit automation' project for more detail.",
  },
  {
    name: 'skills',
    keywords: ['skill', 'skills', 'technical', 'programming', 'language', 'languages', 'tech stack', 'stack', 'framework'],
    respond: () =>
      `Core strengths: ${coreSkills.slice(0, 4).map((s) => s.name).join(', ')}.\n\nProficient in: ${technicalSkills.proficient.join(', ')}.\n\nTools & platforms: ${technicalSkills.tools.slice(0, 8).join(', ')}, and more.`,
  },
  {
    name: 'design',
    keywords: ['design', 'ui/ux', 'ux', 'figma', 'design tools'],
    respond: () => `Design toolkit: ${designTools.join(', ')}.`,
  },
  {
    name: 'certifications',
    keywords: ['certificate', 'certification', 'certifications', 'award', 'awards', 'prize', 'championship'],
    respond: () => `Certifications & awards:\n${certifications.map((c) => `• ${c}`).join('\n')}`,
  },
  {
    name: 'resume',
    keywords: ['resume', 'cv', 'download'],
    respond: () => 'You can download her resume using the "Resume" button in the Home section at the top of the page.',
  },
  {
    name: 'contact',
    keywords: ['contact', 'email', 'reach', 'hire', 'linkedin', 'phone', 'whatsapp', 'get in touch'],
    respond: () =>
      `You can reach her at ${profile.email}, on LinkedIn (${profile.linkedin.replace('https://', '')}), or via WhatsApp at ${profile.phone}. There's also a Contact section at the bottom of this page.`,
  },
  {
    name: 'projects',
    keywords: ['project', 'projects', 'built', 'work', 'portfolio items', 'made'],
    respond: () =>
      `Here are her projects:\n${projectList()}\n\nAsk me about any one of these by name, or scroll to the Projects section to see demos and code links.`,
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
    ],
    respond: () => about.bio,
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
  if (!text) return "Sorry, I didn't catch that — could you rephrase?"

  const project = findProject(text)
  if (project && /project|tell me|what is|about|explain/.test(text)) {
    return `${project.title} (${project.year}) — ${project.summary}\n\nTech: ${project.tags.join(', ')}.${project.github ? `\nCode: ${project.github}` : ''}`
  }

  // Each intent scores 1 if ANY of its keyword phrasings match, not a count of matches —
  // otherwise an intent with several overlapping synonyms (like "who", which lists both
  // "about her" and "tell me about her") wins purely by having more redundant phrasings,
  // even against a more specific intent like "skills" that only needed one keyword to match.
  let best = null
  let bestScore = 0
  for (const intent of INTENTS) {
    const score = intent.keywords.some((k) => matchesKeyword(text, k)) ? 1 : 0
    if (score > bestScore) {
      best = intent
      bestScore = score
    }
  }

  if (best) return best.respond()

  if (project) {
    return `${project.title} (${project.year}) — ${project.summary}\n\nTech: ${project.tags.join(', ')}.${project.github ? `\nCode: ${project.github}` : ''}`
  }

  return "I'm just a simple FAQ bot, so I'm not sure about that one. Try asking about her skills, projects, education, or how to get in touch — or email her directly at " + profile.email + "."
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Hi, I'm here to answer quick questions about ${profile.nickname}. Try one of the suggestions below, or type your own!` },
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
        <div className="chatbot__window" role="dialog" aria-label="Portfolio FAQ chat">
          <div className="chatbot__header">
            <div>
              <p className="chatbot__header-title">Ask about {profile.nickname}</p>
              <p className="chatbot__header-sub">Quick FAQ bot · answers from her portfolio</p>
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
