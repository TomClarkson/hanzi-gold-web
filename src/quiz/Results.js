import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import { Colors } from '../constants/Style';

var styles = {
  headerRow: {
    display: 'flex', 
    flexDirection: 'row', 
    height: 60, 
    alignItems: 'center', 
    borderBottom: '1px solid #eee'
  },
  headerRowText: {
    flex: 0.3, 
    fontWeight: 'bold',
    paddingLeft: 10
  },
  resultRowText: {
    flex: 0.3, 
    paddingLeft: 10
  },
  resultRow: {
    display: 'flex', 
    flexDirection: 'row', 
    flex: 1, 
    borderBottom: '1px solid #eee',
    alignItems: 'center'
  }
}

export default class Results extends Component {
  render() {
    var {questions} = this.props;
    var correctCount = questions.reduce((acc, question) => {
      return question.correctChoiceId == question.answer ? acc + 1 : acc;
    }, 0);

    var questionsMappedToCorrect = questions.map(q => {
      var correctTitle = q.choices.find(c => c.id == q.correctChoiceId).title;
      // console.log('q', correctTitle);
      return Object.assign({
        q,
        title: correctTitle,
        wasCorrect: q.answer == q.correctChoiceId
      });
    });

    return (
      <Motion defaultStyle={{height: 0, offset: 200, width: 0}} style={{height: spring(100), offset: spring(0), width: spring(100)}}>
        {values => {
          console.log(values);
          return (
            <div style={{
              backgroundColor: '#fff',
              position: 'absolute',
              overflow: 'hidden',
              top: values.offset,
              bottom: values.offset,
              left: values.offset,
              right: values.offset,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                backgroundColor: Colors.GOLD, 
                height: 120, 
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'}}>
                <span style={{color: '#333', fontSize: 24, fontWeight: 'bold'}}>
                  You got {correctCount} / {questions.length} correct!
                </span>
              </div>
              <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
                <div style={styles.headerRow}>
                  <span style={styles.headerRowText}>Question</span>
                  <span style={styles.headerRowText}>Your answer</span>
                  <span style={styles.headerRowText}>Correct</span>
                </div>
                {questionsMappedToCorrect.map((q,i) => {
                  // <p key={i} style={{color: q.wasCorrect ? 'green' : 'red'}}>
                  //   {q.q.title} {q.title}
                  // </p>
                  console.log(q);
                  return (
                    <div style={styles.resultRow}>
                      <span style={styles.resultRowText}>{q.q.title}</span>
                      <span style={styles.resultRowText}>{q.title}</span>
                      <span style={styles.resultRowText}>correct</span>
                    </div>
                    )
                })}
              </div>
            </div>
          )
        }}
      </Motion>
    );
  }
}