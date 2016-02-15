// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -200;
    this.row = Math.round((Math.random()*3)+0.5);
    this.yOffset = -23
    this.y = 0;
    this.updateY();
    this.setSpeed();
    console.log(this.speed);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 500 + (Math.random()*200)) {
        this.x = -83;
        this.row = Math.round((Math.random()*3)+0.5);
        this.updateY();
        this.setSpeed();
    };     
    this.checkCollision();
};

Enemy.prototype.setSpeed = function () {
        this.speed = 350 * (Math.random()+0.3);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.updateY = function () {
    this.y = (this.row*83) + this.yOffset;
};

Enemy.prototype.checkCollision = function () {
    if (this.row === player.row) {
        playerOffset = this.x - player.x;
        if ((playerOffset < 50) && (playerOffset > -70 )) {
            player.reset();
        };
    };
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.row = 5;
    this.yOffset = -35;
    this.y = 0;
    this.updateY();
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function () {
    this.row = 5;
    this.x = 202;
    this.updateY();
    // TODO: add code for number of lives remaining
};

Player.prototype.updateY = function () {
    this.y = (this.row*83) + this.yOffset;
};

Player.prototype.handleInput = function(allowedKeys) {
    switch(allowedKeys) {
        case 'left':
            if (this.x > 100) {
                this.x = this.x - 101;
            };
            break;
        case 'right':
            if (this.x < 304) {
                this.x = this.x + 101;
            };
            break;
        case 'up':
            if (this.row > 1) { // Does not allow player to win as no win routine yet
                this.row--;
                this.updateY();
            };
            break;
        case 'down':
            if (this.row < 5) {
                this.row++;
                this.updateY();
            };
            break;
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];

var launch = function(allEnemies, number) {
    var i;
    for (i = 0; i < number; i++) {
        allEnemies[i] = new Enemy;
    };
};

launch(allEnemies, 5);

// Place the player object in a variable called player

var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
