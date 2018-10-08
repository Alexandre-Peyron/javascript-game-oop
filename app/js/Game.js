class Game {

    /**
     * @constructor
     *
     * @param app
     */
    constructor(app) {
        this.app = app;

        this.el = null; // Parent DOM Element

        this.spaceShip01 = null; // Space ship player 1, model and view
        this.spaceShip02 = null; // Space ship player 2, model and view

        this.initDOMElements();
        this.initKeyboardEvents();

        this.createSpaceShip();
    }

    /**
     * Link to DOM elements
     */
    initDOMElements() {
        this.el = this.app.el.querySelector('#game');
    }

    /**
     * Init keyboard event
     */
    initKeyboardEvents() {

    }

    /**
     * Create space ship views
     */
    createSpaceShip() {
        this.spaceShip01 = new SpaceShip(this, this.app.characterGamer1);
        this.spaceShip02 = new SpaceShip(this, this.app.characterGamer2);

        this.spaceShip01.x = 10;
        this.spaceShip01.y = 10;
        this.spaceShip01.rotation = 90;

        this.spaceShip02.x = window.innerWidth - 100;
        this.spaceShip02.y = window.innerHeight - 100;
        this.spaceShip02.rotation = -90;
    }

    /**
     * Render view
     */
    render() {
        if (this.spaceShip01 != null && this.spaceShip02 != null) {
            this.spaceShip01.render();
            this.spaceShip02.render();
        }
    }
}
