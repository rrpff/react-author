import React from 'react'
import { createInsertRenderer, splitDelta } from '../rich-text-operate'

const factories = {
  bold: React.createFactory('strong'),
  italic: React.createFactory('em'),
  link: React.createFactory('a')
}

const render = createInsertRenderer(factories)

function renderParagraph (operations) {
  const insertions = operations.filter(op => op.hasOwnProperty('insert'))
  const children = insertions.map(render)

  return <p>{children}</p>
}

export default function encodeJSX (delta) {
  const paragraphs = splitDelta(delta.ops, op => op.attributes && op.attributes.linebreak)
  const children = paragraphs.map(renderParagraph)

  return <section>{children}</section>
}
