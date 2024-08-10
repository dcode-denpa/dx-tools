var assert = require("assert")
var IntCodec = require('../lib/int_codec');

describe('IntCodec:', function () {
    describe('encode', function () {
        it('should encode value 10 to 0x0A', function () {
            assert.deepEqual(IntCodec.encode(10, 5), new Buffer([0x0A]));
        });
        it('should encode value 1337 to 0x1F9A0A', function () {
            assert.deepEqual(IntCodec.encode(1337, 5), new Buffer([0x1F, 0x9A, 0x0A]));
        });
        it('should encode value 42 to 0x2A', function () {
            assert.deepEqual(IntCodec.encode(42, 8), new Buffer([0x2A]));
        });
    });
});
