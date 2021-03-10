import Point from './point'
import Rectangle from './rect';

export default class Tool {
    constructor() {
        this.SquareSize = 250.0;
    }
    centroid(points) {
        let x = 0.0,
            y = 0.0;
        for (let i = 0; i < points.length; i++) {
            x += points[i].X;
            y += points[i].Y;
        }
        x /= points.length;
        y /= points.length;
        return new Point(x, y);
    }
    distanceTo(p1, p2) {
        let dx = p2.X - p1.X;
        let dy = p2.Y - p1.Y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    pathLength(points) {
        let d = 0.0;
        for (let i = 1; i < points.length; i++)
            d += this.distanceTo(points[i - 1], points[i]);
        return d;
    }
    boundingBox(points) {
        let minX = +Infinity,
            maxX = -Infinity,
            minY = +Infinity,
            maxY = -Infinity;
        for (let i = 0; i < points.length; i++) {
            minX = Math.min(minX, points[i].X);
            minY = Math.min(minY, points[i].Y);
            maxX = Math.max(maxX, points[i].X);
            maxY = Math.max(maxY, points[i].Y);
        }
        return new Rectangle(minX, minY, maxX - minX, maxY - minY);
    }
    rotateBy(points, radians) {
        let c = this.centroid(points);
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let newpoints = new Array();
        for (let i = 0; i < points.length; i++) {
            let qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X
            let qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    scaleTo(points, size) {
        let B = this.boundingBox(points);
        let newpoints = new Array();
        for (let i = 0; i < points.length; i++) {
            let qx = points[i].X * (size / B.Width);
            let qy = points[i].Y * (size / B.Height);
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    translateTo(points, pt) {
        let c = this.centroid(points);
        let newpoints = new Array();
        for (let i = 0; i < points.length; i++) {
            let qx = points[i].X + pt.X - c.X;
            let qy = points[i].Y + pt.Y - c.Y;
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    vectorize(points) {
        let sum = 0.0;
        let vector = new Array();
        for (let i = 0; i < points.length; i++) {
            vector[vector.length] = points[i].X;
            vector[vector.length] = points[i].Y;
            sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
        }
        let magnitude = Math.sqrt(sum);
        for (let i = 0; i < vector.length; i++)
            vector[i] /= magnitude;
        return vector;
    }
}

export const tool = new Tool();