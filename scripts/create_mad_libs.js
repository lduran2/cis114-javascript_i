/**
 * /scripts/create_mad_libs.js
 * Chooses a random mad lib and applies it to input from the user to
 * create a very short story.
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-10-04t23:21
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.2.0
 *
 * CHANGELOG :
 *     v1.2.0 - 2021-10-04t23:21
 *         added the 3 billy goats mad lib
 *
 *     v1.1.1 - 2021-10-04t18:12
 *         refactored function out of templates
 *         set up changelog
 *
 *     v1.1 - 2021-10-04t17:20
 *         ask for a phrase of each type for that mad lib
 *
 *     v1.0 - 2021-10-04t17:12
 *         created and tested template function
 */

/* all of the mad libs */
const MAD_LIBS = [
	{
		'template': 'Once upon a time, there were ${parseInt(input[0], 10) + 2} little ${input[1]}. They protected a ${input[2]} that spans a river ${Math.floor((parseInt(input[3], 10) + 3)*3.28)} feet ${Math.floor((parseInt(input[3], 10) + 3)*39.37) % 12} inches across. One day, a troll wanted to cross the ${input[2]} to ${input[4]}. It was a strong troll, weighing in at ${parseInt(input[5], 10) + 150} lbs.',
		'types': [ 'a number', 'an animal (plural)', 'a landmark', 'a length [in meters]', 'a fun activity', 'a weight [in lbs]' ]
	}
];

/* choose a random mad lib */
const I_MAD_LIBS = Math.floor(Math.random() * MAD_LIBS.length);	/* generate random number [0, MADLIBS.length[ */
const RANDOM_MAD_LIB = MAD_LIBS[I_MAD_LIBS];	/* choose corresponding mad lib */

/* create the input array */
const INPUT = [];

/* ask for a phrase of each type in RANDOM_MAD_LIB.types */
for (const TYPE of RANDOM_MAD_LIB.types) {
	INPUT.push(prompt(`Please enter ${TYPE}.`));
} /* for (const TYPE of RANDOM_MAD_LIB.types) */

/* apply the template */
/* since template literals are static runtime constants,
 * they need a function wrapper to be compiled dynamically */
const RESULT = new Function('input', 'return `' + RANDOM_MAD_LIB.template + '`;')(INPUT);
/* print the result */
console.log(RESULT);
