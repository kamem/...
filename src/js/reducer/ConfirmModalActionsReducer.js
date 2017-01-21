import * as ActionTypes from '../actions/ConfirmModalActions';

const initialState = {
    isVisible: false,
    title: null,
    body: null,
    showCancelBtn: true,
    callback: () => {},
}

export default function ConfirmModalActionsReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SHOW_CONFIRM_MODAL :
            return  Object.assign({}, state, {
                isVisible: true,
                size: action.size,
                title: action.title,
                body: action.body,
                callback: action.callback || function() {},
                showCancelBtn: action.showCancelBtn
            });
        case ActionTypes.HIDE_CONFIRM_MODAL :
            return  Object.assign({}, state, {
                isVisible: false,
                title: null,
                body: null,
                showCancelBtn: true,
                callback: () => {},
            });

        default :
            return state;
    }
}
