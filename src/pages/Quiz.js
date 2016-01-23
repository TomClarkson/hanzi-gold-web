import React from 'react';
import Quiz from '../components/Quiz';

var outerContainerStyle = {
	background: '#e1eef3',
	height: '100vh',
	width: '100vw',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
};

export default props => (
	<div style={{
	  background: '#fff', 
	  borderRadius: '4px', 
	  height: 500,
	  width: 400,
	  margin: '0 auto',
	  overflow: 'hidden',
	  position: 'relative'
	}}>
		<Quiz />
	</div>
);