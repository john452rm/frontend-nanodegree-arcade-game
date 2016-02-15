// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -83;
    this.row = Math.round((Math.random()*3)-0.5);
    this.y = 60 + (this.row*83);
    this.speed = 250 * (Math.random()+0.3);
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
        this.row = Math.round((Math.random()*3)-0.5);
        this.y = 60 + (this.row*83);
        this.speed = 250 * (Math.random()+0.3);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 380;
};

Player.prototype.update = function(dt) {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
            if (this.y > 130) { // Does not allow player to win as no win routine yet
                this.y = this.y - 83;
            };
            break;
        case 'down':
            if (this.y < 298) {
                this.y = this.y + 83;
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
