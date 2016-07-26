import React from 'react'

const factories = {
  bold: React.createFactory('strong'),
  italic: React.createFactory('em'),
  link: React.createFactory('a')
}

function operationParagraphs (operations) {
  return operations.reduce((acc, operation) => {
    if (operation.attributes && operation.attributes.linebreak) {
      return [...acc, []]
    }

    const clone = [...acc]
    const last = clone.pop()
    last.push(operation)

    return clone.concat([last])
  }, [[]])
}

function renderInsertion (operation) {
  const keys = Object.keys(operation.attributes || {})
  const factoryNames = keys.filter(key => !!factories[key])

  return factoryNames.reduce((element, name) => {
    const factory = factories[name]
    const factoryOptions = operation.attributes[name]
    const props = Object(factoryOptions) === factoryOptions ? factoryOptions : {}

    return factory(props, element)
  }, operation.insert)
}

function paragraph (operations) {
  const insertions = operations.filter(op => op.hasOwnProperty('insert'))
  const children = insertions.map(renderInsertion)

  return <p>{children}</p>
}

export default function encodeJSX (delta) {
  const children = operationParagraphs(delta.ops).map(paragraph)

  return <section>{children}</section>
}
