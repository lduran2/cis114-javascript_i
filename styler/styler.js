/**
 * /styler/styler.js
 * Creates an applet to customize the look and feel of an article.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-11-22t19:13
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.0.1
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/styler/styler.js
 *
 * CHANGELOG :
 *     v1.0.1 - 2021-11-22t20:05
 *         create the form with only labels
 *
 *     v1.0.0 - 2021-11-22t19:13
 *         get the `h1` and `head` elements
 */
'use strict';

/**
 * Creates an applet to customize the look and feel of an article.
 * @param evnt : Event = the window onload event
 */
function main(evnt) {
    /* get and confirm the document header */
    const HEAD_EL = document.querySelector('head');
    if (!HEAD_EL) {
        return;
    } /* end if (!HEAD_EL) */

    /* get and confirm the top level heading */
    const H1_EL = document.querySelector('body h1');
    if (!H1_EL) {
        return;
    } /* end if (!H1_EL) */

    /* create the styler form */
    const STYLER = createStylerForm();
    /* insert it after H1_EL */
    H1_EL.parentNode.insertBefore(STYLER, H1_EL.nextSibling);

    /* finish */
    console.log('Done.');
} /* end function main(evnt) */

function createStylerForm() {
    /**
     * the colors defined by CSS 2.1
     * @see https://www.w3.org/TR/CSS21/syndata.html#value-def-color
     */
    const COLORS = 'maroon,red,orange,yellow,olive,purple,fuchsia,white,\
lime,green,navy,blue,aqua,teal,black,silver,gray'.split(',');
    /* an array of the properties of the fields */
    const FIELD_PROPERTIES = [
        {
            label: 'Font Color',
            element: 'select',
            type: '',
            values: COLORS
        },
        {
            label: 'Background Color',
            element: 'select',
            type: '',
            value: COLORS
        },
        {
            label: 'Font Size [pt]',
            element: 'input',
            type: 'number',
            value: '16'
        }
    ];
    const N_FIELD_PROPERTIES = FIELD_PROPERTIES.length;

    /* create the form container */
    const FORM_EL = document.createElement('form');
    FORM_EL.classList.add('styler');

    /* create its heading */
    const HEADER_EL = document.createElement('header');
    const H2_EL = document.createElement('h2');
    const H2_TEXT = document.createTextNode('Customize this page');
    H2_EL.append(H2_TEXT);
    HEADER_EL.append(H2_EL);
    FORM_EL.append(HEADER_EL);

    /* the ordered list of form fields */
    const OL_EL = document.createElement('ol');

    /* loop through the field properties */
    for (let k = 0; (k < N_FIELD_PROPERTIES); ++k) {
        /* get the label */
        const LABEL = FIELD_PROPERTIES[k].label;
        /* for an ID, convert a label to hyphenated format */
        const ID = LABEL.toLowerCase().replaceAll(' ', '-');
        /* create the list item element */
        const LI_EL = document.createElement('li');
        /* create the label element */
        const LABEL_EL = document.createElement('label');
        LABEL_EL.setAttribute('for', ID);
        const LABEL_TEXT = document.createTextNode(LABEL);
        LABEL_EL.append(LABEL_TEXT);
        /* assemble the list item and append it */
        LI_EL.append(LABEL_EL);
        OL_EL.append(LI_EL);
    } /* end for (; (k < N_FIELD_PROPERTIES); ) */

    /* append the list to the form */
    FORM_EL.append(OL_EL);

    /* return the form element */
    return FORM_EL;
} /* end function createStylerForm() */

/* add main listener to the window load event */
document.addEventListener('DOMContentLoaded', main);
