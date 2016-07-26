import React from 'react'
import { Provider } from 'react-redux'
import { Delta } from 'rich-text'
import { render } from 'react-dom'
import configureStore from './store'
import Editor from './components/Editor/Editor'

const store = configureStore()
const initialDelta = new Delta([
  { insert: 'This is a stupid challenging test of my library!' }
])

import { setDelta, setCursor, setSelection, setSelectionAttribute,
         deleteSelection, insert, insertLinebreak } from './redux/delta'

store.dispatch(setDelta(initialDelta))
store.dispatch(setSelection({ cursor: 10, length: 7 }))
store.dispatch(deleteSelection())
store.dispatch(setSelection({ cursor: 10, length: 16 }))
store.dispatch(setSelectionAttribute({ bold: true }))
store.dispatch(setSelection({ cursor: 22, length: 4 }))
store.dispatch(setSelectionAttribute({ italic: true }))
store.dispatch(setSelection({ cursor: 33, length: 7 }))
store.dispatch(setSelectionAttribute({ link: { href: '/demo' } }))
store.dispatch(setCursor(-1))
store.dispatch(insertLinebreak())
store.dispatch(insert({ content: 'have a good day' }))

const app = (
  <Provider store={store}>
    <Editor />
  </Provider>
)

render(app, document.getElementById('root'))
