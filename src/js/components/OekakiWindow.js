import React from 'react'
import ReactDOM from 'react-dom';
import classNames from 'classnames'

// css
import styles from '../../css/window.css'

export default class OekakiWindow extends React.Component {
  static propTypes = {
    className: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
  }
  render () {
    return (
      <section className={this.props.className} ref="window">
        <h2 className={styles.title} ref="title"
            onMouseDown={::this.down}
            onMouseUp={::this.down}>{this.props.title}</h2>
        {this.props.children}
      </section>
    )
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.title).addEventListener('mousedown', () => {
      console.log(ReactDOM.findDOMNode(this.refs.window))
    });
  }

  down(e) {
    console.log(e,ReactDOM.findDOMNode(this.refs.window).style.left);
  }
}