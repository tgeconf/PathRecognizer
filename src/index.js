import _ from 'lodash';
import SketchDom from './sketchDom';

document.body.style.backgroundColor = '#efefef';
const skDom = new SketchDom(document.body, 800, 600);

const testBtn = document.createElement('button');
testBtn.innerHTML = 'test';
testBtn.style.position = 'absolute';
testBtn.style.top = '100px';
testBtn.style.left = '100px';
testBtn.style.width = '100px';
testBtn.style.height = '100px';
testBtn.onclick = () => {
    alert('test');
}
testBtn.ontouchend = () => {
    alert('touch end');
}
skDom.appendDomUnderCanvas(testBtn);