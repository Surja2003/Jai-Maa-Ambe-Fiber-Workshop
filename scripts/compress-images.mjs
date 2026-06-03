import sharp from 'sharp'
import { readdir, stat, rename, unlink, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const ASSETS_DIR = './public/assets'
const TEMP_DIR   = './public/assets/_tmp_compressed'
const MAX_WIDTH  = 1200
const QUALITY    = 78

// Create temp dir
if (!existsSync(TEMP_DIR)) await mkdir(TEMP_DIR)

const files = await readdir(ASSETS_DIR)
const images = files.filter(f => /\.(jpe?g|png)$/i.test(f))

let totalBefore = 0, totalAfter = 0, savedCount = 0

console.log(`\n🖼️  Compressing ${images.length} images...\n`)

for (const file of images) {
  const srcPath  = join(ASSETS_DIR, file)
  const tmpPath  = join(TEMP_DIR, file)

  const { size: before } = await stat(srcPath)
  totalBefore += before

  try {
    // Write compressed to temp first
    await sharp(srcPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(tmpPath)

    const { size: after } = await stat(tmpPath)

    if (after < before) {
      // Replace original with compressed
      await unlink(srcPath)
      await rename(tmpPath, srcPath)
      totalAfter += after
      savedCount++
      const saved = Math.round((1 - after / before) * 100)
      console.log(`  ✅ ${file.slice(0,45).padEnd(46)} ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB  (-${saved}%)`)
    } else {
      // Already optimal, delete temp
      await unlink(tmpPath)
      totalAfter += before
      console.log(`  ⏩ ${file.slice(0,45).padEnd(46)} ${Math.round(before/1024)}KB (already optimal)`)
    }
  } catch (e) {
    totalAfter += before
    console.log(`  ⚠️  Error: ${file} — ${e.message}`)
    try { await unlink(tmpPath) } catch {}
  }
}

// Clean up temp dir
try { await import('fs').then(fs => fs.rmdirSync(TEMP_DIR)) } catch {}

const savedMB  = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)
const savedPct = Math.round((1 - totalAfter / totalBefore) * 100)
console.log(`\n✨ Done! ${savedCount} files compressed`)
console.log(`   Before: ${(totalBefore/1024/1024).toFixed(2)} MB → After: ${(totalAfter/1024/1024).toFixed(2)} MB  (saved ${savedMB} MB / ${savedPct}%)\n`)
