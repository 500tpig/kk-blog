export default function Icon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 图形标识部分：两个几何“K”字母 */}
      <g id="Logomark">
        <path
          d="M20 15 L35 32 L20 49"
          stroke="url(#grad1)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M38 15 L53 32 L38 49"
          stroke="url(#grad1)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="grad1" x1="20" y1="15" x2="53" y2="49" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fc6076" />
            <stop offset="1" stopColor="#ff9a44" />
          </linearGradient>
        </defs>
      </g>

      {/* 文字部分 */}
      <g id="Logotype">
        <text
          x="70"
          y="45"
          fontFamily="Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="currentColor"
        >
          KK Blog
        </text>
      </g>
    </svg>
  )
}
