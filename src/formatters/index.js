import getStylishFormat from './stylish.js'
import getPlainFormat from './plain.js'

const formatters = {
  stylish: getStylishFormat,
  plain: getPlainFormat,
}

export default function (format) {
  return formatters[format]
}
