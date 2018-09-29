import { promises } from 'fs'

import Promise from 'bluebird'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

import { getFilesFromDir } from './src/util'
import visitor from './src/visitor'

const srcPath = '../blog/projects/year-in-van/src'

export default async function reactStats() {
  const files = getFilesFromDir(srcPath, ['.js', '.jsx'])
  console.log(files)
  const tags = await Promise.map(files, async file => {
    try {
      const code = await promises.readFile(`${srcPath}${file}`, 'utf-8')
      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'objectRestSpread'],
      })
      const state = []
      traverse(ast, visitor, null, state)
      return {
        file,
        state,
      }
    } catch (ex) {
      console.log('couldnt do it', ex)
    }
  })
  console.log(tags)
  await promises.writeFile('react-stats.json', JSON.stringify(tags, null, 2))
}

reactStats()
