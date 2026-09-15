const getJsonFormat = (tree = {}) => {
  const children = tree.children
  const jsonString = JSON.stringify(children, null, 2)
  return jsonString
}

export default getJsonFormat
