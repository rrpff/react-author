import { createInsertRenderer, splitDelta } from '../rich-text-operate'

function createElementFactory (element) {
  return function (props, content) {
    const attributes = Object.keys(props).reduce((acc, key) => {
      const value = props[key]
      const quoted = typeof value === 'string' ? `"${value}"` : value

      return ` ${key}=${quoted}`
    }, '')

    return `<${element}${attributes}>${content}</${element}>`
  }
}

const factories = {
  bold: createElementFactory('strong'),
  italic: createElementFactory('em'),
  link: createElementFactory('a')
}

const render = createInsertRenderer(factories)

function renderParagraph (operations) {
  const insertions = operations.filter(op => op.hasOwnProperty('insert'))
  const children = insertions.map(render)

  return `<p>${children}</p>`
}

export default function encodeJSX (delta) {
  const paragraphs = splitDelta(delta.ops, op => op.attributes && op.attributes.linebreak)
  const children = paragraphs.map(renderParagraph)

  return `<section>${children}</section>`
}
