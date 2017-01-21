import React from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash'
import classNames from 'classnames'

// Components
import OekakiWindow from './OekakiWindow';

// css
import styles from '../../css/oekaki.css'

export default class ActualSize extends React.Component {
	render () {
		return (
			<OekakiWindow title="実寸" className={styles.miniContainer} left={800} top={100}>
				<div className={styles.x_mini}></div>
				<div className={styles.mini}></div>
			</OekakiWindow>
		)
	}
}