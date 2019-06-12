import './main.scss';
import mainTpl from './main.pug';

const div = document.createElement('div');
div.innerHTML = mainTpl();
document.body.appendChild(div);

import _ from 'lodash';

import { Game } from './game';

// Start the main loop
var context = document.getElementById('main').getContext('2d');
var game = new Game(context);

// Time
let dt = 0;
let lastState;
window.setInterval(() => {
	game.tick(dt, lastState);
	game.draw();

	dt += 2;
}, 50);

window.save = () => {
	const txt = document.getElementById('func').value;
	try {
		const z = new Function('x', 'y', 'dt', txt);
		z(0, 0, 0);
		lastState = z;
		document.getElementById('output').textContent = 'Saved.';
	} catch (error) {
		document.getElementById('output').textContent = '' + error.message;
	}
};
window.save();