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
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`
  expect(genDiff(getPathUse('file1.json'), getPathUse('file2.json'))).toBe(
    result,
  )
  expect(genDiff(getPathUse('file1.yml'), getPathUse('file2.yml'))).toBe(result)
})

test('test with different format', () => {
  expect(() =>
    genDiff(getPathUse('file1.json'), getPathUse('file.txt')),
  ).toThrow()
  expect(() =>
    genDiff(getPathUse('file1.yml'), getPathUse('file.txt')),
  ).toThrow()
})

test('test with empty file', () => {
  const result = `{
}`
  expect(
    genDiff(getPathUse('fileNull1.json'), getPathUse('fileNull2.json')),
  ).toBe(result)
  expect(
    genDiff(getPathUse('file1Null.yml'), getPathUse('file2Null.yml')),
  ).toBe(result)
})
