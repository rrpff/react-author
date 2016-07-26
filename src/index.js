import { Delta } from 'rich-text'
import { renderToStaticMarkup } from 'react-dom/server'
import configureStore from './store'
import encodeJSX from './encoders/jsx'

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

const delta = store.getState().delta
console.log(renderToStaticMarkup(encodeJSX(delta)))
