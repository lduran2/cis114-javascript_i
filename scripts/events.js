/**
 * /scripts/event.js
 * Sets up event handlers for `w9hw-events` "Concepts Assignment - Events".
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-11-12t23:14
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.0.4
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/scripts/events.js
 *
 * CHANGELOG :
 *     v1.0.4 - 2021-11-12t23:14
 *         clicking toggles using `Elements.classList.toggle`
 *
 *     v1.0.3 - 2021-11-12t23:03
 *         clicking toggles the event class
 *
 *     v1.0.2 - 2021-11-12t22:48
 *         clicking always adds activated class
 *
 *     v1.0.1 - 2021-11-12t22:43
 *         added heading 1 event listener
 *
 *     v1.0.0 - 2021-11-12t22:10
 *         window load event
 */
'use strict';

/**
 * Toggles the activated class on the event target.
 * @param evnt : Event = the event that triggers this listener
 */
function toggleActivate(evnt) {
    /* log the event */
    console.log('toggleActivate triggered!');
    console.log(evnt);

    /* Element.classList actually has a toggle method */
    /* https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle */
    /**
     * for an implementation using a data attribute to check,
     * @see https://github.com/lduran2/cis114-javascript_i/blob/52552c306899a9068e0dc343f05c39b5dfe87199/scripts/events.js
     * A better justification for data attribute is the complexity of
     * calling the contains method followed by add or remove.
     */

     evnt.target.classList.toggle('activated');
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