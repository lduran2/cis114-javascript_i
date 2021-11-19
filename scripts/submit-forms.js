/**
 * /scripts/submit-forms.js
 * Sets up the captcha puzzle using DOM, including the event handlers.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-11-19t04:08
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.0.0
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/scripts/captcha.js
 *
 * CHANGELOG :
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
    setUpProfileData(evnt, BODY_EL);

    /* finish */
    console.log('Done.');
} /* end function main(evnt) */

/**
 * Sets up the profile data form and adds its form submission handlers.
 * @param evnt : Event = the event that triggers this listener
 * @param node : Node = to search for the profile element
 * @return array of the dynamic story text nodes
 */
function setUpProfileData(evnt, node) {
    /* get and check the profile form */
    const PROFILE_EL = node.querySelector('#profile');
    if (!PROFILE_EL) {
        return;
    } /* if (!PROFILE_EL) */

    /* array of the static parts of the story */
    /* @ is to be replaced with the dynamic elements */
    const STORY_PARTS = 'My name is @ @ and I am @ years old.'.split('@');
    /* IDs of the dynamic elements */
    const DYNAMIC_IDS = 'story-first-name story-last-name story-age'.split(' ');

    /* the story paragraph element */
    const STORY_EL = document.createElement('p');
    STORY_EL.setAttribute('id', 'story');

    /* array of the dynamic text nodes */
    const DYNAMIC_TEXTS = [];

    /* while appending each next text node */
    for (let k = 0; appendingNextText(STORY_PARTS, k, STORY_EL); ++k) {
        /* also create and append the next dynamic element */
        const DYNAMIC_EL = document.createElement('strong');
        const DYNAMIC_TEXT = document.createTextNode(`[${DYNAMIC_IDS[k]}]`);
        DYNAMIC_EL.setAttribute('id', DYNAMIC_IDS[k]);
        DYNAMIC_EL.append(DYNAMIC_TEXT);
        STORY_EL.appendChild(DYNAMIC_EL);
        /* push onto dynamic text nodes stack */
        DYNAMIC_TEXTS.push(DYNAMIC_TEXT);
    } /* end
        for (let k = 0; appendingNextText(STORY_PARTS, k, STORY_EL); ++k)
       */

    /* append the story element to the profile form */
    PROFILE_EL.appendChild(STORY_EL);

    /* return the array of dynamic elements */
    return DYNAMIC_TEXTS;
} /* end function setUpProfileData(evnt) */

/**
 * Creates a text node from `strings[idx]` and appends it to `node`.
 * @param strings : Array = from which to create text nodes
 * @param idx : int = index of the strings array
 * @param node : Node = to which to append
 * @return true if there is a next string, false otherwise
 */
function appendingNextText(strings, idx, node) {
    /* create and append the text node */
    const TEXT = document.createTextNode(strings[idx]);
    node.appendChild(TEXT);
    /* return if next string */
    return (strings.length != (idx + 1));
} /* end function appendingNextText(strings, idx, node) */

/* add main to the window load event */
document.addEventListener('DOMContentLoaded', main);
