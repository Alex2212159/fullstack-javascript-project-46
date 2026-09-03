import * as fs from 'node:fs'
import path from 'node:path'
import { load } from 'js-yaml'

export default function (filePath) {
  const ext = path.extname(filePath)

  let readFile

  if (ext === '.json' || ext === '.yml' || ext === '.yaml') {
    readFile = fs.readFileSync(filePath, 'utf-8')
  }
  else {
    throw new Error(
      `Файл, который лежит ${filePath} не содержит формат ".json" или ".yml/.yaml"`,
    )
  }
  const result = ext === '.json' ? JSON.parse(readFile) : load(readFile)

  return result
}
