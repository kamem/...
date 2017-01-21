import React from 'react'
import classNames from 'classnames'

// css
import styles from '../../css/oekakiColor.css'

// Components
import {Panel as ColorPickerPanel} from 'rc-color-picker';
import OekakiWindow from './OekakiWindow';

export default class OekakiColor extends React.Component {
  static propTypes = {
    oekaki: React.PropTypes.object.isRequired,
  }
  render () {
    const { color } = this.props
    return (
      <OekakiWindow title="カラー" className={styles.color} left={10} top={200}>
        <ColorPickerPanel color={color} style={{margin: '10px auto'}} onChange={::this.handleChangeColor} mode="RGB"/>
      </OekakiWindow>
    )
  }

  handleChangeColor(colors) {
    console.log(colors);
    const color = colors.color
    this.props.oekaki.changeColor({color})
    this.props.oekaki.changeFillStyle({fillStyle: color})
  }
}