const getNormalizeValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`
  }
  else if (
    Object.prototype.toString.call(value) === '[object Object]'
    || Array.isArray(value)
  ) {
    return '[complex value]'
  }
  return value
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

      if (type === 'nested') {
        return iters(elem.children, pathFull)
      }
      if (type === 'changed') {
        return [
          `Property '${pathFull}' was updated. From ${getNormalizeValue(elem.oldValue)} to ${getNormalizeValue(elem.newValue)}`,
        ]
      }
      else if (type === 'deleted') {
        return [`Property '${pathFull}' was removed`]
      }
      else if (type === 'added') {
        const value = elem.value !== undefined ? elem.value : elem.children
        return [
          `Property '${pathFull}' was added with value: ${getNormalizeValue(value)}`,
        ]
      }
      else {
        return []
      }
    })
    return stringArray
  }
  return iters(tree, '').join('\n')
}

export default getPlainFormat
