import * as ActionTypes from '../actions/OekakiCanvasActions'

const initialState = {
  stage: {},
  oekaki: {},
  history: {},
  mini: {},
  miniOekaki: {},
  x_miniOekaki: {},
  layers: [],
}

export default function OekakiCanvasActionsReducer (state = initialState, action) {
  switch (action.type)
  {
    case ActionTypes.CHANGE_HISTORY :
      return Object.assign({}, state, {
        history: action.history
      })
    case ActionTypes.CHANGE_STAGE :
      return Object.assign({}, state, {
        stage: action.stage
      })
    case ActionTypes.CHANGE_LAYERS :
      return Object.assign({}, state, {
        layers: action.layers
      })

    case ActionTypes.CHANGE_OEKAKI :
      return Object.assign({}, state, {
        oekaki: action.oekaki
      })

    case ActionTypes.CHANGE_MINI_OEKAKI :
      return Object.assign({}, state, {
        miniOekaki: action.miniOekaki
      })
    case ActionTypes.CHANGE_X_MINI_OEKAKI :
      return Object.assign({}, state, {
        x_miniOekaki: action.x_miniOekaki
      })

    default :
      return state;
  }
}