var vLinePatternBrush = null;
var hLinePatternBrush = null;
var squarePatternBrush = null;
var diamondPatternBrush = null;
var rect = null;
var texturePatternBrush = null;

function setupBrush() {
    vLinePatternBrush = new fabric.PatternBrush(collabsCanvas);
    vLinePatternBrush.getPatternSrc = function() {

        var patternCanvas = fabric.document.createElement('whiteboardCanvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();

        return patternCanvas;
    };

    hLinePatternBrush = new fabric.PatternBrush(collabsCanvas);
    hLinePatternBrush.getPatternSrc = function() {

        var patternCanvas = fabric.document.createElement('whiteboardCanvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.stroke();

        return patternCanvas;
    };

    squarePatternBrush = new fabric.PatternBrush(collabsCanvas);
    squarePatternBrush.getPatternSrc = function() {

        var squareWidth = 10,
            squareDistance = 2;

        var patternCanvas = fabric.document.createElement('whiteboardCanvas');
        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
        var ctx = patternCanvas.getContext('2d');

        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, squareWidth, squareWidth);

        return patternCanvas;
    };

    diamondPatternBrush = new fabric.PatternBrush(collabsCanvas);
    diamondPatternBrush.getPatternSrc = function() {

        var squareWidth = 10,
            squareDistance = 5;
        var patternCanvas = fabric.document.createElement('whiteboardCanvas');
        rect = new fabric.Rect({
            width: squareWidth,
            height: squareWidth,
            angle: 45,
            fill: this.color
        });

        var canvasWidth = rect.getBoundingRect().width;

        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
        rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

        var ctx = patternCanvas.getContext('2d');
        rect.render(ctx);

        return patternCanvas;
    };

    // var img = new Image();
    // img.src = '../assets/honey_im_subtle.png';

    // texturePatternBrush = new fabric.PatternBrush(collabsCanvas);
    // texturePatternBrush.source = img;
}