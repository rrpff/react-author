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

function createInsertWrapper (operation, factories) {
  return function (content, factoryName) {
    const factory = factories[factoryName]
    const factoryOptions = operation.attributes[factoryName]
    const hasOptions = Object(factoryOptions) === factoryOptions
    const props = hasOptions ? factoryOptions : {}

    return factory(props, content)
  }
}

export function createInsertRenderer (factories) {
  return function (operation) {
    if (!operation.insert) return null

    const keys = Object.keys(operation.attributes || {})
    const foundFactories = keys.filter(key => factories.hasOwnProperty(key))
    const wrapInsert = createInsertWrapper(operation, factories)

    return foundFactories.reduce(wrapInsert, operation.insert)
  }
}
