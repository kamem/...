import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import * as OekakiCanvasActions from '../actions/OekakiCanvasActions';

// Components
import ConfirmModal from './common/ConfirmModal';

class Main extends React.Component {
	render() {
		return (
			<main id="main">
				<article>
					{this.props.children}
					<ConfirmModal />
				</article>
			</main>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		OekakiCanvasActions: bindActionCreators(OekakiCanvasActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
