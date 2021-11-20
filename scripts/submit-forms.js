/**
 * /scripts/submit-forms.js
 * Sets up the captcha puzzle using DOM, including the event handlers.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-11-19t22:17
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.1.1
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/scripts/captcha.js
 *
 * CHANGELOG :
 *     v1.1.1 - 2021-11-19t22:17
 *         profile form now updates profile on submit
 *
 *     v1.1.0 - 2021-11-19t21:50
 *         abstracted `setStoryElement`, logging profile submit
 *
 *     v1.0.0 - 2021-11-19t04:08
 *         create and add the story element to the profile data form
 */
'use strict';

/**
 * Sets up the profile data story element, and adds form submission
 * handlers for the profile data and calculator forms.
 * @param evnt : Event = the event that triggers this listener
 */
function main(evnt) {
    /* get and check the body element */
    const BODY_EL = document.querySelector('body');
    if (!BODY_EL) {
        return;
    } /* if (!BODY_EL) */

    /* set up the profile data form */
    setUpProfileData(BODY_EL);

    /* finish */
    console.log('Done.');
} /* end function main(evnt) */

/**
 * Sets up the profile data form and adds its form submission handlers.
 * @param node : Node = to search for the profile element
 * @return array of the dynamic story text nodes
 */
function setUpProfileData(node) {
    /* get and check the profile form */
    const PROFILE_EL = node.querySelector('#profile');
    if (!PROFILE_EL) {
        return;
    } /* if (!PROFILE_EL) */

    /* set up and store the story elements */
    const DYNAMIC_TEXTS = setStoryElement(PROFILE_EL);

    /* add update profile to the profile submit event */
    const UPDATE_PROFILE = createUpdateProfile(DYNAMIC_TEXTS);
    PROFILE_EL.addEventListener('submit', UPDATE_PROFILE);
} /* end function setUpProfileData(node) */

/**
 * Sets up the story elements for the profile data form.
 * @param node : Node = to which to append the story element
 * @return array of the dynamic story text nodes
 */
function setStoryElement(node) {
    /* array of the static parts of the story */
    /* @ is to be replaced with the dynamic elements */
    const STORY_PARTS = 'My name is @ @ and I am @ years old.'.split('@');

    /* the story paragraph element */
    const STORY_EL = document.createElement('p');
    STORY_EL.setAttribute('id', 'story');

    /* array of the dynamic text nodes */
    const DYNAMIC_TEXTS = [];

    /* while appending each next text node */
    for (let k = 0, n_parts = STORY_PARTS.length;
            appendingNextText(STORY_PARTS, n_parts, k, STORY_EL);
            ++k)
    {
        /* fetch the field name */
        const FIELD_NAME = node.elements[k].getAttribute('name');
        /* also create and append the next dynamic element */
        const DYNAMIC_EL = document.createElement('strong');
        const DYNAMIC_TEXT = document.createTextNode(`[${FIELD_NAME}]`);
        /* prefix FIELD_NAME with `story-` for the dynamic element ID */
        DYNAMIC_EL.setAttribute('id', `story-${FIELD_NAME}`);
        DYNAMIC_EL.append(DYNAMIC_TEXT);
        STORY_EL.appendChild(DYNAMIC_EL);
        /* push onto dynamic text nodes stack */
        DYNAMIC_TEXTS.push(DYNAMIC_TEXT);
    } /* end for (; appendingNextText(STORY_PARTS, n_parts, k, STORY_EL); )
       */

    /* append the story element to the profile form */
    node.appendChild(STORY_EL);

    /* return the array of dynamic elements */
    return DYNAMIC_TEXTS;
} /* end function setStoryElement(node) */

/**
 * Creates an event listener with access to dynamicText.
 * @param dynamicText : Array = text nodes to update
 */
function createUpdateProfile(dynamicTexts) {
    return function (evnt) {
        /* respond on client side */
        evnt.preventDefault();
        /* log the event */
        console.log('createUpdateProfile(dynamicTexts)(evnt)');
        console.log('dynamicTexts:', dynamicTexts);
        console.log('evnt:', evnt);

        /* get the form fields */
        const FORM = evnt.target;
        const FIELDS = FORM.elements;

        /* copy value of each field into the dynamic texts */
        for (let k = 0, n_texts = dynamicTexts.length; (k < n_texts); ++k) {
            dynamicTexts[k].nodeValue = FIELDS[k].value;
        } /* end for (; (k < n_texts); ) */

        /* mark the form as submitted */
        FORM.classList.add('submitted');
    } /* return function (evnt) */
} /* function createUpdateProfile(dynamicTexts) */

/**
 * Creates a text node from `strings[idx]` and appends it to `node`.
 * @param strings : Array = from which to create text nodes
 * @param idx : int = index of the strings array
 * @param node : Node = to which to append
 * @return true if there is a next string, false otherwise
 */
function appendingNextText(strings, len, idx, node) {
    /* create and append the text node */
    const TEXT = document.createTextNode(strings[idx]);
    node.appendChild(TEXT);
    /* return if next string */
    return (len != (idx + 1));
} /* end function appendingNextText(strings, idx, node) */

/* add main to the window load event */
document.addEventListener('DOMContentLoaded', main);
