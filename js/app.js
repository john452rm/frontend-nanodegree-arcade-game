// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // Set initial position and speed:

    this.sprite = 'images/enemy-bug.png';
    this.yOffset = -23
    this.init();
};

Enemy.launch = function(allEnemies, number) {
    var i;
    for (i = 0; i < number; i++) {
        allEnemies[i] = new this;
    };
};

Enemy.prototype.init = function () {
    this.x = -150;
    this.row = randomInt(3);
    this.updateY();
    this.setSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // After a random distance past right edge, change enemy row and restart from left:

    if (this.x > 500 + (Math.random()*200)) {
        this.init();
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

// If player is on the same row and touches this enemy, flag collision:

Enemy.prototype.checkCollision = function () {
    if (this.row === player.row) {
        playerOffset = this.x - player.x;
        if ((playerOffset < 50) && (playerOffset > -70 )) {
            player.collision = 1;
        };
    };
};

var randomInt = function (howMany) {
    return Math.round((Math.random()*howMany)+0.5);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.yOffset = -35;
    this.score = 0
    this.reset();
    
};

Player.prototype.reset = function () {
    this.row = 5;
    this.column = 2;
    this.collision = 0;
    this.updateLoc();
    // TODO: add code for number of lives remaining
};

Player.prototype.update = function(dt) { // Why does the sample code include dt as parameter?
    if (this.row === 0) {
        this.atWater();
        this.reset();
    };
    this.updateLoc();
    if (this.collision) {
        this.reset();
    };
};

Player.prototype.atWater = function () {
    this.score = this.score + 100
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "Bold 30px Georgia";
    ctx.fillText('Score: '+this.score.toString(), 20, 100);
};

// Return player to start and unflag collision:

Player.prototype.updateLoc = function () {
    this.y = (this.row*83) + this.yOffset;
    this.x = (this.column * 101);
};

Player.prototype.gotGem = function(gemType) {
    this.score = this.score + (gemType * 20);
}

// Update player row and column based on key press:

Player.prototype.handleInput = function(allowedKeys) {
    switch(allowedKeys) {
        case 'left':
            if (this.column > 0) {
                this.column--;
            };
            break;
        case 'right':
            if (this.column < 4) {
                this.column++;
            };
            break;
        case 'up':
            if (this.row > 0) { 
                this.row--;
            };
            break;
        case 'down':
            if (this.row < 5) {
                this.row++;
            };
            break;
    };
};

var Collectible = function () {
    this.gemList = ['Gem Blue.png', 'Gem Green.png', 'Gem Orange.png', 'Heart.png', 'Star.png'];
    this.reset();
};

// Set gem type and position

Collectible.prototype.reset = function () {
    this.gemType = randomInt(5)-1;
    
    // Set y adjustment based on collectible type
    if (this.gemType<3) {
        this.yOffset= -33;
    } else {
        this.yOffset=-10;
    };
    
    this.sprite = 'images/'+this.gemList[this.gemType];

    // Set collectible position
    
    this.row = randomInt(3);
    this.column = randomInt(5)-1;
    this.y = (this.row * 83) + this.yOffset;
    this.x = (this.column * 101);
}

Collectible.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};

Collectible.prototype.update = function () {
    this.checkCollision ();
};

// Check for collision with player

Collectible.prototype.checkCollision = function () {
    if ((this.row === player.row) && (this.column === player.column)) {    
            player.gotGem(this.gemType);
            this.reset();
    };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];

Enemy.launch(allEnemies, 5);

// Place the player object in a variable called player

var player = new Player;

var collectible = new Collectible;

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
