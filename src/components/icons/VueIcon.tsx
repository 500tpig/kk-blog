export default function VueIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`icon-svg ${className}`}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M512 504L764.8 68.8h-134.4L512 275.2 393.6 70.4h-134.4L512 504zM819.2 70.4L512 600 204.8 68.8H0l512 886.4L1024 70.4H819.2z"
        fill="currentColor"
      ></path>
    </svg>
  )
}
