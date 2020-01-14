var collabsCanvas = null;
var boardID = Math.floor(Math.random() * 100000000);

$(function() {
    $("#boardID").html(boardID);

    $("body").delegate(".actionBtn[data-cmd]", "click", function() {
        cmd = $(this).data("cmd");
        if (typeof window[cmd] == "function") {
            window[cmd](this);
        } else {
            console.info("Command Not Found", cmd);
        }
    });

    initCanvas();
});

function initCanvas() {
    collabsCanvas = this.__canvas = new fabric.Canvas('whiteboardCanvas', {
        isDrawingMode: true
    });
    collabsCanvas.setWidth($("#page-wrapper").width());
    collabsCanvas.setHeight($("#page-wrapper").height());

    collabsCanvas.on('path:created', function(e) {
        //canvas.remove(fabric.Path.fromObject(JSON.stringify(e.path)));
        //console.log(JSON.stringify(e.path.toJSON()));
        socket.emit('message', { "boardid": boardID, "value": e.path.toJSON(), "type": 'canvas-add-path' });
    });

    setupBrush();
}

function connectToRemoteBoard(src) {
    ans = prompt("Please give BOARDID for remote board");
    boardID = ans;
    $("#boardID").html(boardID);
}

//All Canvas related functions
function clearCanvas() {
    collabsCanvas.clear();
    socket.emit('message', { "boardid": boardID, "type": 'canvas-reset' });
}

function toggleDrawingMode(src) {
    collabsCanvas.isDrawingMode = !collabsCanvas.isDrawingMode;

    if (collabsCanvas.isDrawingMode) {
        $(src).find(".fa").removeClass("fa-toggle-off").addClass("fa-toggle-on");
    } else {
        $(src).find(".fa").removeClass("fa-toggle-on").addClass("fa-toggle-off");
    }
}

function setupStrokeBrushPattern(brushPattern) {
    if (brushPattern == null) brushPattern = "";

    switch (brushPattern.toLowerCase()) {
        case "hline":
            collabsCanvas.freeDrawingBrush = vLinePatternBrush;
            break;
        case "vline":
            collabsCanvas.freeDrawingBrush = hLinePatternBrush;
            break;
        case "square":
            collabsCanvas.freeDrawingBrush = squarePatternBrush;
            break;
        case "diamond":
            collabsCanvas.freeDrawingBrush = diamondPatternBrush;
            break;
        case "texture":
            collabsCanvas.freeDrawingBrush = texturePatternBrush;
            break;
        default:
            collabsCanvas.freeDrawingBrush = new fabric[brushPattern + 'Brush'](collabsCanvas);
    }
}