import { Delta } from 'rich-text'
import { createAction, handleActions } from 'redux-actions'

const INITIAL_STATE = {
  delta: new Delta(),
  cursor: 0,
  selectionLength: null
}

const SET_DELTA = Symbol()
const SET_CURSOR = Symbol()
const SET_SELECTION = Symbol()
const SET_SELECTION_ATTRIBUTE = Symbol()
const DELETE_SELECTION = Symbol()

export const setDelta = createAction(SET_DELTA)
export const setCursor = createAction(SET_CURSOR)
export const setSelection = createAction(SET_SELECTION)
export const setSelectionAttribute = createAction(SET_SELECTION_ATTRIBUTE)
export const deleteSelection = createAction(DELETE_SELECTION)

const handlers = {
  [SET_DELTA] (state, { payload }) {
    return { ...state, delta: new Delta(payload) }
  },

  [SET_CURSOR] (state, { payload }) {
    return { ...state, cursor: payload, selectionLength: null }
  },

  [SET_SELECTION] (state, { payload }) {
    return { ...state, cursor: payload.cursor, selectionLength: payload.length }
  },

  [SET_SELECTION_ATTRIBUTE] (state, { payload }) {
    const update = new Delta().retain(state.cursor).retain(state.selectionLength, payload)
    return { ...state, delta: state.delta.compose(update) }
  },

  [DELETE_SELECTION] (state, { payload }) {
    const update = new Delta().retain(state.cursor).delete(payload.length)
    return { ...state, delta: state.delta.compose(update) }
  },
}

export const reducer = handleActions(handlers, INITIAL_STATE)
