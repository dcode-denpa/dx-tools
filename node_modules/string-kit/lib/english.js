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



const english = {} ;
module.exports = english ;



const VOWELS = new Set( [ 'a' , 'e' , 'i' , 'o' , 'u' , 'y' ] ) ;
const VOWELS_ADDING_E = new Set( [ 'a' , 'i' , 'o' , 'u' ] ) ;
const CONSONANTS_AFTER_VOWEL_ADDING_E = new Set( [ 's' ] ) ;
const CONSONANTS_ADDING_E = new Set( [ 'v' ] ) ;
const CONSONANTS_NOT_ADDING_E = new Set( [ 'w' , 'x' ] ) ;
const DOUBLE_CONSONANTS_ADDING_E = new Set( [ 'cl' , 'dl' , 'gl' , 'kl' , 'nc' , 'pl' , 'tl' ] ) ;
const REDUCING_DOUBLE_CONSONANTS = new Set( [ 'd' , 'g' , 'm' , 'n' , 'p' ] ) ;
const CONSONANTS_AFTER_VOWELS_COMBO_NOT_ADDING_E = new Set( [ 'or' ] ) ;	// Last chance fix

// Remove -ing and transform to a proper verb or noun
english.undoPresentParticiple = word => {
	if ( word.endsWith( 'ing' ) && word.length >= 6 && ! word.endsWith( 'ghtning' ) ) {
		let ingSuffix = 'ing' ;
		//if ( word.endsWith( 'ling' ) ) { ingSuffix = 'ling' ; }

		let ingLen = ingSuffix.length ;

		let before = word[ word.length - ingLen - 1 ] ,
			before2 = word[ word.length - ingLen - 2 ] ,
			before3 = word[ word.length - ingLen - 3 ] ;

		if ( VOWELS.has( before ) ) {
			word = word.slice( 0 , -ingLen ) ;
		}
		else if ( VOWELS.has( before2 ) ) {
			if ( VOWELS.has( before3 ) ) {
				if ( CONSONANTS_AFTER_VOWEL_ADDING_E.has( before ) && ! CONSONANTS_AFTER_VOWELS_COMBO_NOT_ADDING_E.has( before2 + before ) ) {
					word = word.slice( 0 , -ingLen ) + 'e' ;
				}
				else {
					word = word.slice( 0 , -ingLen ) ;
				}
			}
			else if ( VOWELS_ADDING_E.has( before2 ) && ! CONSONANTS_NOT_ADDING_E.has( before ) ) {
				word = word.slice( 0 , -ingLen ) + 'e' ;
			}
			else {
				word = word.slice( 0 , -ingLen ) ;
			}
		}
		else if ( before === before2 && REDUCING_DOUBLE_CONSONANTS.has( before ) ) {
			word = word.slice( 0 , -ingLen - 1 ) ;
		}
		else if ( CONSONANTS_ADDING_E.has( before ) || DOUBLE_CONSONANTS_ADDING_E.has( before2 + before ) ) {
			word = word.slice( 0 , -ingLen ) + 'e' ;
		}
		else {
			word = word.slice( 0 , -ingLen ) ;
		}
	}

	return word ;
} ;

