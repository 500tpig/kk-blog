import Sun from '../icons/Sun'

export default function Switch() {
  return (
    <div className="w-12 h-[22px] rounded-full bg-[#9fa8b52e] relative">
      <div
        className="
          absolute h-[22px] w-[22px] left-0 top-1/2 -translate-y-1/2
          p-[5px] bg-white rounded-full flex justify-center items-center
          leading-none text-[13px] shadow-[0_0_8px_#2f313930]
          transition-all duration-400
        "
        style={{
          transitionTimingFunction: 'cubic-bezier(.01,.68,.42,1.36)'
        }}
      >
        <Sun className='text-[#ffb300]' />
      </div>
    </div>
  )
}
