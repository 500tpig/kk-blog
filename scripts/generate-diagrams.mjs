/**
 * 需求：
 * - 将 MDX 文件中的 Mermaid 代码块转换为静态 SVG 图片
 * - 支持处理单个文件或批量处理所有文件
 * - 为生成的 SVG 文件提供合理的命名规则
 * - 按文章创建子文件夹，使用简单的文件名
 * 
 * 功能：
 * - 扫描 posts 目录下的所有 MDX 文件
 * - 提取文件中的 Mermaid 代码块
 * - 使用 mermaid-cli (mmdc) 将 Mermaid 代码转换为 SVG
 * - 将生成的 SVG 文件保存到 public/diagrams/{article-folder} 目录
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
 * - 通过正则表达式解析 Mermaid 代码块
 * - 使用 execSync 调用 mmdc 命令行工具生成 SVG
 * - 支持命令行参数：文件路径
 * - 生成的文件命名规则：{article-folder}/image{index}.svg
 */

import { execSync } from 'child_process'
import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')
const outputDirectory = path.join(process.cwd(), 'public', 'diagrams')

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
async function generateSVGForFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8')
  const { data } = matter(content)
  
  // 使用 slug 生成文件夹名
  let folderName
  if (data.slug) {
    folderName = data.slug
  } else {
    // 如果没有 slug，回退到原来的命名方式
    const relativePath = path.relative(postsDirectory, filePath)
    const fileName = path.basename(filePath, path.extname(filePath))
    const category = path.dirname(relativePath)
    folderName = `${category}-${fileName}`
  }
  
  const mermaidBlocks = await extractMermaidBlocks(filePath)
  
  if (mermaidBlocks.length === 0) {
    return 0
  }

  console.log(`📄 处理文件: ${folderName} (${mermaidBlocks.length} 个图表)`)
  
  // 创建文章专属的文件夹
  const articleOutputDir = path.join(outputDirectory, folderName)
  await fs.mkdir(articleOutputDir, { recursive: true })
  
  let generatedCount = 0
  
  for (const block of mermaidBlocks) {
    const svgFileName = `image${block.index + 1}.svg`
    const svgPath = path.join(articleOutputDir, svgFileName)
    
    try {
      // 创建临时文件
      const tempFile = path.join(articleOutputDir, `temp-${svgFileName}.mmd`)
      await fs.writeFile(tempFile, block.content)
      
      // 生成 SVG
      console.log(`🔄 生成图表: ${folderName}/${svgFileName}`)
      execSync(`npx mmdc -i "${tempFile}" -o "${svgPath}"`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      })
      
      // 清理临时文件
      await fs.unlink(tempFile)
      
      generatedCount++
      console.log(`✅ 生成 SVG: ${folderName}/${svgFileName}`)
    } catch (error) {
      console.error(`❌ 生成 SVG 失败: ${folderName}/${svgFileName}`, error)
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
    
    if (targetFile) {
      // 处理单个文件
      let fullPath
      if (path.isAbsolute(targetFile)) {
        fullPath = targetFile
      } else {
        // 如果是相对路径，先检查是否已经是相对于posts目录的路径
        const testPath = path.join(postsDirectory, targetFile)
        if (await fs.stat(testPath).catch(() => false)) {
          fullPath = testPath
        } else {
          // 如果不是，直接使用提供的路径
          fullPath = path.resolve(targetFile)
        }
      }
      
      if (!(await fs.stat(fullPath)).isFile()) {
        console.error(`❌ 文件不存在: ${targetFile}`)
        console.error(`尝试的路径: ${fullPath}`)
        process.exit(1)
      }
      
      const count = await generateSVGForFile(fullPath)
      console.log(`🎉 完成！共生成 ${count} 个 SVG 图表。`)
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
      
      let totalGenerated = 0
      for (const filePath of allFiles) {
        totalGenerated += await generateSVGForFile(filePath)
      }
      
      console.log(`🎉 完成！共生成 ${totalGenerated} 个 SVG 图表。`)
    }
  } catch (error) {
    console.error('❌ 生成图表时发生错误:', error)
    process.exit(1)
  }
}

generateDiagrams() 