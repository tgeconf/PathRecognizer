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
}

export const tool = new Tool();
// export const printMe = () => {
//     console.log('Updating printsdsasdadsa');
// }

// export const getCanvasRect = (canvas) => {
//     console.log('fuck')
//         // var w = canvas.width;
//         // var h = canvas.height;

//     // var cx = canvas.offsetLeft;
//     // var cy = canvas.offsetTop;
//     // while (canvas.offsetParent != null) {
//     //     canvas = canvas.offsetParent;
//     //     cx += canvas.offsetLeft;
//     //     cy += canvas.offsetTop;
//     // }
//     // return { x: cx, y: cy, width: w, height: h };
// }

// function getScrollX() {
//     var scrollX = $(window).scrollLeft();
//     return scrollX;
// }

// function getScrollY() {
//     var scrollY = $(window).scrollTop();
//     return scrollY;
// }