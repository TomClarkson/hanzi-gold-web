import React from 'react';
import {Motion, spring} from 'react-motion';
var lighterBg = '#FDD661';
var darkerBg = '#EAB700';

var darkerBorder = '#DF9E04';
var lighterBorder = '#FAC15B';

var navbarBg = '#FDDE4A';

var pointsCoinStyle = {
	outerWrapper: {
		height: 40,
		width: 40,
		borderRadius: 40,
		display: 'flex',
		background: '#FDDE4A',
		justifyContent: 'center',
		alignItems: 'center',
		border: '2px solid #EAB700',
	},
	innerWrapper: {
		height: 30,
		width: 30,
		borderRadius: 30,
		display: 'flex',
		background: '#FAC15B',
		justifyContent: 'center',
		alignItems: 'center',
		border: '2px solid #EAB700',
		color: '#fff',
		fontSize: 13
	}
};

export default class UserPointsCoin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {scale: 1};
	}
	componentWillReceiveProps(nextProps) {
	  if(nextProps.points > this.props.points) {
	  	this.setState({scale: 1.5});
	  } else {
	  	this.setState({scale: 0.75});
	  }

	  setTimeout(() => {
	  	this.setState({scale: 1});
	  }, 700);
	}
	render() {
		var {points} = this.props;
		return (
			<div style={pointsCoinStyle.outerWrapper}>
				<div style={pointsCoinStyle.innerWrapper}>
					<Motion style={{scale: spring(this.state.scale)}}>
					{m =>
						<span style={{transform: `scale(${m.scale})`}}>{points}</span>
					}
					</Motion>
					
				</div>
			</div>
		);
	}
}