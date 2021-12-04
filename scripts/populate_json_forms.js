/**
 * /scripts/populate_json_forms.js
 * Gets data from the JSON action of each JSON form and populates them.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-12-03t22:11
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.1.4
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/scripts/populate_json_forms.js
 *
 * CHANGELOG :
 *     v1.1.4 - 2021-12-03t22:11
 *         populating string fields
 *
 *     v1.1.3 - 2021-12-03t22:03
 *         check the type of the values in the data
 *
 *     v1.1.2 - 2021-12-03t21:30
 *         tested multiple forms.
 *         Had a null JSON file before the actual form.
 *         Result: XMLHttpRequest objects cannot be reused.
 *
 *     v1.1.1 - 2021-12-03t21:14
 *         testing `REQUEST.onerror`.
 *         All actions are replaced with
 *         <https://developer.mozilla.org/>, causing a XSS error that
 *         stops all events.
 *
 *     v1.1.0 - 2021-12-03t20:01
 *         started populating multiple forms
 *
 *     v1.0.0 - 2021-12-03t19:00
 *         started with a specific form
 */
'use strict';

/** enumeration of the requestType for JSON files */
const JSON_TYPE = 'json';

/**
 * Gets data from the JSON action of each JSON form and populates them.
 * @param evnt : Event = the event that triggers this listener
 */
function main(evnt) {
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
        sendJsonFormRequest(FORM_EL);
    } /* end for (const FORM_EL of JSON_FORM_ELS) */

    /* finish */
    console.log('Done.');
} /* end function main(evnt) */

/**
 * Sends a request to a JSON file using the given form element's method
 * and action.
 * @param formEl : Element = for which to send a JSON request
 */
function sendJsonFormRequest(formEl) {
    /* create a new request */
    const REQUEST = new XMLHttpRequest();
    /* get the form action and method */
    const METHOD = formEl.getAttribute('method');
    const ACTION = formEl.getAttribute('action');
    /* open the request */
    REQUEST.open(METHOD, ACTION);
    REQUEST.responseType = JSON_TYPE;
    /* add the load and error events */
    REQUEST.addEventListener('load', createPopulateForm(formEl));
    REQUEST.addEventListener('error', throwRequestLoadingError);
    /* send the request */
    REQUEST.send();
} /* function sendJsonFormRequest(formEl) */

/**
 * Creates an event listener that populates the given form element.
 * @param evnt : Event = the event that triggers this listener
 */
function createPopulateForm(formEl) {
    return function (evnt) {
        /* log the event */
        console.log('createPopulateForm(formEl)(evnt)');
        console.log('formEl:', formEl);
        console.log('evnt:', evnt);
        /* get the response data */
        const DATA = evnt.target.response;
        /* iterate the keys of DATA */
        for (const KEY of Object.keys(DATA)) {
            /* get the value at KEY in DATA */
            const VALUE = DATA[KEY];
            /* if the type of VALUE is string */
            if ('string'===typeof VALUE) {
                /* update corresponding form element's value */
                formEl.elements[KEY].value = VALUE;
                /* and the field's size */
                formEl.elements[KEY].setAttribute('size', VALUE.length);
            } /* end if ('string'===typeof VALUE) { */
            /* if the type of VALUE is array */
            else if ('array'===typeof VALUE) {
                console.log('array', VALUE);
            } /* end if ('array'===typeof VALUE) */
        } /* for (const KEY of Object.keys(DATA)) */
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
    /* stop the program */
    throw 'error loading request';
} /* end function throwRequestLoadingError(evnt) */

/* add main to the window load event */
document.addEventListener('DOMContentLoaded', main);
