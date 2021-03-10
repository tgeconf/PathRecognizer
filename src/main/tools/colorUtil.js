export default class ColorUtils {
    constructor() { }

    /**
     * hex to rgb
     * @param hex {String}
     * @return {Array}
     */
    hexToRgb(hex) {
        let color = [], rgb = [];
        hex = hex.replace(/#/, "");
        if (hex.length == 3) {
            let tmp = [];
            for (let i = 0; i < 3; i++) {
                tmp.push(hex.charAt(i) + hex.charAt(i));
            }
            hex = tmp.join("");
        }

        for (let i = 0; i < 3; i++) {
            color[i] = "0x" + hex.substr(i * 2, 2);
            rgb.push(parseInt(Number(color[i])));
        }
        return rgb;
    }

    /**
     * rgb to hex
     * @param rgb {String} // rgb(r, g, b)
     * @return {String}
     */
    rgbToHex(rgb) {
        let color = rgb.toString().match(/\d+/g);
        let hex = "#";

        for (let i = 0; i < 3; i++) {
            hex += ("0" + Number(color[i]).toString(16)).slice(-2);
        }
        return hex;
    }

}
