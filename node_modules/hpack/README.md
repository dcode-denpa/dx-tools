# HPACK

An implementation of RFC 7541 (a.k.a HPACK).
https://tools.ietf.org/html/rfc7541

This implementation was originally used in my HTTP/2 client, h2cli, but I separated its HPACK part from it as a library to use it in my QUIC implementation.

Its compatibility is verified with well-known implementations in [http2jp/hpack-test-case](https://github.com/http2jp/hpack-test-case/).

# API

## Encode

```
var HPACK   = require('hpack'),
    codec   = new HPACK(),
    headers = [
        [':scheme', 'http'],
        [':path', '/'],
    ],
    packed  = codec.encode(headers);
-----
<Buffer 86 84>
```

## Decode

```
var HPACK   = require('hpack'),
    codec   = new HPACK(),
    packed  = new Buffer([0x86, 0x84]),
    headers = codec.decode(packed);
-----
[ [ ':scheme', 'http' ], [ ':path', '/' ] ]
```

## Change dynamic table size

```
var HPACK   = require('hpack'),
    codec   = new HPACK();
codec.setTableSize(512);
```
