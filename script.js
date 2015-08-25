var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

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
        endX = spriteWidth,
        endY = spriteHeight;

    console.log("IMG: "+spritesheet);
    console.log("width: "+spritesheet.width);
    console.log("height: "+spritesheet.height);

    // Center the sprite on the canvas
    spritePositionX = canvas.width/2 - spriteWidth/2;
    spritePositionY = canvas.height/2 - spriteHeight/2;

    var drawSprite = function() {
        ctx.drawImage(spritesheet, startX, startY, endX, endY, spritePositionX, spritePositionY, spriteWidth, spriteHeight);
    }

    drawSprite();

    // display only the cropped image
    setTimeout(function(){
        // call the horse
        drawSprite();
            // if horse state = horse image % 16 to loop around
            // make sure to setTimeout at the end
    }, 1000);
}