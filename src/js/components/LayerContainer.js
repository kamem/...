import React from 'react'

// Components
import {Panel as ColorPickerPanel} from 'rc-color-picker';
import Layers from './Layers';
import BlendMode from './BlendMode';
import LayerOperation from './LayerOperation';
import OekakiWindow from './OekakiWindow';

// css
import styles from '../../css/layerContainer.css'

export default class LayerContainer extends React.Component {
	static propTypes = {
		layers: React.PropTypes.array,
		layerNum: React.PropTypes.number,
		changeStage: React.PropTypes.func.isRequired,
		updateCanvas: React.PropTypes.func.isRequired,
	}
	render () {
		const {
			layers,
			layerNum,
			updateCanvas
		} = this.props

		return (
			<OekakiWindow title="レイヤー" className={styles.container}>
				<header className={styles.header}>
					<BlendMode
						handleBlendMode={::this.handleBlendMode}
						blendMode={layers ? layers[layerNum].blendMode : 0}
					/>

					<p className={styles.alpha}>不透明度 : <input type="text" style={{width: '30px'}} value={layers ? layers[layerNum].alpha * 100 : 100} classNeme="alpha" onChange={::this.handleChangeAlpha} /> %
					</p>
				</header>

				<Layers
						handleChangeVisible={::this.handleChangeVisible}
						handleChangeLayer={::this.handleChangeLayer}
						handleMoveLayer={::this.handleMoveLayer}
						handleChangeLayers={::this.handleChangeLayers}
						{...{
							layers,
							layerNum,
							updateCanvas
						}}
				/>

				<LayerOperation
					handleNewLayer={::this.handleNewLayer}
					handleRemoveLayer={::this.handleRemoveLayer}
				/>
			</OekakiWindow>
		);
	}


	handleMoveLayer(fromTo) {
		this.props.stage.moveLayer(fromTo)
	}

	handleChangeLayers(layers) {
		this.props.stage.changeLayers({layers})
	}

	handleRemoveLayer(e) {
		const { stage, changeStage } = this.props
		stage.removeLayer({})
		changeStage(stage)
		this.props.updateCanvas()
	}

	handleNewLayer(e) {
		const { stage, changeStage } = this.props
		stage.createNewLayer()
		changeStage(stage)
	}

	handleChangeLayer(layerNum) {
		const { stage, changeStage } = this.props
		stage.setLayer({layerNum})
		changeStage(stage)
	}

	handleChangeVisible(layerNum) {
		const {
			stage: {
				layers
			},
		} = this.props
		this.props.stage.changeVisible({isVisible: !layers[layerNum].isVisible, layerNum})
		this.props.updateCanvas()
	}

	handleChangeAlpha(e) {
		this.props.stage.changeAlpha({alpha: parseFloat(e.target.value / 100)})
		this.props.updateCanvas()
	}

	handleBlendMode(e) {
		console.log(e.target.value);
		this.props.stage.changeBlendMode({blendMode: parseInt(e.target.value)})
		this.props.updateCanvas()
	}
}