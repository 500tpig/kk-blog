import AngularIcon from '@/components/icons/AngularIcon'
import CssIcon from '@/components/icons/CssIcon'
import D3Icon from '@/components/icons/D3Icon'
import EchartsIcon from '@/components/icons/EchartsIcon'
import ElectronIcon from '@/components/icons/ElectronIcon'
import HtmlIcon from '@/components/icons/HtmlIcon'
import ReactIcon from '@/components/icons/ReactIcon'
import TSIcon from '@/components/icons/TSIcon'
import VueIcon from '@/components/icons/VueIcon'

import SkillItem from '@/features/home/SkillItem'

export default function SkillItemWrap() {
  return (
    <div className="flex marquee-wrap gap-[2.1875rem]">
      <SkillItem icon={<HtmlIcon />} name="Html" />
      <SkillItem icon={<CssIcon />} name="CSS" />
      <SkillItem icon={<TSIcon />} name="Typescript" />
      <SkillItem icon={<ReactIcon />} name="React" />
      <SkillItem icon={<ElectronIcon />} name="Electron" />
      <SkillItem icon={<EchartsIcon />} name="Echarts" />
      <SkillItem icon={<VueIcon />} name="Vue" />
      <SkillItem icon={<AngularIcon />} name="Angular" />
      <SkillItem icon={<D3Icon />} name="D3" />
    </div>
  )
}
