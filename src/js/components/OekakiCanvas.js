import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// utils
import { History } from '../utils/History'
import { Stage } from '../utils/Stage'
import { Oekaki } from '../utils/Oekaki'

// Actions
import * as OekakiCanvasActions from '../actions/OekakiCanvasActions';

// Components
import OekakiHeader from './OekakiHeader';
import OekakiTool from './OekakiTool';
import OekakiColor from './OekakiColor';
import LayerContainer from './LayerContainer';

// css
import styles from '../../css/oekaki.css'

export class OekakiCanvas extends React.Component {

	render () {
		const {
			stage,
			stage: {
				canvasWidth: width,
				canvasHeight: height,
				layers,
				layerNum,
			},
			oekaki,
			oekaki: {
				mode,
				color
			},
			OekakiCanvasActions: { changeOekaki, changeStage }
		} = this.props

		return (
			<div>
				<OekakiHeader
					handleSave={::this.handleSave}
					handleReplay={::this.handleReplay}
				/>

				<OekakiTool
					oekakiMode={mode}
					updateCanvas={::this.updateCanvas}
					{...{
						stage,
						oekaki,
						changeOekaki,
						changeStage
					}}
				/>

				<div className={styles.stage}>
					<div className={styles.oekaki} style={{
						width, height
					}}></div>
				</div>

				<div className={styles.mini}></div>

				<OekakiColor
					{...{
						oekaki,
						color
					}}
				/>

				<LayerContainer
					handleChangeVisible={::this.handleChangeVisible}
					handleBlendMode={::this.handleBlendMode}
					handleChangeAlpha={::this.handleChangeAlpha}

					handleChangeLayer={::this.handleChangeLayer}
					handleMoveLayer={::this.handleMoveLayer}
					handleChangeLayers={::this.handleChangeLayers}

					handleNewLayer={::this.handleNewLayer}
					handleRemoveLayer={::this.handleRemoveLayer}

					updateCanvas={::this.updateCanvas}
					{...{
						layers,
						layerNum
					}}
				/>
			</div>
		);
	}

	componentDidMount() {
		const $el = $(`.${styles.oekaki}`)
		const $mini = $(`.${styles.mini}`)

		const history = new History({})

		const stage = new Stage({el: $el, history})
		const mini = new Stage({el: $mini})

		mini.changePxSize({
			pxWidth: 2,
			pxHeight: 2,
		})
		mini.changeSize({
			width: 32,
			height: 32
		})
		mini.setLayer({})

		const search = window.location.search.substring(1,window.location.search.length)
		const inflateSearch = inflate(search);

		if(window.location.search) {
			stage.changeLayers({layers:
				JSON.parse(decodeURI(inflateSearch.replace(/%23/g,'#')))
			})
			mini.changeLayers({layers: stage.layers})
		}
		const miniOekaki = new Oekaki({
			stage: mini
		})
		const oekaki = new Oekaki({
			stage,
			history,
			endFunction: () => {
				mini.changeLayers({layers: stage.layers})

				this.updateCanvas(false)

				//console.log(new RGBColor(oekaki.color));
				//console.log('test');
			}
		});

		oekaki.load()
		miniOekaki.load()

		oekaki.setDrawEvent()

		if(localStorage['draw']) {
			history.changeHistory(JSON.parse(localStorage['draw']))
			//oekaki.repeat({});
		}

		const {
			changeStage,
			changeMini,
			changeOekaki,
			changeMiniOekaki,
			changeHistory
		} = this.props.OekakiCanvasActions
		changeStage(stage)
		changeMini(mini)
		changeOekaki(oekaki)
		changeMiniOekaki(miniOekaki)
		changeHistory(history)
	}

	handleMoveLayer(fromTo) {
		this.props.stage.moveLayer(fromTo)
	}
	handleChangeLayers(layers) {
		this.props.stage.changeLayers({layers})
	}

	handleReplay() {
		const { stage, oekaki } = this.props
		this.props.history.changeHistory(JSON.parse(localStorage['draw']))
		this.props.history.repeat({stage, oekaki})
		// this.props.stage.setLayer({layerNum: parseInt(e.target.value)})
	}

	handleSave() {
		this.props.history.save({stage: this.props.stage})
	}

	handleRemoveLayer(e) {
		const {
			stage,
			OekakiCanvasActions: { changeStage }
		} = this.props
		stage.removeLayer({})
		changeStage(stage)
		this.updateCanvas()
	}

	handleNewLayer(e) {
		const {
			stage,
			OekakiCanvasActions: { changeStage }
		} = this.props
		stage.createNewLayer()
		changeStage(stage)
	}

	handleChangeLayer(layerNum) {
		const {
			stage,
			OekakiCanvasActions: { changeStage }
			} = this.props
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
		this.updateCanvas()
	}

	handleChangeAlpha(e) {
		this.props.stage.changeAlpha({alpha: parseFloat(e.target.value / 100)})
		this.updateCanvas()
	}

	handleBlendMode(e) {
		console.log(e.target.value);
		this.props.stage.changeBlendMode({blendMode: parseInt(e.target.value)})
		this.updateCanvas()
	}

	updateCanvas(mainUpdate = true) {
		if(mainUpdate) this.props.oekaki.load()
		this.props.miniOekaki.load()
		this.props.OekakiCanvasActions.changeStage(this.props.stage)
	}
}


function mapStateToProps(state) {
	const { stage, mini, oekaki, miniOekaki, history } = state.OekakiCanvasActionsReducer;
	return {
		OekakiCanvasActionsReducer: state.OekakiCanvasActionsReducer,
		stage, mini, oekaki, miniOekaki, history
	};
}

function mapDispatchToProps(dispatch) {
	return {
		OekakiCanvasActions: bindActionCreators(OekakiCanvasActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(OekakiCanvas)
