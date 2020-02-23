class FormUtils {
    static decimalInput(input, convertedInput, convertMethod) {
        let decimalNumber;
        if (convertMethod === "hexaToDec") {
            decimalNumber = convertedInput;
        } else if (convertMethod === "decToHexa") {
            decimalNumber = input;
        }
        return decimalNumber;
    }
}



module.exports = FormUtils;