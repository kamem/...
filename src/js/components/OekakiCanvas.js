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
import * as ConfirmModalActions from '../actions/ConfirmModalActions';

// Components
import OekakiHeader from './OekakiHeader';
import OekakiTool from './OekakiTool';
import OekakiColor from './OekakiColor';
import LayerContainer from './LayerContainer';
import OekakiHistories from './OekakiHistories';
import ActualSize from './ActualSize';

// css
import styles from '../../css/oekaki.css'

export class OekakiCanvas extends React.Component {

	render () {
		const {
			stage,
			colors,
			stage: {
				layers,
				layerNum,
			},
			oekaki,
			oekaki: {
				mode,
				color
			},
			history,
			history: {
				data: histories,
				activeData: activeHistories,
				nonActiveData: nonActiveHistories,
				selectedHistoryNum
			},
			OekakiCanvasActions: { changeOekaki, changeStage, changeHistory, changeColors },
			ConfirmModalActions: { showModal }
		} = this.props

		return (
			<div>
				<OekakiHeader {...{ stage, oekaki, history }} />

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
					<div className={classNames(styles.oekaki, styles[mode])}></div>
				</div>

				<ActualSize />

				<OekakiColor
					updateColors={() => changeColors(stage.getAllColor())}
					updateCanvas={::this.updateCanvas}
					{...{ stage, oekaki, color, colors, changeOekaki }} />

				<p><img src={history.gif} /></p>

				<LayerContainer
					updateCanvas={::this.updateCanvas}
					{...{
						stage,
						layers,
						layerNum,
						changeStage
					}}
				/>

				<OekakiHistories
					updateHistory={() => changeHistory(history)}
					updateCanvas={::this.updateCanvas}
					showConfirmModal={showModal}
					handleReplay={::this.handleReplay}
					{...{
						history,
						selectedHistoryNum,
						histories,
						activeHistories,
						nonActiveHistories
					}}
				/>
			</div>
		);
	}

	componentDidMount() {
		const {
			changeStage,
			changeOekaki,
			changeMiniOekaki,
			changeXminiOekaki,
			changeHistory,
			changeColors,
		} = this.props.OekakiCanvasActions

		//create history
		const history = new History({
			replayCompleteFunction: function() {
				changeHistory(this)
			}
		})

		//create stage
		const stage = new Stage({el: $(`.${styles.oekaki}`), history})
		const mini = new Stage({el: $(`.${styles.mini}`)})
		const x_mini = new Stage({el: $(`.${styles.x_mini}`)})

		mini.changePxSize({ pxWidth: 2, pxHeight: 2 })
		mini.changeSize({})
		mini.setLayer({})
		x_mini.changePxSize({ pxWidth: 1, pxHeight: 1, })
		x_mini.changeSize({})
		x_mini.setLayer({})

		//change lyaer
		const search = window.location.search.substring(1, window.location.search.length)
		const inflateSearch = inflate(search);
		if(window.location.search) {
			stage.changeLayers({layers: JSON.parse(decodeURI(inflateSearch.replace(/%23/g,'#'))) })
			mini.changeLayers({layers: stage.layers})
			x_mini.changeLayers({layers: stage.layers})
		}

		//create oekaki
		const miniOekaki = new Oekaki({ stage: mini })
		const x_miniOekaki = new Oekaki({ stage: x_mini })
		const oekaki = new Oekaki({
			stage,
			history,
			endFunction: () => {
				mini.changeLayers({layers: stage.layers})
				x_mini.changeLayers({layers: stage.layers})

				this.updateCanvas({mainUpdate: false})

				changeColors(stage.getAllColor())

				//console.log(new RGBColor(oekaki.color));
				//console.log('test');
			}
		});

		oekaki.setDrawEvent()

		this.updateCanvas({ stage, oekaki, miniOekaki, x_miniOekaki })

		//actions
		changeColors(stage.getAllColor())
		changeOekaki(oekaki)
		changeMiniOekaki(miniOekaki)
		changeXminiOekaki(x_miniOekaki)
		changeHistory(history)
	}


	handleReplay() {
		const { stage, oekaki, history,
				history: {
					activeData: activeHistories,
				},
		} = this.props
		history.repeat({data: activeHistories, stage, oekaki, isTimeout: false})
		this.updateCanvas()
	}

	updateCanvas({
		stage = this.props.stage,
		oekaki = this.props.oekaki,
		miniOekaki = this.props.miniOekaki,
		x_miniOekaki = this.props.x_miniOekaki,
		mainUpdate = true
	} = {}) {
		if(mainUpdate) oekaki.load()
		miniOekaki.load()
		x_miniOekaki.load()
		this.props.OekakiCanvasActions.changeStage(stage)
	}
}


function mapStateToProps(state) {
	return {
		OekakiCanvasActionsReducer: state.OekakiCanvasActionsReducer,
		...state.OekakiCanvasActionsReducer
	}
}

function mapDispatchToProps(dispatch) {
	return {
		OekakiCanvasActions: bindActionCreators(OekakiCanvasActions, dispatch),
		ConfirmModalActions: bindActionCreators(ConfirmModalActions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OekakiCanvas)
