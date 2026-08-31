import * as fs from 'node:fs'
import path from 'node:path'

export default function (filePath) {
  const ext = path.extname(filePath)

  if (ext !== '.json') {
    throw new Error(
      `Файл, который лежит ${filePath} не содержит формат ".json"`,
    )
  }
  const readFile = fs.readFileSync(filePath, 'utf-8')

  return JSON.parse(readFile)
}
