class FormUtils {
    static decimalInput(input, convertedInput, convertMethod) {
        let decimalNumber;
        if (convertMethod === "hexaToDec") {
            decimalNumber = convertedInput;
        } else if (convertMethod === "decToHexa") {
            decimalNumber = input;
        } else {
            throw new Error("Unsupported convertion method: " + convertMethod);
        }
        return decimalNumber;
    }
}



module.exports = FormUtils;