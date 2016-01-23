import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { loadDeck } from '../redux/deck';
import CurrentDeck from '../components/CurrentDeck';
import { Link } from 'react-router';
import { Motion, spring } from 'react-motion';
import { getCards, getAttempts } from '../storage';
import characters from '../characters';
import getAllCards from '../domain/getAllCards';

class Hanzi extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [],
		};
	}
	componentDidMount() {
	  getAllCards().then(cards => {
	  	this.setState({cards});
	  });
	  
	}
	render() {
		let {cardsInDeck, location, points} = this.props;
		let {cards} = this.state;

		var containerStyle = {
			backgroundColor: '#fff',
			width: '80%',
			borderRadius: 6,
			margin: '0 auto',
			height: 600,
			display: 'flex',
			flexDirection: 'column'
		};

		var headerStyle = {
			fontSize: 20,
			marginTop: 80,
			marginBottom: 35
		};

		return (
			<Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1)}}>
			{m =>
				<div style={Object.assign({}, {opacity: m.opacity}, containerStyle, {flexDirection: 'row', justifyContent: 'space-around'})}>
					<h1>Words</h1>
					<CurrentDeck cards={cards} />
				</div>
			}
			</Motion>
		);
	}
}


export default connect(state => ({
  cardsInDeck: state.deck.cards,
  username: state.user.username,
  points: state.user.points
}))(Hanzi);

var styles = {
	dashboardContainer: {
		backgroundColor: '#fff',
		width: '80%',
		borderRadius: 6,
		padding: 20,
		margin: '0 auto'
	},
	welcomeHeader: {
		fontSize: 20
	},
	beginReviewLink: {
		backgroundColor: 'green',
		color: '#fff'
	}
}