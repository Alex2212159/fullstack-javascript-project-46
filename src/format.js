import path from 'node:path'

const getType = (filePath) => {
  const ext = path.extname(filePath)
  if (ext === '.json') {
    return 'json'
  }
  else if (ext === '.yml' || ext === '.yaml') {
    return 'yaml'
  }
  else {
    throw new Error(
      `Файл, который лежит ${filePath} не содержит формат ".json" или ".yml/.yaml"`,
    )
  }
}

export default getType
