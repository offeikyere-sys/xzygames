interface XzyLogoProps {
  size?: number
  className?: string
}

export function XzyLogo({ size = 32, className = "" }: XzyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Glow effect */}
      <defs>
        <linearGradient id="glow" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#3b82f6" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Background rounded square */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill="#09090b"
        stroke="url(#glow)"
        strokeWidth="2"
      />

      {/* Game controller shape - simplified X */}
      {/* Left joystick */}
      <circle cx="16" cy="32" r="3" fill="#3b82f6" opacity="0.6" />

      {/* Right joystick */}
      <circle cx="32" cy="32" r="3" fill="#a855f7" opacity="0.6" />

      {/* X letter - bold and neon */}
      <path
        d="M13 12L20 22L13 32"
        stroke="#60a5fa"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#shadow)"
      />
      <path
        d="M35 12L28 22L35 32"
        stroke="#a78bfa"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#shadow)"
      />

      {/* Center dot */}
      <circle cx="24" cy="22" r="2" fill="#60a5fa" />
    </svg>
  )
}