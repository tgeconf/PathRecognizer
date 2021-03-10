import _ from 'lodash';
import printMe from './print.js';
import { pathRecognizer } from '../lib/index.js';

function component() {
    // console.log(geTool.arrayUtil.removeRept([1, 1, 2, 2, 3, 3, 3]));
    pathRecognizer.test();

    // const element = document.createElement('div');
    // const btn = document.createElement('button');

    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    // btn.innerHTML = 'Click me and check the console! now';
    // btn.onclick = printMe;

    // element.appendChild(btn);

    // return element;
}
component();
// document.body.appendChild(component());
const canvas = document.createElement('canvas');
canvas.id = 'traceCanvas';
canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundColor = '#eee';
document.body.appendChild(canvas);

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}