class App {

    /**
     * @constructor
     */
    constructor() {
        this.el = null;              // Parent DOM Element

        this.UIhomePage = null;

        this.game = null;
        this.gameStarted = false;    // Game is running or not

        this.characterGamer1 = null; // character chosen by player 1
        this.characterGamer2 = null; // character chosen by player 2
    }

    /**
     * Init Application
     */
    start() {
        this.initDOMElements();
        this.initEvents();

        this.UIhomePage = new UIHomePage(this);

        this.loop();
    }

    /**
     * Link to DOM elements
     */
    initDOMElements() {
        this.el = document.querySelector('#app');
    }

    /**
     * Events
     */
    initEvents() {

    }

    /**
     * Eternal loop
     */
    loop() {
        var self = this;

        requestAnimationFrame(function () {
            self.render();
            self.loop();
        })
    }

    /**
     * Remove Home Page
     * Create and start game
     */
    startGame() {
        this.UIhomePage.remove();

        this.game = new Game(this);
        this.gameStarted = true;
    }

    /**
     * Render App and all views
     */
    render() {
        if (!this.gameStarted) {
            this.UIhomePage.render();
        }
        else {
            this.game.render();
        }
    }

    /**
     *
     * @param character
     */
    onChooseCharacter(character) {
        // Second click on character, remove data
        if (this.characterGamer1 === character) {
            this.characterGamer1 = null;
            return;
        }

        // Second click on character, remove data
        if (this.characterGamer2 === character) {
            this.characterGamer2 = null;
            return;
        }

        // Set new Value
        if (this.characterGamer1 == null) {
            this.characterGamer1 = character;
        }
        else if (this.characterGamer2 == null) {
            this.characterGamer2 = character;
        }
    }
}
