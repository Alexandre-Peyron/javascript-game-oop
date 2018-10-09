class Rocket01 extends SpaceShip{

    /**
     * @constructor
     *
     * @param game Object Game - Parent object
     * @param rocketName String
     * @param keyboard Object Keyboard - Listener to use keyboard
     */
    constructor(game, rocketName, keyboard) {
        super(game, rocketName, keyboard);

        this.rocketName = 'Rocket01';
        this.speed = 0.2;
        this.rotationStep = 5;

        this.isTurnLeft = false;
        this.isTurnRight = false;
    }


    animateFireSide() {
        this.isTurnLeft = false;
        this.isTurnRight = false;

        if (this.keyboard.moveLeft) {
            this.isTurnRight = true;
        }

        if (this.keyboard.moveRight) {
            this.isTurnLeft = true;
        }

        this.el.classList.toggle('is-turning-left', this.isTurnLeft);
        this.el.classList.toggle('is-turning-right', this.isTurnRight);
    }

    /**
     * Render view
     */
    render() {
        if (this.el == null) {
            return;
        }

        super.render();

        this.animateFireSide();
    }
}
