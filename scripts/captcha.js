/**
 * /scripts/captcha.js
 * Sets up the captcha puzzle using DOM, including the event handlers.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-11-15t23:50
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.1.1
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/scripts/captcha.js
 *
 * CHANGELOG :
 *     v1.1.1 - 2021-11-15t23:50
 *         implemented activation and its checking
 *
 *     v1.1.0 - 2021-11-15t23:36
 *         showing randomized sequence
 *
 *     v1.0.5 - 2021-11-15t23:27
 *         set up success message, array randomized
 *
 *     v1.0.4 - 2021-11-15t23:00
 *         added listener to each tile
 *
 *     v1.0.3 - 2021-11-15t23:00
 *         added listener to each tile
 *
 *     v1.0.2 - 2021-11-15t22:48
 *         counting the tile numbers
 *
 *     v1.0.1 - 2021-11-15t22:18
 *         inserted the sequence element
 *
 *     v1.0.0 - 2021-11-15t21:40
 *         window load event
 */
'use strict';

/**
 * Sets up the captcha puzzle using DOM, including the event handlers.
 * @param evnt : Event = the event that triggers this listener
 */
function main(evnt) {
    const N_SEQUENCE_DIGITS = 3;    /* # digits to use in the sequence */
    const N_TILES = 10;             /* # clickable tiles */
    const N_COLS = 3;               /* # columns to organize tiles */

    /* get and check the body element */
    const BODY_EL = document.querySelector('body');
    if (!BODY_EL) {
        return;
    } /* if (!BODY_EL) */

    /* get and check the instruction */
    const INSTRUCTION_EL = BODY_EL.querySelector('#instruction');
    if (!INSTRUCTION_EL) {
        return;
    } /* if (!INSTRUCTION_EL) */

    /* shuffle the numbers */
    const RANDOM_NUMBERS = getRandomArray(N_TILES);
    /* splice off the sequence array */
    const SEQUENCE = RANDOM_NUMBERS.splice(N_TILES - N_SEQUENCE_DIGITS);
    /* map to number and activated */
    const SEQUENCE_ACTIVE = SEQUENCE.map(function (el, idx, arr) {
        return {
            number: el,
            activated: false
        };
    });

    /* insert sequence of digits `SEQUENCE` to `INSTRUCTION_EL` */
    insertSequenceEl(SEQUENCE, INSTRUCTION_EL);

    /* set up the success message box without appending */
    const SUCCESS_EL = document.createElement('div');
    const SUCCESS_P_EL = document.createElement('p');
    /* the text node will be empty for now */
    const SUCCESS_TEXT = document.createTextNode('');
    SUCCESS_EL.setAttribute('id', 'success-message');
    SUCCESS_P_EL.appendChild(SUCCESS_TEXT);
    SUCCESS_EL.appendChild(SUCCESS_P_EL);

    /* append a puzzle with N_TILES, */
    appendPuzzle(N_TILES, N_COLS, BODY_EL, SEQUENCE_ACTIVE, SUCCESS_TEXT);

    /* append the success message box */
    BODY_EL.appendChild(SUCCESS_EL);

    console.log('Done.');
} /* end function main() */

/**
 * Inserts a sequence of the length `nSequenceDigits` into the last
 * sentence in element `parentNode`.
 * @param sequence : Array = digits that make up the sequence
 * @param parentNode : Node = element to add the sequence to
 * @return object of the string value before the sequence, the sequence,
 * and the text node after the sequence
 */
function insertSequenceEl(sequence, parentNode) {
    /* split up the text before and after the last period */
    /* text node in instruction */
    const INSTRUCTION_TEXT = parentNode.lastChild;
    /* index of end of the last sentence */
    const LAST_PERIOD = INSTRUCTION_TEXT.nodeValue.lastIndexOf('.');
    /* everything before that index */
    const BEFORE_SEQUENCE =
        INSTRUCTION_TEXT.nodeValue.substring(0, LAST_PERIOD);
    /* everything after that index */
    const AFTER_SEQUENCE =
        INSTRUCTION_TEXT.nodeValue.substring(LAST_PERIOD);
    const AFTER_SEQUENCE_TEXT = document.createTextNode(AFTER_SEQUENCE);

    /* place a space before the sequence */
    INSTRUCTION_TEXT.nodeValue = (BEFORE_SEQUENCE + ' ');

    /* create the sequence element */
    const SEQUENCE_EL = document.createElement('span');
    SEQUENCE_EL.classList.add('sequence');

    /* add all digits to the sequence */
    for (const DIGIT of sequence) {
        const DIGIT_EL = document.createElement('span');
        const DIGIT_TEXT = document.createTextNode(`${DIGIT}`);
        DIGIT_EL.appendChild(DIGIT_TEXT);
        SEQUENCE_EL.appendChild(DIGIT_EL);
    } /* end for (const DIGIT of sequence) */

    /* append the sequence */
    parentNode.appendChild(SEQUENCE_EL);

    /* append the period */
    parentNode.appendChild(AFTER_SEQUENCE_TEXT);

    return {
        before: BEFORE_SEQUENCE,
        sequence: SEQUENCE_EL,
        afterText: AFTER_SEQUENCE_TEXT
    };
} /* end function insertSequenceEl(nSequenceDigits, parentNode) */

/**
 * Creates and appends a CAPTCHA puzzle to `parentNode` of `nTiles`
 * tiles and of width `nCols`.
 * @param nTiles : Number = number of tiles
 * @param nCols : Number = width of the puzzle
 * @param parentNode : Node = to add this puzzle to
 * @param sequenceActivated : Array = the sequence and whether each
 *      digit is activated
 * @param successText : Node = text node to change
 * @return the puzzle element
 */
function appendPuzzle(nTiles, nCols, parentNode, sequenceActivated, successText) {
    /* create puzzle list */
    const PUZZLE_EL = document.createElement('ol');
    PUZZLE_EL.setAttribute('id', 'puzzle');

    /* row loop */
    for (let iRow = 1, nRows=((nTiles - 1)/nCols); (iRow <= nRows); ++iRow)
    {
        /* column loop */
        for (let iCol = 1; (iCol <= nCols); ++iCol) {
            /* calculate the digit */
            const DIGIT = nCols * (nRows - iRow) + iCol;
            /* create list items and spans */
            const LI_EL = document.createElement('li');
            const SPAN_EL = document.createElement('span');
            /* add the click listener with the current digit */
            SPAN_EL.addEventListener('click', createClickTile(DIGIT, sequenceActivated, successText));
            /* put together and append to puzzle */
            LI_EL.appendChild(SPAN_EL);
            PUZZLE_EL.appendChild(LI_EL);
        } /* for (let iCol = 1; (iCol <= nCols); ++iCol) */
    } /* for (let iRow = 1, nRows=((nTiles - 1)/nCols); (iRow <= nRows); ++iRow) */

    /* create list item and span for tile 0 */
    const TILE0_LI_EL = document.createElement('li');
    const TILE0_SPAN_EL = document.createElement('span');
    /* add the click listener with the current digit */
    TILE0_SPAN_EL.addEventListener('click', createClickTile(0, sequenceActivated, successText));
    /* put together and append to puzzle */
    TILE0_LI_EL.appendChild(TILE0_SPAN_EL);
    PUZZLE_EL.appendChild(TILE0_LI_EL);

    /* append the puzzle element to end of the body */
    parentNode.append(PUZZLE_EL);

    return PUZZLE_EL;
} /* end function appendPuzzle(nTiles, nCols, parentNode) */

/**
 * Creates a click listener for the tile given by `tileNo`.
 * @param tileNo : Number = the number of the tile
 * @param sequenceActivated : Array = the sequence and whether each
 *      digit is activated
 * @param successText : Node = text node to change
 * @return the click event listener
 */
function createClickTile(tileNo, sequenceActivated, successText) {
    return function (evnt) {
        /* log the event */
        console.log('createClickTile(tileNo, sequenceActivated, successText)(evnt)');
        console.log(tileNo);
        console.log(sequenceActivated);
        console.log(successText);
        console.log(evnt);

        /* activate this tile if in sequence */
        if (!activateTileNo(tileNo, sequenceActivated)) {
            /* if not activated give a fail message */
            successText.nodeValue = 'You pressed a wrong tile!';
        }
        /* otherwise check if all active */
        else if (allActivated(sequenceActivated)) {
            /* success! */
            successText.nodeValue = 'You have successfully pressed all the buttons!';
        }
    }; /* return function (evnt) */
} /* function createClickTile(tileNo, successText) */

/**
 * Activates this tile if in the sequence.
 * @param tileNo : Number = the number of the tile
 * @param sequenceActivated : Array = the sequence and whether each
 *      digit is activated
 * @return true if found in the sequence, false otherwise
 */
function activateTileNo(tileNo, sequenceActivated) {
    /* loop through sequence */
    for (const DIGIT_OBJ of sequenceActivated) {
        /* if the digit matches this tile */
        if (DIGIT_OBJ.number == tileNo) {
            /* activate the tile */
            DIGIT_OBJ.activated = true;
            return true; /* stop the loop */
        } /* if (DIGIT_OBJ.number == tileNo) */
    } /* for (const DIGIT_OBJ of sequenceActivated) */
    return false;
} /* function activateTileNo(tileNo, sequenceActivated) */

/**
 * Checks if all tiles in the sequence are activated.
 * @param sequenceActivated : Array = the sequence and whether each
 *      digit is activated
 * @return true if all tiles active, false otherwise
 */
function allActivated(sequenceActivated) {
    /* loop through sequence */
    for (const DIGIT_OBJ of sequenceActivated) {
        /* if the digit matches this tile */
        if (!DIGIT_OBJ.activated) {
            return false; /* stop the loop */
        } /* if (!DIGIT_OBJ.activated) */
    } /* for (const DIGIT_OBJ of sequenceActivated) */
    return true;    /* success! */
} /* function activateTileNo(tileNo, sequenceActivated) */

/**
 * Creates a randomized array of the given length.
 * By: Professor Laurence Liss
 * @param len : Number = length of the array
 * @return a list of randomized numbers [0..len[
 */
function getRandomArray(len) {
    let theArray = Array(len).fill(0).map((v, i) => { return i });
    for (let i = len - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = theArray[i];
        theArray[i] = theArray[j]
        theArray[j] = temp;
    }
    return theArray;
} /* function getRandomArray(len) */


/* add main to the window load event */
document.addEventListener('DOMContentLoaded', main);
