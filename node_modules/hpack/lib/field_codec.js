var IntCodec = require('./int_codec');
var StrCodec = require('./str_codec');

var createIndexedHeaderField = function (index) {
    var output = IntCodec.encode(index, 7);
    output[0] |= 0x80;
    return output;
};

var createLiteralHeaderField = function () {
    var output;
    if (typeof arguments[0] === 'number') {
        output = Buffer.concat([
                    IntCodec.encode(arguments[0], 6),
                    StrCodec.encode(arguments[1], arguments[3])]);
        output[0] |= 0x40;
    } else {
        output = Buffer.concat([
                    IntCodec.encode(0, 6),
                    StrCodec.encode(arguments[0], arguments[3]),
                    StrCodec.encode(arguments[1], arguments[3])]);
        output[0] |= 0x40;
    }
    return output;
};

module.exports.encode = function () {
    if (arguments.length === 1) {
        return createIndexedHeaderField.apply(this, arguments);
    } else if (arguments.length === 4) {
        return createLiteralHeaderField.apply(this, arguments);
    } else {
        return null;
    }
};

module.exports.decode = function (input, pos) {
    var result, output = {};
    if (input[pos] & 0x80) {
        output.type = 0;
        result = IntCodec.decode(input, pos, 7);
        output.index = result.value;
        output.len = result.len;
    } else {
        if (input[pos] & 0x40) {
            output.type = 1;
            result = IntCodec.decode(input, pos, 6);
        } else {
            if (input[pos] & 0x10) {
                output.type = 2;
            } else {
                output.type = 3;
            }
            result = IntCodec.decode(input, pos, 4);
        }
        pos += result.len;
        output.index = result.value;
        output.len = result.len;
        if (output.index === 0) {
            result = StrCodec.decode(input, pos);
            pos += result.len;
            output.name = result.value;
            output.len += result.len;
        }
        result = StrCodec.decode(input, pos);
        pos += result.len;
        output.value = result.value;
        output.len += result.len;
    }
    return output;
};
