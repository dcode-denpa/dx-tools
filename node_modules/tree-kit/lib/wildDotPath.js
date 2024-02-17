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



const wildDotPath = {} ;
module.exports = wildDotPath ;



const EMPTY_PATH = [] ;
const PROTO_POLLUTION_MESSAGE = 'This would cause prototype pollution' ;



function toPathArray( path ) {
	if ( Array.isArray( path ) ) {
		/*
		let i , iMax = path.length ;
		for ( i = 0 ; i < iMax ; i ++ ) {
			if ( typeof path[ i ] !== 'string' || typeof path[ i ] !== 'number' ) { path[ i ] = '' + path[ i ] ; }
		}
		//*/
		return path ;
	}

	if ( ! path ) { return EMPTY_PATH ; }
	if ( typeof path === 'string' ) {
		return path[ path.length - 1 ] === '.' ? path.slice( 0 , - 1 ).split( '.' ) : path.split( '.' ) ;
	}

	throw new TypeError( '[tree.wildDotPath]: the path argument should be a string or an array' ) ;
}

// Expose toPathArray()
wildDotPath.toPathArray = toPathArray ;



// Walk the tree and return an array of values.
function wildWalk( object , pathArray , maxOffset = 0 , index = 0 , result = [] ) {
	var indexMax , key ,
		pointer = object ;

	for ( indexMax = pathArray.length + maxOffset ; index < indexMax ; index ++ ) {
		key = pathArray[ index ] ;

		if ( typeof key === 'object' || key === '__proto__' || typeof pointer === 'function' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }
		if ( ! pointer || typeof pointer !== 'object' ) { return result ; }

		if ( key === '*' ) {
			for ( let subPointer of Array.isArray( pointer ) ? pointer : Object.values( pointer ) ) {
				wildWalk( subPointer , pathArray , maxOffset , index + 1 , result ) ;
			}

			return result ;
		}

		pointer = pointer[ key ] ;
	}

	result.push( pointer ) ;

	return result ;
}



const VALUE_LIST_MODE = 0 ;
const PATH_LIST_MODE = 1 ;
const PATH_VALUE_MAP_MODE = 2 ;

// Same than wildWalk, but either return an array of path, or an object of path => value.
function wildWalkPathValue( object , pathArray , resultMode , maxOffset = 0 , index = 0 , path = '' , result = null ) {
	if ( ! result ) {
		result = resultMode === PATH_VALUE_MAP_MODE ? {} : [] ;
	}

	var indexMax , key ,
		pointer = object ;

	for ( indexMax = pathArray.length + maxOffset ; index < indexMax ; index ++ ) {
		key = pathArray[ index ] ;

		if ( typeof key === 'object' || key === '__proto__' || typeof pointer === 'function' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }
		if ( ! pointer || typeof pointer !== 'object' ) { return result ; }

		if ( key === '*' ) {
			if ( Array.isArray( pointer ) ) {
				let subKey = 0 ;
				for ( let subPointer of pointer ) {
					wildWalkPathValue( subPointer , pathArray , resultMode , maxOffset , index + 1 , path ? path + '.' + subKey : subKey , result ) ;
					subKey ++ ;
				}
			}
			else {
				for ( let [ subKey , subPointer ] of Object.entries( pointer ) ) {
					wildWalkPathValue( subPointer , pathArray , resultMode , maxOffset , index + 1 , path ? path + '.' + subKey : subKey , result ) ;
				}
			}

			return result ;
		}

		path = path ? path + '.' + key : key ;
		pointer = pointer[ key ] ;
	}

	if ( resultMode === VALUE_LIST_MODE ) {
		result.push( pointer ) ;
	}
	else if ( resultMode === PATH_LIST_MODE ) {
		result.push( path ) ;
	}
	else if ( resultMode === PATH_VALUE_MAP_MODE ) {
		result[ path ] = pointer ;
	}

	return result ;
}



// Get with wildcard, return an array
wildDotPath.get = wildDotPath.getValues = ( object , path ) => wildWalk( object , toPathArray( path ) ) ;
wildDotPath.getPaths = ( object , path ) => wildWalkPathValue( object , toPathArray( path ) , PATH_LIST_MODE ) ;
wildDotPath.getPathValueMap = ( object , path ) => wildWalkPathValue( object , toPathArray( path ) , PATH_VALUE_MAP_MODE ) ;



// Walk and pave the tree and exec a hook at leaf.
// Object MUST be an object! no check are performed for the first step!
function wildWalkPave( object , pathArray , leafHookFn , leafHookArg , index = 0 ) {
	var indexMax , key ,
		pointer = object ;

	for ( indexMax = pathArray.length - 1 ; index < indexMax ; index ++ ) {
		key = pathArray[ index ] ;

		if ( typeof key === 'object' || key === '__proto__' || typeof pointer === 'function' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }
		if ( ! pointer || typeof pointer !== 'object' ) { return 0 ; }

		if ( key === '*' ) {
			let count = 0 ;
			for ( let subPointer of Array.isArray( pointer ) ? pointer : Object.values( pointer ) ) {
				count += wildWalkPave( subPointer , pathArray , leafHookFn , leafHookArg , index + 1 ) ;
			}

			return count ;
		}

		// Pave
		if ( ! pointer[ key ] || typeof pointer[ key ] !== 'object' ) { pointer[ key ] = {} ; }

		pointer = pointer[ key ] ;
	}

	key = pathArray[ index ] ;	// last key
	return leafHookFn( pointer , key , leafHookArg ) ;
}



const SET_HOOK = ( pointer , key , value ) => {
	pointer[ key ] = value ;
	return 1 ;
} ;

wildDotPath.set = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return 0 ; }
	return wildWalkPave( object , toPathArray( path ) , SET_HOOK , value ) ;
} ;



const DEFINE_HOOK = ( pointer , key , value ) => {
	if ( key in pointer ) { return 0 ; }
	pointer[ key ] = value ;
	return 1 ;
} ;

wildDotPath.define = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return 0 ; }
	return wildWalkPave( object , toPathArray( path ) , DEFINE_HOOK , value ) ;
} ;



const INC_HOOK = ( pointer , key ) => {
	if ( typeof pointer[ key ] === 'number' ) { pointer[ key ] ++ ; }
	else if ( ! pointer[ key ] || typeof pointer[ key ] !== 'object' ) { pointer[ key ] = 1 ; }
	return 1 ;
} ;

wildDotPath.inc = ( object , path ) => {
	if ( ! object || typeof object !== 'object' ) { return 0 ; }
	return wildWalkPave( object , toPathArray( path ) , INC_HOOK ) ;
} ;



const DEC_HOOK = ( pointer , key ) => {
	if ( typeof pointer[ key ] === 'number' ) { pointer[ key ] -- ; }
	else if ( ! pointer[ key ] || typeof pointer[ key ] !== 'object' ) { pointer[ key ] = - 1 ; }
	return 1 ;
} ;

wildDotPath.dec = ( object , path ) => {
	if ( ! object || typeof object !== 'object' ) { return 0 ; }
	return wildWalkPave( object , toPathArray( path ) , DEC_HOOK ) ;
} ;



const CONCAT_HOOK = ( pointer , key , value ) => {
	if ( ! pointer[ key ] ) {
		pointer[ key ] = value ;
	}
	else if ( Array.isArray( pointer[ key ] ) && Array.isArray( value ) ) {
		pointer[ key ] = pointer[ key ].concat( value ) ;
	}

	return 1 ;
} ;

wildDotPath.concat = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return 0 ; }
	return wildWalkPave( object , toPathArray( path ) , CONCAT_HOOK , value ) ;
} ;



const INSERT_HOOK = ( pointer , key , value ) => {
	if ( ! pointer[ key ] ) {
		pointer[ key ] = value ;
	}
	else if ( Array.isArray( pointer[ key ] ) && Array.isArray( value ) ) {
		pointer[ key ] = value.concat( pointer[ key ] ) ;
	}

	return 1 ;
} ;

wildDotPath.insert = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return 0 ; }
	return wildWalkPave( object , toPathArray( path ) , INSERT_HOOK , value ) ;
} ;



const DELETE_HOOK = ( pointer , key ) => {
	if ( ! Object.hasOwn( pointer , key ) ) { return 0 ; }
	delete pointer[ key ] ;
	return 1 ;
} ;

wildDotPath.delete = ( object , path ) => {
	if ( ! object || typeof object !== 'object' ) { return 0 ; }
	return wildWalkPave( object , toPathArray( path ) , DELETE_HOOK ) ;
} ;



const AUTOPUSH_HOOK = ( pointer , key , value ) => {
	if ( pointer[ key ] === undefined ) { pointer[ key ] = value ; }
	else if ( Array.isArray( pointer[ key ] ) ) { pointer[ key ].push( value ) ; }
	else { pointer[ key ] = [ pointer[ key ] , value ] ; }

	return 1 ;
} ;

wildDotPath.autoPush = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return 0 ; }
	return wildWalkPave( object , toPathArray( path ) , AUTOPUSH_HOOK , value ) ;
} ;



const APPEND_HOOK = ( pointer , key , value ) => {
	if ( ! pointer[ key ] ) { pointer[ key ] = [ value ] ; }
	else if ( Array.isArray( pointer[ key ] ) ) { pointer[ key ].push( value ) ; }
	return 1 ;
} ;

wildDotPath.append = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return 0 ; }
	return wildWalkPave( object , toPathArray( path ) , APPEND_HOOK , value ) ;
} ;



const PREPEND_HOOK = ( pointer , key , value ) => {
	if ( ! pointer[ key ] ) { pointer[ key ] = [ value ] ; }
	else if ( Array.isArray( pointer[ key ] ) ) { pointer[ key ].unshift( value ) ; }
	return 1 ;
} ;

wildDotPath.prepend = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return 0 ; }
	return wildWalkPave( object , toPathArray( path ) , PREPEND_HOOK , value ) ;
} ;

