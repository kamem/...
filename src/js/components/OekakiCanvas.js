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
			history,
			OekakiCanvasActions: { changeOekaki, changeStage }
		} = this.props

		return (
			<div>
				<OekakiHeader
					{...{
						stage,
						oekaki,
						history
					}}
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
					<div className={classNames(styles.oekaki, styles[mode])} style={{}}></div>
				</div>

				<div className={styles.mini}></div>

				<OekakiColor
					{...{
						oekaki,
						color
					}}
				/>

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
			</div>
		);
	}

	componentDidMount() {
		const {
			changeStage,
			changeMini,
			changeOekaki,
			changeMiniOekaki,
			changeHistory
		} = this.props.OekakiCanvasActions

		const $el = $(`.${styles.oekaki}`)
		const $mini = $(`.${styles.mini}`)

		const history = new History({
			replayCompleteFunction: function() {
				changeHistory(this)
			}
		})

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

		changeStage(stage)
		changeMini(mini)
		changeOekaki(oekaki)
		changeMiniOekaki(miniOekaki)
		changeHistory(history)
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
		ConfirmModalActions: bindActionCreators(ConfirmModalActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(OekakiCanvas)
