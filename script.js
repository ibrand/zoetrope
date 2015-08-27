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

    // Center the sprite on the canvas
    spritePositionX = canvas.width/2 - spriteWidth/2;
    spritePositionY = canvas.height/2 - spriteHeight/2;

    var drawSprite = function() {
        ctx.drawImage(spritesheet, startX, startY, endX, endY, spritePositionX, spritePositionY, spriteWidth, spriteHeight);
        // Move on to the next sprite
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
        setTimeout(drawSprite, timeBetweenSprites);
    }

    drawSprite();
}

document.getElementById("left").onmousemove = function (e){
    direction = "forward";
    timeBetweenSprites = e.clientX;
}

document.getElementById("right").onmousemove = function (e){
    divWidth = window.innerWidth/2;
    direction = "backward";
    // subtract x from the div width and you bring x back to 0 when its in the right div
    // then subtract it from the div width again and take the absolute value, and the higher numbers go towards the middle
    timeBetweenSprites = Math.abs(divWidth*2-e.clientX);
}

