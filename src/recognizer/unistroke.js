import Point from './point';
import { tool } from './tool';

export default class UniStroke {
    constructor(name, points) {
        this.NumPoints = 64;
        this.origin = new Point(0, 0);
        this.Name = name;
        this.points = this.resample(points, this.NumPoints);
        let radians = this.indicativeAngle(this.points);
        let squareSize = tool.SquareSize;
        this.points = tool.rotateBy(this.points, -radians);
        this.points = tool.scaleTo(this.points, squareSize);
        this.points = tool.translateTo(this.points, this.origin);
        this.Vector = tool.vectorize(this.points); // for Protractor
    }

    resample(points, n) {
        let I = tool.pathLength(points) / (n - 1); // interval length
        let D = 0.0;
        let newpoints = new Array(points[0]);
        for (let i = 1; i < points.length; i++) {
            let d = tool.distanceTo(points[i - 1], points[i]);
            if ((D + d) >= I) {
                let qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
                let qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
                let q = new Point(qx, qy);
                newpoints[newpoints.length] = q; // append new point 'q'
                points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
                D = 0.0;
            } else {
                D += d;
            }
        }
        if (newpoints.length == n - 1) // somtimes we fall a rounding-error short of adding the last point, so add it if so
            newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y);
        return newpoints;
    }

    indicativeAngle(points) {
        let c = tool.centroid(points);
        return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
    }
}