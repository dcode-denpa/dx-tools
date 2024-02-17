(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.treeKit = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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


},{}],2:[function(require,module,exports){
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



// Browser only get the essential of tree-kit, not the unfinished parts of it

const tree = {} ;
module.exports = tree ;



tree.extend = require( './extend.js' ) ;
tree.clone = require( './clone.js' ) ;
tree.path = require( './path.js' ) ;
tree.dotPath = require( './dotPath.js' ) ;
tree.wildDotPath = require( './wildDotPath.js' ) ;

Object.assign( tree , require( './arrayLike.js' ) ) ;


},{"./arrayLike.js":1,"./clone.js":3,"./dotPath.js":4,"./extend.js":5,"./path.js":6,"./wildDotPath.js":7}],3:[function(require,module,exports){
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



/*
	Stand-alone fork of extend.js, without options.
*/

function clone( originalObject , circular ) {
	// First create an empty object with
	// same prototype of our original source

	var originalProto = Object.getPrototypeOf( originalObject ) ;

	// Opaque objects, like Date
	if ( clone.opaque.has( originalProto ) ) { return clone.opaque.get( originalProto )( originalObject ) ; }

	var propertyIndex , descriptor , keys , current , nextSource , proto ,
		copies = [ {
			source: originalObject ,
			target: Array.isArray( originalObject ) ? [] : Object.create( originalProto )
		} ] ,
		cloneObject = copies[ 0 ].target ,
		refMap = new Map() ;

	refMap.set( originalObject , cloneObject ) ;


	// First in, first out
	while ( ( current = copies.shift() ) ) {
		keys = Object.getOwnPropertyNames( current.source ) ;

		for ( propertyIndex = 0 ; propertyIndex < keys.length ; propertyIndex ++ ) {
			// Save the source's descriptor
			descriptor = Object.getOwnPropertyDescriptor( current.source , keys[ propertyIndex ] ) ;


			if ( ! descriptor.value || typeof descriptor.value !== 'object' ) {
				Object.defineProperty( current.target , keys[ propertyIndex ] , descriptor ) ;
				continue ;
			}

			nextSource = descriptor.value ;

			if ( circular ) {
				if ( refMap.has( nextSource ) ) {
					// The source is already referenced, just assign reference
					descriptor.value = refMap.get( nextSource ) ;
					Object.defineProperty( current.target , keys[ propertyIndex ] , descriptor ) ;
					continue ;
				}
			}

			proto = Object.getPrototypeOf( descriptor.value ) ;

			// Opaque objects, like Date, not recursivity for them
			if ( clone.opaque.has( proto ) ) {
				descriptor.value = clone.opaque.get( proto )( descriptor.value ) ;
				Object.defineProperty( current.target , keys[ propertyIndex ] , descriptor ) ;
				continue ;
			}

			descriptor.value = Array.isArray( nextSource ) ? [] : Object.create( proto ) ;

			if ( circular ) { refMap.set( nextSource , descriptor.value ) ; }

			Object.defineProperty( current.target , keys[ propertyIndex ] , descriptor ) ;
			copies.push( { source: nextSource , target: descriptor.value } ) ;
		}
	}

	return cloneObject ;
}

module.exports = clone ;



clone.opaque = new Map() ;
clone.opaque.set( Date.prototype , src => new Date( src ) ) ;


},{}],4:[function(require,module,exports){
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



const dotPath = {} ;
module.exports = dotPath ;



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

	throw new TypeError( '[tree.dotPath]: the path argument should be a string or an array' ) ;
}

// Expose toPathArray()
dotPath.toPathArray = toPathArray ;



// Walk the tree using the path array.
function walk( object , pathArray , maxOffset = 0 ) {
	var index , indexMax , key ,
		pointer = object ;

	for ( index = 0 , indexMax = pathArray.length + maxOffset ; index < indexMax ; index ++ ) {
		key = pathArray[ index ] ;

		if ( typeof key === 'object' || key === '__proto__' || typeof pointer === 'function' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }
		if ( ! pointer || typeof pointer !== 'object' ) { return undefined ; }

		pointer = pointer[ key ] ;
	}

	return pointer ;
}



// Walk the tree, create missing element: pave the path up to before the last part of the path.
// Return that before-the-last element.
// Object MUST be an object! no check are performed for the first step!
function pave( object , pathArray ) {
	var index , indexMax , key ,
		pointer = object ;

	for ( index = 0 , indexMax = pathArray.length - 1 ; index < indexMax ; index ++ ) {
		key = pathArray[ index ] ;

		if ( typeof key === 'object' || key === '__proto__' || typeof pointer[ key ] === 'function' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }
		if ( ! pointer[ key ] || typeof pointer[ key ] !== 'object' ) { pointer[ key ] = {} ; }

		pointer = pointer[ key ] ;
	}

	return pointer ;
}



dotPath.get = ( object , path ) => walk( object , toPathArray( path ) ) ;



dotPath.set = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return ; }

	var pathArray = toPathArray( path ) ,
		key = pathArray[ pathArray.length - 1 ] ;

	if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }

	var pointer = pave( object , pathArray ) ;

	pointer[ key ] = value ;

	return value ;
} ;



dotPath.define = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return ; }

	var pathArray = toPathArray( path ) ,
		key = pathArray[ pathArray.length - 1 ] ;

	if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }

	var pointer = pave( object , pathArray ) ;

	if ( ! ( key in pointer ) ) { pointer[ key ] = value ; }

	return pointer[ key ] ;
} ;



dotPath.inc = ( object , path ) => {
	if ( ! object || typeof object !== 'object' ) { return ; }

	var pathArray = toPathArray( path ) ,
		key = pathArray[ pathArray.length - 1 ] ;

	if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }

	var pointer = pave( object , pathArray ) ;

	if ( typeof pointer[ key ] === 'number' ) { pointer[ key ] ++ ; }
	else if ( ! pointer[ key ] || typeof pointer[ key ] !== 'object' ) { pointer[ key ] = 1 ; }

	return pointer[ key ] ;
} ;



dotPath.dec = ( object , path ) => {
	if ( ! object || typeof object !== 'object' ) { return ; }

	var pathArray = toPathArray( path ) ,
		key = pathArray[ pathArray.length - 1 ] ;

	if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }

	var pointer = pave( object , pathArray ) ;

	if ( typeof pointer[ key ] === 'number' ) { pointer[ key ] -- ; }
	else if ( ! pointer[ key ] || typeof pointer[ key ] !== 'object' ) { pointer[ key ] = - 1 ; }

	return pointer[ key ] ;
} ;



dotPath.concat = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return ; }

	var pathArray = toPathArray( path ) ,
		key = pathArray[ pathArray.length - 1 ] ;

	if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }

	var pointer = pave( object , pathArray ) ;

	if ( ! pointer[ key ] ) { pointer[ key ] = value ; }
	else if ( Array.isArray( pointer[ key ] ) && Array.isArray( value ) ) {
		pointer[ key ] = pointer[ key ].concat( value ) ;
	}
	//else ? do nothing???

	return pointer[ key ] ;
} ;



dotPath.insert = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return ; }

	var pathArray = toPathArray( path ) ,
		key = pathArray[ pathArray.length - 1 ] ;

	if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }

	var pointer = pave( object , pathArray ) ;

	if ( ! pointer[ key ] ) { pointer[ key ] = value ; }
	else if ( Array.isArray( pointer[ key ] ) && Array.isArray( value ) ) {
		pointer[ key ] = value.concat( pointer[ key ] ) ;
	}
	//else ? do nothing???

	return pointer[ key ] ;
} ;



dotPath.delete = ( object , path ) => {
	var pathArray = toPathArray( path ) ,
		key = pathArray[ pathArray.length - 1 ] ;

	if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }

	var pointer = walk( object , pathArray , - 1 ) ;

	if ( ! pointer || typeof pointer !== 'object' || ! Object.hasOwn( pointer , key ) ) { return false ; }

	delete pointer[ key ] ;

	return true ;
} ;



dotPath.autoPush = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return ; }

	var pathArray = toPathArray( path ) ,
		key = pathArray[ pathArray.length - 1 ] ;

	if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }

	var pointer = pave( object , pathArray ) ;

	if ( pointer[ key ] === undefined ) { pointer[ key ] = value ; }
	else if ( Array.isArray( pointer[ key ] ) ) { pointer[ key ].push( value ) ; }
	else { pointer[ key ] = [ pointer[ key ] , value ] ; }

	return pointer[ key ] ;
} ;



dotPath.append = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return ; }

	var pathArray = toPathArray( path ) ,
		key = pathArray[ pathArray.length - 1 ] ;

	if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }

	var pointer = pave( object , pathArray ) ;

	if ( ! pointer[ key ] ) { pointer[ key ] = [ value ] ; }
	else if ( Array.isArray( pointer[ key ] ) ) { pointer[ key ].push( value ) ; }
	//else ? do nothing???

	return pointer[ key ] ;
} ;



dotPath.prepend = ( object , path , value ) => {
	if ( ! object || typeof object !== 'object' ) { return ; }

	var pathArray = toPathArray( path ) ,
		key = pathArray[ pathArray.length - 1 ] ;

	if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }

	var pointer = pave( object , pathArray ) ;

	if ( ! pointer[ key ] ) { pointer[ key ] = [ value ] ; }
	else if ( Array.isArray( pointer[ key ] ) ) { pointer[ key ].unshift( value ) ; }
	//else ? do nothing???

	return pointer[ key ] ;
} ;


},{}],5:[function(require,module,exports){
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



/*
	== Extend function ==
*/

/*
	options:
		* own: only copy own properties that are enumerable
		* nonEnum: copy non-enumerable properties as well, works only with own:true
		* descriptor: preserve property's descriptor
		* deep: boolean/Array/Set, if true perform a deep (recursive) extend, if it is an Array/Set of prototypes, only deep-copy
			objects of those prototypes
			(it is a replacement for deepFilter.whitelist which was removed in Tree Kit 0.6).
		* immutables: an Array/Set of immutable object's prototypes that are filtered out for deep-copy
			(it is a replacement for deepFilter.blacklist which was removed in Tree Kit 0.6).
		* maxDepth: used in conjunction with deep, when max depth is reached an exception is raised, default to 100 when
			the 'circular' option is off, or default to null if 'circular' is on
		* circular: boolean, circular references reconnection
		* move: boolean, move properties to target (delete properties from the sources)
		* preserve: boolean, existing properties in the target object are not overwritten
		* mask: boolean or number, reverse of 'preserve', only update existing properties in the target, do not create new keys,
			if its a number, the mask effect is only effective for the Nth element.
			E.g: .extend( {mask:2} , {} , object1 , object2 )
			So object1 extends the empty object like, but object2 do not create new keys not present in object1.
			With mask:true or mask:1, the mask behavior would apply at step 1 too, when object1 would try to extend the empty object,
			and since an empty object has no key, nothing would change, and the whole extend would return an empty object.
		* nofunc: skip functions
		* deepFunc: in conjunction with 'deep', this will process sources functions like objects rather than
			copying/referencing them directly into the source, thus, the result will not be a function, it forces 'deep'
		* proto: try to clone objects with the right prototype, using Object.create() or mutating it with Object.setPrototypeOf(),
			it forces option 'own'.
		* inherit: rather than mutating target prototype for source prototype like the 'proto' option does, here it is
			the source itself that IS the prototype for the target. Force option 'own' and disable 'proto'.
		* skipRoot: the prototype of the target root object is NOT mutated only if this option is set.
		* flat: extend into the target top-level only, compose name with the path of the source, force 'deep',
			disable 'unflat', 'proto', 'inherit'
		* unflat: assume sources are in the 'flat' format, expand all properties deeply into the target, disable 'flat'
*/
function extend( options , target , ... sources ) {
	var i , source , newTarget = false , length = sources.length ;

	if ( ! length ) { return target ; }

	if ( ! options || typeof options !== 'object' ) { options = {} ; }

	var runtime = { depth: 0 , prefix: '' } ;

	if ( options.deep ) {
		if ( Array.isArray( options.deep ) ) { options.deep = new Set( options.deep ) ; }
		else if ( ! ( options.deep instanceof Set ) ) { options.deep = true ; }
	}

	if ( options.immutables ) {
		if ( Array.isArray( options.immutables ) ) { options.immutables = new Set( options.immutables ) ; }
		else if ( ! ( options.immutables instanceof Set ) ) { delete options.immutables ; }
	}

	if ( ! options.maxDepth && options.deep && ! options.circular ) { options.maxDepth = 100 ; }

	if ( options.deepFunc ) { options.deep = true ; }

	// 'flat' option force 'deep'
	if ( options.flat ) {
		options.deep = true ;
		options.proto = false ;
		options.inherit = false ;
		options.unflat = false ;
		if ( typeof options.flat !== 'string' ) { options.flat = '.' ; }
	}

	if ( options.unflat ) {
		options.deep = false ;
		options.proto = false ;
		options.inherit = false ;
		options.flat = false ;
		if ( typeof options.unflat !== 'string' ) { options.unflat = '.' ; }
	}

	// If the prototype is applied, only owned properties should be copied
	if ( options.inherit ) { options.own = true ; options.proto = false ; }
	else if ( options.proto ) { options.own = true ; }

	if ( ! target || ( typeof target !== 'object' && typeof target !== 'function' ) ) {
		newTarget = true ;
	}

	if ( ! options.skipRoot && ( options.inherit || options.proto ) ) {
		for ( i = length - 1 ; i >= 0 ; i -- ) {
			source = sources[ i ] ;
			if ( source && ( typeof source === 'object' || typeof source === 'function' ) ) {
				if ( options.inherit ) {
					if ( newTarget ) { target = Object.create( source ) ; }
					else { Object.setPrototypeOf( target , source ) ; }
				}
				else if ( options.proto ) {
					if ( newTarget ) { target = Object.create( Object.getPrototypeOf( source ) ) ; }
					else { Object.setPrototypeOf( target , Object.getPrototypeOf( source ) ) ; }
				}

				break ;
			}
		}
	}
	else if ( newTarget ) {
		target = {} ;
	}

	runtime.references = { sources: [] , targets: [] } ;

	for ( i = 0 ; i < length ; i ++ ) {
		source = sources[ i ] ;
		if ( ! source || ( typeof source !== 'object' && typeof source !== 'function' ) ) { continue ; }
		extendOne( runtime , options , target , source , options.mask <= i + 1 ) ;
	}

	return target ;
}

module.exports = extend ;



function extendOne( runtime , options , target , source , mask ) {
	var sourceKeys , sourceKey ;

	// Max depth check
	if ( options.maxDepth && runtime.depth > options.maxDepth ) {
		throw new Error( '[tree] extend(): max depth reached(' + options.maxDepth + ')' ) ;
	}


	if ( options.circular ) {
		runtime.references.sources.push( source ) ;
		runtime.references.targets.push( target ) ;
	}

	// 'unflat' mode computing
	if ( options.unflat && runtime.depth === 0 ) {
		for ( sourceKey in source ) {
			runtime.unflatKeys = sourceKey.split( options.unflat ) ;
			runtime.unflatIndex = 0 ;
			runtime.unflatFullKey = sourceKey ;
			extendOneKV( runtime , options , target , source , runtime.unflatKeys[ runtime.unflatIndex ] , mask ) ;
		}

		delete runtime.unflatKeys ;
		delete runtime.unflatIndex ;
		delete runtime.unflatFullKey ;
	}
	else if ( options.own ) {
		if ( options.nonEnum ) { sourceKeys = Object.getOwnPropertyNames( source ) ; }
		else { sourceKeys = Object.keys( source ) ; }

		for ( sourceKey of sourceKeys ) {
			extendOneKV( runtime , options , target , source , sourceKey , mask ) ;
		}
	}
	else {
		for ( sourceKey in source ) {
			extendOneKV( runtime , options , target , source , sourceKey , mask ) ;
		}
	}
}



function extendOneKV( runtime , options , target , source , sourceKey , mask ) {
	// OMG, this DEPRECATED __proto__ shit is still alive and can be used to hack anything ><
	if ( sourceKey === '__proto__' ) { return ; }

	let sourceValue , sourceDescriptor , sourceValueProto ;

	if ( runtime.unflatKeys ) {
		if ( runtime.unflatIndex < runtime.unflatKeys.length - 1 ) {
			sourceValue = {} ;
		}
		else {
			sourceValue = source[ runtime.unflatFullKey ] ;
		}
	}
	else if ( options.descriptor ) {
		// If descriptor is on, get it now
		sourceDescriptor = Object.getOwnPropertyDescriptor( source , sourceKey ) ;
		sourceValue = sourceDescriptor.value ;
	}
	else {
		// We have to trigger an eventual getter only once
		sourceValue = source[ sourceKey ] ;
	}

	let targetKey = runtime.prefix + sourceKey ;

	// Do not copy if property is a function and we don't want them
	if ( options.nofunc && typeof sourceValue === 'function' ) { return ; }

	// Again, trigger an eventual getter only once
	let targetValue = target[ targetKey ] ;
	let targetValueIsObject = targetValue && ( typeof targetValue === 'object' || typeof targetValue === 'function' ) ;
	let sourceValueIsObject = sourceValue && ( typeof sourceValue === 'object' || typeof sourceValue === 'function' ) ;

	if (
		( options.deep || runtime.unflatKeys )
		&& sourceValue
		&& ( typeof sourceValue === 'object' || ( options.deepFunc && typeof sourceValue === 'function' ) )
		&& ( ! options.descriptor || ! sourceDescriptor.get )
		// not a condition we just cache sourceValueProto now... ok it's trashy ><
		&& ( ( sourceValueProto = Object.getPrototypeOf( sourceValue ) ) || true )
		&& ( ! ( options.deep instanceof Set ) || options.deep.has( sourceValueProto ) )
		&& ( ! options.immutables || ! options.immutables.has( sourceValueProto ) )
		&& ( ! options.preserve || targetValueIsObject )
		&& ( ! mask || targetValueIsObject )
	) {
		let indexOfSource = options.circular ? runtime.references.sources.indexOf( sourceValue ) : - 1 ;

		if ( options.flat ) {
			// No circular references reconnection when in 'flat' mode
			if ( indexOfSource >= 0 ) { return ; }

			extendOne(
				{
					depth: runtime.depth + 1 ,
					prefix: runtime.prefix + sourceKey + options.flat ,
					references: runtime.references
				} ,
				options , target , sourceValue , mask
			) ;
		}
		else {
			if ( indexOfSource >= 0 ) {
				// Circular references reconnection...
				targetValue = runtime.references.targets[ indexOfSource ] ;

				if ( options.descriptor ) {
					Object.defineProperty( target , targetKey , {
						value: targetValue ,
						enumerable: sourceDescriptor.enumerable ,
						writable: sourceDescriptor.writable ,
						configurable: sourceDescriptor.configurable
					} ) ;
				}
				else {
					target[ targetKey ] = targetValue ;
				}

				return ;
			}

			if ( ! targetValueIsObject || ! Object.hasOwn( target , targetKey ) ) {
				if ( Array.isArray( sourceValue ) ) { targetValue = [] ; }
				else if ( options.proto ) { targetValue = Object.create( sourceValueProto ) ; }
				else if ( options.inherit ) { targetValue = Object.create( sourceValue ) ; }
				else { targetValue = {} ; }

				if ( options.descriptor ) {
					Object.defineProperty( target , targetKey , {
						value: targetValue ,
						enumerable: sourceDescriptor.enumerable ,
						writable: sourceDescriptor.writable ,
						configurable: sourceDescriptor.configurable
					} ) ;
				}
				else {
					target[ targetKey ] = targetValue ;
				}
			}
			else if ( options.proto && Object.getPrototypeOf( targetValue ) !== sourceValueProto ) {
				Object.setPrototypeOf( targetValue , sourceValueProto ) ;
			}
			else if ( options.inherit && Object.getPrototypeOf( targetValue ) !== sourceValue ) {
				Object.setPrototypeOf( targetValue , sourceValue ) ;
			}

			if ( options.circular ) {
				runtime.references.sources.push( sourceValue ) ;
				runtime.references.targets.push( targetValue ) ;
			}

			if ( runtime.unflatKeys && runtime.unflatIndex < runtime.unflatKeys.length - 1 ) {
				// Finish unflatting this property
				let nextSourceKey = runtime.unflatKeys[ runtime.unflatIndex + 1 ] ;

				extendOneKV(
					{
						depth: runtime.depth ,	// keep the same depth
						unflatKeys: runtime.unflatKeys ,
						unflatIndex: runtime.unflatIndex + 1 ,
						unflatFullKey: runtime.unflatFullKey ,
						prefix: '' ,
						references: runtime.references
					} ,
					options , targetValue , source , nextSourceKey , mask
				) ;
			}
			else {
				// Recursively extends sub-object
				extendOne(
					{
						depth: runtime.depth + 1 ,
						prefix: '' ,
						references: runtime.references
					} ,
					options , targetValue , sourceValue , mask
				) ;
			}
		}
	}
	else if ( mask && ( targetValue === undefined || targetValueIsObject || sourceValueIsObject ) ) {
		// Do not create new value, and so do not delete source's properties that were not moved.
		// We also do not overwrite object with non-object, and we don't overwrite non-object with object (preserve hierarchy)
		return ;
	}
	else if ( options.preserve && targetValue !== undefined ) {
		// Do not overwrite, and so do not delete source's properties that were not moved
		return ;
	}
	else if ( ! options.inherit ) {
		if ( options.descriptor ) { Object.defineProperty( target , targetKey , sourceDescriptor ) ; }
		else { target[ targetKey ] = targetValue = sourceValue ; }
	}

	// Delete owned property of the source object
	if ( options.move ) { delete source[ sourceKey ] ; }
}


},{}],6:[function(require,module,exports){
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



const treePath = {} ;
module.exports = treePath ;



const PROTO_POLLUTION_MESSAGE = 'This would cause prototype pollution' ;



treePath.op = function( type , object , path , value ) {
	var i , parts , last , pointer , key , isArray = false , pathArrayMode = false , isGenericSet , canBeEmpty = true ;

	if ( ! object || typeof object !== 'object' ) { return ; }

	if ( typeof path === 'string' ) {
		// Split the path into parts
		if ( path ) { parts = path.match( /([.#[\]]|[^.#[\]]+)/g ) ; }
		else { parts = [ '' ] ; }

		if ( parts[ 0 ] === '.' ) { parts.unshift( '' ) ; }
		if ( parts[ parts.length - 1 ] === '.' ) { parts.push( '' ) ; }
	}
	else if ( Array.isArray( path ) ) {
		parts = path ;
		pathArrayMode = true ;
		/*
		for ( i = 0 ; i < parts.length ; i ++ ) {
			if ( typeof parts[ i ] !== 'string' || typeof parts[ i ] !== 'number' ) { parts[ i ] = '' + parts[ i ] ; }
		}
		//*/
	}
	else {
		throw new TypeError( '[tree.path] .' + type + '(): the path argument should be a string or an array' ) ;
	}

	switch ( type ) {
		case 'get' :
		case 'delete' :
			isGenericSet = false ;
			break ;
		case 'set' :
		case 'define' :
		case 'inc' :
		case 'dec' :
		case 'append' :
		case 'prepend' :
		case 'concat' :
		case 'insert' :
		case 'autoPush' :
			isGenericSet = true ;
			break ;
		default :
			throw new TypeError( "[tree.path] .op(): wrong type of operation '" + type + "'" ) ;
	}

	//console.log( parts ) ;
	// The pointer start at the object's root
	pointer = object ;

	last = parts.length - 1 ;

	for ( i = 0 ; i <= last ; i ++ ) {
		if ( pathArrayMode ) {
			if ( key === undefined ) {
				key = parts[ i ] ;
				if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }
				continue ;
			}

			if ( typeof pointer[ key ] === 'function' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }
			if ( ! pointer[ key ] || typeof pointer[ key ] !== 'object' ) {
				if ( ! isGenericSet ) { return undefined ; }
				pointer[ key ] = {} ;
			}

			pointer = pointer[ key ] ;
			key = parts[ i ] ;
			if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }
			continue ;
		}
		else if ( parts[ i ] === '.' ) {
			isArray = false ;

			if ( key === undefined ) {
				if ( ! canBeEmpty ) {
					canBeEmpty = true ;
					continue ;
				}

				key = '' ;
			}

			if ( typeof pointer[ key ] === 'function' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }
			if ( ! pointer[ key ] || typeof pointer[ key ] !== 'object' ) {
				if ( ! isGenericSet ) { return undefined ; }
				pointer[ key ] = {} ;
			}

			pointer = pointer[ key ] ;
			canBeEmpty = true ;

			continue ;
		}
		else if ( parts[ i ] === '#' || parts[ i ] === '[' ) {
			isArray = true ;
			canBeEmpty = false ;

			if ( key === undefined ) {
				// The root element cannot be altered, we are in trouble if an array is expected but we have only a regular object.
				if ( ! Array.isArray( pointer ) ) { return undefined ; }
				continue ;
			}

			if ( typeof pointer[ key ] === 'function' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }
			if ( ! pointer[ key ] || ! Array.isArray( pointer[ key ] ) ) {
				if ( ! isGenericSet ) { return undefined ; }
				pointer[ key ] = [] ;
			}

			pointer = pointer[ key ] ;

			continue ;
		}
		else if ( parts[ i ] === ']' ) {
			// Closing bracket: do nothing
			canBeEmpty = false ;
			continue ;
		}

		canBeEmpty = false ;

		if ( ! isArray ) {
			key = parts[ i ] ;
			if ( typeof key === 'object' || key === '__proto__' ) { throw new Error( PROTO_POLLUTION_MESSAGE ) ; }
			continue ;
		}

		switch ( parts[ i ] ) {
			case 'length' :
				key = 'length' ;
				break ;

			// Pseudo-key
			case 'first' :
				key = 0 ;
				break ;
			case 'last' :
				key = pointer.length - 1 ;
				if ( key < 0 ) { key = 0 ; }
				break ;
			case 'next' :
				if ( ! isGenericSet ) { return undefined ; }
				key = pointer.length ;
				break ;
			case 'insert' :
				if ( ! isGenericSet ) { return undefined ; }
				pointer.unshift( undefined ) ;
				key = 0 ;
				break ;

			// default = number
			default :
				// Convert the string key to a numerical index
				key = parseInt( parts[ i ] , 10 ) ;
		}
	}

	switch ( type ) {
		case 'get' :
			return pointer[ key ] ;
		case 'delete' :
			if ( isArray && typeof key === 'number' ) { pointer.splice( key , 1 ) ; }
			else { delete pointer[ key ] ; }
			return ;
		case 'set' :
			pointer[ key ] = value ;
			return pointer[ key ] ;
		case 'define' :
			// define: set only if it doesn't exist
			if ( ! ( key in pointer ) ) { pointer[ key ] = value ; }
			return pointer[ key ] ;
		case 'inc' :
			if ( typeof pointer[ key ] === 'number' ) { pointer[ key ] ++ ; }
			else if ( ! pointer[ key ] || typeof pointer[ key ] !== 'object' ) { pointer[ key ] = 1 ; }
			return pointer[ key ] ;
		case 'dec' :
			if ( typeof pointer[ key ] === 'number' ) { pointer[ key ] -- ; }
			else if ( ! pointer[ key ] || typeof pointer[ key ] !== 'object' ) { pointer[ key ] = - 1 ; }
			return pointer[ key ] ;
		case 'append' :
			if ( ! pointer[ key ] ) { pointer[ key ] = [ value ] ; }
			else if ( Array.isArray( pointer[ key ] ) ) { pointer[ key ].push( value ) ; }
			//else ? do nothing???
			return pointer[ key ] ;
		case 'prepend' :
			if ( ! pointer[ key ] ) { pointer[ key ] = [ value ] ; }
			else if ( Array.isArray( pointer[ key ] ) ) { pointer[ key ].unshift( value ) ; }
			//else ? do nothing???
			return pointer[ key ] ;
		case 'concat' :
			if ( ! pointer[ key ] ) { pointer[ key ] = value ; }
			else if ( Array.isArray( pointer[ key ] ) && Array.isArray( value ) ) {
				pointer[ key ] = pointer[ key ].concat( value ) ;
			}
			//else ? do nothing???
			return pointer[ key ] ;
		case 'insert' :
			if ( ! pointer[ key ] ) { pointer[ key ] = value ; }
			else if ( Array.isArray( pointer[ key ] ) && Array.isArray( value ) ) {
				pointer[ key ] = value.concat( pointer[ key ] ) ;
			}
			//else ? do nothing???
			return pointer[ key ] ;
		case 'autoPush' :
			if ( pointer[ key ] === undefined ) { pointer[ key ] = value ; }
			else if ( Array.isArray( pointer[ key ] ) ) { pointer[ key ].push( value ) ; }
			else { pointer[ key ] = [ pointer[ key ] , value ] ; }
			return pointer[ key ] ;
	}
} ;



// get, set and delete use the same op() function
treePath.get = treePath.op.bind( undefined , 'get' ) ;
treePath.delete = treePath.op.bind( undefined , 'delete' ) ;
treePath.set = treePath.op.bind( undefined , 'set' ) ;
treePath.define = treePath.op.bind( undefined , 'define' ) ;
treePath.inc = treePath.op.bind( undefined , 'inc' ) ;
treePath.dec = treePath.op.bind( undefined , 'dec' ) ;
treePath.append = treePath.op.bind( undefined , 'append' ) ;
treePath.prepend = treePath.op.bind( undefined , 'prepend' ) ;
treePath.concat = treePath.op.bind( undefined , 'concat' ) ;
treePath.insert = treePath.op.bind( undefined , 'insert' ) ;
treePath.autoPush = treePath.op.bind( undefined , 'autoPush' ) ;



// Prototype used for object creation, so they can be created with Object.create( tree.path.prototype )
treePath.prototype = {
	get: function( path ) { return treePath.get( this , path ) ; } ,
	delete: function( path ) { return treePath.delete( this , path ) ; } ,
	set: function( path , value ) { return treePath.set( this , path , value ) ; } ,
	define: function( path , value ) { return treePath.define( this , path , value ) ; } ,
	inc: function( path , value ) { return treePath.inc( this , path , value ) ; } ,
	dec: function( path , value ) { return treePath.dec( this , path , value ) ; } ,
	append: function( path , value ) { return treePath.append( this , path , value ) ; } ,
	prepend: function( path , value ) { return treePath.prepend( this , path , value ) ; } ,
	concat: function( path , value ) { return treePath.concat( this , path , value ) ; } ,
	insert: function( path , value ) { return treePath.insert( this , path , value ) ; } ,
	autoPush: function( path , value ) { return treePath.autoPush( this , path , value ) ; }
} ;



// Upgrade an object so it can support get, set and delete at its root
treePath.upgrade = function( object ) {
	Object.defineProperties( object , {
		get: { value: treePath.op.bind( undefined , 'get' , object ) } ,
		delete: { value: treePath.op.bind( undefined , 'delete' , object ) } ,
		set: { value: treePath.op.bind( undefined , 'set' , object ) } ,
		define: { value: treePath.op.bind( undefined , 'define' , object ) } ,
		inc: { value: treePath.op.bind( undefined , 'inc' , object ) } ,
		dec: { value: treePath.op.bind( undefined , 'dec' , object ) } ,
		append: { value: treePath.op.bind( undefined , 'append' , object ) } ,
		prepend: { value: treePath.op.bind( undefined , 'prepend' , object ) } ,
		concat: { value: treePath.op.bind( undefined , 'concat' , object ) } ,
		insert: { value: treePath.op.bind( undefined , 'insert' , object ) } ,
		autoPush: { value: treePath.op.bind( undefined , 'autoPush' , object ) }
	} ) ;
} ;


},{}],7:[function(require,module,exports){
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


},{}]},{},[2])(2)
});
