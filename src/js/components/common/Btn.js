import React from 'react'
import {Link} from 'react-router';
import classNames from 'classnames'

import styles from '../../../css/btn.css';

export class Btns extends React.Component {

    static propTypes = {
        position: React.PropTypes.string,
        style: React.PropTypes.object
    }

    render () {
        const {
            children,
            position
        } = this.props
        return (
            <div className={styles[position]}
                 style={this.props.style}>
                {children}
            </div>
        )
    }
}

export class Btn extends React.Component {
    static propTypes = {
        size: React.PropTypes.string,
        type: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        style: React.PropTypes.object
    }
    render () {
        const {
            children,
            size,
            type,
            disabled,
            onClick,
            style
        } = this.props
        return (
            <button className={classNames(
                    styles.btn_list,
                    styles.btn,
                    styles[size],
                    styles[type]
                )}
                disabled={disabled}
                onClick={onClick}
                style={style}>
                {children}
            </button>
        )
    }
}

export class BtnLink extends React.Component {
    static propTypes = {
        size: React.PropTypes.string,
        type: React.PropTypes.string,
        to: React.PropTypes.string
    }
    render () {
        const {
            children,
            size,
            type,
            to
        } = this.props
        return (
            <Link className={classNames(
                styles.btn_list,
                styles.btn,
                styles[size],
                styles[type]
            )}
            to={to}>
                {children}
            </Link>
        )
    }
}