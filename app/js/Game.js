class Game {

    /**
     * @constructor
     *
     * @param app Object Application
     */
    constructor(app) {
        this.app = app;

        this.el = null; // Parent DOM Element

        this.spaceShip01 = null; // Space ship player 1, model and view
        this.spaceShip02 = null; // Space ship player 2, model and view

        this.initDOMElements();

        this.createSpaceShip();
    }

    /**
     * Link to DOM elements
     */
    initDOMElements() {
        this.el = this.app.el.querySelector('#game');
    }

    /**
     * Create space ship views
     */
    createSpaceShip() {
        const classes = { Rocket01, Rocket02, Rocket03, Rocket04 };

        this.spaceShip01 = new classes[this.app.characterGamer1](
            this,
            this.app.characterGamer1,
            new Keyboard('z', 'q', 's', 'd', 'e')
        );

        this.spaceShip02 = new classes[this.app.characterGamer2](
            this,
            this.app.characterGamer2,
            new Keyboard('ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', '=')
        );

        // Default position and rotation
        this.spaceShip01.x = 10;
        this.spaceShip01.y = 10;
        this.spaceShip01.rotation = 90;

        // Default position and rotation
        this.spaceShip02.x = window.innerWidth - 300;
        this.spaceShip02.y = window.innerHeight - 300;
        this.spaceShip02.rotation = -90;
    }

    /**
     * Render views
     */
    render() {
        if (this.spaceShip01 != null) {
            this.spaceShip01.render();
        }

        if (this.spaceShip02 != null) {
            this.spaceShip02.render();
        }
    }
}
