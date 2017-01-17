export class History {
	constructor({repeatSpeed = 10, replayCompleteFunction = false}) {
		this.data = []
		this.repeatSpeed = repeatSpeed
		this.replayCompleteFunction = replayCompleteFunction
		this.gif = ''
		this.drawData = []

		this.delay = 0
		this.count = 0
	}

	changeHistory(data) {
		this.data = data
	}

	addMoveLayerHistory(from, to) {
		console.log(from, to);
		this.data.push({moveLayer: [from, to]})
	}

	clearDrawHistory() {
		this.drawData = []
	}

	addAllDrawHistory() {
		this.data.push({draw: this.drawData})
	}

	addDrawHistory({stage, oekaki, action}) {
		const { pointX, pointY, fillStyle } = oekaki

		const lastHistory = this.drawData[this.drawData.length - 1]

		if(
			this.drawData.length === 0 ||
			lastHistory[0] !== stage.layerNum ||
			lastHistory[1] !== pointX ||
			lastHistory[2] !== pointY ||
			lastHistory[3] !== fillStyle
		) {
			this.drawData.push([
				stage.layerNum,
				pointX,
				pointY,
				fillStyle
			])
		}
	}

	setEvents(action, delay) {
		this.delay += this.repeatSpeed
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.count++
				action()

				if(this.delay - this.count * this.repeatSpeed === 0) {
					console.log('replay finish!');
					//encoder.finish();
					//this.gif = 'data:image/gif;base64,' + encode64(encoder.stream().getData())

					if(this.replayCompleteFunction) this.replayCompleteFunction()
				}

				resolve()
			}, delay)
		});
	}

	repeat({
		speed = this.repeatSpeed,
		data = this.data,
		stage,
		oekaki,
	}) {
		oekaki.clear()

		const encoder = new GIFEncoder();
		encoder.setDelay(0);
		console.log(encoder.start());

		this.count = 0
		this.delay = 0
		for(let i = 0;i < data.length; i++) {
			const action = data[i];

			if(action.moveLayer) {
				this.setEvents(() => {
					const [from, to] = action.moveLayer
					stage.moveLayer({from, to}, false)
					oekaki.load()

					//encoder.addFrame(stage.ctx)
				}, this.delay).then(() => console.log('layer change!', action.moveLayer))
			} else if(action.draw) {
				action.draw.forEach((draw) => {
					this.setEvents(() => {
						const [layerNum, pointX, pointY, fillStyle] = draw;
						stage.setLayer({layerNum})

						stage.changeStagePxColor({
							pointX,
							pointY,
							color: fillStyle
						})

						oekaki.draw({pointX, pointY, fillStyle});

						//encoder.addFrame(stage.ctx)
					}, this.delay).then(() => console.log('draw!', draw))
				})
			}
		}
	}


	save({stage}) {
		const deflateLayers = deflate(JSON.stringify(stage.layers));
		const history = JSON.stringify(this.data);

		console.log(history);

		// window.location.search = JSON.stringify(this.history);
		window.location.search = deflateLayers
		localStorage['draw'] = history
	}
}