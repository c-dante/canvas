'use strict';

define(function(require)
{
	var _ = require('lodash');
	console.log('Main entry point loaded.');

	var lodashWorks = _.map([1, 2, 3], function(x)
	{
		return x * 2;
	});

	console.log('Lodash: ', lodashWorks);

	// Bring in main less
	require('style-loader!css-loader!sass-loader!../styles/main.scss');

	return {};
});
