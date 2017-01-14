import React from 'react'
import classNames from 'classnames'

// css
import styles from '../../css/oekakiHeader.css'

export default class OekakiHeader extends React.Component {
  static propTypes = {
    stage: React.PropTypes.object,
    oekaki: React.PropTypes.object,
    history: React.PropTypes.object,
  }
  render () {
    return (
      <header className={styles.header}>
        <ul className={styles.menu}>
          <MenuItem onClick={::this.handleSave} iconName='fa-save'>保存</MenuItem>
          <MenuItem onClick={::this.handleReplay} iconName='fa-play-circle'>再生</MenuItem>
        </ul>
      </header>
    )
  }

  handleReplay() {
    const { stage, oekaki } = this.props
    this.props.history.changeHistory(JSON.parse(localStorage['draw']))
    this.props.history.repeat({stage, oekaki})
    // this.props.stage.setLayer({layerNum: parseInt(e.target.value)})
  }

  handleSave() {
    this.props.history.save({stage: this.props.stage})
  }
}

class MenuItem extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    iconName: React.PropTypes.string.isRequired,
  }
  render () {
    const { onClick, iconName } = this.props
    return (
      <li className={styles.item}
        {...{ onClick }}>
        <i className={classNames('fa', iconName, styles.icon)}></i>
        {this.props.children}
      </li>
    );
  }
}