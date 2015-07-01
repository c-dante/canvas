'use strict';

/**
 * Environment specific configuratinos.
 *
 * Use `gulp --env {{env.config property}}` to override values defined in base with environment-specific configs.
 *
 * gulp creates a `./{build-dir}/config.js` file with a matching AMD and CommonJS export at the bottom of the file
 * 
 * @type {Object}
 */
var config = {
	base: {
		api: 'http://localhost:8080/'
	}
};

if (typeof define==='function'&&define.amd){define(function(require){return config;});}if (typeof module!=='undefined'){module.exports = config;}
