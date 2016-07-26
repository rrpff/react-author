import React from 'react'

const element = tag => (content, attributes) => React.createElement(tag, attributes, content)
const formatters = {
  bold: element('strong'),
  italic: element('em'),
  link: element('a')
}

function paragraphs (operations) {
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

function paragraph (operations) {
  const insertions = operations.filter(op => op.hasOwnProperty('insert'))
  const formatted = insertions.map(operation => {
    const keys = Object.keys(operation.attributes || {})
    const formatterNames = keys.filter(key => !!formatters[key])

    return formatterNames.reduce((acc, name) => {
      const formatter = formatters[name]
      const formatterOptions = operation.attributes[name]
      const props = Object(formatterOptions) === formatterOptions ? formatterOptions : {}

      return formatter(acc, props)
    }, operation.insert)
  })

  return <p>{formatted}</p>
}

export default function encodeJSX (delta) {
  const children = paragraphs(delta.ops).map(paragraph)

  return <section>{children}</section>
}
