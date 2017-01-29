import * as ActionTypes from '../actions/OekakiWindowActions'

const initialState = {
  zIndex: parseInt(localStorage['window_zindex']) || 0
}

export default function OekakiWindowActionsReducer (state = initialState, action) {
  switch (action.type)
  {
    case ActionTypes.CHENGE_WINDOW_Z_INDEX : {
      return Object.assign({}, state, {
        zIndex: action.zIndex
      })
    }

    default :
      return state;
  }
}