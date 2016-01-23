import React from 'react';
import {connect} from 'react-redux';
import characters from '../characters';


class Counter extends React.Component {
	import() {
		var defaultValues = {correctCount: 0, wrongCount: 0};
		var hanzi = characters.map(c => Object.assign(c, defaultValues));
		this.props.dispatch({type: 'IMPORT', hanzi});
	}
	render() {
		console.log('props hanzi', this.props.hanzi);
		return (
			<div>
			  <h2 onClick={e => this.props.dispatch({type:'INCREMENT'})}>Counter {this.props.counter}</h2>
			  <div onClick={this.import.bind(this)}>
			  	Import
			  </div>
			  <div>
			  	{this.props.hanzi.map(h => 
			  		<div key={h.id}>
			  			Hanzi
			  		</div>
			  	)}
			  </div>
			</div>
		);
	}
}


export default connect(state => ({
	counter: state.counter,
	hanzi: state.hanzi.characters
}))(Counter);