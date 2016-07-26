export function splitDelta (operations, predicate) {
  const split = [[]]

  operations.forEach((operation, index) => {
    if (predicate(operation, index)) {
      split.push([])
    } else {
      const last = split.pop()
      last.push(operation)
      split.push(last)
    }
  })

  return split
}

export function createInsertRenderer (factories) {
  return function (operation) {
    if (!operation.insert) return null

    const keys = Object.keys(operation.attributes || {})
    const factoryNames = keys.filter(key => !!factories[key])

    return factoryNames.reduce((element, name) => {
      const factory = factories[name]
      const factoryOptions = operation.attributes[name]
      const props = Object(factoryOptions) === factoryOptions ? factoryOptions : {}

      return factory(props, element)
    }, operation.insert)
  }
}
