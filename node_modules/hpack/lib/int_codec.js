module.exports.encode = function (input, n) {
    var output = [];
    var x = (1 << n) - 1;
    if (input < x) {
        output.push(input);
    } else {
        output.push(x);
        input = input - x;
        while (input >= 128) {
            output.push(input % 128 + 128);
            input = input >> 7;
        }
        output.push(input);
    }
    return new Buffer(output);
};
module.exports.decode = function (input, offset, n) {
    var i, j = 0, m = 0;
    i = input[offset + 0] & ((1 << n) - 1);
    if (i === (1 << n) - 1) {
        do {
            ++j;
            i += (input[offset + j] & 0x7F) * (1 << m);
            m += 7;
        } while (input[offset + j] & 0x80);
    }
    return {
        'value': i,
        'len': j + 1
    };
};
