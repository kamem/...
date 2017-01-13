import React from 'react'
import classNames from 'classnames'

// css
import styles from '../../css/oekakiColor.css'

// Components
import {Panel as ColorPickerPanel} from 'rc-color-picker';

export default class OekakiColor extends React.Component {
  static propTypes = {
    oekaki: React.PropTypes.object.isRequired,
  }
  render () {
    const { handleChangeColor, color } = this.props
    return (
      <section className={styles.color}>
        <h2 className={styles.title}>カラー</h2>
        <ColorPickerPanel color={color} style={{margin: '10px auto'}} onChange={::this.handleChangeColor} mode="RGB"/>
      </section>
    )
  }


  handleChangeColor(colors) {
    console.log(colors);
    const color = colors.color
    this.props.oekaki.changeColor({color})
    this.props.oekaki.changeFillStyle({fillStyle: color})
  }
}