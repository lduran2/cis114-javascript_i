/**
 * /scripts/event.js
 * Sets up event handlers for `w9hw-events` "Concepts Assignment - Events".
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-11-12t22:43
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.0.1
 * Canonical : https://github.com/lduran2/cis114-javascript-projects/blob/master/scripts/map-jnumber.js
 *
 * CHANGELOG :
 *     v1.0.1 - 2021-11-12t22:43
 *         added heading 1 event listener
 *
 *     v1.0.0 - 2021-11-12t22:10
 *         window load event
 */
'use strict';

/**
 * Toggles the activate class on the event target.
 * @param evnt : Event = the event that triggers this listener
 */
function toggleActivate(evnt) {
    console.log('toggleActivate triggered');
    console.log(evnt);
} /* end function toggleActivate(evnt) */

/* add the window load event */
document.addEventListener('DOMContentLoaded', function (evnt) {
    /* get the document body and check if it exists */
    const BODY_EL = document.querySelector('body');   /* the body element */
    if (!BODY_EL) {
        return;
    } /* if (!BODY_EL) */

    /* get the elements */
    const H1_EL = BODY_EL.querySelector('h1');        /* first h1 element */
    const LI_ELS = BODY_EL.querySelectorAll('li');  /* list item elements */

    /* if H1 found */
    if (H1_EL) {
        /* add the event listener */
        H1_EL.addEventListener('click', toggleActivate);
    } /* if (H1_EL) */

    /* main is finished */
    console.log('Done.');
});