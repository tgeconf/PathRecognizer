import ArrayUtils from './tools/arrayUtil';
import ColorUtils from './tools/colorUtil';
import ObjUtils from './tools/objUtil';
import MathUtils from './tools/MathUtil';

export class GeTool {
    constructor() {
        this.arrayUtil = new ArrayUtils();
        this.colorUtil = new ColorUtils();
        this.objUtil = new ObjUtils();
        this.mathUtil = new MathUtils();
    }

    test() {
        console.log('this is a test! ');
    }
}

export const geTool = new GeTool();
// export { ArrayUtils, TimingSpec, ChartSpec, Animation }