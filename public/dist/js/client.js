var socket = null;

$(function() {
    socket = io();

    socket.on('canvas-reset', function(msg) {
        if (boardID != msg.boardid) {
            return;
        }
        collabsCanvas.clear();
    });

    socket.on('canvas-add-path', function(msg) {
        if (boardID != msg.boardid) {
            return;
        }
        fabric.util.enlivenObjects([msg.value], function(objects) {
            objects.forEach(function(o) {
                collabsCanvas.add(o);
            });
        });
    });

    socket.on('canvas-stroke-color', function(msg) {
        if (boardID != msg.boardid) {
            return;
        }
        collabsCanvas.freeDrawingBrush.color = msg.value;
    });

    socket.on('canvas-stroke-width', function(msg) {
        if (boardID != msg.boardid) {
            return;
        }
        collabsCanvas.freeDrawingBrush.width = parseInt(msg.value, 10) || 1;
        $("#stroke-width-menu").find("label").html(collabsCanvas.freeDrawingBrush.width);
    });

    socket.on('canvas-stroke-brush', function(msg) {
        if (boardID != msg.boardid) {
            return;
        }
        setupStrokeBrushPattern(msg.value);
    });
});