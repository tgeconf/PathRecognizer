import _ from 'lodash';
import printMe from './print.js';
import { tool } from './tool.js';
import { pathRecognizer, Point, Rectangle, UniStroke } from '../lib/index.js';

let canvas, ctx, canvasRect, isDown = false,
    tracePoints = [];

const mouseDown = (e) => {
    let x = e.clientX,
        y = e.clientY,
        button = e.button;
    if (button <= 1) {
        isDown = true;
        x -= canvasRect.x - tool.getScrollX();
        y -= canvasRect.y - tool.getScrollY();
        if (tracePoints.length > 0) {
            ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);
        }
        tracePoints.length = 1; // clear
        tracePoints[0] = new Point(x, y);
        ctx.fillRect(x - 4, y - 3, 9, 9);
    }
}

const mouseMove = (e) => {
    let x = e.clientX,
        y = e.clientY;
    if (isDown) {
        x -= canvasRect.x - tool.getScrollX();
        y -= canvasRect.y - tool.getScrollY();
        tracePoints[tracePoints.length] = new Point(x, y); // append
        tool.drawConnectedPoint(ctx, tracePoints[tracePoints.length - 2], tracePoints[tracePoints.length - 1]);
    }
}

const mouseUp = (e) => {
    let x = e.clientX,
        y = e.clientY,
        button = e.button;
    if (isDown || button == 2) {
        isDown = false;
        let result = pathRecognizer.recognize(tracePoints, true);
        document.getElementById('resultSpan').innerHTML = "Result: " + result.Name + " (" + tool.round(result.Score, 2) + ") in " + result.Time + " ms.";
    }
}

canvas = document.createElement('canvas');
canvas.id = 'traceCanvas';
canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundColor = '#eee';
document.body.appendChild(canvas);
ctx = canvas.getContext('2d');
canvas.onmousedown = mouseDown;
canvas.onmousemove = mouseMove;
canvas.onmouseup = mouseUp;

canvasRect = tool.getCanvasRect(canvas);

const resultSpan = document.createElement('span');
resultSpan.id = 'resultSpan';
document.body.appendChild(resultSpan);

// if (module.hot) {
//     module.hot.accept('./tool.js', function() {
//         // console.log('Accepting the updated printMe module!');
//         // printMe();
//     })
// }