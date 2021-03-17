import PathRecognizer, { Point } from './recognizer/index';
import HWRecognizer from './handWritingRecognizer/index';

export default class SketchDom {
    /**
     * 
     * @param {*} parent : this parent must be a dom which has already been rendered
     * @param {*} w 
     * @param {*} h 
     */
    constructor(parent, w, h) {
        this.pathRecognizer = new PathRecognizer();
        this.hwRecognizer = new HWRecognizer(w, h);
        this.recognizeResult = { score: 0, name: '' };
        this.timeDelimiter = 1000;
        this.isDown = false;
        this.tracePoints = []; //contains multiple strokes, each stroke corresponds to an array of points
        this.tracePointsOneStroke = [];
        this.pathInterval;
        this.recordingPath = false;
        this.width = w;
        this.height = h;
        this.parent = parent;
        this.initContainer();
        this.initCanvas();
    }
    initContainer() {
        this.container = document.createElement('div');
        this.container.style.margin = 0;
        this.container.style.padding = 0;
        this.container.style.width = this.width + 'px';
        this.container.style.height = this.height + 'px';
        this.container.style.background = '#fff';
        this.parent.appendChild(this.container);
    }
    initCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.position = 'absolute';
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.canvasRect = this.getCanvasRect(this.canvas);
        console.log('canvas rect: ', this.canvasRect);

        //Mouse
        const that = this;
        this.canvas.addEventListener('mousedown', (e) => {
            that.downEvent(e);
            e.preventDefault();
        }, false)
        this.canvas.addEventListener('mousemove', (e) => {
            that.moveEvent(e);
            e.preventDefault();
        }, false)
        this.canvas.addEventListener('mouseup', (e) => {
            that.upEvent(e);
            e.preventDefault();
        }, false)

        //Touch
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, false)
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, false)
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
        }, false)

        // Pointer
        // canvas.addEventListener('pointerover', (e) => {
        //     alert('pointer over');
        // })
        this.canvas.addEventListener('pointerdown', (e) => {
            switch (e.pointerType) {
                case 'pen':
                case 'mouse':
                    that.downEvent(e);
                    break;
                case 'touch':
                    console.log('touch pointer down');
                    break;
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, false)
        this.canvas.addEventListener('pointermove', (e) => {
            switch (e.pointerType) {
                case 'pen':
                case 'mouse':
                    that.moveEvent(e);
                    break;
                case 'touch':
                    console.log('touch pointer move');
                    break;
            }
        }, false)
        this.canvas.addEventListener('pointerup', (e) => {
            switch (e.pointerType) {
                case 'pen':
                case 'mouse':
                    that.upEvent(e);
                    break;
                case 'touch':
                    console.log('touch pointer up');
                    break;
            }
        }, false)
    }

    /**
     * append dom in the container 
     * @param {*} dom : target dom
     */
    appendDom(dom) {
        this.container.insertBefore(dom, this.canvas);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.tracePoints = [];
    }

    getCanvasRect(canvas) {
        let cx = canvas.offsetLeft;
        let cy = canvas.offsetTop;
        // let parent = this.canvas;
        console.log('offset parent: ', canvas.offsetParent);
        while (canvas.offsetParent != null) {
            canvas = canvas.offsetParent;
            cx += canvas.offsetLeft;
            cy += canvas.offsetTop;
        }
        return { x: cx, y: cy, width: this.width, height: this.height };
    }
    drawConnectedPoint(from, to) {
        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    downEvent(e) {
        let x = e.clientX,
            y = e.clientY;
        this.isDown = true;
        x -= this.canvasRect.x - window.scrollX;
        y -= this.canvasRect.y - window.scrollY;

        this.tracePointsOneStroke = [new Point(x, y)];
        this.ctx.fillRect(x - 4, y - 3, 9, 9);
        if (!this.recordingPath) {
            this.recordingPath = true;
        } else {
            clearInterval(this.pathInterval);
        }
    }

    moveEvent(e) {
        let x = e.clientX,
            y = e.clientY;
        if (this.isDown) {
            x -= this.canvasRect.x - window.scrollX;
            y -= this.canvasRect.y - window.scrollY;
            this.tracePointsOneStroke.push(new Point(x, y)); // append
            this.drawConnectedPoint(this.tracePointsOneStroke[this.tracePointsOneStroke.length - 2], this.tracePointsOneStroke[this.tracePointsOneStroke.length - 1]);
        }
    }

    upEvent(e) {
        if (this.isDown) {
            this.isDown = false;
            this.tracePoints.push(this.tracePointsOneStroke);
            if (this.recordingPath) {
                let tmpTime = this.timeDelimiter;
                const that = this;
                this.pathInterval = setInterval(() => {
                    tmpTime -= 100;
                    if (tmpTime === 0) {
                        that.recordingPath = false;
                        clearInterval(that.pathInterval);
                        that.recognizePath();
                        if (that.recognizeResult.score == 0) {
                            new Promise(function(resolve, reject) {
                                // that.recognizeHw();
                                // resolve();
                                that.hwRecognizer.recognize(that.tracePoints, (result) => {
                                    console.log('hw result: ', result);
                                    that.recognizeResult = { score: 1, name: result[0] };
                                    resolve();
                                });
                            }).then(() => {
                                console.log(that.recognizeResult);
                                alert(that.recognizeResult.score + ' ' + that.recognizeResult.name);
                                that.clearCanvas();
                            });
                        } else {
                            alert(that.recognizeResult.score + ' ' + that.recognizeResult.name);
                            that.clearCanvas();
                        }


                    }
                }, 100)
            }
        }
    }
    recognizePath() {
        let allPoints = [];
        this.tracePoints.forEach(strokePoints => {
            allPoints = [...allPoints, ...strokePoints];
        })
        let result = this.pathRecognizer.recognize(allPoints, true);
        // alert("Result: " + result.Name + " (" + this.round(result.Score, 2) + ") in " + result.Time + " ms.");
        console.log('fuck: ', result.Score);
        // if (result.Score == 0) {
        //     console.log('need to rec hw');
        //     this.recognizeHw();
        // } else {
        //     console.log('final result: ', result.Name, this.round(result.Score, 2));
        this.recognizeResult = { score: this.round(result.Score, 2), name: result.Name };
        // }

        // document.getElementById('resultSpan').innerHTML = "Result: " + result.Name + " (" + tool.round(result.Score, 2) + ") in " + result.Time + " ms.";
    }

    recognizeHw() {
        const that = this;
        this.hwRecognizer.recognize(this.tracePoints, (result) => {
            console.log('hw result: ', result);
            that.recognizeResult = { score: 1, name: result[0] };
            // alert(result);
        });

    }

    round(n, d) {
        d = Math.pow(10, d);
        return Math.round(n * d) / d;
    }
}