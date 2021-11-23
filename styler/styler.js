/**
 * /styler/styler.js
 * Creates an applet to customize the look and feel of an article.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-11-22t21:20
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.0.2
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/styler/styler.js
 *
 * CHANGELOG :
 *     v1.0.2 - 2021-11-22t21:20
 *         creating the select elements
 *
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
            values: COLORS,
            selected: 14
        },
        {
            label: 'Background Color',
            element: 'select',
            type: '',
            values: COLORS,
            selected: 7
        },
        {
            label: 'Font Size [pt]',
            element: 'input',
            type: 'number',
            values: [ '16' ],
            selected: 0
        }
    ];

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
    const STYLER = createForm(FIELD_PROPERTIES);

    /* add its header */
    const HEADER_EL = document.createElement('header');
    const H2_EL = document.createElement('h2');
    const H2_TEXT = document.createTextNode('Customize this page');
    H2_EL.appendChild(H2_TEXT);
    HEADER_EL.appendChild(H2_EL);
    STYLER.insertBefore(HEADER_EL, STYLER.firstChild);

    /* insert it after H1_EL */
    H1_EL.parentNode.insertBefore(STYLER, H1_EL.nextSibling);

    /* finish */
    console.log('Done.');
} /* end function main(evnt) */

/**
 * Creates a new form and all its components.
 * @return the new form
 */
function createForm(fieldProperties) {
    /* function(string, object)[] */
    /* maps the elements to their create functions */
    const CREATE_ELS = {};
    CREATE_ELS['select'] = createSelect;
    CREATE_ELS['input'] = createInput;

    /* create the form container */
    const FORM_EL = document.createElement('form');
    FORM_EL.classList.add('styler');

    /* the ordered list of form fields */
    const OL_EL = document.createElement('ol');

    /* loop through the field properties */
    for (const FIELD_PROPERTY of fieldProperties) {
        appendFormListItem(
            CREATE_ELS[FIELD_PROPERTY.element],
            FIELD_PROPERTY,
            OL_EL
        );
    } /* end for (const FIELD_PROPERTY of fieldProperties) */

    /* append the list to the form */
    FORM_EL.appendChild(OL_EL);

    /* return the form element */
    return FORM_EL;
} /* end function createForm() */

/**
 * Appends a form list item to the given node.
 * @param createElFunc : function(string, object) = the function to create the field
 *     contained in this list item
 * @param fieldProperty : object = the field's property object
 * @param parentNode : Node = to which to append
 * @return the new list item
 */
function appendFormListItem(createElFunc, fieldProperty, parentNode) {
    /* get the label */
    const LABEL = fieldProperty.label;
    /* for an ID, convert a label to hyphenated format */
    const ID = LABEL.toLowerCase().replaceAll(' ', '-');
    /* create the list item element */
    const LI_EL = document.createElement('li');
    /* create the label element */
    const LABEL_EL = document.createElement('label');
    LABEL_EL.setAttribute('for', ID);
    const LABEL_TEXT = document.createTextNode(LABEL);
    LABEL_EL.appendChild(LABEL_TEXT);
    /* create the form element */
    const FIELD_EL = createElFunc(ID, fieldProperty);
    /* assemble the list item and append it */
    LI_EL.appendChild(LABEL_EL);
    LI_EL.appendChild(FIELD_EL);
    parentNode.appendChild(LI_EL);
} /* end function createField(parentNode, fieldProperty) */

/**
 * Creates a new select element.
 * @param id : string = the id for the select element
 * @param fieldProperty : object = the field's property object
 * @return the new select element
 */
function createSelect(id, fieldPropety) {
    /* get important values from the field property */
    const VALUES = fieldPropety.values;
    const N_VALUES = fieldPropety.values.length;
    const SELECTED = fieldPropety.selected;

    /* create the select element */
    const SELECT_EL = document.createElement('select');
    SELECT_EL.setAttribute('id', id);
    SELECT_EL.setAttribute('name', id);

    /* append all options before SELECTED */
    for (let k = 0; (k < SELECTED); ++k) {
        appendStylerOption(VALUES[k], SELECT_EL);
    } /* end for (; (k < SELECTED); ) */

    /* append the SELECTED */
    const SELECTED_EL = appendStylerOption(VALUES[SELECTED], SELECT_EL);
    /* select it */
    SELECTED_EL.setAttribute('selected', 'selected');

    /* append all options after SELECTED */
    for (let k = (SELECTED + 1); (k < N_VALUES); ++k) {
        appendStylerOption(VALUES[k], SELECT_EL);
    } /* end for (; (k < N_VALUES); ) */

    return SELECT_EL;
} /* end function createSelect(id, fieldPropety) */

/**
 * Appends an option element to the given node.
 * @param value : string = the value and label of the option
 * @param parentNode : Node = to which to append
 * @return the new select element
 */
function appendOption(value, parentNode) {
    /* create an option element and text */
    const OPTION_EL = document.createElement('option');
    OPTION_EL.setAttribute('value', value);
    const OPTION_TEXT = document.createTextNode(value);
    /* assemble and append the select element */
    OPTION_EL.appendChild(OPTION_TEXT);
    parentNode.appendChild(OPTION_EL);
    return OPTION_EL;
} /* end function appendOption(value, parentNode) */

function createInput(id, fieldPropety) {
    /* placeholder */
    return document.createTextNode('');
} /* end function createInput(id, fieldPropety) */

/* add main listener to the window load event */
document.addEventListener('DOMContentLoaded', main);
