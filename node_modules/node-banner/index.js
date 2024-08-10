'use strict';

const {promisify} = require('util');
const kleur = require('kleur');
const figlet = require('figlet');

const printTitle = promisify(figlet);

/**
 * All available colors as supported by kleur library.
 */

const availableColors = [
	'black',
	'red',
	'green',
	'yellow',
	'blue',
	'magenta',
	'cyan',
	'white',
	'gray',
	'grey'
];

/**
 * @param {String} title - Name of the utility
 * @param {String} [titleColor] - A suitable color of choice for title
 * @param {String} [tagLineColor] - A suitable color of choice for tagline
 *
 * returns {void}
 */
const init = (title, titleColor, tagLineColor) => {
	// Clears the terminal screen.

	process.stdout.write('\u001B[2J\u001B[0;0f');

	if (typeof title === 'undefined' || title === '') {
		throw new Error('The argument title is required.');
	}

	if (!availableColors.includes(titleColor)) {
		throw new RangeError('Title color out of range.');
	}

	if (!availableColors.includes(tagLineColor)) {
		throw new RangeError('Tagline color out of range.');
	}
};

/**
 * @param {String} title - Name of the utility
 * @param {String} [tagLine] - A suitable tagline
 * @param {String} [titleColor] - A suitable title-color of choice
 * @param {String} [tagLineColor] - A suitable tagline-color of choice
 *
 * returns {void}
 */
const showBanner = async (
	title,
	tagLine,
	titleColor = 'red',
	tagLineColor = 'yellow'
) => {
	// Initialize script.

	init(title, titleColor, tagLineColor);

	/**
	 * Convert the title to uppercase if it was provided in lower case.
	 * It's just a convention to have the CLI capitalized.
	 */

	if (title.toLowerCase().includes('cli') && title === title.toLowerCase()) {
		const indexOfSeparator = title.indexOf('-');

		if (indexOfSeparator === -1) {
			title = title.charAt(0).toUpperCase() + title.substr(1, title.length);
		} else {
			title =
				title.charAt(0).toUpperCase() +
				title.substr(1, indexOfSeparator - 1) +
				' ' +
				title.substr(indexOfSeparator + 1, title.length).toUpperCase();
		}
	}

	try {
		const data = await printTitle(title);
		console.log(kleur.bold()[titleColor](data));

		// TagLine is optional.

		if (
			typeof tagLine !== 'undefined' &&
			tagLine !== '' &&
			tagLine.trim().length > 0
		) {
			console.log(' ' + kleur.bold()[tagLineColor](tagLine));
		}
	} catch (error) {
		throw error;
	}
};

module.exports = showBanner;
