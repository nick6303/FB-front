export const getRules = (formData) => {
  const rule = {}
  Object.keys(formData).forEach((key) => {
    rule[key] = [{ required: true, message: '↑此項必填' }]
  })
  return rule
}

export function assemblyParams(params) {
  // api url 組字串
  let str = ''
  Object.keys(params).forEach((key) => {
    if (params[key] || params[key] === false || params[key] === 0) {
      str += `${key}=${params[key]}&`
    }
  })
  return str.substring(0, str.length - 1) // 去結尾&
}
