var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    timeBetweenSprites = 100, // measured in in milliseconds
    direction = "forward";

canvas.width = 400;
canvas.height = 400;

var spritesheet = new Image();
spritesheet.src = "images/MuybridgeSpritesheet.png";
var spritesPerRow = 4;

function Sprite(spritesheet, spritesPerRow, timeBetweenSprites) {
    this.spritesheet = spritesheet;
    this.spritesPerRow = spritesPerRow;
    this.timeBetweenSprites = timeBetweenSprites;

    spriteWidth = spritesheet.width/spritesPerRow;
    spriteHeight = spritesheet.height/spritesPerRow;
    spritePositionX = canvas.width/2 - spriteWidth/2;
    spritePositionY = canvas.height/2 - spriteHeight/2;
    // state variables for drawing the sprite
    startX = 0;
    startY = 0;
    endX = startX+spriteWidth;
    endY = startY+spriteHeight;

    this.drawSprite = function(){
        ctx.drawImage(spritesheet, startX, startY, endX, endY, spritePositionX, spritePositionY, spriteWidth, spriteHeight);
        // move on to the next sprite
        if (direction === 'backward'){
            if (startX == 0){
                startY = (startY - spriteHeight + spritesheet.height)%spritesheet.height;
            }
            startX = (startX - spriteWidth + spritesheet.width)%spritesheet.width;
        } else { // direction === 'forward'
            startX = (startX + spriteWidth)%spritesheet.width;
            if (startX == 0){
                startY = (startY + spriteHeight)%spritesheet.height;
            }
        }
    }
    this.animateSprite = function(){
        this.drawSprite();
        setTimeout(this.animateSprite, timeBetweenSprites);
    }
}
var sprite = new Sprite(spritesheet, spritesPerRow, timeBetweenSprites);
sprite.animateSprite();

document.getElementById("left").onmousemove = function (e){
    direction = "forward";
    timeBetweenSprites = e.clientX;
}

document.getElementById("right").onmousemove = function (e){
    direction = "backward";
    // reverse the x coordinates once you pass the middle of the screen
    timeBetweenSprites = Math.abs(window.innerWidth-e.clientX);
}
