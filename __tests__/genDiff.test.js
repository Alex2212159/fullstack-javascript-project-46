import { expect, test } from 'vitest'
import genDiff from '../src/index.js'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getPathUse = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

test('test perfect', () => {
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  expect(genDiff(getPathUse('file1.json'), getPathUse('file2.json'))).toBe(
    result,
  )
})

test('test with different format', () => {
  expect(() =>
    genDiff(getPathUse('file1.json'), getPathUse('file.txt')),
  ).toThrow()
})

test('test with empty json', () => {
  const result = `{
}`
  expect(
    genDiff(getPathUse('fileNull1.json'), getPathUse('fileNull2.json')),
  ).toBe(result)
})
