import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

// constant
import { BLEND_MODE } from '../utils/BlendMode'

// css
//import styles from '../../css/layers.css'

export default class Layers extends React.Component {
	static propTypes = {
		handleBlendMode: React.PropTypes.func,
		blendMode:  React.PropTypes.number,
	}
	render () {
		return (
			<p classNeme="blendArea">
				<select onChange={this.props.handleBlendMode}
								value={this.props.blendMode}>
					{
						_.map(BLEND_MODE,(mode, i) => {
							return (
								<option key={mode.type}
												value={i}>
									{mode.name}
								</option>
							)
						})
					}
				</select>
			</p>
		)
	}
}