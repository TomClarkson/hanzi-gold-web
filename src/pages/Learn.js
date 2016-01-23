import React from 'react';
import characters from '../characters';
import SlideWrapper from '../animation/SlideWrapper';
import Card from '../domain/Card';
import Deck from '../domain/Deck';
import {Colors} from '../constants/Style';
import {Motion, spring} from 'react-motion';
import getCardsToStudy from '../domain/getCardsToStudy';
import {connect} from 'react-redux';
import {loadDeck, markCardAsStudied, markCorrect, markWrong} from '../redux/deck';
import moment from 'moment';
import {updatePoints} from '../redux/user';

window.gl = function() {
  console.table(JSON.parse(localStorage.getItem('cards')));
}

window.getCardsToStudy = getCardsToStudy;

class Learn extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadDeck(5));   
  }
  markAsStudied() {
    let {currentCard, cards} = this.props;
    this.props.dispatch(markCardAsStudied(currentCard, cards));
  }
  getItemFromCard(card) {
    var character = characters.find(c => c.id == card.id);
    var id = card.id;

    if(card.lastAction == null || card.lastAction == 'WRONG') {
      var component = <StudyView 
        key={id}
        {...character} 
        markAsStudied={this.markAsStudied.bind(this)} />    

      return {id, component, height: 590};
    }

    var component = <QuestionView 
      key={id}
      {...character} 
      {...this.props} />    

    return {id, component, height: 590};
  }
	render() {
    let {currentCard, cards, allCardsCompleted} = this.props;

    if(allCardsCompleted) {
      return (
        <div style={styles.itemContainer}>
          <h1>You have mastered all Hanzi!</h1>
        </div>        
      );
    }

    if(! currentCard) {
      return null;
    }

    const item = this.getItemFromCard(currentCard);

		return (
      <div style={{display: 'flex'}}>
        <div>
    			<div style={{width: 380, height: 600, marginLeft: 300, display: 'flex'}}>
    				<div style={styles.container}>
              {item &&
                <SlideWrapper item={item}></SlideWrapper>
              }
    				</div>
          </div>
          <div>
            <h1>Deck Results</h1>
            <table>
              <thead>
                <tr>
                  <th>Hanzi</th>
                  <th>Leitner Box</th>
                  <th>Next Review</th> 
                </tr> 
              </thead>
              <tbody>
                {cards.map(c =>
                  <tr key={c.id}>
                    <td>{c.hanzi}</td> 
                    <td><LeitnerBox leitnerBox={c.leitnerBox} /></td> 
                    <td>{moment(c.nextReview).format()}</td> 
                  </tr>
                )}
              </tbody>
            </table>
          </div>
  			</div>
      </div>
		);
	}
}

export default connect(state => ({
  currentCard: state.deck.currentCard,
  allCardsCompleted: state.deck.allCardsCompleted,
  cards: state.deck.cards,
  points: state.user.points
}))(Learn);

const boxesToColor = [
  '#FF0000',
  '#FF9C00',
  '#F5E701',
  '#9BE603',
  '#5AE539'
];

const LeitnerBox = ({leitnerBox}) => {
  var range = Array.from(Array(leitnerBox).keys());
  var boxes = range.map(index => 
    <div style={{
      backgroundColor: boxesToColor[index],
      width: 15,
      color: 'transparent',
      width: (index + 5) * 2,
      height: (index + 1) * 4,
      marginRight: 2,
      marginTop: 20 - ((index + 1) * 4)
    }} key={index}>{" ."}</div>
  );

  return (
    <div style={{display: 'flex'}}>
      {boxes}
    </div>
  );
};

// export const TEXT_FONT_STACK = "Arial, Helvetica, Verdana, sans-serif";
const TEXT_FONT_STACK = "Arial, Helvetica, Verdana, sans-serif";


const StudyView = ({id, english, hanzi, description, image, markAsStudied}) => (
  <div onKeyDown={({keyCode}) => keyCode == 13 ? markAsStudied() : null} style={styles.itemContainer}>
    <div style={styles.englishHeader}>
      <span>{english}</span>
    </div>
    <div style={styles.hanziHeader}>
      <span>{hanzi}</span>
    </div>
    <div style={styles.imageContainer}>
      <img style={styles.image} src={image} />
    </div>
    <div style={styles.description}>
      <span>{description}</span>
    </div>
    <div style={styles.confirmButtonContainer}>
      <button onClick={markAsStudied} style={styles.confirmButton}>Ok, got it!</button>
    </div>
  </div>
);

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '', 
      wrong: false,
      completed: false
    };
    this.answer = this.answer.bind(this);
  }
  handleInput(e) {
    this.setState({answer: e.target.value});
  }
  answer() {
    var {hanzi, english, leitnerBox, dispatch, currentCard, cards, points} = this.props;

    var {answer} = this.state;

    if(answer == english) {
      if(leitnerBox == 4) {
        this.setState({completed: true});
        setTimeout(() => {
          dispatch(
            markCorrect(currentCard, cards, answer, {id: null, type: 'TYPE_MEANING'})
          );
        }, 2000);
      } else {
        dispatch(
          markCorrect(currentCard, cards, answer, {id: null, type: 'TYPE_MEANING'})
        );
      }
      dispatch(updatePoints(points + 1));
    } else {
      this.setState({wrong: true});
      setTimeout(() => {
        dispatch(
          markWrong(currentCard, cards, answer, {id: null, type: 'TYPE_MEANING'})
        );
        var newPoints = points == 0 ? 0 : points - 1;
        dispatch(updatePoints(newPoints));
      }, 2000);
    }
  }
  handleKeyDown({keyCode}) {
    if(keyCode == 13) {
      this.answer();
    }
  }
  render() {
    var {id, english, hanzi, description, image} = this.props;
    var isWrong = this.state.wrong;
    var baseInputStyle = {height: 35};

    var inputStyle = !isWrong ? baseInputStyle : Object.assign({}, inputStyle, {borderColor: 'red'});
    return (
      <div style={styles.itemContainer}>
        <div style={styles.hanziHeader}>
          <span>{hanzi}</span>
        </div>
        <div style={Object.assign({}, styles.description, {display: 'flex', flexDirection: 'column'})}>
          {isWrong &&
            <Motion defaultStyle={{height: 0}} style={{height: spring(200)}}>
              {value => 
                <div style={{
                  height: value.height, 
                  marginBottom: 20, 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center', 
                  backgroundColor: Colors.RED,
                  flexDirection: 'column'
                }}>
                  <p style={{color: '#fff', textDecoration: 'line-through'}}>{this.state.answer}</p>
                  <p>{this.props.english}</p>
                </div>
              }
            </Motion>
          }
          {!isWrong &&
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
              <input 
                value={this.state.answer} 
                style={inputStyle} 
                autoFocus={true}
                autoCorrect={false}
                onKeyDown={this.handleKeyDown.bind(this)}
                placeholder="Type english meaning" 
                onChange={this.handleInput.bind(this)} />
              <div style={styles.confirmButtonContainer}>
                <button onClick={this.answer.bind(this)} style={styles.confirmButton}>Submit</button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

// need to calc itemContainer width -> hardcoded atm
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    display: 'flex',
    overflowX: 'hidden'
  },
  image: {
    height: 240,
    width: 360
  },
  itemContainer: {
  	flex: 1,
  	display: 'flex',
  	flexDirection: 'column',
    width: 370
  },
  englishHeader: {
  	flex: 0.2,
  	color: '#333',
  	fontSize: 40,
  	fontFamily: TEXT_FONT_STACK,
  	display: 'flex',
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  hanziHeader: {
  	flex: 0.2,
  	color: '#333',
  	fontSize: 40,
  	fontFamily: TEXT_FONT_STACK,
  	display: 'flex',
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  headerTextEnglish: {
  	flex: 0.7,
  	paddingLeft: 20
  },
  headerTextHanzi: {
  	flex: 0.3,
  	paddingLeft: 20
  },
  description: {
  	color: '#333',
  	fontSize: 20,
  	fontFamily: TEXT_FONT_STACK,
  	flex: 0.2,
  	padding: 20,
  	justifyContent: 'center'
  },
  confirmButtonContainer: {
  	flex: 0.15,
  	display: 'flex',
  	padding: 5
  },
  confirmButton: {
  	backgroundColor: '#2ecc71',
  	flex: 1,
  	borderRadius: 4,
  	borderWidth: 0,
  	color: '#fff',
  	fontSize: 16
  },
  imageContainer: {
  	display: 'flex',
  	flex: 0.25,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};