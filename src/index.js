import getParseFile from './parsers.js'
import buildDiff from './buildDiff.js'
import getFormat from './formatters/index.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const objFirst = getParseFile(filepath1)
  const objSecond = getParseFile(filepath2)

  const tree = buildDiff(objFirst, objSecond)

  const formatter = getFormat(format)

  return formatter(tree)
}

export default genDiff
