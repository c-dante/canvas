'use strict';

define(function(require)
{
	var _ = require('lodash');
	var Game = require('./game');

	console.log('Main entry point loaded.');

	var lodashWorks = _.map([1, 2, 3], function(x)
	{
		return x * 2;
	});

	console.log('Lodash: ', lodashWorks);

	// Bring in main styles
	require('style-loader!css-loader!sass-loader?sourceMap!../styles/main.scss');

	// Start the main loop
	var context = document.getElementById('main').getContext('2d');
	var game = new Game(context);


	var dt = 0;
	window.setInterval(function()
	{
		game.tick(dt);
		game.draw();

		dt += 2;
	}, 50);

	return {};
});
