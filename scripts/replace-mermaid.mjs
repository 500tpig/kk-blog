/**
 * 需求：
 * - 将 MDX 文件中的 Mermaid 代码块后插入对应的静态 SVG 图片
 * - 提高页面加载性能，避免客户端渲染 Mermaid 图表
 * - 保持文档的可读性和 SEO 友好性
 * - 保留原始 Mermaid 代码块，便于后续编辑和维护
 * - 为图片提供有意义的 alt 文本
 * 
 * 功能：
 * - 扫描 posts 目录下的所有 MDX 文件
 * - 查找文件中的 Mermaid 代码块
 * - 在代码块后插入对应的 img 标签（保留原始代码块）
 * - 生成有意义的 alt 文本描述
 * - 支持处理单个文件或批量处理所有文件
 * 
 * 工作流程：
 * 1. 本地编写包含 Mermaid 代码块的 MDX 文件
 * 2. 运行 yarn generate-diagrams 生成 SVG 文件
 * 3. 运行 yarn replace-mermaid 插入 SVG 图片
 * 4. 提交所有文件到 git 仓库
 * 5. Vercel 自动部署（无需云端生成）
 * 
 * 实现方案：
 * - 使用 fs/promises 进行异步文件操作
 * - 通过正则表达式匹配 Mermaid 代码块
 * - 基于文件路径和块索引生成 SVG 文件路径
 * - 从 Mermaid 内容智能生成 alt 文本
 * - 支持命令行参数：文件路径
 * - 生成的文件命名规则：{category}-{filename}-{blockIndex}.svg
 * - 插入的 img 标签包含响应式样式类
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')
const diagramsDirectory = path.join(process.cwd(), 'public', 'diagrams')

// 处理单个文件
async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8')
    const { data } = matter(content)
    
    // 查找 Mermaid 代码块
    const mermaidRegex = /```mermaid\s*\n([\s\S]*?)\n```/g
    let newContent = content
    let match
    let blockIndex = 0
    let hasChanges = false
    
    while ((match = mermaidRegex.exec(content)) !== null) {
      const fullMatch = match[0]
      const mermaidContent = match[1].trim()
      
      // 使用 slug 生成对应的 SVG 文件名
      let slug
      if (data.slug) {
        slug = data.slug
      } else {
        // 如果没有 slug，回退到原来的命名方式
        const relativePath = path.relative(postsDirectory, filePath)
        const fileName = path.basename(filePath, path.extname(filePath))
        const category = path.dirname(relativePath)
        slug = `${category}-${fileName}`
      }
      
      const svgFileName = `${slug}-${blockIndex.toString().padStart(2, '0')}.svg`
      const svgPath = `/diagrams/${svgFileName}`
      
      // 检查 SVG 文件是否存在
      const fullSvgPath = path.join(diagramsDirectory, svgFileName)
      if (await fs.stat(fullSvgPath).catch(() => false)) {
        // 生成 alt 文本（从 Mermaid 内容中提取）
        const altText = generateAltText(mermaidContent)
        
        // HTML 转义 alt 文本中的特殊字符
        const escapedAltText = altText.replace(/"/g, '&quot;').replace(/'/g, '&#39;')
        // 在原始 Mermaid 代码块后插入 SVG 图片，保留原始代码块
        const imgTag = `<img src="${svgPath}" alt="${escapedAltText}" className="w-full lg:w-3/5 mx-auto my-6 rounded-lg" />`
        const insertion = `${fullMatch}\n\n${imgTag}`
        newContent = newContent.replace(fullMatch, insertion)
        hasChanges = true
        
        console.log(`🔄 插入图表: ${svgFileName}`)
      } else {
        console.warn(`⚠️  SVG 文件不存在: ${svgFileName}`)
      }
      
      blockIndex++
    }
    
    if (hasChanges) {
      await fs.writeFile(filePath, newContent)
      console.log(`✅ 处理完成: ${path.relative(process.cwd(), filePath)}`)
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(`❌ 处理文件失败: ${filePath}`, error)
    return false
  }
}

// 从 Mermaid 内容生成 alt 文本
function generateAltText(mermaidContent) {
  // 提取图表类型
  const firstLine = mermaidContent.split('\n')[0].trim()
  let chartType = '图表'
  
  if (firstLine.includes('graph') || firstLine.includes('flowchart')) {
    chartType = '流程图'
  } else if (firstLine.includes('sequenceDiagram')) {
    chartType = '时序图'
  } else if (firstLine.includes('classDiagram')) {
    chartType = '类图'
  } else if (firstLine.includes('stateDiagram')) {
    chartType = '状态图'
  } else if (firstLine.includes('erDiagram')) {
    chartType = '实体关系图'
  } else if (firstLine.includes('pie')) {
    chartType = '饼图'
  } else if (firstLine.includes('gantt')) {
    chartType = '甘特图'
  }
  
  // 提取节点名称作为描述
  const nodeNames = []
  const lines = mermaidContent.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.includes('[') && trimmed.includes(']')) {
      const match = trimmed.match(/\[([^\]]+)\]/)
      if (match) {
        nodeNames.push(match[1])
      }
    } else if (trimmed.includes('-->') || trimmed.includes('---')) {
      const parts = trimmed.split(/--?>?/)
      if (parts.length >= 2) {
        const from = parts[0].trim()
        const to = parts[parts.length - 1].trim()
        if (from && !from.startsWith('[') && !from.startsWith('(')) {
          nodeNames.push(from)
        }
        if (to && !to.startsWith('[') && !to.startsWith('(')) {
          nodeNames.push(to)
        }
      }
    }
  }
  
  // 生成 alt 文本
  if (nodeNames.length > 0) {
    const uniqueNames = [...new Set(nodeNames)].slice(0, 3) // 最多取3个
    return `${chartType}：${uniqueNames.join('、').replace(/"/g, "'")}`
  }
  
  return chartType
}

// 主函数
async function replaceMermaid() {
  try {
    console.log('🚀 开始替换 Mermaid 代码块...')
    
    // 获取命令行参数
    const args = process.argv.slice(2)
    const targetFile = args[0] // 如果提供了文件路径
    
    if (targetFile) {
      // 处理单个文件
      const fullPath = path.isAbsolute(targetFile) 
        ? targetFile 
        : path.join(postsDirectory, targetFile)
      
      if (!(await fs.stat(fullPath)).isFile()) {
        console.error(`❌ 文件不存在: ${targetFile}`)
        process.exit(1)
      }
      
      const processed = await processFile(fullPath)
      if (processed) {
        console.log('🎉 单个文件处理完成！')
      } else {
        console.log('ℹ️  文件无需处理。')
      }
    } else {
      // 处理所有文件
      const entries = await fs.readdir(postsDirectory, { withFileTypes: true })
      const mdxFiles = entries
        .filter(entry => entry.isDirectory())
        .flatMap(async category => {
          const categoryPath = path.join(postsDirectory, category.name)
          const files = await fs.readdir(categoryPath)
          return files
            .filter(file => file.endsWith('.mdx'))
            .map(file => path.join(categoryPath, file))
        })
      
      const allFiles = (await Promise.all(mdxFiles)).flat()
      console.log(`📁 找到 ${allFiles.length} 个 MDX 文件进行处理`)
      
      let processedCount = 0
      for (const filePath of allFiles) {
        if (await processFile(filePath)) {
          processedCount++
        }
      }
      
      console.log(`🎉 完成！共处理 ${processedCount} 个文件。`)
    }
  } catch (error) {
    console.error('❌ 替换 Mermaid 代码块时发生错误:', error)
    process.exit(1)
  }
}

// 脚本入口
const __filename = fileURLToPath(import.meta.url)
if (process.argv[1] === __filename) {
  replaceMermaid()
}

export default replaceMermaid 