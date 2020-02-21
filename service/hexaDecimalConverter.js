var converterLib = require('hex2dec');
class HexaDecimalConverter {

    static convert(input, convertMethod) {
        let convertResult;
        if (convertMethod === "hexaToDec") {
            convertResult = converterLib.hexToDec(input)
        } else if (convertMethod === "decToHexa") {
            convertResult = converterLib.decToHex(input);
        }
        return convertResult;
    }
}

module.exports = HexaDecimalConverter