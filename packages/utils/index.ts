import { startsWith } from 'lodash-es'
export function normalizePath(basePath: string, path?: string): string | never {
  let newPath: string
  if (path && startsWith(path, '/')) {
    newPath = path
  } else {
    if (!startsWith(basePath, '/')) {
      throw new Error('请检查route路径配置是否正确')
    } else {
      newPath = basePath + '/' + (path || '')
    }
  }

  return newPath.replace(/\/+/g, '/').replace(/\/+$/, '')
}
