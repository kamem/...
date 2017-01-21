import React from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash'
import classNames from 'classnames'

// Components
import OekakiWindow from './OekakiWindow';
import OekakiHistoriesOperation from './OekakiHistoriesOperation';

// css
import styles from '../../css/history.css'

// constant
import { HISTORY } from '../constants/History'

export default class OekakiHistories extends React.Component {
	static propTypes = {
		history: React.PropTypes.object,
		histories: React.PropTypes.array,
		activeHistories: React.PropTypes.array,
		nonActiveHistories: React.PropTypes.array,
		updateHistory: React.PropTypes.func,
	}
	render () {
		const { histories, activeHistories, nonActiveHistories, selectedHistoryNum } = this.props

		return (
			<OekakiWindow title="履歴" className={styles.container} left={10} top={500}>
				{
					histories && histories.length > 0 ?
					<ul className={styles.histories} ref="histories">
						{
							_.map(activeHistories, (history, index) => {
								const type = Object.keys(history)[0]
								return (
									<li key={`${type}_${index}`}
											className={classNames(
												styles.history,
												{[styles.selected]: index === selectedHistoryNum})
											}
											onClick={() => this.changeSelectedHistoryNum(index)}
										>
										{_.find(HISTORY, {type}).name}
									</li>
								)
							})
						}
						{
							_.map(nonActiveHistories, (history, index) => {
								const type = Object.keys(history)[0]
								return (
									<li key={`${type}_${index}`}
											className={classNames(
												styles.history,
												styles.nonActive)
											}
											onClick={() => this.changeSelectedHistoryNum(activeHistories.length + index)}
									>
										{_.find(HISTORY, {type}).name}
									</li>
								)
							})
						}
					</ul> :
					<div className={styles.histories}>
						<p className={styles.not_found}>履歴がありません</p>
					</div>
				}

				<OekakiHistoriesOperation
					handleRemoveAllHistories={::this.handleRemoveAllHistories}
				/>
			</OekakiWindow>
		)
	}

	componentDidUpdate() {
		const histories = ReactDOM.findDOMNode(this.refs.histories);
		if(!histories) return

		histories.scrollTop = histories.scrollHeight;
	}

	handleRemoveAllHistories() {
		const { history } = this.props

		this.props.showConfirmModal({
			size: 'small',
			body: (
				<p style={{fontSize: '12px', textAlign: 'center', margin: '10px'}}>
					履歴を全て削除してもよろしいですか？
				</p>
			),
			callback: () => {
				history.removeAllData()
				this.props.updateHistory()
			}
		})
	}

	changeSelectedHistoryNum(selectedHistoryNum) {
		const { history } = this.props
		history.changeSelectedHistoryNum({selectedHistoryNum});
		this.props.updateHistory()
		this.props.handleReplay()
	}
}