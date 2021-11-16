/**
 * /scripts/captcha.js
 * Sets up the captcha puzzle using DOM, including the event handlers.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-11-15t22:48
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.0.2
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/scripts/captcha.js
 *
 * CHANGELOG :
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

    /* insert sequence of length `N_SEQUENCE_DIGITS` to `INSTRUCTION_EL` */
    insertSequenceEl(N_SEQUENCE_DIGITS, INSTRUCTION_EL);

    /* append a puzzle with N_TILES, */
    appendPuzzle(N_TILES, N_ROWS, BODY_EL);

    console.log('Done.');
} /* end function main() */

/**
 * Inserts a sequence of the length `nSequenceDigits` into the last
 * sentence in element `instructionEl`.
 * @param nSequenceDigits : Number = # digits for the sequence
 * @param instructionEl : Node = element to modify
 * @return tuple of the string value before the sequence, the sequence,
 * and the text node after the sequence
 */
function insertSequenceEl(nSequenceDigits, instructionEl) {
    /* split up the text before and after the last period */
    /* text node in instruction */
    const INSTRUCTION_TEXT = instructionEl.lastChild;
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
    for (let k = nSequenceDigits; (k > 0); --k) {
        const DIGIT_EL = document.createElement('span');
        const DIGIT_TEXT = document.createTextNode(`${k}`);
        DIGIT_EL.appendChild(DIGIT_TEXT);
        SEQUENCE_EL.appendChild(DIGIT_EL);
    } /* end for (let k = nSequenceDigits; (k > 0); --k) */

    /* append the sequence */
    instructionEl.appendChild(SEQUENCE_EL);

    /* append the period */
    instructionEl.appendChild(AFTER_SEQUENCE_TEXT);

    return [ BEFORE_SEQUENCE, SEQUENCE_EL, AFTER_SEQUENCE_TEXT ];
} /* end function insertSequenceEl(nSequenceDigits, instructionEl) */

function appendPuzzle(nTiles, nCols, bodyEl) {
    for (let iRow = 1, nRows=((nTiles - 1)/nCols); (iRow <= nRows); ++iRow)
    {
        for (let iCol = 1; (iCol <= nCols); ++iCol) {
            const digit = nCols * (nRows - iRow) + iCol;
            console.log(digit);
        }
    }
}

function createClickTile(tileNo) {
    return function (evnt) {
    };
}

/* add main to the window load event */
document.addEventListener('DOMContentLoaded', main);
