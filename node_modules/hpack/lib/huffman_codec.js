var table = [
    { 'value': 0x1ff8     , 'len': 13 },
    { 'value': 0x7fffd8   , 'len': 23 },
    { 'value': 0xfffffe2  , 'len': 28 },
    { 'value': 0xfffffe3  , 'len': 28 },
    { 'value': 0xfffffe4  , 'len': 28 },
    { 'value': 0xfffffe5  , 'len': 28 },
    { 'value': 0xfffffe6  , 'len': 28 },
    { 'value': 0xfffffe7  , 'len': 28 },
    { 'value': 0xfffffe8  , 'len': 28 },
    { 'value': 0xffffea   , 'len': 24 },
    { 'value': 0x3ffffffc , 'len': 30 },
    { 'value': 0xfffffe9  , 'len': 28 },
    { 'value': 0xfffffea  , 'len': 28 },
    { 'value': 0x3ffffffd , 'len': 30 },
    { 'value': 0xfffffeb  , 'len': 28 },
    { 'value': 0xfffffec  , 'len': 28 },
    { 'value': 0xfffffed  , 'len': 28 },
    { 'value': 0xfffffee  , 'len': 28 },
    { 'value': 0xfffffef  , 'len': 28 },
    { 'value': 0xffffff0  , 'len': 28 },
    { 'value': 0xffffff1  , 'len': 28 },
    { 'value': 0xffffff2  , 'len': 28 },
    { 'value': 0x3ffffffe , 'len': 30 },
    { 'value': 0xffffff3  , 'len': 28 },
    { 'value': 0xffffff4  , 'len': 28 },
    { 'value': 0xffffff5  , 'len': 28 },
    { 'value': 0xffffff6  , 'len': 28 },
    { 'value': 0xffffff7  , 'len': 28 },
    { 'value': 0xffffff8  , 'len': 28 },
    { 'value': 0xffffff9  , 'len': 28 },
    { 'value': 0xffffffa  , 'len': 28 },
    { 'value': 0xffffffb  , 'len': 28 },
    { 'value': 0x14       , 'len':  6 },
    { 'value': 0x3f8      , 'len': 10 },
    { 'value': 0x3f9      , 'len': 10 },
    { 'value': 0xffa      , 'len': 12 },
    { 'value': 0x1ff9     , 'len': 13 },
    { 'value': 0x15       , 'len':  6 },
    { 'value': 0xf8       , 'len':  8 },
    { 'value': 0x7fa      , 'len': 11 },
    { 'value': 0x3fa      , 'len': 10 },
    { 'value': 0x3fb      , 'len': 10 },
    { 'value': 0xf9       , 'len':  8 },
    { 'value': 0x7fb      , 'len': 11 },
    { 'value': 0xfa       , 'len':  8 },
    { 'value': 0x16       , 'len':  6 },
    { 'value': 0x17       , 'len':  6 },
    { 'value': 0x18       , 'len':  6 },
    { 'value': 0x0        , 'len':  5 },
    { 'value': 0x1        , 'len':  5 },
    { 'value': 0x2        , 'len':  5 },
    { 'value': 0x19       , 'len':  6 },
    { 'value': 0x1a       , 'len':  6 },
    { 'value': 0x1b       , 'len':  6 },
    { 'value': 0x1c       , 'len':  6 },
    { 'value': 0x1d       , 'len':  6 },
    { 'value': 0x1e       , 'len':  6 },
    { 'value': 0x1f       , 'len':  6 },
    { 'value': 0x5c       , 'len':  7 },
    { 'value': 0xfb       , 'len':  8 },
    { 'value': 0x7ffc     , 'len': 15 },
    { 'value': 0x20       , 'len':  6 },
    { 'value': 0xffb      , 'len': 12 },
    { 'value': 0x3fc      , 'len': 10 },
    { 'value': 0x1ffa     , 'len': 13 },
    { 'value': 0x21       , 'len':  6 },
    { 'value': 0x5d       , 'len':  7 },
    { 'value': 0x5e       , 'len':  7 },
    { 'value': 0x5f       , 'len':  7 },
    { 'value': 0x60       , 'len':  7 },
    { 'value': 0x61       , 'len':  7 },
    { 'value': 0x62       , 'len':  7 },
    { 'value': 0x63       , 'len':  7 },
    { 'value': 0x64       , 'len':  7 },
    { 'value': 0x65       , 'len':  7 },
    { 'value': 0x66       , 'len':  7 },
    { 'value': 0x67       , 'len':  7 },
    { 'value': 0x68       , 'len':  7 },
    { 'value': 0x69       , 'len':  7 },
    { 'value': 0x6a       , 'len':  7 },
    { 'value': 0x6b       , 'len':  7 },
    { 'value': 0x6c       , 'len':  7 },
    { 'value': 0x6d       , 'len':  7 },
    { 'value': 0x6e       , 'len':  7 },
    { 'value': 0x6f       , 'len':  7 },
    { 'value': 0x70       , 'len':  7 },
    { 'value': 0x71       , 'len':  7 },
    { 'value': 0x72       , 'len':  7 },
    { 'value': 0xfc       , 'len':  8 },
    { 'value': 0x73       , 'len':  7 },
    { 'value': 0xfd       , 'len':  8 },
    { 'value': 0x1ffb     , 'len': 13 },
    { 'value': 0x7fff0    , 'len': 19 },
    { 'value': 0x1ffc     , 'len': 13 },
    { 'value': 0x3ffc     , 'len': 14 },
    { 'value': 0x22       , 'len':  6 },
    { 'value': 0x7ffd     , 'len': 15 },
    { 'value': 0x3        , 'len':  5 },
    { 'value': 0x23       , 'len':  6 },
    { 'value': 0x4        , 'len':  5 },
    { 'value': 0x24       , 'len':  6 },
    { 'value': 0x5        , 'len':  5 },
    { 'value': 0x25       , 'len':  6 },
    { 'value': 0x26       , 'len':  6 },
    { 'value': 0x27       , 'len':  6 },
    { 'value': 0x6        , 'len':  5 },
    { 'value': 0x74       , 'len':  7 },
    { 'value': 0x75       , 'len':  7 },
    { 'value': 0x28       , 'len':  6 },
    { 'value': 0x29       , 'len':  6 },
    { 'value': 0x2a       , 'len':  6 },
    { 'value': 0x7        , 'len':  5 },
    { 'value': 0x2b       , 'len':  6 },
    { 'value': 0x76       , 'len':  7 },
    { 'value': 0x2c       , 'len':  6 },
    { 'value': 0x8        , 'len':  5 },
    { 'value': 0x9        , 'len':  5 },
    { 'value': 0x2d       , 'len':  6 },
    { 'value': 0x77       , 'len':  7 },
    { 'value': 0x78       , 'len':  7 },
    { 'value': 0x79       , 'len':  7 },
    { 'value': 0x7a       , 'len':  7 },
    { 'value': 0x7b       , 'len':  7 },
    { 'value': 0x7ffe     , 'len': 15 },
    { 'value': 0x7fc      , 'len': 11 },
    { 'value': 0x3ffd     , 'len': 14 },
    { 'value': 0x1ffd     , 'len': 13 },
    { 'value': 0xffffffc  , 'len': 28 },
    { 'value': 0xfffe6    , 'len': 20 },
    { 'value': 0x3fffd2   , 'len': 22 },
    { 'value': 0xfffe7    , 'len': 20 },
    { 'value': 0xfffe8    , 'len': 20 },
    { 'value': 0x3fffd3   , 'len': 22 },
    { 'value': 0x3fffd4   , 'len': 22 },
    { 'value': 0x3fffd5   , 'len': 22 },
    { 'value': 0x7fffd9   , 'len': 23 },
    { 'value': 0x3fffd6   , 'len': 22 },
    { 'value': 0x7fffda   , 'len': 23 },
    { 'value': 0x7fffdb   , 'len': 23 },
    { 'value': 0x7fffdc   , 'len': 23 },
    { 'value': 0x7fffdd   , 'len': 23 },
    { 'value': 0x7fffde   , 'len': 23 },
    { 'value': 0xffffeb   , 'len': 24 },
    { 'value': 0x7fffdf   , 'len': 23 },
    { 'value': 0xffffec   , 'len': 24 },
    { 'value': 0xffffed   , 'len': 24 },
    { 'value': 0x3fffd7   , 'len': 22 },
    { 'value': 0x7fffe0   , 'len': 23 },
    { 'value': 0xffffee   , 'len': 24 },
    { 'value': 0x7fffe1   , 'len': 23 },
    { 'value': 0x7fffe2   , 'len': 23 },
    { 'value': 0x7fffe3   , 'len': 23 },
    { 'value': 0x7fffe4   , 'len': 23 },
    { 'value': 0x1fffdc   , 'len': 21 },
    { 'value': 0x3fffd8   , 'len': 22 },
    { 'value': 0x7fffe5   , 'len': 23 },
    { 'value': 0x3fffd9   , 'len': 22 },
    { 'value': 0x7fffe6   , 'len': 23 },
    { 'value': 0x7fffe7   , 'len': 23 },
    { 'value': 0xffffef   , 'len': 24 },
    { 'value': 0x3fffda   , 'len': 22 },
    { 'value': 0x1fffdd   , 'len': 21 },
    { 'value': 0xfffe9    , 'len': 20 },
    { 'value': 0x3fffdb   , 'len': 22 },
    { 'value': 0x3fffdc   , 'len': 22 },
    { 'value': 0x7fffe8   , 'len': 23 },
    { 'value': 0x7fffe9   , 'len': 23 },
    { 'value': 0x1fffde   , 'len': 21 },
    { 'value': 0x7fffea   , 'len': 23 },
    { 'value': 0x3fffdd   , 'len': 22 },
    { 'value': 0x3fffde   , 'len': 22 },
    { 'value': 0xfffff0   , 'len': 24 },
    { 'value': 0x1fffdf   , 'len': 21 },
    { 'value': 0x3fffdf   , 'len': 22 },
    { 'value': 0x7fffeb   , 'len': 23 },
    { 'value': 0x7fffec   , 'len': 23 },
    { 'value': 0x1fffe0   , 'len': 21 },
    { 'value': 0x1fffe1   , 'len': 21 },
    { 'value': 0x3fffe0   , 'len': 22 },
    { 'value': 0x1fffe2   , 'len': 21 },
    { 'value': 0x7fffed   , 'len': 23 },
    { 'value': 0x3fffe1   , 'len': 22 },
    { 'value': 0x7fffee   , 'len': 23 },
    { 'value': 0x7fffef   , 'len': 23 },
    { 'value': 0xfffea    , 'len': 20 },
    { 'value': 0x3fffe2   , 'len': 22 },
    { 'value': 0x3fffe3   , 'len': 22 },
    { 'value': 0x3fffe4   , 'len': 22 },
    { 'value': 0x7ffff0   , 'len': 23 },
    { 'value': 0x3fffe5   , 'len': 22 },
    { 'value': 0x3fffe6   , 'len': 22 },
    { 'value': 0x7ffff1   , 'len': 23 },
    { 'value': 0x3ffffe0  , 'len': 26 },
    { 'value': 0x3ffffe1  , 'len': 26 },
    { 'value': 0xfffeb    , 'len': 20 },
    { 'value': 0x7fff1    , 'len': 19 },
    { 'value': 0x3fffe7   , 'len': 22 },
    { 'value': 0x7ffff2   , 'len': 23 },
    { 'value': 0x3fffe8   , 'len': 22 },
    { 'value': 0x1ffffec  , 'len': 25 },
    { 'value': 0x3ffffe2  , 'len': 26 },
    { 'value': 0x3ffffe3  , 'len': 26 },
    { 'value': 0x3ffffe4  , 'len': 26 },
    { 'value': 0x7ffffde  , 'len': 27 },
    { 'value': 0x7ffffdf  , 'len': 27 },
    { 'value': 0x3ffffe5  , 'len': 26 },
    { 'value': 0xfffff1   , 'len': 24 },
    { 'value': 0x1ffffed  , 'len': 25 },
    { 'value': 0x7fff2    , 'len': 19 },
    { 'value': 0x1fffe3   , 'len': 21 },
    { 'value': 0x3ffffe6  , 'len': 26 },
    { 'value': 0x7ffffe0  , 'len': 27 },
    { 'value': 0x7ffffe1  , 'len': 27 },
    { 'value': 0x3ffffe7  , 'len': 26 },
    { 'value': 0x7ffffe2  , 'len': 27 },
    { 'value': 0xfffff2   , 'len': 24 },
    { 'value': 0x1fffe4   , 'len': 21 },
    { 'value': 0x1fffe5   , 'len': 21 },
    { 'value': 0x3ffffe8  , 'len': 26 },
    { 'value': 0x3ffffe9  , 'len': 26 },
    { 'value': 0xffffffd  , 'len': 28 },
    { 'value': 0x7ffffe3  , 'len': 27 },
    { 'value': 0x7ffffe4  , 'len': 27 },
    { 'value': 0x7ffffe5  , 'len': 27 },
    { 'value': 0xfffec    , 'len': 20 },
    { 'value': 0xfffff3   , 'len': 24 },
    { 'value': 0xfffed    , 'len': 20 },
    { 'value': 0x1fffe6   , 'len': 21 },
    { 'value': 0x3fffe9   , 'len': 22 },
    { 'value': 0x1fffe7   , 'len': 21 },
    { 'value': 0x1fffe8   , 'len': 21 },
    { 'value': 0x7ffff3   , 'len': 23 },
    { 'value': 0x3fffea   , 'len': 22 },
    { 'value': 0x3fffeb   , 'len': 22 },
    { 'value': 0x1ffffee  , 'len': 25 },
    { 'value': 0x1ffffef  , 'len': 25 },
    { 'value': 0xfffff4   , 'len': 24 },
    { 'value': 0xfffff5   , 'len': 24 },
    { 'value': 0x3ffffea  , 'len': 26 },
    { 'value': 0x7ffff4   , 'len': 23 },
    { 'value': 0x3ffffeb  , 'len': 26 },
    { 'value': 0x7ffffe6  , 'len': 27 },
    { 'value': 0x3ffffec  , 'len': 26 },
    { 'value': 0x3ffffed  , 'len': 26 },
    { 'value': 0x7ffffe7  , 'len': 27 },
    { 'value': 0x7ffffe8  , 'len': 27 },
    { 'value': 0x7ffffe9  , 'len': 27 },
    { 'value': 0x7ffffea  , 'len': 27 },
    { 'value': 0x7ffffeb  , 'len': 27 },
    { 'value': 0xffffffe  , 'len': 28 },
    { 'value': 0x7ffffec  , 'len': 27 },
    { 'value': 0x7ffffed  , 'len': 27 },
    { 'value': 0x7ffffee  , 'len': 27 },
    { 'value': 0x7ffffef  , 'len': 27 },
    { 'value': 0x7fffff0  , 'len': 27 },
    { 'value': 0x3ffffee  , 'len': 26 },
    { 'value': 0x3fffffff , 'len': 30 },
];

var decodeHints = [];
table.forEach(function (entry, i) {
    var p = entry.value >>> (entry.len - 5);
    if (!decodeHints[p]) {
        decodeHints[p] = [];
    }
    if (!decodeHints[p][entry.len]) {
        decodeHints[p][entry.len] = [];
    }
    decodeHints[p][entry.len].push([entry.value, i]);
});

module.exports.encode = function (str) {
    var i, j, k, entry, input = new Buffer(str);
    var output = [];
    k = 8;
    for (i = 0; i < input.length; ++i) {
        entry = table[input[i]];
        for (j = 1 << (entry.len - 1); j > 0; j = j >>> 1, ++k) {
            if (k === 8) {
                output.push(0);
                k = 0;
            }
            output[output.length - 1] = output[output.length - 1] << 1;
            output[output.length - 1] |= (entry.value & j) ? 1 : 0;
        }
    }
    for (; k < 8; ++k) {
        output[output.length - 1] = output[output.length - 1] << 1;
        output[output.length - 1] |= 1;
    }
    return new Buffer(output);
};

var tmp = new Buffer(2048 * 4);
module.exports.decode = function (data, offset, length) {
    var i, j, k, code = 0, n = 0;
    var output = length > 2048 ? new Buffer(length * 4) : tmp,
        len = 0;
    var hints;
    for (i = 0; i < length; ++i) {
        for (j = 0x80; j > 0; j = j >>> 1) {
            code = code << 1 | ((data[offset + i] & j) ? 1 : 0);
            ++n;
            if (n < 5) {
                continue;
            }
            if (n === 5) {
                hints = decodeHints[code];
            }
            if (hints[n]) {
                for (k = hints[n].length; k--;) { // for (k = 0; k < hints[n].length; ++k) {
                    if (hints[n][k][0] === code) {
                        output[len] = hints[n][k][1];
                        ++len;
                        code = 0;
                        n = 0;
                        hints = null;
                        break;
                    }
                }
            }
        }
    }
    return output.toString('utf8', 0, len);
};
