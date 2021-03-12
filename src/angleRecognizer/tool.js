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
            x += points[i].x;
            y += points[i].y;
        }
        x /= points.length;
        y /= points.length;
        return new Point(x, y);
    }
    distanceTo(p1, p2) {
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
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
            minX = Math.min(minX, points[i].x);
            minY = Math.min(minY, points[i].y);
            maxX = Math.max(maxX, points[i].x);
            maxY = Math.max(maxY, points[i].y);
        }
        return new Rectangle(minX, minY, maxX - minX, maxY - minY);
    }
    rotateBy(points, radians) {
        let c = this.centroid(points);
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let newpoints = new Array();
        for (let i = 0; i < points.length; i++) {
            let qx = (points[i].x - c.x) * cos - (points[i].y - c.y) * sin + c.x
            let qy = (points[i].x - c.x) * sin + (points[i].y - c.y) * cos + c.y;
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    scaleTo(points, size) {
        let B = this.boundingBox(points);
        let newpoints = new Array();
        for (let i = 0; i < points.length; i++) {
            let qx = points[i].x * (size / B.Width);
            let qy = points[i].y * (size / B.Height);
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    translateTo(points, pt) {
        let c = this.centroid(points);
        let newpoints = new Array();
        for (let i = 0; i < points.length; i++) {
            let qx = points[i].x + pt.x - c.x;
            let qy = points[i].y + pt.y - c.y;
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    vectorize(points) {
        let sum = 0.0;
        let vector = new Array();
        for (let i = 0; i < points.length; i++) {
            vector[vector.length] = points[i].x;
            vector[vector.length] = points[i].y;
            sum += points[i].x * points[i].x + points[i].y * points[i].y;
        }
        let magnitude = Math.sqrt(sum);
        for (let i = 0; i < vector.length; i++)
            vector[i] /= magnitude;
        return vector;
    }
}

export const tool = new Tool();