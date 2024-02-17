/*
	Tree Kit

	Copyright (c) 2014 - 2021 Cédric Ronvel

	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

"use strict" ;



// Mimic Array's prototype methods, like Array#map(), Array#filter(), and so on...

exports.map = function( object , fn ) {
	if ( ! object || typeof object !== 'object' ) { throw new Error( "Expecting an object" ) ; }
	return Object.fromEntries( Object.entries( object ).map(   entry => [ entry[ 0 ] , fn( entry[ 1 ] ) ]   ) ) ;
} ;

exports.filter = function( object , fn ) {
	if ( ! object || typeof object !== 'object' ) { throw new Error( "Expecting an object" ) ; }
	return Object.fromEntries( Object.entries( object ).filter(   entry => fn( entry[ 1 ] )   ) ) ;
} ;

