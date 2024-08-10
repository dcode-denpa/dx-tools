/*
	Book Source

	Copyright (c) 2023 Cédric Ronvel

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



const latinize = require( './latinize.js' ) ;
const english = require( './english.js' ) ;

const KEYWORD_TO_CHARLIST = require( './json-data/emoji-keyword-to-charlist.json' ) ;
const CHAR_TO_CANONICAL_NAME = require( './json-data/emoji-char-to-canonical-name.json' ) ;



const emoji = {} ;
module.exports = emoji ;



emoji.getCanonicalName = emojiChar => CHAR_TO_CANONICAL_NAME[ emojiChar ] ;



const emojiToKeywordsCache = {} ;

// Return a cached and frozen array
emoji.getKeywords = emojiChar => {
	if ( ! CHAR_TO_CANONICAL_NAME[ emojiChar ] ) { return ; }

	if ( ! emojiToKeywordsCache[ emojiChar ] ) {
		emojiToKeywordsCache[ emojiChar ] = emoji.splitIntoKeywords( CHAR_TO_CANONICAL_NAME[ emojiChar ] ) ;
		Object.freeze( emojiToKeywordsCache[ emojiChar ] ) ;
	}

	return emojiToKeywordsCache[ emojiChar ] ;
} ;



emoji.search = ( name , bestOnly = false ) => {
	var keywords = emoji.splitIntoKeywords( name ) ,
		matches = {} ,
		score ,
		bestScore = 0 ;

	for ( let keyword of keywords ) {
		if ( ! KEYWORD_TO_CHARLIST[ keyword ] ) { continue ; }

		for ( let emojiChar of KEYWORD_TO_CHARLIST[ keyword ] ) {
			if ( ! matches[ emojiChar ] ) {
				score = 1 ;
				matches[ emojiChar ] = {
					emoji: emojiChar ,
					score ,
					canonical: CHAR_TO_CANONICAL_NAME[ emojiChar ] ,
					keywords: emoji.getKeywords( emojiChar )
				} ;
			}
			else {
				score = matches[ emojiChar ].score + 1 ;
				matches[ emojiChar ].score = score ;
			}

			if ( score > bestScore ) { bestScore = score ; }
		}
	}

	var results = [ ... Object.values( matches ) ] ;
	if ( bestOnly ) { results = results.filter( e => e.score === bestScore ) ; }
	results.sort( ( a , b ) => ( b.score - a.score ) || ( a.keywords.length - b.keywords.length ) ) ;
	return results ;
} ;

emoji.searchBest = name => emoji.search( name , true ) ;
emoji.get = name => emoji.search( name , true )[ 0 ]?.emoji ;





// Internal API, exposed because it is used by the builder



emoji.simplifyName = name => {
	name = name.toLowerCase().replace( /[“”().!]/g , '' ).replace( /[ ’',]/g , '-' ).replace( /-+/g , '-' ) ;
	name = latinize( name ) ;
	return name ;
} ;



emoji.simplifyKeyword = inputKeyword => {
	var kw = inputKeyword ;
	kw = english.undoPresentParticiple( kw ) ;

	//if ( kw !== inputKeyword ) { console.log( "Changing KW:" , inputKeyword , "-->" , kw ) ; }
	return kw ;
} ;



const KEYWORD_EXCLUSION = new Set( [ 'with' , 'of' ] ) ;

emoji.splitIntoKeywords = ( name , noSimplify = false ) => {
	if ( ! noSimplify ) { name = emoji.simplifyName( name ) ; }
	var keywords = name.split( /-/g ).filter( keyword => keyword.length >= 2 && ! KEYWORD_EXCLUSION.has( keyword ) ) ;
	keywords = keywords.map( emoji.simplifyKeyword ) ;
	keywords = [ ... new Set( keywords ) ] ;	// Make them unique
	return keywords ;
} ;

