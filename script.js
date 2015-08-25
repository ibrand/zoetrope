var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    timeBetweenSprites = 100, // measured in in milliseconds
    direction = "forward";

canvas.width = 400;
canvas.height = 400;

// first figure out how big the spritesheet is (pixel dimensions)
var spritesheet = new Image();
spritesheet.src = "images/MuybridgeSpritesheet.png";

// onload waits until the image is loaded before trying to access it's attributes
spritesheet.onload = function() {
    // divide both dimensions by 4 to get the width and height of the indivudual sprites
    var spriteWidth = spritesheet.width/4;
    var spriteHeight = spritesheet.height/4;

    // State variables for drawing the sprite
    var startX = 0,
        startY = 0,
        endX = (startX+spriteWidth)%spritesheet.width,
        endY = (startY+spriteHeight)%spritesheet.height;

    // console.log("IMG: "+spritesheet);
    // console.log("width: "+spritesheet.width);
    // console.log("height: "+spritesheet.height);

    // Center the sprite on the canvas
    spritePositionX = canvas.width/2 - spriteWidth/2;
    spritePositionY = canvas.height/2 - spriteHeight/2;

    var drawSprite = function() {
        ctx.drawImage(spritesheet, startX, startY, endX, endY, spritePositionX, spritePositionY, spriteWidth, spriteHeight);
        // Move on to the next sprite
        if (direction === 'backward'){
            startX = (startX - spriteWidth);
            if (startX < 0){
                startX = spritesheet.width;
                startY = (startY - spriteHeight);
            }
            if (startY < 0){
                startY = spritesheet.height;
            }
        } else { // direction === 'forward'
            startX = (startX + spriteWidth)%spritesheet.width;
            if (startX == 0){
                startY = (startY + spriteHeight)%spritesheet.height;
            }
        }
        // console.log('startX: '+startX);
        // console.log('startY: '+startY);
        setTimeout(drawSprite, timeBetweenSprites);
    }

    drawSprite();
}

document.onmousemove = function (e){
    var midPoint = window.innerWidth/2;
    if (e.clientX < midPoint){
        direction = "forward";
    } else {
        direction = "backward";
    }
    timeBetweenSprites = e.clientX;
}
