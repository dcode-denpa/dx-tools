/*
	String Kit

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



var camel = {} ;
module.exports = camel ;



// Transform alphanum separated by underscore or minus to camel case
camel.toCamelCase = function( str , preserveUpperCase = false , initialUpperCase = false ) {
	if ( ! str || typeof str !== 'string' ) { return '' ; }

	return str.replace(
		/(?:^[\s_-]*|([\s_-]+))(([^\s_-]?)([^\s_-]*))/g ,
		( match , isNotFirstWord , word , firstLetter , endOfWord ) => {
			if ( preserveUpperCase ) {
				if ( ! isNotFirstWord && ! initialUpperCase ) { return word ; }
				if ( ! firstLetter ) { return '' ; }
				return firstLetter.toUpperCase() + endOfWord ;
			}

			if ( ! isNotFirstWord && ! initialUpperCase ) { return word.toLowerCase() ; }
			if ( ! firstLetter ) { return '' ; }
			return firstLetter.toUpperCase() + endOfWord.toLowerCase() ;
		}
	) ;
} ;



camel.camelCaseToSeparated = function( str , separator = ' ' , acronym = true ) {
	if ( ! str || typeof str !== 'string' ) { return '' ; }

	if ( ! acronym ) {
		return str.replace( /^([A-Z])|([A-Z])/g , ( match , firstLetter , letter ) => {
			if ( firstLetter ) { return firstLetter.toLowerCase() ; }
			return separator + letter.toLowerCase() ;
		} ) ;
	}

	// (^)? and (^)? does not work, so we have to use (?:(^)|)) and (?:($)|)) to capture end or not
	return str.replace( /(?:(^)|)([A-Z]+)(?:($)|(?=[a-z]))/g , ( match , isStart , letters , isEnd ) => {
		isStart = isStart === '' ;
		isEnd = isEnd === '' ;

		var prefix = isStart ? '' : separator ;

		return letters.length === 1 ? prefix + letters.toLowerCase() :
			isEnd ? prefix + letters :
			letters.length === 2 ? prefix + letters[ 0 ].toLowerCase() + separator + letters[ 1 ].toLowerCase() :
			prefix + letters.slice( 0 , -1 ) + separator + letters.slice( -1 ).toLowerCase() ;
	} ) ;
} ;



// Transform camel case to alphanum separated by minus
camel.camelCaseToDash =
camel.camelCaseToDashed = ( str ) => camel.camelCaseToSeparated( str , '-' , false ) ;

