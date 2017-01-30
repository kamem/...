import _ from 'lodash'
import React from 'react'
import classNames from 'classnames'

// css
import styles from '../../css/oekakiColor.css'

// Components
import {Panel as ColorPickerPanel} from 'rc-color-picker';
import OekakiWindow from './OekakiWindow';
import { Btn, Btns } from './common/Btn';

export default class OekakiColor extends React.Component {
  static propTypes = {
    oekaki: React.PropTypes.object.isRequired,
    stage: React.PropTypes.object.isRequired,
    color: React.PropTypes.string,
    colors: React.PropTypes.array,
    changeOekaki: React.PropTypes.func.isRequired,
    updateColors: React.PropTypes.func.isRequired,
    updateCanvas: React.PropTypes.func.isRequired,
  }
  render () {
    const { stage, oekaki, color, colors, updateColors, updateCanvas } = this.props
    return (
      <OekakiWindow title="カラー" className={styles.colorContainer} left={10} top={200}>
        <ColorPickerPanel color={color} style={{margin: '10px auto'}} onChange={(e) => {
          if(this.state.selectedColor) {
            stage.replaceColor(this.state.selectedColor, e.color)
            oekaki.load()
            updateColors()
            updateCanvas()
            this.setState({ selectedColor: color })
            this.props.changeOekaki(oekaki)
          }
          this.handleChangeColor(e)
        }} mode="RGB"/>

        {
          colors.length > 0 && <ul className={styles.colors}>
            {
              _.map(colors, (color) => {
                return <li key={color}
                  className={classNames(
                    styles.color,
                    {
                      [styles.selected]: color === this.state.selectedColor
                    }
                  )}
                  style={{backgroundColor: color}}
                  title={color}
                  onClick={() => {
                    this.setState({ selectedColor: color })
                    this.handleChangeColor({color: color})
                  }}
                  ></li>
              })
            }
          </ul>
        }

        <Btns position='center' style={{margin : '6px'}}>
          <Btn onClick={() => this.setState({ selectedColor: '' })}>色の選択を解除</Btn>
        </Btns>
      </OekakiWindow>
    )
  }

  componentWillMount() {
    this.setState({ selectedColor: '' })
  }

  handleChangeColor(colors) {
    const { oekaki } = this.props
    const color = colors.color
    this.props.changeOekaki(oekaki)
    oekaki.changeColor({color})
    oekaki.changeFillStyle({fillStyle: color})
  }
}