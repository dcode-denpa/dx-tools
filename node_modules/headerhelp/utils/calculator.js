/**
 * Compute the maximum length of string between all string in a string array
 * @param {string[]} split
 * @returns {number}
 */
function maximumLength(array) {
    var output = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].length > output)
            output = array[i].length;
    }
    return output;
}
/**
 * Adds a certain number of spaces between each letter of the string given
 * @param {string} str
 * @param {number} number
 * @returns {string}
 */
function addSpace(str, number) {
    var space = "";
    for (var i = 0; i < number; i++) {
        space += " ";
    }
    return str.split('').join(space);
}

module.exports = { maximumLength, addSpace }
