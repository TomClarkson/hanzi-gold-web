export function saveCard(card) {
	if(process.env.NODE_ENV == 'test') return;

	getCards().then(cards => {
		var hasCard = !! cards.find(c => c.id == card.id);
		var newCards = !hasCard ? cards.concat([card]) : cards.map(c => c.id == card.id ? card : c);

		localStorage.setItem('cards', JSON.stringify(newCards));
	});
}

export function getUser() {
	return new Promise((resolve, reject) => {
		const user = JSON.parse(localStorage.getItem('user'));
		resolve(user);
	});
}

export function getCards() {
	return new Promise((resolve, reject) => {
		const cards = JSON.parse(localStorage.getItem('cards')) || [];
		resolve(cards);
	});
}

export function getAttempts() {
	return new Promise((resolve, reject) => {
		const attempts = JSON.parse(localStorage.getItem('attempts')) || [];
		resolve(attempts);
	});
}

export function saveUser(username) {
	return new Promise((resolve, reject) => {
		let user = {username, points: 0};
		let userString = JSON.stringify(user);
		localStorage.setItem('user', userString);
		localStorage.setItem('cards', JSON.stringify([]));
		localStorage.setItem('attempts', JSON.stringify([]));

		resolve(user);
	});
}

export function saveAttempt(attempt) {
	getAttempts().then(attempts => {
		localStorage.setItem(
			'attempts', 
			JSON.stringify(attempts.concat(attempt))
		);		
	});
}

export function savePoints(points) {
	getUser().then(user => {
		var user = Object.assign(user, {points});
		localStorage.setItem('user', JSON.stringify(user));
	});	
}