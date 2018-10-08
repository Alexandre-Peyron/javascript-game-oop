class SpaceShip {

    /**
     * @constructor
     *
     * @param game
     * @param rocketName
     */
    constructor(game, rocketName) {
        this.game = game;
        this.rocketName = rocketName;

        this.el = null; // Parent DOM Element

        // Configuration
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.scale = 0.3;

        this.loadSvgView();
    }

    /**
     * Load SVG File
     */
    loadSvgView() {
        let self = this,
            url = 'app/assets/rockets/' + this.rocketName + '.svg';

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                self.onLoadSpaceShip(this);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    onLoadSpaceShip(xhr) {
        this.el = document.createElement('div');
        this.el.classList.add('space-rocket');
        this.el.classList.add(this.rocketName);
        this.el.innerHTML = xhr.responseText;

        this.game.el.appendChild(this.el);
    }

    /**
     * Render view
     */
    render() {
        if (this.el != null) {
            let positionX = ((this.el.offsetWidth * this.scale) / 2) + this.x;
            let positionY = ((this.el.offsetHeight * this.scale) / 2) + this.y;

            this.el.style.left = positionX + 'px';
            this.el.style.top = positionY + 'px';
            this.el.style.transform = 'rotate('+ this.rotation +'deg) scale('+this.scale+')';
        }
    }
}
