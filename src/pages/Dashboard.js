import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { loadDeck } from '../redux/deck';
import CurrentDeck from '../components/CurrentDeck';
import { Link } from 'react-router';
import { Motion, spring } from 'react-motion';
import { getCards, getAttempts } from '../storage';

var fakeCards = [
	{
		id:"ad68f7bf-f74d-4861-8cf6-73104b190240",
		hanzi:"一",
		correct:0,
		wrong:0,
		leitnerBox:2,
		lastAction:"STUDIED",
		nextReview: moment()
	},
	{
		id:"a5c2a47d-4bfa-44be-a741-17ba140b982e",
		hanzi:"立",
		correct:0,
		wrong:0,
		leitnerBox:4,
		lastAction:"STUDIED",
		nextReview: moment()
	},
	{
		id:"3b3c0c34-c8bf-441a-958d-8bece5277c4d",
		hanzi:"亠",
		correct:0,
		wrong:0,
		leitnerBox:1,
		lastAction:"STUDIED",
		nextReview: moment()
	}
];

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [],
			attempts: []
		};
	}
	componentDidMount() {
	  this.props.dispatch(loadDeck(5)); 
	  getCards().then(cards => {
	  	this.setState({cards});
	  });
	  // getAttempts().then(attempts => {
	  // 	this.setState({attempts});
	  // });
	}
	render() {
		let {cardsInDeck, location, points, allCardsCompleted} = this.props;

		var containerStyle = {
			backgroundColor: '#fff',
			width: '80%',
			borderRadius: 6,
			margin: '0 auto',
			height: 600,
			display: 'flex',
			flexDirection: 'column'
		};

		var leadStyle = {
			fontSize: 30,
			color: '#000',
		};

		var secondaryStyle = {
			fontSize: 20,
			color: '#333',
			marginBottom: 20
		};

		var confirmButtonStyles = {
			backgroundColor: '#2ecc71',
			flex: 1,
			borderRadius: 4,
			borderWidth: 0,
			color: '#fff',
			fontSize: 18,
			padding: 20,
			marginTop: 10
		};
		

		if(location.query.showOnboarding) {
			return (
				<Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1)}}>
				{m =>
					<div style={Object.assign({}, {opacity: m.opacity}, containerStyle)}>
						<div style={{flex: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
							<h1 style={leadStyle}>Hi {this.props.username}, welcome to Hanzi Gold!</h1>
						</div>
						<div style={{display: 'flex', flex: 0.4, alignItems: 'center', justifyContent: 'center', paddingLeft: 80, paddingRight: 80}}>
							<div>
								<h2 style={secondaryStyle}>Our Learn section will guide you through hanzi with memorable descriptions.</h2>
								<h2 style={secondaryStyle}>After seeing the description you will be tested</h2>
								<h2 style={secondaryStyle}>With each correct answer you will gain points and increase word strength</h2>
							</div>
							<div style={{marginLeft: 'auto'}}>
								<CurrentDeck cards={cardsInDeck} />
							</div>
						</div>
						<div style={{textAlign: 'center'}}>
							<Link style={confirmButtonStyles} to="/learn">Start Learning</Link>
						</div>
					</div>
				}					
				</Motion>
			);			
		}

		var headerStyle = {
			fontSize: 20,
			marginTop: 80,
			marginBottom: 35
		};

		let {cards} = this.state;
		var correct = cards.reduce((acc,c) => acc + c.correct, 0);
		var wrong = cards.reduce((acc,c) => acc + c.wrong, 0);
		var wordsLearnt = cards.filter(c => c.leitnerBox == 5).length;

		return (
			<Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1)}}>
			{m =>
				<div style={Object.assign({}, {opacity: m.opacity}, containerStyle, {flexDirection: 'row', justifyContent: 'space-around'})}>
					<div style={{flex: 0.4, marginLeft: 40}}>
						{allCardsCompleted &&
							<div>
								<h1 style={headerStyle}>You have mastered all Hanzi!</h1>
							</div>
						}
						{!allCardsCompleted &&
							<div>
								<h1 style={headerStyle}>Next hanzi to learn</h1>
								<div style={{marginBottom: 40}}>
									<CurrentDeck cards={cardsInDeck} />
								</div>
								<Link style={confirmButtonStyles} to="/learn">Begin Review</Link>
							</div>
						}
					</div>
					<div style={{flex: 0.4}}>
						<h1 style={headerStyle}>Stats</h1>
						<div style={{display: 'flex', height: 150, width: 250, flexDirection: 'column'}}>
							<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
								<h1 style={{fontSize: 80, color: '#666'}}>{points}</h1>
							</div>
							<div style={{display: 'flex', justifyContent: 'space-around'}}>
								<span>Learnt: {wordsLearnt}</span>
								<span>Correct: {correct}</span>
								<span>Incorrect: {wrong}</span>
							</div>
						</div>
					</div>
				</div>
			}
			</Motion>
		);
	}
}



export default connect(state => ({
  cardsInDeck: state.deck.cards,
  allCardsCompleted: state.deck.allCardsCompleted,
  username: state.user.username,
  points: state.user.points
}))(Dashboard);

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