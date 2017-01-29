import { combineReducers } from 'redux'
import OekakiCanvasActionsReducer from './OekakiCanvasActionsReducer'
import ConfirmModalActionsReducer from './ConfirmModalActionsReducer'
import OekakiWindowActionsReducer from './OekakiWindowActionsReducer'

const rootReducer = combineReducers({
    OekakiCanvasActionsReducer,
    ConfirmModalActionsReducer,
    OekakiWindowActionsReducer
});

export default rootReducer;
