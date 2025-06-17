import { ReactNode } from 'react'

// 定义每张技能卡片的数据结构
interface ServiceCardProps {
  icon: ReactNode
  titleLine1: string
  titleLine2: string
  description: string
  gradient: string // 卡片的背景渐变色
}

const myServicesData: ServiceCardProps[] = [
  {
    // 你可以替换成自己喜欢的SVG图标
    icon: (
      <svg
        aria-hidden="true"
        className="icon-svg text-4xl text-white mr-[1.875rem]"
        viewBox="0 0 640 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M256.5 216.8L343.2 326s-16.6 102.4-76.6 150.1C206.7 523.8 0 510.2 0 510.2s3.8-23.1 11-55.4l94.6-112.2c4-4.7-.9-11.6-6.6-9.5l-60.4 22.1c14.4-41.7 32.7-80 54.6-97.5 59.9-47.8 163.3-40.9 163.3-40.9zm238 135c-44 0-79.8 35.8-79.8 79.9 0 44.1 35.7 79.9 79.8 79.9 44.1 0 79.8-35.8 79.8-79.9 0-44.2-35.8-79.9-79.8-79.9zM636.5 31L616.7 6c-5.5-6.9-15.5-8-22.4-2.6L361.8 181.3l-34.1-43c-5.1-6.4-15.1-5.2-18.6 2.2l-25.3 54.6 86.7 109.2 58.8-12.4c8-1.7 11.4-11.2 6.3-17.6l-34.1-42.9L634 53.5c6.9-5.5 8-15.6 2.5-22.5z" />
      </svg>
    ),
    titleLine1: '现代前端开发',
    titleLine2: '(Web & H5)',
    description:
      '熟练掌握 Vue (2/3) 并能快速上手 React 及 Next.js 。负责从零到一的 Web 及 H5 项目开发、组件封装和性能优化 。',
    gradient: 'linear-gradient(140deg,#F06363 1%,#417BE6 100%)'
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        className="icon-svg text-4xl text-white mr-[1.875rem]"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M507.73 109.1c-2.24-9.03-13.54-12.09-20.12-5.51l-74.36 74.36-67.88-11.31-11.31-67.88 74.36-74.36c6.62-6.62 3.43-17.9-5.66-20.16-47.38-11.74-99.55.91-136.58 37.93-39.64 39.64-50.55 97.1-34.05 147.2L18.74 402.76c-24.99 24.99-24.99 65.51 0 90.5 24.99 24.99 65.51 24.99 90.5 0l213.21-213.21c50.12 16.71 107.47 5.68 147.37-34.22 37.07-37.07 49.7-89.32 37.91-136.73zM64 472c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z" />
      </svg>
    ),
    titleLine1: '跨平台客户端',
    titleLine2: '(Electron)',
    description:
      '具备丰富的 Electron 项目开发与维护经验，成功使用 Vue 3 + TS 对旧项目进行重构，实现对 Windows、macOS 等多系统的适配 。',
    gradient: 'linear-gradient(140deg,#AD63F0 1%,#41C1E6 100%)'
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        className="icon-svg text-4xl text-white mr-[1.875rem]"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
      </svg>
    ),
    titleLine1: '数据可视化',
    titleLine2: '(Echarts & D3.js)',
    description:
      '能够独立负责多个美观且适配性好的大屏开发，并能使用 D3.js 结合 Neo4j 实现复杂的前端知识图谱展示 。',
    gradient: 'linear-gradient(140deg,#84F0B2 1%,#3A5D9F 100%)'
  }
]

export function PersonalServices() {
  return (
    <div className="flex flex-col gap-5">
      {myServicesData.map((service, index) => (
        <div
          key={index}
          className="bg-white p-10 rounded-xl flex flex-col sm:flex-row items-center gap-x-[3.75rem] gap-y-4"
          style={{ backgroundImage: service.gradient }}
        >
          <div className="flex w-full sm:w-[12.5rem] items-center flex-shrink-0">
            {service.icon}
            <div className="font-medium text-white">
              <div>{service.titleLine1}</div>
              <div>{service.titleLine2}</div>
            </div>
          </div>
          <div className="flex-1 text-sm text-white">{service.description}</div>
        </div>
      ))}
    </div>
  )
}
