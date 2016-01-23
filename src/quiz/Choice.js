import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import {interpolateColor} from '../color';

const colors = {
  pressed: '#F1F1F1',
  default: '#FFFFFF'
};

export default class Choice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    };
  }
  selectChoice() {
    this.props.selectChoice(this.props.choice.id);
  }
  handleMouseDown() {
    this.setState({isPressed: true});
  }
  render() {
    var {question, choice, style} = this.props;
    if(question.answer) {
      // if not correct answer and didn't answer then fade
      var choseChoice = choice.id == question.answer;
      var isCorrect = choice.id == question.correctChoiceId;
      
      if(! choseChoice && ! isCorrect) {
        return (
          <Motion defaultStyle={{opacity: 1}} style={{opacity: spring(0)}}>
            { interpolated => {
             return (
              <div style={Object.assign({}, style, {opacity: interpolated.opacity})} 
                onClick={this.selectChoice.bind(this)}><span>{choice.title}</span></div> 
              )
            }}
          </Motion>
        );
      }

      var style = Object.assign({}, style, {background: isCorrect ? 'green' : 'red'});

      return (
        <div style={style} onClick={this.selectChoice.bind(this)}><span>{choice.title}</span></div>
      );
    }

    return (
      <div 
        onMouseDown={this.handleMouseDown.bind(this)} 
        style={style} 
        onClick={this.selectChoice.bind(this)}>
        <span>{choice.title}</span>
      </div>
    );
  }
}