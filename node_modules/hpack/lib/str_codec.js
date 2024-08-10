var IntCodec = require('./int_codec');
var HuffmanCodec = require('./huffman_codec');

module.exports.encode = function (input, huffman) {
    var data, length;
    if (huffman) {
        data = HuffmanCodec.encode(input);
        length = IntCodec.encode(data.length, 7);
        length[0] |= 0x80;
    } else {
        data = new Buffer(input, 'ascii');
        length = IntCodec.encode(data.length, 7);
    }
    return Buffer.concat([length, data], length.length + data.length);
};

module.exports.decode = function (input, offset) {
    var result = IntCodec.decode(input, offset, 7);
    var str;
    if (input[offset] & 0x80) {
        str = HuffmanCodec.decode(input, offset + result.len, result.value);
    } else {
        str = input.toString('ascii', offset + result.len, offset + result.len + result.value);
    }
    return {
        'value': str,
        'len': result.len + result.value
    };
};
