import React from 'react'
import keydown from 'react-keydown'
import { renderToStaticMarkup } from 'react-dom/server'
import { connect } from 'react-redux'
import encodeJSX from '../../encoders/jsx'
import { insert } from '../../redux/delta'

const PERMITTED_KEYS = ['Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

class Editor extends React.Component {
  componentWillReceiveProps ({ keydown: { event } }) {
    if (!event) return
    if (!this.eventPermitted(event)) {
      event.preventDefault()
    }

    this.handleChange(event)
  }

  eventPermitted (e) {
    return e.altKey || PERMITTED_KEYS.indexOf(e.code) > -1
  }

  handleChange (event) {
    const character = event.shiftKey
      ? String.fromCharCode(event.which)
      : String.fromCharCode(event.which).toLowerCase()

    console.log(character, event)
    if (character.length > 0) this.props.dispatch(insert(character))
  }

  render () {
    const html = renderToStaticMarkup(encodeJSX(this.props.delta.delta))

    return (
      <div
        contentEditable
        onInput={e => e.preventDefault()}
        onBlur={e => e.preventDefault()}
        dangerouslySetInnerHTML={{ __html: html }}
      >
      </div>
    )
  }
}

const connectMap = state => ({ delta: state.delta })
export default connect(connectMap)(keydown(Editor))
