import { expect, test } from 'vitest'
import { fileURLToPath } from 'url'
import path from 'path'
import * as fs from 'node:fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getPathUse = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

test('test perfect functional stylish', () => {
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

test('test perfect functional plain', () => {
  const result = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`

  expect(
    genDiff(getPathUse('file1.json'), getPathUse('file2.json'), 'plain'),
  ).toBe(result)
  expect(
    genDiff(getPathUse('file1.yml'), getPathUse('file2.yml'), 'plain'),
  ).toBe(result)
})

test('test perfect functional json', () => {
  const result = fs.readFileSync(getPathUse('expected-json'), 'utf-8')

  expect(
    genDiff(getPathUse('file1.json'), getPathUse('file2.json'), 'json'),
  ).toBe(result)
  expect(
    genDiff(getPathUse('file1.yml'), getPathUse('file2.yml'), 'json'),
  ).toBe(result)
})

test('test with different format', () => {
  expect(() =>
    genDiff(getPathUse('file1.json'), getPathUse('file.txt')),
  ).toThrow()
  expect(() =>
    genDiff(getPathUse('file1.yml'), getPathUse('file.txt')),
  ).toThrow()
})

test('test with empty file with format stylish', () => {
  const result = `{
}`
  expect(
    genDiff(getPathUse('fileNull1.json'), getPathUse('fileNull2.json')),
  ).toBe(result)
  expect(
    genDiff(getPathUse('file1Null.yml'), getPathUse('file2Null.yml')),
  ).toBe(result)
})

test('test with empty file with format plain', () => {
  const result = ''
  expect(
    genDiff(
      getPathUse('fileNull1.json'),
      getPathUse('fileNull2.json'),
      'plain',
    ),
  ).toBe(result)
  expect(
    genDiff(getPathUse('file1Null.yml'), getPathUse('file2Null.yml'), 'plain'),
  ).toBe(result)
})

test('test with empty file with format json', () => {
  const result = '[]'
  expect(
    genDiff(getPathUse('fileNull1.json'), getPathUse('fileNull2.json'), 'json'),
  ).toBe(result)
  expect(
    genDiff(getPathUse('file1Null.yml'), getPathUse('file2Null.yml'), 'json'),
  ).toBe(result)
})
