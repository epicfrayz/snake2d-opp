import Config from "./config.js";

export default class Snake {
	
	constructor(){

		this.config = new Config();
		this.x = 160;
		this.y = 160;
		this.dx = this.config.sizeCell;
		this.dy = 0;
		this.tails = [];
		this.maxTails = 3;

		this.control();

	}

	update( berry, score, canvas ) {
		this.x += this.dx;
		this.y += this.dy;
	
		if (this.x < 0) {
			this.x = canvas.element.width - this.config.sizeCell;
		} else if ( this.x >= canvas.element.width ) {
			this.x = 0;
		}
	
		if (this.y < 0) {
			this.y = canvas.element.height - this.config.sizeCell;
		} else if ( this.y >= canvas.element.height ) {
			this.y = 0;
		}
	
		this.tails.unshift( { x: this.x, y: this.y } );
	
		if ( this.tails.length > this.maxTails ) {
			this.tails.pop();
		}
	
		this.tails.forEach( (el, index) => {
	
			if ( el.x === berry.x && el.y === berry.y ) {
				this.maxTails++;
				score.incScore();
				berry.randomPosition();
			}
	
			for( let i = index + 1; i < this.tails.length; i++ ) {
	
				if ( el.x == this.tails[i].x && el.y == this.tails[i].y ) {
					this.death();
					score.setToZero();
					berry.randomPosition();
				}
	
			}
	
		} );

	}

	draw(context) {

		this.tails.forEach( (el, index) => {
			if (index == 0) {
				context.fillStyle = "#FA0556";
			} else {
				context.fillStyle = "#A00034";
			}
			context.fillRect( el.x, el.y, this.config.sizeCell, this.config.sizeCell );
		} );

	}

	death() {

		this.x = 160;
		this.y = 160;
		this.dx = this.config.sizeCell;
		this.dy = 0;
		this.tails = [];
		this.maxTails = 3;

	}

	control() {
		
		document.addEventListener("keydown",  (e) => {
			if ( e.code == "KeyW" ) {
				this.dy = -this.config.sizeCell;
				this.dx = 0;
			} else if ( e.code == "KeyA" ) {
				this.dx = -this.config.sizeCell;
				this.dy = 0;
			} else if ( e.code == "KeyS" ) {
				this.dy = this.config.sizeCell;
				this.dx = 0;
			} else if ( e.code == "KeyD" ) {
				this.dx = this.config.sizeCell;
				this.dy = 0;
			}
		});

	}

}