import _ from 'lodash'

const getStylishFormat = (tree = {}) => {
  const children = tree.children

  if (children.length === 0) {
    return `{\n}`
  }
  const iters = (node, depth) => {
    const string = node.map((elem) => {
      const stepUnchange = depth * 4
      const stepChangeToSymbol = depth * 4 - 2

      const { key, type } = elem
      if (type === 'nested') {
        const children = iters(elem.children, depth + 1)
        const separator = ' '.repeat(depth * 4)
        return `${separator}${key}: {\n${children}\n${separator}}`
      }

      if (type === 'unchanged') {
        if (elem.children) {
          const childrens = iters(elem.children, depth + 1)
          return `${' '.repeat(stepUnchange)}${key}: {\n${childrens}\n${' '.repeat(stepUnchange)}}`
        }
        return `${' '.repeat(stepUnchange)}${key}: ${elem.value}`
      }
      else if (type === 'changed') {
        if (elem.children && _.isPlainObject(elem.oldValue)) {
          const childrens = iters(elem.children, depth + 1)
          const separator = ' '.repeat(stepChangeToSymbol)
          return `${separator}- ${key}: {\n${childrens}\n${' '.repeat(stepUnchange)}}\n${' '.repeat(stepChangeToSymbol)}+ ${key}: ${elem.newValue}`
        }
        else if (elem.children && _.isPlainObject(elem.newValue)) {
          const childrens = iters(elem.children, depth + 1)
          const separator = ' '.repeat(stepChangeToSymbol)
          return `${separator}- ${key}: ${elem.oldValue}\n${' '.repeat(stepChangeToSymbol)}+ ${key}: {\n${childrens}\n${' '.repeat(stepUnchange)}}`
        }
        else {
          return `${' '.repeat(stepChangeToSymbol)}- ${key}: ${elem.oldValue}\n${' '.repeat(stepChangeToSymbol)}+ ${key}: ${elem.newValue}`
        }
      }
      else if (type === 'deleted') {
        if (elem.children) {
          const childrens = iters(elem.children, depth + 1)
          const separator = ' '.repeat(stepChangeToSymbol)
          return `${separator}- ${key}: {\n${childrens}\n${' '.repeat(stepUnchange)}}`
        }
        return `${' '.repeat(stepChangeToSymbol)}- ${key}: ${elem.value}`
      }
      else if (type === 'added') {
        if (elem.children) {
          const childrens = iters(elem.children, depth + 1)
          const separator = ' '.repeat(stepChangeToSymbol)
          return `${separator}+ ${key}: {\n${childrens}\n${' '.repeat(stepUnchange)}}`
        }
        return `${' '.repeat(stepChangeToSymbol)}+ ${key}: ${elem.value}`
      }
    })
    return string.join('\n')
  }
  return `{\n${iters(children, 1)}\n}`
}

export default getStylishFormat
