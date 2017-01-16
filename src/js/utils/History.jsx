export class History {
	constructor({repeatSpeed = 10, replayCompleteFunction = false}) {
		this.data = []
		this.repeatSpeed = repeatSpeed
		this.replayCompleteFunction = replayCompleteFunction
	}

	changeHistory(data) {
		this.data = data
		this.gif = ''
	}

	moveLayerHistory(from, to) {
		console.log(from, to);
		this.data.push({moveLayer: [from, to]})
	}

	addDrawHistory({stage, oekaki, action}) {
		const { pointX, pointY, fillStyle } = oekaki

		const lastHistory = this.data[this.data.length - 1]

		if(
			this.data.length === 0 ||
			lastHistory[0] !== stage.layerNum ||
			lastHistory[1] !== pointX ||
			lastHistory[2] !== pointY ||
			lastHistory[3] !== fillStyle
		) {
			this.data.push([
				stage.layerNum,
				pointX,
				pointY,
				fillStyle
			])
		}
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

		let count = 0;
		for(let i = 0;i < data.length; i++) {
			if(data[i].moveLayer) {
				setTimeout(() => {
					const [from, to] = data[count].moveLayer
					count++
					stage.moveLayer({from, to}, false)
					oekaki.load()

					console.log(encoder.addFrame(stage.ctx));
				}, speed * i);
			} else {
				setTimeout(() => {
					const [layerNum, pointX, pointY, fillStyle] = data[count];
					stage.setLayer({layerNum})

					count++

					stage.changeStagePxColor({
						pointX,
						pointY,
						color: fillStyle
					})

					oekaki.draw({pointX, pointY, fillStyle});

					console.log(encoder.addFrame(stage.ctx));

					if(data.length === count) {
						encoder.finish();
						this.gif = 'data:image/gif;base64,' + encode64(encoder.stream().getData())

						if(this.replayCompleteFunction) this.replayCompleteFunction()
					}

					if(oekaki.drawingFunction) oekaki.drawingFunction()
				}, speed * i);
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