import { combineReducers } from 'redux'
import OekakiCanvasActionsReducer from './OekakiCanvasActionsReducer'
import ConfirmModalActionsReducer from './ConfirmModalActionsReducer'

const rootReducer = combineReducers({
    OekakiCanvasActionsReducer,
    ConfirmModalActionsReducer
});

export default rootReducer;
