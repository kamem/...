
export const CHENGE_WINDOW_Z_INDEX = "CHENGE_WINDOW_Z_INDEX"
export function changeZindex(zIndex) {
    return {
        type : CHENGE_WINDOW_Z_INDEX,
        zIndex
    }
}