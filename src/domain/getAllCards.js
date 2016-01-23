import characters from '../characters';
import {getCards} from '../storage';
import lietnerBoxIntervals from '../constants/lietnerBoxIntervals';
import makeCard from './makeCard';

export default function getAllCards(numCardsWanted) {
	return new Promise((resolve, reject) => {
		getCards().then(cardsFromStorage => {

			var charsAlreadyCardsIds = cardsFromStorage.map(c => c.id);
			var otherCardsNotStudied = characters.filter(c => !charsAlreadyCardsIds.includes(c.id));

			var cardsToStudy = cardsFromStorage.concat(otherCardsNotStudied).map(c => makeCard(c, lietnerBoxIntervals[0]));
			resolve(cardsToStudy);
		});
	});
};

