import getParseFile from './parsers.js'
import buildTree from './buildDiff.js'
import getFormat from './formatters/index.js'
import * as fs from 'node:fs'
import getType from './format.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const typeFirst = getType(filepath1)
  const typeSecond = getType(filepath2)

  const readFileFirst = fs.readFileSync(filepath1, 'utf-8')
  const readFileSecond = fs.readFileSync(filepath2, 'utf-8')

  const objFirst = getParseFile(readFileFirst, typeFirst)
  const objSecond = getParseFile(readFileSecond, typeSecond)

  const tree = buildTree(objFirst, objSecond)

  const formatter = getFormat(format)

  return formatter(tree)
}

export default genDiff
