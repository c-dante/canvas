'use strict';

define(function(require)
{
	var _ = require('lodash');

	var Game = function(canvasContext)
	{
		this.ctx = canvasContext;
		this.width = this.ctx.canvas.width;
		this.height = this.ctx.canvas.height;

		//this.img = new ImageData(this.width, this.height);
		this.pixels = new Uint8ClampedArray(this.width * this.height * 4);
	};

	Game.prototype.tick = function(dt, f)
	{
		if (!f || !_.isFunction(f))
		{
			f = function(x, y, dt)
			{
				return 0xFF000000 | (x * y + dt);
			}
		}

		for (var x = 0; x < this.width; x++)
		{
			for (var y = 0; y < this.height; y++)
			{
				var i = (x + y * this.width) * 4;

				// ARGB
				var c = f(x, y, dt);

				// R
				this.pixels[i] = (c >> 16) & 0xFF;
				// G
				this.pixels[i + 1] = (c >> 8) & 0xFF;
				// B
				this.pixels[i + 2] = (c) & 0xFF;
				// A
				this.pixels[i + 3] = (c >> 24) & 0xFF;
			}
		}
	};

	Game.prototype.draw = function()
	{
		this.ctx.putImageData(new ImageData(this.pixels, this.width, this.height), 0, 0);
	};

	return Game;
});