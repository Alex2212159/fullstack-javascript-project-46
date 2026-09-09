import getParseFile from './parsers.js'
import buildDiff from './buildDiff.js'
import getStylishFormat from './formatters/stylish.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const objFirst = getParseFile(filepath1)
  const objSecond = getParseFile(filepath2)

  const tree = buildDiff(objFirst, objSecond)
  const formatters = {
    stylish: getStylishFormat,
  }
  const formatter = formatters[format]

  return formatter(tree)
}

export default genDiff
