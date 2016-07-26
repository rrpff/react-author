import React from 'react'
import { connect } from 'react-redux'
import encodeJSX from '../../encoders/jsx'

class Editor extends React.Component {
  render () {
    return encodeJSX(this.props.delta.delta)
  }
}

const connectMap = state => ({ delta: state.delta })
export default connect(connectMap)(Editor)
