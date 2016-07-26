import { createStore, combineReducers } from 'redux'
import { reducer as delta } from '../redux/delta'

export default function configureStore () {
  const reducer = combineReducers({ delta })
  const store = createStore(reducer)

  return store
}
