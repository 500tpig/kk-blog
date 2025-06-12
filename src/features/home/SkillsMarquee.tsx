import SkillItemWrap from '@/components/SkillItemWrap'

export function SkillsMarquee() {
  return (
    <div className="mt-10 overflow-hidden">
      <div
        style={{
          transition:
            'background .3s,border .3s,border-radius .3s,box-shadow .3s,transform var(--e-transform-transition-duration,.4s)'
        }}
      >
        <div
          className="flex gap-[2.1875rem] overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right,transparent,black 10%,black 90%,transparent)',
            WebkitMaskImage:
              'linear-gradient(to right,transparent,black 10%,black 90%,transparent)',
            direction: 'rtl'
          }}
        >
          <SkillItemWrap />
          <SkillItemWrap />
        </div>
      </div>
    </div>
  )
}
