import React, {Component} from 'react';
import Header from './Header';
import {LayoutDimensions} from '../constants/Style';
import { connect } from 'react-redux';
import { getUser } from '../storage';

import image from '../images/hanzi-gold-character-banner.jpg';
var backgroundImage = `url(${image})`;

class Master extends Component {
	render() {
		let {path, user} = this.props;
		var isOnQuizPage = path == '/quiz';
		var isOnHomePage = path == '/';

		// if(isOnQuizPage) {
		// 	return (
		// 		<div>
		// 			{this.props.children}
		// 		</div>
		// 	);
		// }

		var wrapperStyles = isOnHomePage ? {
			paddingTop: `${LayoutDimensions.TOP_NAVBAR_HEIGHT}px`
		} : {
			paddingTop: `${LayoutDimensions.TOP_NAVBAR_HEIGHT + 20}px`
		}

		return (
			<div style={isOnHomePage ? {backgroundImage} : {}}>
				<Header isHome={isOnHomePage} user={user} />
				<div style={wrapperStyles}>
					{this.props.children}
				</div>
			</div>
		);
	}
}



export default connect(state => ({
	path: state.routing.path,
	user: state.user
}))(Master);