import React from 'react';
import ReactDisqusThread from 'react-disqus-thread';

export default class About extends React.Component {
	render() {
		return (
			<div id="about-page">
				<h1 className='lead-header'>Why was Hanzi Gold built?</h1>
				<p className="lead">Hanzi Gold combines two of my passions; lanaguage learning and programming.</p>
				<p className="lead" style={{marginBottom: 20}}>It was also built for two reasons. Firstly, to be a practical example of how to build 
				a production ready React application for the web and mobile, and secondly, to win tickets to attend the React conference.</p>
				<p>I want to launch reactjscasts.com soon, and I believe Hanzi Gold is rich with features to make screencasts from.</p>
				<p>For example, this application implements the Lietner spaced repetition system, which could be built with tdd in a screencast.</p> 
				<p>The screencasts will be great for a React developer wanting to make React Native apps
				 because it will compare different components and navigation paradigms and also how animations and business logic code can be re-used.</p>
				<p>The next step for Hanzi Gold is to add a node server, this server will sync learning history between mobile and web.</p>
				<p>Finally, I want to add hanzi sounds for comprehension and hanzi writing tests to the quiz and add a real time multiplayer mode to the quiz.</p>
				<p className="preview-video">Now, preview what is to come. The video below showcases the app and shows how to build the quiz mode.</p>
			</div>
		);
	}
}