import React from 'react'
import ReactDOM from 'react-dom';
import classNames from 'classnames'

import { EVENT_TYPE, isMobile } from '../utils/Helper'

// css
import styles from '../../css/window.css'

export default class OekakiWindow extends React.Component {
  static propTypes = {
    className: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }
  render () {
    const { left, top } = this.state
    return (
      <section className={classNames(styles.container, this.props.className)} ref="window"
               style={{left: `${left}px`, top: `${top}px`}}>
        <h2 className={styles.title} ref="title"
            onMouseDown={::this.mouseDown}
            onMouseUp={::this.mouseUp}>{this.props.title}</h2>
        {this.props.children}
      </section>
    )
  }

  componentWillMount() {
    const { left, top, className } = this.props
    if(localStorage[className]) {
      var [ storageLeft, storageTop ]  = localStorage[className].split(',')
    }

    const x = parseInt(storageLeft) || left;
    const y = parseInt(storageTop) || top;

    this.setState({
      isMove: false,
      startEleX: x,
      startEleY: y,
      left: x,
      top: y,
    })
  }

  getPosition({x, y, startX = this.state.startX, startY = this.state.startY}) {
    const moveX = x - startX
    const moveY = y - startY
    return {
      left: this.state.startEleX + moveX,
      top: this.state.startEleY + moveY
    }
  }

  componentDidMount() {
    const window = ReactDOM.findDOMNode(this.refs.window);
    window.addEventListener(EVENT_TYPE.touchStart, (e) => {
      const touchEvent = isMobile ? e.originalEvent.touches[0] : e
        this.setState({
          startX: touchEvent.pageX,
          startY: touchEvent.pageY,
        })
      })
    window.addEventListener(EVENT_TYPE.touchMove, (e) => {
      //console.log(ReactDOM.findDOMNode(this.refs.window))
      const touchEvent = isMobile ? e.originalEvent.touches[0] : e
      if(this.state.isMove) {
        this.setState({
          ...this.getPosition({x: touchEvent.pageX, y: touchEvent.pageY})
        })
      }
    });
  }

  mouseDown(e) {
    const { left, top } = ReactDOM.findDOMNode(this.refs.window).style

    this.setState({
      isMove: true,
      startEleX: parseInt(left),
      startEleY: parseInt(top)
    })
  }

  mouseUp(e) {
    const { className } = this.props
    const { left, top } = this.state
    localStorage[className] = [ left, top ]

    this.setState({
      isMove: false
    })
  }
}