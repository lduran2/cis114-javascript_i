/**
 * /scripts/populate_json_forms.js
 * Gets data from the JSON action of each JSON form and populates them.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-12-03t20:01
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.1.0
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/scripts/populate_json_forms.js
 *
 * CHANGELOG :
 *     v1.1.0 - 2021-12-03t20:01
 *         started populating multiple forms
 *
 *     v1.0.0 - 2021-12-03t19:00
 *         started with a specific form
 */
'use strict';

/**
 * Gets data from '/db/leomar.json' and displays them.
 * @param evnt : Event = the event that triggers this listener
 */
function main(evnt) {
    /* get and check the document document body */
    const BODY_EL = document.querySelector('body');
    if (!BODY_EL) {
        return;
    } /* if (!BODY_EL) */

    /* get the JSON forms */
    const JSON_FORM_ELS = BODY_EL.querySelectorAll("form[action$='.json']");
    /* loop through them */
    for (const FORM of JSON_FORM_ELS) {
        /* get the action */
        const ACTION = FORM.getAttribute('action');
        console.log(ACTION);
    } /* end for (const FORM of JSON_FORM_ELS) */

    console.log('Done.');
} /* end function main() */

/* add main to the window load event */
document.addEventListener('DOMContentLoaded', main);
