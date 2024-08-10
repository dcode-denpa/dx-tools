var IntCodec = require('./lib/int_codec');
var FieldCodec = require('./lib/field_codec');
var DynamicTable = require('./lib/dynamic_table');
var StaticTable = require('./lib/static_table');

var NAME  = 0,
    VALUE = 1;
var REPRESENTATION_INDEXED        = 0,
    REPRESENTATION_INC_INDEXING   = 1,
    REPRESENTATION_WO_INDEXING    = 2,
    REPRESENTATION_NEVER_INDEXED  = 3;

var lookupTables = function (index) {
    var fieldSet;
    if (index <= StaticTable.length) {
        fieldSet = StaticTable.get(index);
    } else {
        fieldSet = this.lDynamicTable.get(index - StaticTable.length);
    }
    return fieldSet;
};

var HPACK = module.exports = function () {
    var self = this;
    this.lDynamicTable = new DynamicTable();
    this.rDynamicTable = new DynamicTable();
    this.huffmanStrategy = 1;
};

HPACK.prototype.encode = function (input) {
    var i, buf;
    var output = [];
    var name, value, block;

    // Change dynamic table size if needed
    if (this._needTableSizeChange) {
        buf = IntCodec.encode(this._newTableSize, 5);
        buf[0] |= 0x20;
        output.push(buf);
        this.rDynamicTable.setTableSize(this._newTableSize);
        this._needTableSizeChange = false;
    }

    for (i = 0; i < input.length; i++) {
        name = input[i][NAME];
        value = input[i][VALUE];
        block = encodeField.call(this, name, value);
        if (block) {
            output.push(block);
        }
    }
    // console.log('-- HPACK encode --');
    // console.log(input);
    // console.log('------------------');
    // console.log(output);
    // console.log('------------------');
    return Buffer.concat(output);
};

HPACK.prototype.decode = function (input) {
    var output = [];
    var result, field;
    var pos = 0;
    // console.log('HPACK-DEBUG: ====Dynamic Table====');
    // console.log(this.lDynamicTable);
    while (pos < input.length) {
        if ((input[pos] & 0xE0) === 0x20) {
            // console.log('HPACK-DEBUG: Dynamic Table Size Update');
            result = IntCodec.decode(input, pos, 5);
            this.lDynamicTable.setTableSize(result.value);
            pos += result.len;
            continue;
        }
        result = FieldCodec.decode(input, pos);
        pos += result.len;
        if (result.type === REPRESENTATION_INDEXED) {
            // console.log('HPACK-DEBUG: Indexed Header Field Representation');
            // console.log('HPACK-DEBUG: Index: ' + result.index);
            field = lookupTables.call(this, result.index);
            if (field) {
                // console.log('HPACK-DEBUG: Emit: ' + [field[NAME], field[VALUE]]);
                output.push([field[NAME], field[VALUE]]);
            }
        } else {
            if (result.type === REPRESENTATION_INC_INDEXING) {
                // console.log('HPACK-DEBUG: Literal Header Field with Incremental Indexing');
            } else if (result.type === REPRESENTATION_WO_INDEXING) {
                // console.log('HPACK-DEBUG: Literal Header Field without Indexing');
            } else {
                // console.log('HPACK-DEBUG: Literal Header Field Never Indexed');
            }
            // console.log('HPACK-DEBUG: Index: ' + result.index);
            if (result.index) {
                field = lookupTables.call(this, result.index)[NAME];
            } else {
                field = result.name;
            }
            if (result.type === REPRESENTATION_INC_INDEXING) {
                this.lDynamicTable.insert(field, result.value);
            }
            // console.log('HPACK-DEBUG: Emit: ' + [field, result.value]);
            output.push([field, result.value]);
        }
    }
    // console.log('-- HPACK decode --');
    // console.log(input);
    // console.log('------------------');
    // console.log(output);
    // console.log('------------------');
    return output;
};
HPACK.prototype.setTableSize = function (size) {
    this._needTableSizeChange = true;
    this._newTableSize = size;
};

HPACK.prototype.useHuffman= function (strategy) {
    this.huffmanStrategy = strategy;
};

var encodeField = function (name, value) {
    var i, j, index, output;

    index = this.rDynamicTable.find(name, value);
    if (index) {
        output = FieldCodec.encode(index + StaticTable.length);
        return output;
    }

    i = StaticTable.indexOf(name, null, 0);
    if (i !== -1) {
        j = StaticTable.indexOf(name, value, i);
        if (j !== -1) {
            output = FieldCodec.encode(j);
        } else {
            output = FieldCodec.encode(
                    i,
                    value,
                    0,
                    this.huffmanStrategy);
            this.rDynamicTable.insert(name, value);
        }
        return output;
    }

    output = FieldCodec.encode(name, value, 0, this.huffmanStrategy);
    this.rDynamicTable.insert(name, value);
    return output;
};
