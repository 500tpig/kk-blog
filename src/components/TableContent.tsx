import DownOutlined from './icons/DownOutlined'

export default function TableContent() {
  return (
    <div
      className="mt-3.5 mb-7.5 dark:bg-body-bg bg-card-bg rounded-xl w-full overflow-hidden"
      style={{
        boxShadow: '0 2px 4px #0e0e131f'
      }}
    >
      <div className="flex items-center justify-between bg-accent p-4 py-3">
        <div className="text-white text-lg font-semibold">目录</div>
        <DownOutlined className="w-5 h-5 text-white" />
      </div>
      <div className='p-5'>
        sdd
      </div>
    </div>
  )
}
