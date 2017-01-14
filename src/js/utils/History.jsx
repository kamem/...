export class History {
	constructor({repeatSpeed = 10}) {
		this.data = []
		this.repeatSpeed = repeatSpeed
	}

	changeHistory(data) {
		this.data = data
	}

	moveLayerHistory(from, to) {
		console.log(from, to);
		this.data.push({moveLayer: [from, to]})
	}

	addDrawHistory({stage, oekaki, action}) {
		const lastHistory = this.data[this.data.length - 1];
		const { pointX, pointY, fillStyle } = oekaki
		if(
			this.data.length === 0 ||
			lastHistory.layerNum !== stage.layerNum ||
			lastHistory.pointX !== pointX ||
			lastHistory.pointY !== pointY ||
			lastHistory.fillStyle !== fillStyle
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

		let count = 0;
		for(let i = 0;i < data.length; i++) {

			if(data[i].moveLayer) {
				setTimeout(() => {
					const [from, to] = data[count].moveLayer
					count++
					stage.moveLayer({from, to}, false)
					oekaki.load()
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