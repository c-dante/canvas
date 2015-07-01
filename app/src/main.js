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
	var f;
	window.setInterval(function()
	{
		game.tick(dt, f);
		game.draw();

		dt += 2;
	}, 50);

	window.save = function()
	{
		var txt = document.getElementById('func').value;
		try {
			var z = new Function('x', 'y', 'dt', txt);
			z(0, 0, 0);
			f = z;
		} catch (error)
		{
			document.getElementById('output').textContent = '' + error.message;
		}
	};

	return {};
});
