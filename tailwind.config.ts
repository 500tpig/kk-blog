/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class', // 使用 class 策略而不是 media 查询
  theme: {
    extend: {}
  },
  plugins: [],
  // 禁用暗模式下的文本颜色变化
  variants: {
    extend: {
      textColor: ['dark']
    }
  }
}
