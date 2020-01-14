const SET_COLORS = {
    "#FF0000": "Red",
    "#00FF00": "Green",
    "#0000FF": "Blue",
};
const SET_BRUSH = {
    "Pencil": "Pencil",
    "Circle": "Circle",
    "Spray": "Spray",
    "Pattern": "Pattern",
    "hline": "hline",
    "vline": "vline",
    "square": "square",
    "diamond": "diamond",
    "texture": "texture",
};

$(function() {
    //Setup Menu Bar
    $("#toolbar-top").append('<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-circle-o fa-fw"></i> <i class="fa fa-caret-down"></i></a><ul id="color-menu" class="dropdown-menu"></ul></li>');
    $("#toolbar-top").append('<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-paint-brush fa-fw"></i> <i class="fa fa-caret-down"></i></a><ul id="brush-menu" class="dropdown-menu"></ul></li>');
    $("#toolbar-top").append('<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-pencil fa-fw"></i> <i class="fa fa-caret-down"></i></a><ul id="stroke-width-menu" class="dropdown-menu"></ul></li>');

    //Setup Menu Items
    $.each(SET_COLORS, function(a, b) {
        $("#color-menu").append('<li class="actionBtn" data-cmd="setStrokeColor" data-color="' + a + '"><a href="#"><i class="fa fa-circle fa-fw" style="color:' + a + '"></i> ' + b + ' Color</a></li>');
    });
    $.each(SET_BRUSH, function(a, b) {
        $("#brush-menu").append('<li class="actionBtn" data-cmd="setBrushPattern" data-brush="' + a + '"><a href="#"><i class="fa fa-paint-brush fa-fw"></i> ' + b + ' Brush</a></li>');
    });
    $("#stroke-width-menu").html('<div style="padding: 10px;"><label class="text-center" style="display: block;">1</label><input type="range" value="1" min="0" max="250" onchange="setStrokeWidth(this)"></div>');
});



//All Canvas Buttons related functions
function setStrokeColor(src) {
    collabsCanvas.freeDrawingBrush.color = $(src).data('color');

    socket.emit('message', { "boardid": boardID, "value": $(src).data('color'), "type": 'canvas-stroke-color' });
}

function setBrushPattern(src) {
    brush = $(src).data('brush');
    setupStrokeBrushPattern(brush);

    socket.emit('message', { "boardid": boardID, "value": $(src).data('brush'), "type": 'canvas-stroke-brush' });
}

function setStrokeWidth(src) {
    collabsCanvas.freeDrawingBrush.width = parseInt($(src).val(), 10) || 1;

    socket.emit('message', { "boardid": boardID, "value": $(src).val(), "type": 'canvas-stroke-width' });
}