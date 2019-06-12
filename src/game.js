import _ from 'lodash';

export class Game {
	constructor(canvasContext) {
		this.ctx = canvasContext;
		this.width = this.ctx.canvas.width;
		this.height = this.ctx.canvas.height;

		//this.img = new ImageData(this.width, this.height);
		this.pixels = new Uint8ClampedArray(this.width * this.height * 4);

		this.get = (x, y, dt) => 0xFF000000 | (x * y + dt)
	}

	tick(dt, f) {
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				const i = (x + y * this.width) * 4;

				// ARGB
				let c = f(x, y, dt);
				if (c | 0xFF000000 === 0) {
					c |= 0xFF000000;
				}

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
	}

	draw() {
		this.ctx.putImageData(new ImageData(this.pixels, this.width, this.height), 0, 0);
	}
}
