import React from 'react'

// Components
import OekakiWindow from './OekakiWindow';

// css
import styles from '../../css/history.css'

export default class OekakiHistories extends React.Component {
	static propTypes = {
	}
	render () {
		return (
			<OekakiWindow title="履歴" className={styles.container} left={10} top={500}>
				<div></div>
			</OekakiWindow>
		)
	}
}