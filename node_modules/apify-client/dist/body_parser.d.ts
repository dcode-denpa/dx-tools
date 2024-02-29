/// <reference types="node" />
import { JsonArray, JsonObject } from 'type-fest';
/**
 * Parses a Buffer or ArrayBuffer using the provided content type header.
 *
 * - application/json is returned as a parsed object.
 * - application/*xml and text/* are returned as strings.
 * - everything else is returned as original body.
 *
 * If the header includes a charset, the body will be stringified only
 * if the charset represents a known encoding to Node.js or Browser.
 */
export declare function maybeParseBody(body: Buffer | ArrayBuffer, contentTypeHeader: string): string | Buffer | ArrayBuffer | JsonObject | JsonArray;
export declare function isomorphicBufferToString(buffer: Buffer | ArrayBuffer, encoding: BufferEncoding): string;
//# sourceMappingURL=body_parser.d.ts.map