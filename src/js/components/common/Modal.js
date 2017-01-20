import React from 'react'
import classNames from 'classnames'

import styles from '../../../css/overlay.css';

export class Modal extends React.Component {

    static propTypes = {
        size: React.PropTypes.string,
        onClickClose: React.PropTypes.func.isRequired,
    }

    handleClickClose(e) {
        if ( !e.target.dataset.isClosable ) return
        e.stopPropagation()
        this.props.onClickClose()
    }

    render () {
        const {
            children,
            size,
        } = this.props
        return (
            <div className={styles.overlay} onClick={::this.handleClickClose} data-is-closable="true">
                <div className={classNames(
                    styles.modal,
                    styles[size])
                }>
                    <div className={styles.modal_inner}>
                        {children}
                    </div>
                    <div className={styles.close} data-is-closable="true">
                        <i className="fa fa-times" aria-hidden="true" data-is-closable="true"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export class ModalHeader extends React.Component {
    render () {
        return (
            <header className={styles.modal_header}>
                <h2 className={styles.modal_title}>{this.props.children}</h2>
            </header>
        )
    }
}


export class ModalBody extends React.Component {
    static propTypes = {
        className: React.PropTypes.string,
        scroll: React.PropTypes.bool,
        style: React.PropTypes.object
    }
    render () {
        return (
            <div className={classNames(
                    styles.modal_content,
                    this.props.scroll ? styles.scroll : '',
                    this.props.className)}
                 style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

export class ModalFooter extends React.Component {
    static propTypes = {
        style: React.PropTypes.object
    }
    render () {
        return (
            <footer className={styles.modal_actions}
                    style={this.props.style}>
                {this.props.children}
            </footer>
        )
    }
}
