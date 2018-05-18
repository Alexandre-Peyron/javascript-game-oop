class UIHomePage {
    constructor(app) {
        this.app = app;

        this.initDOMElements();
        this.initEvents();
    }

    initDOMElements() {
        this.el = document.querySelector('#homepage');
        this.characterSelector = this.el.querySelector('#character-selector');
        this.charactersList = this.characterSelector.querySelectorAll('.character');
    }

    initEvents() {
        // Events on characters list
        for (let i = 0; i < this.charactersList.length; i++) {
            let a = this.charactersList[i];
            a.addEventListener('click', this.onChooseCharacter.bind(this));
        }
    }

    onChooseCharacter(event) {
        event.preventDefault();

        let characterChosen = event.target.dataset.character;
        this.app.onChooseCharacter(characterChosen);
    }

    render() {

    }
}