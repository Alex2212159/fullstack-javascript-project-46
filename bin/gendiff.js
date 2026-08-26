#!/usr/bin/env node
import { Command } from "commander"
import path from "path"
import process from "node:process"
import genDiff from "../src/index.js"

const program = new Command()

program
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format [type]", "output format")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .action((first, second, options) => {
    const pathFirst = path.resolve(process.cwd(), first)
    const pathSecond = path.resolve(process.cwd(), second)
    console.log(genDiff(pathFirst, pathSecond))
  })

program.parse()
