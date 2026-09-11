import getStylishFormat from './stylish.js'
import getPlainFormat from './plain.js'
import getJsonFormat from './json.js'

const formatters = {
  stylish: getStylishFormat,
  plain: getPlainFormat,
  json: getJsonFormat,
}

export default function (format) {
  return formatters[format]
}
