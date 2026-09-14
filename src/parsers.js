import { load } from 'js-yaml'

export default function (content, type) {
  const result = type === 'json' ? JSON.parse(content) : load(content)
  return result
}
