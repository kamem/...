import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as ConfirmModalActions from '../../actions/ConfirmModalActions';

// Components
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal'
import { Btns, Btn } from './Btn'

export class ConfirmModal extends React.Component {

	static propTypes = {
		ConfirmModalActions: React.PropTypes.object.isRequired,
		ConfirmModalActionsReducer: React.PropTypes.object.isRequired,
	}

	render() {
		const {
			ConfirmModalActions:{ hideModal },
			ConfirmModalActionsReducer:{ isVisible, title, body, callback , showCancelBtn, size }
		} = this.props

		return isVisible && (
			<Modal
				size={size}
				onClickClose={hideModal}
			>
				<ModalHeader>{(title != null && title.length) ? title : '確認'}</ModalHeader>
				<ModalBody>
					{body}
				</ModalBody>
				<ModalFooter>
					<Btns position="center" style={{margin: '10px 0'}}>
						<Btn onClick={(e)=>{
								callback(e)
								hideModal()
						}}>ＯＫ
						</Btn>
						{
							showCancelBtn &&
							<Btn onClick={hideModal}>
								キャンセル
							</Btn>
						}
					</Btns>
				</ModalFooter>
			</Modal>
		)
	}
}


function mapStateToProps(state) {
	return {
		ConfirmModalActionsReducer: state.ConfirmModalActionsReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ConfirmModalActions: bindActionCreators(ConfirmModalActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal)