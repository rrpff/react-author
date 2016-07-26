import { Delta } from 'rich-text'
import configureStore from './store'

const store = configureStore()
const initialDelta = new Delta([
  { insert: 'This is a challenging test of my library!' }
])

import { setDelta, setCursor, setSelection, setSelectionAttribute,
         deleteSelection } from './redux/delta'

store.dispatch(setDelta(initialDelta))
store.dispatch(setSelection({ cursor: 10, length: 16 }))
store.dispatch(setSelectionAttribute({ bold: true }))
store.dispatch(setSelection({ cursor: 22, length: 4 }))
store.dispatch(setSelectionAttribute({ italic: true }))
store.dispatch(setSelection({ cursor: 33, length: 7 }))
store.dispatch(setSelectionAttribute({ link: { href: '/demo' } }))
store.dispatch(setCursor(0))

console.log(JSON.stringify(store.getState().delta, null, 2))
