import getParseFile from './parser.js'
import _ from 'lodash'

const genDiff = (filepath1, filepath2) => {
  const normalizeFileFirst = getParseFile(filepath1)
  const normalizeFileSecond = getParseFile(filepath2)

  const keysFileFirst = Object.keys(normalizeFileFirst)
  const keysFileSecond = Object.keys(normalizeFileSecond)

  const allKeys = [...keysFileFirst, ...keysFileSecond]

  const uniqKeys = [...new Set(allKeys)]

  const sortKeys = _.sortBy(uniqKeys)

  const result = ['{']

  for (let key of sortKeys) {
    if (
      Object.hasOwn(normalizeFileFirst, key)
      && Object.hasOwn(normalizeFileSecond, key)
      && normalizeFileFirst[key] === normalizeFileSecond[key]
    ) {
      result.push(`    ${key}: ${normalizeFileFirst[key]}`)
    }
    else if (
      Object.hasOwn(normalizeFileFirst, key)
      && Object.hasOwn(normalizeFileSecond, key)
      && normalizeFileFirst[key] !== normalizeFileSecond[key]
    ) {
      result.push(`  - ${key}: ${normalizeFileFirst[key]}`)
      result.push(`  + ${key}: ${normalizeFileSecond[key]}`)
    }
    else if (
      Object.hasOwn(normalizeFileFirst, key)
      && !Object.hasOwn(normalizeFileSecond, key)
    ) {
      result.push(`  - ${key}: ${normalizeFileFirst[key]}`)
    }
    else {
      result.push(`  + ${key}: ${normalizeFileSecond[key]}`)
    }
  }

  result.push('}')
  return result.join('\n')
}

export default genDiff
