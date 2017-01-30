export const CHANGE_HISTORY = "CHANGE_HISTORY"
export function changeHistory(history) {
    return {
        type : CHANGE_HISTORY,
        history
    }
}

export const CHANGE_STAGE = "CHANGE_STAGE"
export function changeStage(stage) {
    return {
        type : CHANGE_STAGE,
        stage
    }
}

export const CHANGE_LAYERS = "CHANGE_LAYERS"
export function changeLayers(layers) {
    return {
        type : CHANGE_LAYERS,
        layers
    }
}

export const CHANGE_OEKAKI = "CHANGE_OEKAKI"
export function changeOekaki(oekaki) {
    return {
        type : CHANGE_OEKAKI,
        oekaki
    }
}

export const CHANGE_MINI_OEKAKI = "CHANGE_MINI_OEKAKI"
export function changeMiniOekaki(miniOekaki) {
    return {
        type : CHANGE_MINI_OEKAKI,
        miniOekaki
    }
}

export const CHANGE_X_MINI_OEKAKI = "CHANGE_X_MINI_OEKAKI"
export function changeXminiOekaki(x_miniOekaki) {
    return {
        type : CHANGE_X_MINI_OEKAKI,
        x_miniOekaki
    }
}


export const CHANGE_COLORS = "CHANGE_COLORS"
export function changeColors(colors) {
    return {
        type : CHANGE_COLORS,
        colors
    }
}