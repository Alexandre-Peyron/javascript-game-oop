class SpaceMissile {

    /**
     * @constructor
     *
     * @param game Object Game
     * @param ship Object SpaceShip - Ship Launcher
     */
    constructor(game, ship) {
        this.game = game;
        this.ship = ship;
        this.missileName = 'spaceMissile' + this.ship.number;

        this.el = null; // Parent DOM Element


        this.offsetRotation = 90; // Origin image is 45° oriented
        this.offsetShipX = this.ship.width * this.ship.scale;
        this.offsetShipY = this.ship.height * this.ship.scale;

        // Configuration
        this.x = this.ship.x + this.offsetShipX;
        this.y = this.ship.y + this.offsetShipY;
        this.rotation = this.ship.rotation;

        this.speed = 0.4;

        this.velX = 0;  // Velocity
        this.velY = 0;  // Velocity

        this.width = 0;
        this.height = 0;

        this.createMissile();
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
     * On load graphic file
     *
     * @param xhr
     */
    createMissile(xhr) {
        this.el = document.createElement('div');
        this.el.classList.add('space-missile');
        this.el.classList.add(this.missileName);

        this.game.el.insertBefore(this.el, this.ship.el);

        this.width = this.el.getBoundingClientRect().width;
        this.height = this.el.getBoundingClientRect().height;
    }

    /**
     * Remove missile from DOM and list
     */
    removeMissile() {
        if (this.el) {
            this.game.el.removeChild(this.el);
            this.ship.missiles.splice(this.ship.missiles.indexOf(this), 1);
            this.el = null;
        }
    }

    /**
     * Render view
     */
    render() {
        let angle = 2 * Math.PI * (this.rotation / 360);

        this.velX += Math.cos(angle) * this.speed;
        this.velY += Math.sin(angle) * this.speed;

        this.x += this.velX ;
        this.y += this.velY;

        this.checkLimit();

        if (this.el == null) {
            return;
        }

        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.el.style.transformOrigin = 'center';
        this.el.style.transform = 'rotate('+ this.getRotation() +'deg)'; // scale('+this.scale+')';
    }

    /**
     * Check limit for space ship position
     * Transfer to other side if necessary
     */
    checkLimit() {
        if (this.x < 0 ||
            this.x > window.innerWidth ||
            this.y < 0 ||
            this.y > window.innerHeight
        ) {
            this.removeMissile();
        }
    }
}
