import Config from "./config.js";

export default class GameLoop {

    constructor( update, draw ) {

        this.update = update;
        this.draw = draw;

        this.config = new Config();

        this.animate = this.animate.bind(this);
        this.animate();

    }

    animate() {

        requestAnimationFrame( this.animate );
        if ( ++this.config.step < this.config.maxStep) {
            return;
        }
        this.config.step = 0;

        this.update();
        this.draw();

    }

}