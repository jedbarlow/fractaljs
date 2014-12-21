function backingScale(context) {

    if ('devicePixelRatio' in window) {
        if (window.devicePixelRatio > 1) {
            return window.devicePixelRatio;
        }
    }
    return 1;
}

var vertices = [];

function setupFractal(width, height) {
    vertices = [];
    numSpots = Math.floor(Math.random() * 4) + 4;
    for (var i = 0; i < numSpots; i++) {
        var vert = [Math.random() * width, Math.random() * height];
        
        var r = Math.random();
        var weight = Math.floor(r*r*r * 6) + 1;
        for (var j = 0; j < weight; j++) {
            vertices.push(vert)
        }
    }
}

function renderFractal(renderTarget) {
    var context = renderTarget.getContext("2d");

    var scaleFactor = backingScale(context);

    if (scaleFactor > 1) {
        renderTarget.width = renderTarget.width * scaleFactor;
        renderTarget.height = renderTarget.height * scaleFactor;
        context = renderTarget.getContext("2d");
    }

    var width = renderTarget.width;
    var height = renderTarget.height;

    setupFractal(width, height);

    var spot = [width/2.0, height/2.0];

    setInterval(function () {
        context.fillStyle = "rgba(255,255,255,1)";
        for (var i = 0; i < 1000; i++) {
            v = vertices[Math.floor(Math.random() * vertices.length)];
            spot[0] = (spot[0] + v[0]) / 2.0
            spot[1] = (spot[1] + v[1]) / 2.0

            context.beginPath();
            context.arc(Math.floor(spot[0]) + 0.5, Math.floor(spot[1]) + 0.5, 0.5, 0, 2*Math.PI);
            context.closePath();
            context.fill();
        }
        context.fill();
    }, 10);

    setInterval(function () {
        setupFractal(width, height);
    }, 5000);
}

