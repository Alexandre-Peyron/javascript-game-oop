class Keyboard {

    /**
     * @constructor
     *
     * @param topKey String - Button top
     * @param leftKey String - Button left
     * @param bottomKey String - Button down
     * @param rightKey String - Button right
     */
    constructor(topKey, leftKey, bottomKey, rightKey) {
        this.topKey = topKey;
        this.leftKey = leftKey;
        this.bottomKey = bottomKey;
        this.rightKey = rightKey;

        this.moveFoward = false;
        this.moveBack = false;
        this.moveLeft = false;
        this.moveRight = false;

        this.initKeyboardListener();
    }

    /**
     * Init keyboard listener
     * `bind(this)` to keep context in callback function
     */
    initKeyboardListener() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    /**
     * On key down
     */
    onKeyDown(event) {

        // console.log('event.key', event.key);

        switch (event.key) {
            case this.topKey:
                this.moveFoward = true;
                break;
            case this.leftKey:
                this.moveLeft = true;
                break;
            case this.bottomKey:
                this.moveBack = true;
                break;
            case this.rightKey:
                this.moveRight = true;
                break;
        }
    }

    /**
     * On key up
     */
    onKeyUp() {
        switch (event.key) {
            case this.topKey:
                this.moveFoward = false;
                break;
            case this.leftKey:
                this.moveLeft = false;
                break;
            case this.bottomKey:
                this.moveBack = false;
                break;
            case this.rightKey:
                this.moveRight  = false;
                break;
        }
    }
}
