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
 * Gets data from the JSON action of each JSON form and populates them.
 * @param evnt : Event = the event that triggers this listener
 */
function main(evnt) {
    const JSON_TYPE = 'json';
    const REQUEST = new XMLHttpRequest();
    /* get and check the document document body */
    const BODY_EL = document.querySelector('body');
    if (!BODY_EL) {
        return;
    } /* if (!BODY_EL) */

    /* get the JSON forms */
    const JSON_FORM_SELECTOR = `form[action$='.${JSON_TYPE}']`;
    const JSON_FORM_ELS = BODY_EL.querySelectorAll(JSON_FORM_SELECTOR);
    /* loop through them */
    for (const FORM_EL of JSON_FORM_ELS) {
        /* get the form action and method */
        const METHOD = FORM_EL.getAttribute('method');
        const ACTION = FORM_EL.getAttribute('action');
        /* open the request */
        REQUEST.open(METHOD, 'https://developer.mozilla.org/');
        REQUEST.responseType = JSON_TYPE;
        /* add the load and error events */
        REQUEST.addEventListener('load', createPopulateForm(FORM_EL));
        REQUEST.addEventListener('error', throwRequestLoadingError);
        /* send the request */
        REQUEST.send();
    } /* end for (const FORM_EL of JSON_FORM_ELS) */

    /* finish */
    console.log('Done.');
} /* end function main() */

/**
 * Creates an event that populates the given form element.
 * @param evnt : Event = the event that triggers this listener
 */
function createPopulateForm(formEl) {
    return function (evnt) {
        /* log the event */
        console.log('createPopulateForm(formEl)(evnt)');
        console.log('formEl:', formEl);
        console.log('evnt:', evnt);
        /* expand the response */
        console.dir(evnt.target.response);
    }; /* return function (evnt) */
} /* end function createPopulateForm(formEl) */

/**
 * Throws a request loading error.
 * @param evnt : Event = the event that triggers this listener
 */
function throwRequestLoadingError(evnt) {
    /* log the event */
    console.log('throwRequestLoadingError(evnt)');
    console.log('evnt:', evnt);
    throw 'error loading request';
} /* end function throwRequestLoadingError(evnt) */

/* add main to the window load event */
document.addEventListener('DOMContentLoaded', main);
