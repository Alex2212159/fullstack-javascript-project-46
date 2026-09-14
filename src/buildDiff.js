import _ from 'lodash'

const buildUnchangedChildren = (obj = {}) =>
  Object.entries(obj).map(([key, value]) => {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      return { key, type: 'unchanged', children: buildUnchangedChildren(value) }
    }
    return { key, type: 'unchanged', value }
  })

const buildDiff = (obj1 = {}, obj2 = {}) => {
  if (Object.keys(obj1).length === 0 && Object.keys(obj2).length === 0) {
    return []
  }
  const arrKeyFirst = Object.keys(obj1)
  const arrKeysSecond = Object.keys(obj2)

  const arrayAllKeys = [...arrKeyFirst, ...arrKeysSecond]
  const arrayUniqKeys = [...new Set(arrayAllKeys)]

  const arrayKeysSorted = _.sortBy(arrayUniqKeys)

  const newArrayKeys = arrayKeysSorted.map((elem) => {
    const flagFirst = Object.hasOwn(obj1, elem)
    const flagSecond = Object.hasOwn(obj2, elem)

    if (flagFirst && flagSecond) {
      if (
        Object.prototype.toString.call(obj1[elem]) === '[object Object]'
        && Object.prototype.toString.call(obj2[elem]) === '[object Object]'
      ) {
        return {
          key: elem,
          type: 'nested',
          children: buildDiff(obj1[elem], obj2[elem]),
        }
      }
      if (obj1[elem] === obj2[elem]) {
        return { key: elem, type: 'unchanged', value: obj1[elem] }
      }
      else if (
        Object.prototype.toString.call(obj1[elem]) === '[object Object]'
        || Object.prototype.toString.call(obj2[elem]) === '[object Object]'
      ) {
        return {
          key: elem,
          type: 'changed',
          children: buildUnchangedChildren(obj1[elem]),
          newValue: obj2[elem],
          oldValue: obj1[elem],
        }
      }
      return {
        key: elem,
        type: 'changed',
        oldValue: obj1[elem],
        newValue: obj2[elem],
      }
    }
    if (flagFirst) {
      if (Object.prototype.toString.call(obj1[elem]) === '[object Object]') {
        return {
          key: elem,
          type: 'deleted',
          children: buildUnchangedChildren(obj1[elem]),
        }
      }
      return { key: elem, type: 'deleted', value: obj1[elem] }
    }
    if (Object.prototype.toString.call(obj2[elem]) === '[object Object]') {
      return {
        key: elem,
        type: 'added',
        children: buildUnchangedChildren(obj2[elem]),
      }
    }
    return { key: elem, type: 'added', value: obj2[elem] }
  })
  return newArrayKeys
}

const buildTree = (obj1 = {}, obj2 = {}) => {
  return { type: 'root', children: buildDiff(obj1, obj2) }
}

export default buildTree
