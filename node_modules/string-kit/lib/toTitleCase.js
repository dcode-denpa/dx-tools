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



const DEFAULT_OPTIONS = {
	underscoreToSpace: true ,
	lowerCaseWords: new Set( [
		// Articles
		'a' , 'an' , 'the' ,
		// Conjunctions (only coordinating conjunctions, maybe we will have to add subordinating and correlative conjunctions)
		'for' , 'and' , 'nor' , 'but' , 'or' , 'yet' , 'so' ,
		// Prepositions (there are more, but usually only preposition with 2 or 3 letters are lower-cased)
		'of' , 'on' , 'off' , 'in' , 'into' , 'by' , 'with' , 'to' , 'at' , 'up' , 'down' , 'as'
	] )
} ;



module.exports = ( str , options = DEFAULT_OPTIONS ) => {
	if ( ! str || typeof str !== 'string' ) { return '' ; }

	// Manage options
	var dashToSpace = options.dashToSpace ?? DEFAULT_OPTIONS.dashToSpace ,
		underscoreToSpace = options.underscoreToSpace ?? DEFAULT_OPTIONS.underscoreToSpace ,
		zealous = options.zealous ?? DEFAULT_OPTIONS.zealous ,
		preserveAllCaps = options.preserveAllCaps ?? DEFAULT_OPTIONS.preserveAllCaps ,
		lowerCaseWords = options.lowerCaseWords ?? DEFAULT_OPTIONS.lowerCaseWords ;

	lowerCaseWords =
		lowerCaseWords instanceof Set ? lowerCaseWords :
		Array.isArray( lowerCaseWords ) ? new Set( lowerCaseWords ) :
		null ;


	if ( dashToSpace ) { str = str.replace( /-+/g , ' ' ) ; }
	if ( underscoreToSpace ) { str = str.replace( /_+/g , ' ' ) ; }

	// Squash multiple spaces into only one, and trim
	str = str.replace( / +/g , ' ' ).trim() ;


	return str.replace( /[^\s_-]+/g , ( part , position ) => {
		// Check word that must be lower-cased (excluding the first and the last word)
		if ( lowerCaseWords && position && position + part.length < str.length ) {
			let lowerCased = part.toLowerCase() ;
			if ( lowerCaseWords.has( lowerCased ) ) { return lowerCased ; }
		}

		if ( zealous ) {
			if ( preserveAllCaps && part === part.toUpperCase() ) {
				// This is a ALLCAPS word
				return part ;
			}

			return part[ 0 ].toUpperCase() + part.slice( 1 ).toLowerCase() ;
		}

		return part[ 0 ].toUpperCase() + part.slice( 1 ) ;
	} ) ;
} ;

