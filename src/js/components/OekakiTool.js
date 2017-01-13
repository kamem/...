import _ from 'lodash'
import React from 'react'
import classNames from 'classnames'

// css
import styles from '../../css/oekakiTool.css'

// utils
import { OEKAKI_MODE } from '../constants/OekakiMode'

export default class OekakiTool extends React.Component {
  static propTypes = {
    oekakiMode: React.PropTypes.string,
    oekaki: React.PropTypes.object.isRequired,
    changeOekaki: React.PropTypes.func.isRequired,
    changeStage: React.PropTypes.func.isRequired,
  }

  render () {
    const { oekakiMode } = this.props

    return (
      <div className={styles.tool}>
        <ul className={styles.items}>
          {_.map(OEKAKI_MODE, (mode) => {
            return (
              <MenuItem key={mode.type} onClick={() => {
                this.handleChangeTool(mode.type)
              }} selected={oekakiMode === mode.type} iconName={`fa-${mode.iconName}`}>
              </MenuItem>
            )
          })}
        </ul>
      </div>
    )
  }

  handleChangeTool(name) {
    const { stage, oekaki, changeOekaki, updateCanvas, changeStage } = this.props;
    switch (name){
    case 'pencil':
      oekaki.changeFillStyle({fillStyle: oekaki.color})
      break
    case 'eraser':
      oekaki.changeFillStyle({fillStyle: ''})
      break
    case 'dropper':
      break
    case 'zoomIn':
      break
    case 'zoomOut':
      break
    }

    oekaki.changeMode({mode: name})
    changeOekaki(oekaki)
    updateCanvas()
    changeStage(stage)
  }
}

class MenuItem extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    iconName: React.PropTypes.string.isRequired,
    selected: React.PropTypes.bool.isRequired,
  }
  render () {
    const { onClick, iconName, selected } = this.props
    return (
      <li className={classNames(styles.item,
          {[styles.selected]: selected}
        )}
        {...{ onClick }}>
        <i className={classNames('fa', iconName, styles.icon)}>
        </i>
        {this.props.children}
      </li>
    );
  }
}