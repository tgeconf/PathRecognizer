export default class MathUtils {
    constructor() { }

    /**
     * generate random number in a certain range
     * @param min {Number}
     * @param max {Number}
     * @return {Number}
     */
    randNum(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }

    /**
     * calculate euclidean distance
     * @param vec1 {Array}
     * @param vec2 {Array}
     * @return {Number}
     */
    calEucDis(vec1, vec2) {
        //judge length
        if (vec1.length !== vec2.length) {
            throw new Error("vector length mis-match!");
        }
        let sum = 0;
        for (let i = 0, len = vec1.length; i < len; i++) {
            sum += (vec1[i] - vec2[i]) * (vec1[i] - vec2[i]);
        }
        return Math.sqrt(sum);
    }

}
