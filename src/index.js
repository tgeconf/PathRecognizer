import _ from 'lodash';
import { tool } from './tool.js';
import { pathRecognizer, Point, Rectangle, UniStroke } from './recognizer/index.js';
// import { pathRecognizer, Point, Rectangle, UniStroke } from '../lib/index.js';

let canvas, ctx, canvasRect, isDown = false,
    tracePoints = [],
    pathInterval, recordingPath = false,
    timeDelimiter = 1000;

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);
    tracePoints = [];
}

const downEvent = (e) => {
    let x = e.clientX,
        y = e.clientY;
    // button = e.button;
    isDown = true;
    x -= canvasRect.x - tool.getScrollX();
    y -= canvasRect.y - tool.getScrollY();
    tracePoints.push(new Point(x, y));
    ctx.fillRect(x - 4, y - 3, 9, 9);
    if (!recordingPath) {
        recordingPath = true;
    } else {
        clearInterval(pathInterval);
    }
}

const moveEvent = (e) => {
    let x = e.clientX,
        y = e.clientY;
    if (isDown) {
        x -= canvasRect.x - tool.getScrollX();
        y -= canvasRect.y - tool.getScrollY();
        tracePoints.push(new Point(x, y)); // append
        tool.drawConnectedPoint(ctx, tracePoints[tracePoints.length - 2], tracePoints[tracePoints.length - 1]);
    }
}

const upEvent = (e) => {
    if (isDown) {
        isDown = false;
        if (recordingPath) {
            let tmpTime = timeDelimiter;
            pathInterval = setInterval(() => {
                tmpTime -= 100;
                if (tmpTime === 0) {
                    recordingPath = false;
                    clearInterval(pathInterval);
                    recognizePath();
                }
            }, 100)
        }
    }
}

const recognizePath = () => {
    let result = pathRecognizer.recognize(tracePoints, true);
    document.getElementById('resultSpan').innerHTML = "Result: " + result.Name + " (" + tool.round(result.Score, 2) + ") in " + result.Time + " ms.";
}


canvas = document.createElement('canvas');
canvas.id = 'traceCanvas';
canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundColor = '#eee';
document.body.appendChild(canvas);
ctx = canvas.getContext('2d');
canvasRect = tool.getCanvasRect(canvas);


// // Mouse
canvas.addEventListener('mousedown', function(e) {
    downEvent(e);
    e.preventDefault();
}, false)
canvas.addEventListener('mousemove', function(e) {
    moveEvent(e);
    e.preventDefault();
}, false)
canvas.addEventListener('mouseup', function(e) {
    upEvent(e);
    e.preventDefault();
}, false)

// // Touch
canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
}, false)
canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false)
canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
}, false)

// Pointer
// canvas.addEventListener('pointerover', (e) => {
//     alert('pointer over');
// })
canvas.addEventListener('pointerdown', function(e) {
    switch (e.pointerType) {
        case 'pen':
        case 'mouse':
            downEvent(e);
            break;
        case 'touch':
            console.log('touch pointer down');
            break;
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
}, false)
canvas.addEventListener('pointermove', function(e) {
    switch (e.pointerType) {
        case 'pen':
        case 'mouse':
            moveEvent(e);
            break;
        case 'touch':
            console.log('touch pointer move');
            break;
    }
}, false)
canvas.addEventListener('pointerup', function(e) {
    switch (e.pointerType) {
        case 'pen':
        case 'mouse':
            upEvent(e);
            break;
        case 'touch':
            console.log('touch pointer up');
            break;
    }
}, false)



const resultSpan = document.createElement('span');
resultSpan.id = 'resultSpan';
document.body.appendChild(resultSpan);

/**recognize button */
const recogBtn = document.createElement('button');
recogBtn.id = 'recogBtn';
recogBtn.innerHTML = 'recognize';
recogBtn.style.position = 'absolute';
recogBtn.style.top = '800px';
recogBtn.style.left = '20px';
recogBtn.onclick = (e) => {
    recognizePath();
}
document.body.appendChild(recogBtn);


/** add gesture button */
const addGesture = document.createElement('button');
addGesture.id = 'addGesture';
addGesture.innerHTML = 'add gesture';
addGesture.style.position = 'absolute';
addGesture.style.top = '800px';
addGesture.style.left = '120px';
addGesture.onclick = () => {
    let str = '';
    tracePoints.forEach(p => {
        str += 'new Point(' + p.x + ', ' + p.y + '), ';
    })
    console.log(str);
}
document.body.appendChild(addGesture);

/**clear button */
const clearBtn = document.createElement('button');
clearBtn.id = 'clearBtn';
clearBtn.innerHTML = 'clear';
clearBtn.style.position = 'absolute';
clearBtn.style.top = '800px';
clearBtn.style.left = '220px';
clearBtn.onclick = () => {
    clearCanvas();
}
document.body.appendChild(clearBtn);


// window.onpointerdown = (e) => {
//     e.preventDefault();
// }
// window.onpointermove = (e) => {
//     e.preventDefault();
// }

// if (module.hot) {
//     module.hot.accept('./tool.js', function() {
//         // console.log('Accepting the updated printMe module!');
//         // printMe();
//     })
// }