/**
 * /scripts/event.js
 * Sets up event handlers for `w9hw-events` "Concepts Assignment - Events".
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-11-12t22:48
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.0.2
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/scripts/events.js
 *
 * CHANGELOG :
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

    /* check the data attribute */
    /* https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes */
    /* I use this data attribute in case of a long class list
     * (searching a list vs searching a hashtable) */
    /* if not set */
    if ('data-activated' !== evnt.target.dataset.activated) {
        /* add the class */
        evnt.target.classList.add('activated');
        /* set a data attribute on the target */
        evnt.target.dataset.activated = 'data-activated';
    } /* end if ('data-activated' !== evnt.target.dataset.activated) */
    else {
        /* remove the class */
        evnt.target.classList.remove('activated');
        /* reset a data attribute on the target */
        evnt.target.dataset.activated = '';
    } /* end ('data-activated' !== evnt.target.dataset.activated) else */
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