import './IDBadge.css'

export default function IDBadge({ photo, name, role, className = '' }) {
  return (
    <div className={`id-badge ${className}`}>
      <svg className="id-badge__strap" viewBox="0 0 220 150" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="strapFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#faf0e7" />
            <stop offset="50%" stopColor="#f6dde4" />
            <stop offset="100%" stopColor="#faf0e7" />
          </linearGradient>
        </defs>
        <path
          d="M64 150 C 8 110, 8 30, 64 10 C 96 -2, 124 -2, 156 10 C 212 30, 212 110, 156 150"
          fill="none"
          stroke="url(#strapFill)"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M64 150 C 8 110, 8 30, 64 10 C 96 -2, 124 -2, 156 10 C 212 30, 212 110, 156 150"
          fill="none"
          stroke="#e8b3c2"
          strokeWidth="1.5"
          strokeDasharray="1 9"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>

      <div className="id-badge__clip" aria-hidden="true" />

      <div className="id-badge__card">
        <div className="id-badge__hole" aria-hidden="true" />
        <div className="id-badge__header">{role}</div>
        <div className="id-badge__photo">
          <img src={photo} alt={name} />
        </div>
        <div className="id-badge__footer">
          <span className="id-badge__name">{name}</span>
          <span className="id-badge__dot" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
