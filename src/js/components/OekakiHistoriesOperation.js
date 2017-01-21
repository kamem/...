import React from 'react'
import classNames from 'classnames'

// css
import styles from '../../css/operation.css'

export default class OekakiHistoriesOopetation extends React.Component {
  static propTypes = {
    handleRemoveAllHistories: React.PropTypes.func.isRequired,
  }
  render () {
    const { handleRemoveAllHistories } = this.props
    return (
      <ul className={styles.opetation}>
        <Opetation onClick={handleRemoveAllHistories} iconName='fa-trash'></Opetation>
      </ul>
    )
  }
}

class Opetation extends React.Component {
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