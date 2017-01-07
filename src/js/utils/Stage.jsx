export class Stage {
  constructor($el) {
    this.$el = $($el);
    this.pxWidth = 10
    this.pxHeight = 10
    this.width = 32
    this.height = 32
    this.canvasWidth = this.width * this.pxWidth
    this.canvasHeight = this.height * this.pxHeight
    this.layers = []
    this.layerNum = -1
    this.canvas = this.$el.append('<canvas class="layer"></canvas>').find('.layer')[0]

    this.createNewLayer('#fff')
    this.createNewLayer('')
  }

  createNewLayer(color = '') {
    this.layers.splice(this.layerNum + 1, 0, {});
    console.log(this.layers);
    this.layerNum += 1
    this.changeVisible({})
    this.changeBlendMode({})
    this.changeAlpha({})
    this.layers[this.layerNum].ary = this.createStageAry(color)

    this.setLayer({layerNum: this.layerNum})
  }

  changeVisible({isVisible = true, layerNum = this.layerNum}) {
    this.layers[layerNum].isVisible = isVisible;
  }

  changeBlendMode({blendMode = 0}) {
    this.layers[this.layerNum].blendMode = blendMode;
  }

  changeAlpha({alpha = 1}) {
    this.layers[this.layerNum].alpha = alpha;
  }

  changeStagePxColor({pointX, pointY, color}) {
    this.layers[this.layerNum].ary[pointY][pointX] = color;
  }

  getLayerPxColors({
    pointX,
    pointY
  }) {
    const layerPxColors = [];

    this.layers.forEach((layer, layerNum) => {
      if(!layer.isVisible) return

      layerPxColors.push([
        layer.alpha,
        layer.blendMode,
        this.getStagePxColor({
          layerNum,
          pointX,
          pointY
        })
      ])
    })

    return layerPxColors;
  }

  getStagePxColor({
    layerNum = this.layerNum,
    pointX,
    pointY
  }) {
    return this.layers[layerNum].ary[pointY][pointX]
  }

  changeLayers({layers, color} = {}) {
    this.layers = layers
  }

  clearLayer(color) {
    this.layers[this.layerNum].ary = this.createStageAry(color)
  }

  removeLayer({layerNum = this.layerNum}) {
    this.layerNum -= 1
    this.layers.splice(layerNum, 1)
  }

  clearAllLayer() {
    this.layers.forEach((layer, layerNum) => {
      const color = layerNum === 0 ? '#fff' : '';

      this.layers[layerNum].ary = this.createStageAry(color)
    })
  }

  createStageAry(color = '') {
    const layer = [];
    for(let i = 0; i < this.height; i++) {
      layer[i] = [];
      for(let j = 0; j < this.width; j++) {
        layer[i][j] = color;
      }
    }

    return layer;
  }

  changePxSize({
    pxWidth = this.pxWidth,
    pxHeight = this.pxHeight
  }) {
    this.pxWidth = pxWidth
    this.pxHeight = pxHeight
  }

  changeSize({
    width = this.width,
    height = this.height
  }) {
    this.canvasWidth = width * this.pxWidth
    this.canvasHeight = height * this.pxHeight
  }

  setLayer({layerNum = this.layerNum}) {
    this.layerNum = layerNum;
    if(this.canvas.width !== this.canvasWidth) this.canvas.width = this.canvasWidth
    if(this.canvas.height !== this.canvasHeight) this.canvas.height = this.canvasHeight
    this.ctx = this.canvas.getContext('2d')
  }

  setG(ctx) {
    this.ctx = ctx;
  }
}
