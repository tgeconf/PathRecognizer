export default class Tool {
    getCanvasRect(canvas) {
        const w = canvas.width;
        const h = canvas.height;

        let cx = canvas.offsetLeft;
        let cy = canvas.offsetTop;
        while (canvas.offsetParent != null) {
            canvas = canvas.offsetParent;
            cx += canvas.offsetLeft;
            cy += canvas.offsetTop;
        }
        return { x: cx, y: cy, width: w, height: h };
    }

    getScrollX() {
        return window.scrollX;
    }

    getScrollY() {
        return window.scrollY;
    }

    drawConnectedPoint(ctx, from, to) {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.closePath();
        ctx.stroke();
    }

    round(n, d) {
        d = Math.pow(10, d);
        return Math.round(n * d) / d;
    }
}

export const tool = new Tool();