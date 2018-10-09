class SpaceShip {

    /**
     * @constructor
     *
     * @param game Object Game - Parent object
     * @param rocketName String
     * @param keyboard Object Keyboard - Listener to use keyboard
     */
    constructor(game, rocketName, keyboard) {
        this.game = game;
        this.rocketName = rocketName;

        this.keyboard = keyboard;

        this.el = null; // Parent DOM Element
        this.svg = null; // svg view element

        // Configuration
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.scale = 0.3;
        this.speed = 0.2;

        this.velX = 0;  // Velocity
        this.velY = 0;  // Velocity

        this.offsetRotation = 45; // Origin image is 45° oriented
        this.offsetX = 0;
        this.offsetY = 0;

        this.loadSvgView();
    }

    /**
     * Getter for rotation
     *
     * @return {number}
     */
    getRotation() {
        return this.rotation + this.offsetRotation;
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

    /**
     * On load graphic file
     *
     * @param xhr
     */
    onLoadSpaceShip(xhr) {
        this.el = document.createElement('div');
        this.el.classList.add('space-rocket');
        this.el.classList.add(this.rocketName);
        this.el.innerHTML = xhr.responseText;

        this.svg = this.el.querySelector('svg');

        this.offsetX = ((this.el.offsetWidth * this.scale) / 2);
        this.offsetY = ((this.el.offsetHeight * this.scale) / 2);

        this.game.el.appendChild(this.el);
    }

    /**
     * Render view
     */
    render() {
        if (this.el == null) {
            return;
        }

        if (this.keyboard.moveLeft) {
            this.rotation -= 2;
        }

        if (this.keyboard.moveRight) {
            this.rotation += 2;
        }

        if (this.keyboard.moveFoward) {
            let angle = 2 * Math.PI * (this.rotation / 360);

            this.velX += Math.cos(angle) * this.speed + this.offsetX;
            this.velY += Math.sin(angle) * this.speed + this.offsetY;
        }

        if (this.keyboard.moveBack) {
            this.velX *= 0.95;
            this.velY *= 0.95;
        }

        // Friction
        this.velX *= 0.98;
        this.velY *= 0.98;

        this.x += this.velX ;
        this.y += this.velY;

        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.el.style.transformOrigin = 'center';
        this.svg.style.transform = 'rotate('+ this.getRotation() +'deg) scale('+this.scale+')';
    }
}
