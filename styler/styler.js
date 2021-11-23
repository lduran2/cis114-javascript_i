/**
 * /styler/styler.js
 * Creates an applet to customize the look and feel of an article.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-11-22t23:11
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.1.0
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/styler/styler.js
 *
 * CHANGELOG :
 *     v1.1.0 - 2021-11-22t23:11
 *         added the styler stylesheet, current box
 *
 *     v1.0.6 - 2021-11-22t22:32
 *         separated labeled and unlabeled elements to fix null ID
 *
 *     v1.0.5 - 2021-11-22t21:46
 *         creating the `select` elements
 *
 *     v1.0.4 - 2021-11-22t21:30
 *         fixed `appendStylerOption` -> `appendOption` in `createSelect`
 *
 *     v1.0.3 - 2021-11-22t21:28
 *         generalized form creation
 *
 *     v1.0.2 - 2021-11-22t21:20
 *         creating the `select` elements
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

    /* first define the parameter constants */
    /**
     * the colors defined by CSS 2.1
     * used in the form field properties below
     * @see https://www.w3.org/TR/CSS21/syndata.html#value-def-color
     */
    const COLORS = 'maroon,red,orange,yellow,olive,purple,fuchsia,white,\
lime,green,navy,blue,aqua,teal,black,silver,gray'.split(',');

    /* an array of the properties of the fields */
    const FIELD_PROPERTIES = {
        labeled: [
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
        ],
        buttons: [
            {
                label: '',
                element: 'input',
                type: 'submit',
                values: [ 'submit' ],
                selected: 0
            }
        ]
    };

    /* create the styler form */
    const STYLER = createForm(FIELD_PROPERTIES);
    /* add the styler class */
    STYLER.classList.add('styler');

    /* add the form's header */
    const HEADER_EL = document.createElement('header');
    const H2_EL = document.createElement('h2');
    const H2_TEXT = document.createTextNode('Customize this page');
    H2_EL.appendChild(H2_TEXT);
    HEADER_EL.appendChild(H2_EL);
    STYLER.insertBefore(HEADER_EL, STYLER.firstChild);

    const VALUE_TEXTS = createCurrentBox(FIELD_PROPERTIES.labeled, STYLER);

    /* insert the form after H1_EL */
    H1_EL.parentNode.insertBefore(STYLER, H1_EL.nextSibling);

    /* create the stylesheet link and append it */
    /* these are static styles */
    const STYLE_LINK_EL = document.createElement('link');
    STYLE_LINK_EL.setAttribute('rel', 'stylesheet');
    STYLE_LINK_EL.setAttribute('href', 'styler.css');
    HEAD_EL.appendChild(STYLE_LINK_EL);

    /* finish */
    console.log('Done.');
} /* end function main(evnt) */

/**
 * Creates a new form and all its components.
 * @return the new form
 */
function createForm(fieldProperties) {
    /* function(object)[] */
    /* maps the elements to their create functions */
    const CREATE_ELS = {};
    CREATE_ELS['select'] = createSelect;
    CREATE_ELS['input'] = createInput;

    /* create the form container */
    const FORM_EL = document.createElement('form');

    /* the ordered list of form fields */
    const OL_EL = document.createElement('ol');

    /* loop through the labeled field properties */
    for (const LABELED_PROPERTY of fieldProperties.labeled) {
        appendLabeledListItem(
            CREATE_ELS[LABELED_PROPERTY.element],
            LABELED_PROPERTY,
            OL_EL
        );
    } /* end for (const LABELED_PROPERTY of fieldProperties.labeled) */

    /* loop through the button field properties */
    for (const BUTTON_PROPERTY of fieldProperties.buttons) {
        appendFormListItem(
            CREATE_ELS[BUTTON_PROPERTY.element],
            BUTTON_PROPERTY,
            OL_EL
        );
    } /* end for (const BUTTON_PROPERTY of fieldProperties.buttons) */

    /* append the list to the form */
    FORM_EL.appendChild(OL_EL);

    /* return the form element */
    return FORM_EL;
} /* end function createForm() */

/**
 * Appends a form list item to the given node with a matching label.
 * @param createFunc : function(object) = the function to create the field
 *     contained in this list item
 * @param fieldProperty : object = the field's property object
 * @param parentNode : Node = to which to append
 * @return the new list item
 */
function appendLabeledListItem(createFunc, fieldProperty, parentNode) {
    /* get the label */
    const LABEL = fieldProperty.label;
    /* for the name, convert a label to hyphenated format */
    const NAME = LABEL.toLowerCase().replaceAll(' ', '-');

    /* create the unlabeled list item */
    const LI_EL = appendFormListItem(createFunc, fieldProperty, parentNode);
    /* get the form field */
    const FIELD_EL = LI_EL.firstChild;
    /* name the form field */
    FIELD_EL.setAttribute('name', NAME);
    /* set the ID as the label */
    FIELD_EL.setAttribute('id', NAME);

    /* create the label element */
    const LABEL_EL = document.createElement('label');
    LABEL_EL.setAttribute('for', NAME);
    const LABEL_TEXT = document.createTextNode(LABEL);
    LABEL_EL.appendChild(LABEL_TEXT);

    /* insert the label */
    LI_EL.insertBefore(LABEL_EL, FIELD_EL);
    /* return the created list item */
    return LI_EL;
} /* end function appendLabeledListItem(
    createFunc, fieldProperty, parentNode)
   */

/**
 * Appends a form list item to the given node with no label.
 * @param createFunc : function(object) = the function to create the field
 *     contained in this list item
 * @param fieldProperty : object = the field's property object
 * @param parentNode : Node = to which to append
 * @return the new list item
 */
function appendFormListItem(createFunc, fieldProperty, parentNode) {
    /* create the list item element */
    const LI_EL = document.createElement('li');
    /* create the form element */
    const FIELD_EL = createFunc(fieldProperty);
    /* assemble the list item and append it */
    LI_EL.appendChild(FIELD_EL);
    parentNode.appendChild(LI_EL);
    /* return the created list item */
    return LI_EL;
} /* end function appendFormListItem(
    createFunc, fieldProperty, parentNode)
   */

/**
 * Creates a new select element.
 * @param fieldProperty : object = the field's property object
 * @return the new select element
 */
function createSelect(fieldProperty) {
    /* get important values from the field property */
    const VALUES = fieldProperty.values;
    const N_VALUES = fieldProperty.values.length;
    const SELECTED = fieldProperty.selected;

    /* create the select element */
    const SELECT_EL = document.createElement('select');

    /* append all options before SELECTED */
    for (let k = 0; (k < SELECTED); ++k) {
        appendOption(VALUES[k], SELECT_EL);
    } /* end for (; (k < SELECTED); ) */

    /* append the SELECTED */
    const SELECTED_EL = appendOption(VALUES[SELECTED], SELECT_EL);
    /* select it */
    SELECTED_EL.setAttribute('selected', 'selected');

    /* append all options after SELECTED */
    for (let k = (SELECTED + 1); (k < N_VALUES); ++k) {
        appendOption(VALUES[k], SELECT_EL);
    } /* end for (; (k < N_VALUES); ) */

    /* return the form element */
    return SELECT_EL;
} /* end function createSelect(fieldProperty) */

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

/**
 * Creates a new input element.
 * @param fieldProperty : object = the field's property object
 * @return the new input element
 */
function createInput(fieldProperty) {
    /* create the input field */
    const INPUT_EL = document.createElement('input');
    INPUT_EL.setAttribute('type', fieldProperty.type);
    /* inputs only have 1 value (the 1st) */
    INPUT_EL.setAttribute('value', fieldProperty.values[0]);
    return INPUT_EL;
} /* end function createInput(fieldProperty) */

function createCurrentBox(labeledProperties, parentNode) {
    /* for storing the value texts */
    const VALUE_TEXTS = [];

    /* create the current box */
    const DIV_EL = document.createElement('div');
    DIV_EL.classList.add('current-box');

    /* loop through the labeled field properties */
    for (const LABELED_PROPERTY of labeledProperties) {
        /* the label for the paragraph */
        const LABEL = ['Current ', LABELED_PROPERTY.label, ':'].join('');
        /* create the paragraph and both text nodes */
        const P_EL = document.createElement('p');
        const LABEL_EL = document.createElement('span');
        const LABEL_TEXT = document.createTextNode(LABEL);
        const VALUE_EL = document.createElement('span');
        const VALUE_TEXT = document.createTextNode('');
        /* assemble the paragraph and add it to the div */
        LABEL_EL.appendChild(LABEL_TEXT);
        VALUE_EL.appendChild(VALUE_TEXT);
        P_EL.appendChild(LABEL_EL);
        P_EL.appendChild(VALUE_EL);
        DIV_EL.appendChild(P_EL);
        /* add the value text to the array */
        VALUE_TEXTS.push(VALUE_TEXT);
    } /* end for (const LABELED_PROPERTY of labeledProperties) */

    /* append the current box to the form */
    parentNode.appendChild(DIV_EL);

    return VALUE_TEXTS
}

/* add main listener to the window load event */
document.addEventListener('DOMContentLoaded', main);
