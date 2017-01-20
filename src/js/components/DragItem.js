import React from 'react'
import ReactDOM from 'react-dom';
import classNames from 'classnames'
import { DragDropContext, DropTarget, DragSource } from 'react-dnd'

import styles from '../../css/layers.css'

// utils
import { Stage } from '../utils/Stage'
import { Oekaki } from '../utils/Oekaki'

@DropTarget("item", {
	drop(dropProps, monitor, dropComponent) {
		const dragProps = monitor.getItem();
		if (dropProps.id !== dragProps.id) {
			dragProps.onDrop(dragProps.id, dropProps.id);
		}
	}
}, connect => {
	return {
		connectDropTarget: connect.dropTarget()
	};
})
@DragSource("item", {
	beginDrag(props) {
		return props;
	}
}, (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
})


export default class DragItem extends React.Component {
	static propTypes = {
		selected: React.PropTypes.bool,
		handleChangeLayer: React.PropTypes.func,
		handleChangeVisible: React.PropTypes.func,
		layer: React.PropTypes.object,
		id: React.PropTypes.number,
	}

	render () {
		return this.props.connectDragSource(this.props.connectDropTarget(
			<li className={classNames(
						styles.layer,
						 {[styles.selected]: this.props.selected})
					}
			>
				<p className={styles.visible} onClick={this.props.handleChangeVisible}>
					{
						this.props.layer.isVisible ? <i className="fa fa-eye"></i> : <input type="checkbox" />
					}

				</p>
				<div className={styles.info} onClick={this.props.handleChangeLayer}>
					<div className={styles.layerStage} ref={`layer${this.props.id}`}>
						{this.props.children}
					</div>
				</div>
			</li>
		))
	}

	componentDidMount(nextProps) {
		const stage = new Stage({el: ReactDOM.findDOMNode(this.refs[`layer${this.props.id}`])})
		stage.changePxSize({
			pxWidth: 1,
			pxHeight: 1,
		})
		stage.changeSize({
			width: 32,
			height: 32
		})
		stage.setLayer({})

		stage.changeLayers({ layers: [this.props.layer] })

		const oekaki = new Oekaki({ stage });
		this.setState({
			stage,
			oekaki
		})
		oekaki.load()
	}

	componentWillReceiveProps(nextProps) {
		this.state.stage.changeLayers({ layers: [nextProps.layer] })
		this.state.oekaki.load()
	}
}