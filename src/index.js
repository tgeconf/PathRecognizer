import _ from 'lodash';
import { tool } from './tool.js';
import { pathRecognizer, Point, Rectangle, UniStroke } from './recognizer/index.js';
// import { pathRecognizer, Point, Rectangle, UniStroke } from '../lib/index.js';

let canvas, ctx, canvasRect, isDown = false,
    tracePoints = [];

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);
    tracePoints = [];
}

const mouseDown = (e) => {
    let x = e.clientX,
        y = e.clientY,
        button = e.button;
    if (button <= 1) {
        isDown = true;
        x -= canvasRect.x - tool.getScrollX();
        y -= canvasRect.y - tool.getScrollY();
        // if (tracePoints.length > 0) {
        //     ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);
        // }
        // tracePoints.length = 1; // clear
        // tracePoints[0] = new Point(x, y);
        tracePoints.push(new Point(x, y));
        ctx.fillRect(x - 4, y - 3, 9, 9);
    }
}

const mouseMove = (e) => {
    let x = e.clientX,
        y = e.clientY;
    if (isDown) {
        x -= canvasRect.x - tool.getScrollX();
        y -= canvasRect.y - tool.getScrollY();
        tracePoints.push(new Point(x, y)); // append
        tool.drawConnectedPoint(ctx, tracePoints[tracePoints.length - 2], tracePoints[tracePoints.length - 1]);
    }
}

const mouseUp = (e) => {
    let x = e.clientX,
        y = e.clientY,
        button = e.button;
    if (isDown || button == 2) {
        isDown = false;
        // recognizePath();
        // let result = pathRecognizer.recognize(tracePoints, true);
        // let str = '';
        // result[1].forEach((r, i) => {
        //         str += "Result: " + (r.Name === result[0] ? '<b>' + r.Name + '</b>' : r.Name) + " (" + tool.round(r.Score, 2) + ") in " + r.Time + " ms" + (i === 5 || i === 9 ? anglePathRecognizer.gestures[i].cosFeature.join(',') : '') + ".<br>";
        //     })
        // document.getElementById('resultSpan').innerHTML = "Result: " + result.Name + " (" + tool.round(result.Score, 2) + ") in " + result.Time + " ms.";
        // document.getElementById('resultSpan').innerHTML = str;
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
canvas.onmousedown = mouseDown;
canvas.onmousemove = mouseMove;
canvas.onmouseup = mouseUp;

canvasRect = tool.getCanvasRect(canvas);

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


// if (module.hot) {
//     module.hot.accept('./tool.js', function() {
//         // console.log('Accepting the updated printMe module!');
//         // printMe();
//     })
// }