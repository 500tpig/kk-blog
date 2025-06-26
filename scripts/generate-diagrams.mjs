/**
 * 需求：
 * - 将 MDX 文件中的 Mermaid 代码块转换为静态 SVG 图片
 * - 支持增量生成，避免重复处理未修改的文件
 * - 支持处理单个文件或批量处理所有文件
 * - 为生成的 SVG 文件提供合理的命名规则
 * 
 * 功能：
 * - 扫描 posts 目录下的所有 MDX 文件
 * - 提取文件中的 Mermaid 代码块
 * - 使用 mermaid-cli (mmdc) 将 Mermaid 代码转换为 SVG
 * - 将生成的 SVG 文件保存到 public/diagrams 目录
 * - 支持强制重新生成所有图表
 * 
 * 实现方案：
 * - 使用 fs/promises 进行异步文件操作
 * - 通过正则表达式解析 Mermaid 代码块
 * - 使用 execSync 调用 mmdc 命令行工具生成 SVG
 * - 实现文件时间戳比较进行增量处理
 * - 支持命令行参数：文件路径和 --force 标志
 * - 生成的文件命名规则：{category}-{filename}-{blockIndex}.svg
 */

import { execSync } from 'child_process'
import fs from 'fs/promises'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'posts')
const outputDirectory = path.join(process.cwd(), 'public', 'diagrams')

// 检查文件是否需要重新生成
async function needsRegeneration(mdxPath, svgPath) {
  try {
    const mdxStats = await fs.stat(mdxPath)
    const svgStats = await fs.stat(svgPath)
    return mdxStats.mtime > svgStats.mtime
  } catch {
    return true // 如果 SVG 不存在，需要生成
  }
}

// 获取单个文件的 Mermaid 代码块
async function extractMermaidBlocks(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8')
    const mermaidBlocks = []
    const lines = content.split('\n')
    let inMermaidBlock = false
    let currentBlock = []
    let blockIndex = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      if (line.trim().startsWith('```mermaid')) {
        inMermaidBlock = true
        currentBlock = []
        continue
      }
      
      if (inMermaidBlock && line.trim() === '```') {
        inMermaidBlock = false
        if (currentBlock.length > 0) {
          mermaidBlocks.push({
            index: blockIndex++,
            content: currentBlock.join('\n')
          })
        }
        continue
      }
      
      if (inMermaidBlock) {
        currentBlock.push(line)
      }
    }

    return mermaidBlocks
  } catch (error) {
    console.error(`❌ 读取文件失败: ${filePath}`, error)
    return []
  }
}

// 生成单个文件的 SVG
async function generateSVGForFile(filePath, force = false) {
  const relativePath = path.relative(postsDirectory, filePath)
  const fileName = path.basename(filePath, path.extname(filePath))
  const category = path.dirname(relativePath)
  
  const mermaidBlocks = await extractMermaidBlocks(filePath)
  
  if (mermaidBlocks.length === 0) {
    return 0
  }

  console.log(`📄 处理文件: ${relativePath} (${mermaidBlocks.length} 个图表)`)
  
  let generatedCount = 0
  
  for (const block of mermaidBlocks) {
    const svgFileName = `${category}-${fileName}-${block.index}.svg`
    const svgPath = path.join(outputDirectory, svgFileName)
    
    // 检查是否需要重新生成
    if (!force && !(await needsRegeneration(filePath, svgPath))) {
      console.log(`⏭️  跳过已存在的图表: ${svgFileName}`)
      continue
    }
    
    try {
      // 创建临时文件
      const tempFile = path.join(outputDirectory, `temp-${svgFileName}.mmd`)
      await fs.writeFile(tempFile, block.content)
      
      // 生成 SVG
      console.log(`🔄 生成图表: ${svgFileName}`)
      execSync(`npx mmdc -i "${tempFile}" -o "${svgPath}"`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      })
      
      // 清理临时文件
      await fs.unlink(tempFile)
      
      generatedCount++
      console.log(`✅ 生成 SVG: ${svgFileName}`)
    } catch (error) {
      console.error(`❌ 生成 SVG 失败: ${svgFileName}`, error)
    }
  }
  
  return generatedCount
}

// 主函数
async function generateDiagrams() {
  try {
    // 确保输出目录存在
    await fs.mkdir(outputDirectory, { recursive: true })
    
    console.log(`📁 输出目录: ${outputDirectory}`)
    
    // 获取命令行参数
    const args = process.argv.slice(2)
    const targetFile = args[0] // 如果提供了文件路径
    const force = args.includes('--force') // 强制重新生成
    
    if (targetFile) {
      // 处理单个文件
      const fullPath = path.isAbsolute(targetFile) 
        ? targetFile 
        : path.join(process.cwd(), targetFile)
      
      if (!(await fs.stat(fullPath)).isFile()) {
        console.error(`❌ 文件不存在: ${targetFile}`)
        process.exit(1)
      }
      
      const count = await generateSVGForFile(fullPath, force)
      console.log(`🎉 完成！共生成 ${count} 个 SVG 图表。`)
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
      
      let totalGenerated = 0
      for (const filePath of allFiles) {
        totalGenerated += await generateSVGForFile(filePath, force)
      }
      
      console.log(`🎉 完成！共生成 ${totalGenerated} 个 SVG 图表。`)
    }
  } catch (error) {
    console.error('❌ 生成图表时发生错误:', error)
    process.exit(1)
  }
}

generateDiagrams() 