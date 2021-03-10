import _ from 'lodash';
import printMe from './print.js';
import { tool } from './tool.js';
import Point from './point';
import { pathRecognizer } from '../lib/index.js';

let canvas, ctx, canvasRect, isDown = false,
    tracePoints = [];

const mousedown = (e) => {
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

canvas = document.createElement('canvas');
canvas.id = 'traceCanvas';
canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundColor = '#eee';
document.body.appendChild(canvas);
ctx = canvas.getContext('2d');
canvas.onmousedown = mousedown;

canvasRect = tool.getCanvasRect(canvas);


if (module.hot) {
    module.hot.accept('./tool.js', function() {
        // console.log('Accepting the updated printMe module!');
        // printMe();
    })
}