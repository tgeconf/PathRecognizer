import Point from './point';
import { tool } from './tool';

export default class UniStroke {
    constructor(name, points) {
        this.NumPoints = 64;
        // this.origin = new Point(0, 0);
        this.Name = name;
        // this.points = points;
        this.points = this.resample(points, this.NumPoints);
        this.cosFeature = this.calCosFeature();
        // let radians = this.indicativeAngle(this.points);
        // let squareSize = tool.SquareSize;
        // this.points = tool.rotateBy(this.points, -radians);
        // this.points = tool.scaleTo(this.points, squareSize);
        // this.points = tool.translateTo(this.points, this.origin);
        // this.Vector = tool.vectorize(this.points); // for Protractor
    }

    resample(points, n) {
        let I = tool.pathLength(points) / (n - 1); // interval length
        let D = 0.0;
        let newpoints = new Array(points[0]);
        for (let i = 1; i < points.length; i++) {
            let d = tool.distanceTo(points[i - 1], points[i]);
            if ((D + d) >= I) {
                let qx = points[i - 1].x + ((I - D) / d) * (points[i].x - points[i - 1].x);
                let qy = points[i - 1].y + ((I - D) / d) * (points[i].y - points[i - 1].y);
                let q = new Point(qx, qy);
                newpoints.push(q); // append new point 'q'
                points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
                D = 0.0;
            } else {
                D += d;
            }
        }
        if (newpoints.length == n - 1) // somtimes we fall a rounding-error short of adding the last point, so add it if so
            newpoints.push(new Point(points[points.length - 1].x, points[points.length - 1].y));
        return newpoints;
    }

    calCosFeature() {
        // console.log('input points: ', this.points.length, this.points);
        const resultVec = [];
        for (let i = 1, len = this.points.length; i < len - 1; i++) {
            const vec1x = this.points[i - 1].x - this.points[i].x;
            const vec1y = this.points[i - 1].y - this.points[i].y;
            const vec2x = this.points[i + 1].x - this.points[i].x;
            const vec2y = this.points[i + 1].y - this.points[i].y;
            const cos = (vec1x * vec2x + vec1y * vec2y) / (tool.distanceTo(this.points[i - 1], this.points[i]) * tool.distanceTo(this.points[i + 1], this.points[i]));
            // console.log(i, 'cos: ', cos, tool.distanceTo(this.points[i - 1], this.points[i]), tool.distanceTo(this.points[i + 1], this.points[i]));
            resultVec.push(cos);
        }
        return resultVec;
    }
}