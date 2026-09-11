const getJsonFormat = (tree = []) => {
  const jsonString = JSON.stringify(tree, null, 2)
  return jsonString
}

export default getJsonFormat
