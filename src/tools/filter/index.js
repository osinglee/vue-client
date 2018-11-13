/**
 * 定义vue全局管道方法
 */

/**
 * 格式化css单位
 * @param value
 * @returns {*}
 */
export function capitalize(value) {
  if (!value) return '100%'
  return isNaN(value) ? value : value + 'px'
}

export function filePathToUrl(value) {
  if (value instanceof Array && value.length) {
    return value.map(v => {
      return {
        ...v,
        url: v.path
      }
    })
  }
  return []
}
