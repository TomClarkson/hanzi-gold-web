import React, {Component} from 'react';
import { Motion, spring } from 'react-motion';
import Ticker from '../animation/Ticker';
import Results from '../quiz/Results';
import Choice from '../quiz/Choice';
import { Colors } from '../constants/Style';
import allCharacters from '../characters';

var getRandomCharacters = (limit, characters, randomCharacters = []) => {
  var randomCharacter = characters[
    Math.floor(Math.random() * characters.length)
  ];

  var randomCharacters = randomCharacters.concat([randomCharacter]);
  if(randomCharacters.length == limit) {
    return randomCharacters;
  }

  var characters = characters.filter(c => c.id != randomCharacter.id);
  return getRandomCharacters(limit, characters, randomCharacters);
}


var makeQuestion = (characters, questionId) => {
  var randomCharacters = getRandomCharacters(4, characters);
  
  var questionCharacter = randomCharacters[
    Math.floor(Math.random() * randomCharacters.length)
  ];

  var isQuestionInHanzi = Math.random() > 0.5;
  var choices = randomCharacters.map(c => ({
    id: c.id,
    title: isQuestionInHanzi ? c.english : c.hanzi 
  }));

  return {
    id: questionId,
    isQuestionInHanzi,
    title: isQuestionInHanzi ? questionCharacter.hanzi : questionCharacter.english,
    choices,
    correctChoiceId: questionCharacter.id
  };
};

var questions = [1, 2, 3, 4, 5].map(num => makeQuestion(allCharacters, num));

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIdx: 0,
      questions
    };
  }
  selectChoice(choiceId) {
    var {questions, activeIdx} = this.state;
    questions[activeIdx].answer = choiceId;

    this.setState({questions});

    setTimeout(() => {
      this.setState({activeIdx: this.state.activeIdx + 1});
    }, 500);
  }
  render() {
    var isOver = this.state.activeIdx == this.state.questions.length;

    if(isOver) {
      return (
        <Results questions={this.state.questions} />
      );
    }

    var question = this.state.questions[this.state.activeIdx];

    var choiceStyle = {
      display: 'flex',
      flex: '1 0 25%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '30px', 
      height: '60px',
      border: '2px solid #E1EEF3'
    };

    var currentQuestion = (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          <h4 style={{margin: 0, padding: '20px', background: Colors.GOLD, flexBasis: '40px'}}>{question.title}</h4>
        </div>
        <div style={{padding: '20px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
        {question.choices.map(c => 
          <Choice
            style={choiceStyle} 
            selectChoice={this.selectChoice.bind(this)}
            key={c.id}
            question={question}
            choice={c} />
        )}
        </div>
      </div>
    );

    var item = {id: question.id, component: currentQuestion};

    return (      
      <Ticker item={item}></Ticker>
    );
  }
}



