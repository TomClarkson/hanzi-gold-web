import React from 'react';
import { LayoutDimensions, Colors, TEXT_SHADOW } from '../constants/Style';
import { Motion, spring } from 'react-motion';
import { saveUser } from '../storage';
import { pushPath } from 'redux-simple-router';
import { connect } from 'react-redux';
import { loadUser } from '../redux/user';
import screenshot from '../images/hanzigoldscreenshot.png';

var styles = {
	outerWrapper: {
		height: `calc(100vh - ${LayoutDimensions.TOP_NAVBAR_HEIGHT}px)`
	},
	innerWrapper: {
		margin: '0 auto',
		width: '80%',
	},
	leadWrapper: {
		marginTop: 80,
		textAlign: 'center',
		marginBottom: 60
	},
	lead: {
		textShadow: TEXT_SHADOW,
		color: '#fff',
		fontSize: 45
	},
	moreInfoWrapper: {
		display: 'flex'
	},
	moreInfoDescription: {
		padding: 20,		
		lineHeight: 1.4,
		color: '#444',
		flex: 0.5,
	},
	moreInfoDescriptionHeader: {
		fontSize: 24,
		marginBottom: 40
	},
	moreInfoImage: {
		padding: 20,
		flex: 0.5
	},
	enterName: {
		fontSize: 20,
		marginBottom: 20
	},
	moreInfoDescriptionDetail: {
		paddingLeft: 0,
		fontSize: 14
	}
};

export default props => (
	<div style={styles.outerWrapper}>
		<div style={styles.innerWrapper}>
			<div style={styles.leadWrapper}>
				<h1 style={styles.lead}>Enjoy Learning Chinese Characters!</h1>
			</div>
			<div style={styles.moreInfoWrapper}>
				<div style={styles.moreInfoDescription}>
					<h2 style={styles.moreInfoDescriptionHeader}>Earn Hanzi Gold, play quizzes and learn quickly with spaced repetition.</h2>
					<h3 style={styles.enterName}>Enter your name to get started</h3>
					<SignUp />
				</div>
				<div style={styles.moreInfoImage}>
					<Motion defaultStyle={{scale: 0, opacity: 0}} style={{scale: spring(1), opacity: spring(1)}}>
					{m => 
						<div style={{opacity: m.opacity, transform: `scale(${m.scale}`}} id="wok">
							<img style={{height: 400, width: 500}} src={screenshot} />
						</div>
					}
					</Motion>
				</div>
			</div>
		</div>
	</div>
);


class SignUpComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {username: ''};
	}
	start() {
		var {username} = this.state;

		if(username) {
			saveUser(username).then(user => {
				this.props.dispatch(loadUser(user));
				this.props.dispatch(pushPath('/dashboard?showOnboarding=1'));
			});
		}
	}
	handleKeyDown({keyCode}) {
		if(keyCode == 13) {
		  this.start();
		}
	}
	render() {
		var inputStyle = {
			height: 40, 
			borderRadius: 4, 
			border: '1px solid #A9A9A9', 
			padding: 10, 
			fontSize: 16,
			marginBottom: 15
		};

		var btnStyle = {
			height: 40,
			background: Colors.GREEN,
			color: '#fff',
			borderRadius: 4,
			borderWidth: 0,
			fontSize: 16
		};

		return (
			<div style={{display: 'flex', flexDirection: 'column', width: 300}}>
				<input onKeyDown={this.handleKeyDown.bind(this)} autoFocus={true} style={inputStyle} placeholder="Enter your name" value={this.state.username} onChange={e => this.setState({username: e.target.value})} />
				<button style={btnStyle} onClick={this.start.bind(this)}>Start!</button>
			</div>
		);
	}
}

const SignUp = connect(state => state)(SignUpComponent);