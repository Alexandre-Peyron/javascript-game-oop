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

        this.rotationStep = 2;
        this.speed = 0.2;

        this.velX = 0;  // Velocity
        this.velY = 0;  // Velocity

        this.width = 0;
        this.height = 0;

        this.isMoving = false;

        this.offsetRotation = 45; // Origin image is 45° oriented
        this.offsetX = 0;
        this.offsetY = 0;

        this.loadSvgView();
    }

    /**
     * Getter for rotation
     * (Sum between current rotation and image init position)
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

        this.game.el.appendChild(this.el);

        this.svg = this.el.querySelector('svg');

        this.width = this.svg.getBoundingClientRect().width;
        this.height = this.svg.getBoundingClientRect().height;

        this.offsetX = ((this.width * this.scale) / 2);
        this.offsetY = ((this.height * this.scale)/ 2);
    }

    move() {
        this.isMoving = false;

        if (this.keyboard.moveLeft) {
            this.rotation -= this.rotationStep;
        }

        if (this.keyboard.moveRight) {
            this.rotation += this.rotationStep;
        }

        if (this.keyboard.moveFoward) {
            this.isMoving = true;

            let angle = 2 * Math.PI * (this.rotation / 360);

            this.velX += Math.cos(angle) * this.speed;
            this.velY += Math.sin(angle) * this.speed;
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
    }

    /**
     * Render view
     */
    render() {
        if (this.el == null) {
            return;
        }

        this.move();

        this.checkLimit();

        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.el.style.transformOrigin = 'center';
        this.el.classList.toggle('is-moving', this.isMoving);
        this.svg.style.transform = 'rotate('+ this.getRotation() +'deg) scale('+this.scale+')';
    }

    /**
     * Check limit for space ship position
     * Transfer to other side if necessary
     */
    checkLimit() {
        if ( this.x < -(this.width)) {
            this.x = window.innerWidth;
        }
        else if ( this.x > window.innerWidth) {
            this.x = -this.width + 1;
        }

        if ( this.y < -(this.height)) {
            this.y = window.innerHeight;
        }
        else if ( this.y > window.innerHeight) {
            this.y = -this.height + 1;
        }
    }
}
