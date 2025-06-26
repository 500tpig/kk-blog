/**
 * 需求：
 * - 将 MDX 文件中的 Mermaid 代码块替换为对应的静态 SVG 图片
 * - 提高页面加载性能，避免客户端渲染 Mermaid 图表
 * - 保持文档的可读性和 SEO 友好性
 * - 支持增量处理，避免重复替换未修改的文件
 * - 为图片提供有意义的 alt 文本
 * 
 * 功能：
 * - 扫描 posts 目录下的所有 MDX 文件
 * - 查找文件中的 Mermaid 代码块
 * - 将代码块替换为对应的 img 标签
 * - 生成有意义的 alt 文本描述
 * - 创建文件备份，支持回滚操作
 * - 支持处理单个文件或批量处理所有文件
 * 
 * 实现方案：
 * - 使用 fs/promises 进行异步文件操作
 * - 通过正则表达式匹配 Mermaid 代码块
 * - 基于文件路径和块索引生成 SVG 文件路径
 * - 从 Mermaid 内容智能生成 alt 文本
 * - 实现文件时间戳比较进行增量处理
 * - 支持命令行参数：文件路径和 --force 标志
 * - 生成的文件命名规则：{category}-{filename}-{blockIndex}.svg
 * - 替换后的 img 标签包含响应式样式类
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const postsDirectory = path.join(process.cwd(), 'posts')
const diagramsDirectory = path.join(process.cwd(), 'public', 'diagrams')

// 检查文件是否需要重新处理
async function needsReplacement(mdxPath, backupPath) {
  try {
    const mdxStats = await fs.stat(mdxPath)
    const backupStats = await fs.stat(backupPath)
    return mdxStats.mtime > backupStats.mtime
  } catch {
    return true // 如果备份文件不存在，需要处理
  }
}

// 处理单个文件
async function processFile(filePath, force = false) {
  try {
    const content = await fs.readFile(filePath, 'utf8')
    const backupPath = filePath + '.backup'
    
    // 检查是否需要重新处理
    if (!force && !(await needsReplacement(filePath, backupPath))) {
      console.log(`⏭️  跳过已处理的文件: ${path.relative(process.cwd(), filePath)}`)
      return false
    }
    
    // 创建备份
    await fs.writeFile(backupPath, content)
    
    // 查找 Mermaid 代码块
    const mermaidRegex = /```mermaid\s*\n([\s\S]*?)\n```/g
    let newContent = content
    let match
    let blockIndex = 0
    let hasChanges = false
    
    while ((match = mermaidRegex.exec(content)) !== null) {
      const fullMatch = match[0]
      const mermaidContent = match[1].trim()
      
      // 生成对应的 SVG 文件名
      const relativePath = path.relative(postsDirectory, filePath)
      const fileName = path.basename(filePath, path.extname(filePath))
      const category = path.dirname(relativePath)
      const svgFileName = `${category}-${fileName}-${blockIndex}.svg`
      const svgPath = `/diagrams/${svgFileName}`
      
      // 检查 SVG 文件是否存在
      const fullSvgPath = path.join(diagramsDirectory, svgFileName)
      if (await fs.stat(fullSvgPath).catch(() => false)) {
        // 生成 alt 文本（从 Mermaid 内容中提取）
        const altText = generateAltText(mermaidContent)
        
        // 替换 Mermaid 代码块为 img 标签
        const imgTag = `<img src="${svgPath}" alt="${altText}" className="w-full" />`
        newContent = newContent.replace(fullMatch, imgTag)
        hasChanges = true
        
        console.log(`🔄 替换图表: ${svgFileName}`)
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
      // 如果没有变化，删除备份文件
      await fs.unlink(backupPath).catch(() => {})
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
    return `${chartType}：${uniqueNames.join('、')}`
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
    const force = args.includes('--force') // 强制重新处理
    
    if (targetFile) {
      // 处理单个文件
      const fullPath = path.isAbsolute(targetFile) 
        ? targetFile 
        : path.join(postsDirectory, targetFile)
      
      if (!(await fs.stat(fullPath)).isFile()) {
        console.error(`❌ 文件不存在: ${targetFile}`)
        process.exit(1)
      }
      
      const processed = await processFile(fullPath, force)
      if (processed) {
        console.log('🎉 单个文件处理完成！')
      } else {
        console.log('ℹ️  文件无需处理。')
      }
    } else {
      // 处理所有文件（保持向后兼容）
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
        if (await processFile(filePath, force)) {
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