var converterLib = require('hex2dec');
class HexaDecimalConverter {

    static convert(input, convertMethod) {
        let convertResult;
        if (convertMethod === "hexaToDec") {
            console.log(input)
            convertResult = converterLib.hexToDec(input)
        } else if (convertMethod === "decToHexa") {
            convertResult = converterLib.decToHex(input);
        }
        return convertResult;
    }
}

module.exports = HexaDecimalConverter