export const SHOW_CONFIRM_MODAL = "SHOW_CONFIRM_MODAL"
export const HIDE_CONFIRM_MODAL = "HIDE_CONFIRM_MODAL"

export function showModal({size, title, body, callback, showCancelBtn = true}) {
    return {
        type : SHOW_CONFIRM_MODAL,
        size,
        title,
        body,
        callback,
        showCancelBtn
    }
}

export function hideModal() {
    return {
        type : HIDE_CONFIRM_MODAL
    }
}
