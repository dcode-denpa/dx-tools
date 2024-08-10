var table = [
    [void(0), void(0)],
    [':authority', ''],
    [':method',    'GET'],
    [':method',    'POST'],
    [':path',      '/'],
    [':path',      '/index.html'],
    [':scheme',    'http'],
    [':scheme',    'https'],
    [':status',    '200'],
    [':status',    '204'],
    [':status',    '206'],
    [':status',    '304'],
    [':status',    '400'],
    [':status',    '404'],
    [':status',    '500'],
    ['accept-charset', ''],
    ['accept-encoding', 'gzip, deflate'],
    ['accept-language', ''],
    ['accept-ranges', ''],
    ['accept', ''],
    ['access-control-allow-origin', ''],
    ['age', ''],
    ['allow', ''],
    ['authorization', ''],
    ['cache-control', ''],
    ['content-disposition', ''],
    ['content-encoding', ''],
    ['content-language', ''],
    ['content-length', ''],
    ['content-location', ''],
    ['content-range', ''],
    ['content-type', ''],
    ['cookie', ''],
    ['date', ''],
    ['etag', ''],
    ['expect', ''],
    ['expires', ''],
    ['from', ''],
    ['host', ''],
    ['if-match', ''],
    ['if-modified-since', ''],
    ['if-none-match', ''],
    ['if-range', ''],
    ['if-unmodified-since', ''],
    ['last-modified', ''],
    ['link', ''],
    ['location', ''],
    ['max-forwards', ''],
    ['proxy-authenticate', ''],
    ['proxy-authorization', ''],
    ['range', ''],
    ['referer', ''],
    ['refresh', ''],
    ['retry-after', ''],
    ['server', ''],
    ['set-cookie', ''],
    ['strict-transport-security', ''],
    ['transfer-encoding', ''],
    ['user-agent', ''],
    ['vary', ''],
    ['via', ''],
    ['www-authenticate', ''],
];
var StaticTable = {};
StaticTable.get = function (index) {
    return table[index];
};
StaticTable.indexOf = function (name, value, fromIndex) {
    var i;
    if (typeof fromIndex === 'undefined') {
        fromIndex = 0;
    }
    for (i = fromIndex; i < table.length; i++) {
        if (table[i][0] === name) {
            break;
        }
    }
    if (i === table.length) {
        return -1;
    }
    if (value === null) {
        return i;
    }
    for (; i < table.length; i++) {
        if (table[i][0] !== name) {
            return -1;
        }
        if (table[i][1] === value) {
            return i;
        }
    }
    return -1;
};
Object.defineProperty(StaticTable, 'length', {
    get: function () {
             return table.length - 1;
         }
});
module.exports = StaticTable;
