import _ from 'lodash'

const getNormalizeValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`
  }
  else if (_.isPlainObject(value) || Array.isArray(value)) {
    return '[complex value]'
  }
  return value
}
const typesDispatcher = {
  nested: (elem, pathFull, func) => func(elem.children, pathFull),
  changed: (elem, pathFull) => [
    `Property '${pathFull}' was updated. From ${getNormalizeValue(elem.oldValue)} to ${getNormalizeValue(elem.newValue)}`,
  ],
  deleted: (elem, pathFull) => [`Property '${pathFull}' was removed`],
  added: (elem, pathFull) => {
    const value = elem.value !== undefined ? elem.value : elem.children
    return [
      `Property '${pathFull}' was added with value: ${getNormalizeValue(value)}`,
    ]
  },
}

const getPlainFormat = (tree = []) => {
  if (tree.length === 0) {
    return ''
  }
  const iters = (nodes, pathParents) => {
    const stringArray = nodes.flatMap((elem) => {
      const separator = '.'
      const { key, type } = elem
      const pathFull
        = pathParents === '' ? key : `${pathParents}${separator}${key}`
      const action = typesDispatcher[type] || (() => [])
      return action(elem, pathFull, iters)
    })
    return stringArray
  }
  return iters(tree, '').join('\n')
}

export default getPlainFormat
