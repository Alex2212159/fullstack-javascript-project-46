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
  const result = fs.readFileSync(getPathUse('expected-stylish'), 'utf-8')

  expect(genDiff(getPathUse('file1.json'), getPathUse('file2.json'))).toBe(
    result,
  )
  expect(genDiff(getPathUse('file1.yml'), getPathUse('file2.yml'))).toBe(result)
})

test('test perfect functional plain', () => {
  const result = fs.readFileSync(getPathUse('expected-plain'), 'utf-8')

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
