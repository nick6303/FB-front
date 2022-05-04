export const getRules = (formData) => {
  const rule = {}
  Object.keys(formData).forEach((key) => {
    rule[key] = [{ required: true, message: '↑此項必填' }]
  })
  return rule
}
