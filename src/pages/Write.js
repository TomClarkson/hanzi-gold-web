import React, {Component} from 'react';
// import HanziWriter from 'hanzi-writer';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';

class Write extends Component {
	componentDidMount() {
		// var node = findDOMNode(this.refs.hanziWriter);
		// var character = '我';
		// var writer = new HanziWriter(node, character, {
		// 	width: 800,
		// 	height: 800
		// });	

		// var writer = new HanziWriter('hanziWriter', '我', {
		//   showOutline: true, // show a faded outline of the character
		//   showCharacter: true, // whether or not to draw the completed character

		//   // positioning options

		//   width: 200, // width of the character, in px
		//   height: 200, // height of the character, in px
		//   padding: 20, // padding between edges of character and edges of the target div, in px

		//   // animation options

		//   strokeAnimationDuration: 300, // duration of each stroke in ms
		//   delayBetweenStrokes: 1000, // delay between drawing subsequent strokes in ms

		//   // colors

		//   strokeColor: '#555',
		//   highlightColor: '#AAF', // color used to highlight strokes as a hint during quizzing
		//   outlineColor: '#DDD', 
		//   drawingColor: '#333', // color of the line drawn by the user during quizzing

		//   // quiz options

		//   showHintAfterMisses: 3, // give a hint after this many subsequent mistakes during quizzing
		//   highlightOnComplete: true, // flash the character when the quiz is successfully completed
		// });

		// var writer = new HanziWriter('hanziWriter', '我', {
		//   strokeColor: '#000',
		//   highlightColor: '#faf', // color used to highlight strokes as a hint during quizzing
		//   outlineColor: '#111',
		//   drawingColor: '#ddd', // color of the line drawn by the user during quizzing
		//   width: window.innerWidth,
		//   height: window.innerWidth,
		//   padding: 50,
		//   hintColor: '#fff',
		//   showCharacter: false,
		//   showOutline: false,
		//   showHintAfterMisses: 2, // give a hint after this many successive mistakes during quizzing
		//   highlightOnComplete: true, // flash the character when the quiz is successfully completed
		// });

		// writer.showCharacter();
		// // writer.animateCharacter();

		// console.log('w', writer);	
	}
	increment() {
		this.props.dispatch({type: 'INCREMENT'});
	}
	render() {
		console.log('this.props', this.props);
		return (
			<div style={{height: '1000px'}}>
			  <h3>Write</h3>
			  <div id="hanziWriter" ref="hanziWriter"></div>
			  Count {this.props.counter}
			  <button onClick={this.increment.bind(this)}>Increment</button>
			</div>
		);	
	}
}

export default connect(state => state)(Write);