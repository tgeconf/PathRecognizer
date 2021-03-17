import _ from 'lodash';
import SketchDom from './sketchDom';
// import { pathRecognizer, Point, Rectangle, UniStroke } from '../lib/index.js';

document.body.style.backgroundColor = '#efefef';
const skDom = new SketchDom(document.body, 800, 600);
// skDom.container.style.marginTop = '100px';
// skDom.container.style.marginLeft = '100px';
// document.body.appendChild(skDom.container);
// skDom.canvasRect = skDom.getCanvasRect(skDom.canvas);


// const resultSpan = document.createElement('span');
// resultSpan.id = 'resultSpan';
// document.body.appendChild(resultSpan);

// /**recognize button */
// const recogBtn = document.createElement('button');
// recogBtn.id = 'recogBtn';
// recogBtn.innerHTML = 'recognize';
// recogBtn.style.position = 'absolute';
// recogBtn.style.top = '800px';
// recogBtn.style.left = '20px';
// recogBtn.onclick = (e) => {
//     recognizePath();
// }
// document.body.appendChild(recogBtn);


// /** add gesture button */
// const addGesture = document.createElement('button');
// addGesture.id = 'addGesture';
// addGesture.innerHTML = 'add gesture';
// addGesture.style.position = 'absolute';
// addGesture.style.top = '800px';
// addGesture.style.left = '120px';
// addGesture.onclick = () => {
//     let str = '';
//     tracePoints.forEach(p => {
//         str += 'new Point(' + p.x + ', ' + p.y + '), ';
//     })
//     console.log(str);
// }
// document.body.appendChild(addGesture);

// /**clear button */
// const clearBtn = document.createElement('button');
// clearBtn.id = 'clearBtn';
// clearBtn.innerHTML = 'clear';
// clearBtn.style.position = 'absolute';
// clearBtn.style.top = '800px';
// clearBtn.style.left = '220px';
// clearBtn.onclick = () => {
//     clearCanvas();
// }
// document.body.appendChild(clearBtn);