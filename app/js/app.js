class App {

    constructor() {
        this.gameStarted = false;

        this.characterGamer1 = null;
        this.characterGamer2 = null;
    }

    init() {
        this.UIhomePage = new UIHomePage(this);

        this.loop();
    }

    render() {
        if (!this.gameStarted) {
            this.UIhomePage.render();
        }
    }

    loop() {
        var self = this;

        requestAnimationFrame(function () {
            self.render();
            self.loop();
        })
    }

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

        console.log('Player 1 is :', this.characterGamer1);
        console.log('Player 2 is :', this.characterGamer2);
    }
}