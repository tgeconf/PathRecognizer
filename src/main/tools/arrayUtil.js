export default class ArrayPrcs {
    constructor() { }

    /**
     * judge if two arrays are equal
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @return {Boolean}
     */
    isEqual(arr1, arr2) {
        if (arr1 === arr2) {
            return true;
        }
        if (arr1.length != arr2.length) {
            return false;
        }
        for (let i = 0, len = arr1.length; i < len; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * shuffle
     * @param arr {Array}
     * @return {Array}
     */
    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    /**
     * generate a series of numbers without repetition
     * @param {number} count 
     * @retrun {Array}
     */
    randSeries(count) {
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr[i] = i;
        }
        return this.shuffle(arr);
    }

    /**
     * remove repetition in the array
     * @param {Array} arr 
     * @return {Array}
     */
    removeRept(arr){
        return [...new Set(arr)];
    }
}
