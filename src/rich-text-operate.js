// @flow

export function splitDelta (operations: Object[], predicate: Function): Array[] {
  const split: Array[] = [[]]

  operations.forEach((operation: Object, index: number) => {
    if (predicate(operation, index)) {
      split.push([])
    } else {
      const last: Array = split.pop()
      last.push(operation)
      split.push(last)
    }
  })

  return split
}

function createInsertWrapper (operation: Object, factories: Object): Function {
  return function (content: mixed, factoryName: string): any {
    const factory: Function = factories[factoryName]
    const factoryOptions: Object = operation.attributes[factoryName]
    const props: Object = Object(factoryOptions) === factoryOptions ? factoryOptions : {}

    return factory(props, content)
  }
}

export function createInsertRenderer (factories: Object): Function {
  return function (operation: Object): any {
    if (!operation.insert) return null

    const keys: string[] = Object.keys(operation.attributes || {})
    const foundFactories: string[] = keys.filter(key => factories.hasOwnProperty(key))
    const wrapInsert: any = createInsertWrapper(operation, factories)

    return foundFactories.reduce(wrapInsert, operation.insert)
  }
}
