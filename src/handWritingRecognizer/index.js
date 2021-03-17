export default class HWRecognizer {
    constructor(cWdith, cHeight) {
        // this.canvas = canvas;
        // this.cxt = canvas.getContext("2d");
        // this.cxt.lineCap = "round";
        // this.cxt.lineJoin = "round";
        this.lineWidth = 2;
        this.width = cWdith;
        this.height = cHeight;
        // this.drawing = false;
        this.handwritingX = [];
        this.handwritingY = [];
        this.trace = [];
        this.options = {};

        // canvas.addEventListener("mousedown", this.mouseDown.bind(this));
        // canvas.addEventListener("mousemove", this.mouseMove.bind(this));
        // canvas.addEventListener("mouseup", this.mouseUp.bind(this));
        // canvas.addEventListener("touchstart", this.touchStart.bind(this));
        // canvas.addEventListener("touchmove", this.touchMove.bind(this));
        // canvas.addEventListener("touchend", this.touchEnd.bind(this));
        this.callback = undefined;
        // this.recognize = handwriting.recognize;
    }

    generateTrace(coords) {
        const that = this;
        this.trace = [];
        coords.forEach(stroke => {
            that.handwritingX = [];
            that.handwritingY = [];
            stroke.forEach(point => {
                that.handwritingX.push(point.x);
                that.handwritingY.push(point.y);
            })
            const w = [];
            w.push(that.handwritingX);
            w.push(that.handwritingY);
            w.push([]);
            that.trace.push(w);
        })
    }

    recognize(coords, callback) {
        this.generateTrace(coords);
        const that = this;
        const data = JSON.stringify({
            "options": "enable_pre_space",
            "requests": [{
                "writing_guide": {
                    "writing_area_width": that.width || undefined,
                    "writing_area_height": that.width || undefined
                },
                "ink": that.trace,
                "language": that.options.language || "en"
            }]
        });
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                switch (this.status) {
                    case 200:
                        const response = JSON.parse(this.responseText);
                        let results;
                        if (response.length === 1) callback(undefined, new Error(response[0]));
                        else results = response[1][0][1];
                        // if (!!options.numOfWords) {
                        //     results = results.filter(function(result) {
                        //         return (result.length == options.numOfWords);
                        //     });
                        // }
                        // if (!!options.numOfReturn) {
                        //     results = results.slice(0, options.numOfReturn);
                        // }
                        callback(results, undefined);
                        break;
                    case 403:
                        callback(undefined, new Error("access denied"));
                        break;
                    case 503:
                        callback(undefined, new Error("can't connect to recognition server"));
                        break;
                }


            }
        });
        xhr.open("POST", "https://www.google.com.tw/inputtools/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }
}

// export const hwRecognizer = new HWRecognizer();