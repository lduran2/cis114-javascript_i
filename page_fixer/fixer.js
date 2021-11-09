'use strict';

// Leave this line alone.
document.addEventListener("DOMContentLoaded", function() {

    // Your code goes here!

    //-----------------------------------------------------------------
    // constants
    //-----------------------------------------------------------------

    // for main-title
    const TO_EMPH = 'this';  // word to emphasize in main title
    // create the emphasis that says `${TO_EMPH}`
    const THIS_EMPH_EL = document.createElement('em');  // emphasis element
    const THIS_TEXT = document.createTextNode(TO_EMPH);
    THIS_EMPH_EL.appendChild(THIS_TEXT);

    // for the Mars image
    const MARS_FILENAME = 'mars.jpg';   // Mars image file name
    const MARS_WIDTH = 500;             // [px]
    const MARS_HEIGHT = 500;            // [px]

    // for the ordered list
    const OL0_NEW_CLASS = 'engage';     // class to add to first
                                        // ordered list

    // for the knowledge list
    const H3_EL = document.createElement('h3'); // a level 3 heading
                                                // element
    const H3_NODENAME = H3_EL.nodeName;   // its exptected tag name
    const KNOWLEDGES_HEAD_APPEND = ' about JavaScript'; // string to
                                                // add to the heading
    // new item to add to the knowledge list
    const NEW_KNOWLEDGES = [
        { index: 0, text: 'Relation to HTML' },
        { index: 1, text: 'Syntax' },
        { index: 6, text: 'Using the DOM' }
    ];
    const I_KNOWLEDGE_TO_REMOVE = 2;    // old item to remove

    // for the aside
    // the text to mark up as aside
    const ASIDE = 'JavaScript is only fun when we can use it to manipulate HTML!';

    //-----------------------------------------------------------------

    // get the body element
    // optimizes future queries
    const BODY_EL = document.querySelector('body');

    //-----------------------------------------------------------------
    // add emphasis to the main title
    //-----------------------------------------------------------------

    // get the main title
    const MAIN_TITLE_EL = BODY_EL.querySelector('#main-title');
    // split up the text by occurances of `${TO_EMPH}`
    const EMPH_SPLITS = MAIN_TITLE_EL.firstChild.nodeValue
        .split(TO_EMPH);
    // update the original text
    MAIN_TITLE_EL.firstChild.nodeValue = EMPH_SPLITS.shift();

    // for every instance of `${TO_EMPH}` in the original,
    // add an emphasis of `${TO_EMPH}`, and 

    // loop through the emphasis splits
    for (const SPLIT of EMPH_SPLITS) {
        // clone and insert the emphasis after first element
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
        MAIN_TITLE_EL.insertBefore(
            THIS_EMPH_EL.cloneNode(true), MAIN_TITLE_EL.children[1]);
        // create and insert the next split
        const NEXT_SPLIT_TEXT = document.createTextNode(SPLIT);
        MAIN_TITLE_EL.insertBefore(
            NEXT_SPLIT_TEXT, MAIN_TITLE_EL.children[1]);
    } // end for (const SPLIT of EMPH_SPLITS)

    //-----------------------------------------------------------------
    // update the first image
    //-----------------------------------------------------------------

    // get the first image element
    const IMG_EL0 = BODY_EL.querySelector('img');

    // load the Mars image
    const MARS_FILE = new Image();      // the Mars file
    MARS_FILE.src = MARS_FILENAME;
    MARS_FILE.addEventListener('load', function (){
        // update the image source
        IMG_EL0.setAttribute('src', this.src);
    });

    // size the image element
    IMG_EL0.setAttribute('width', `${MARS_WIDTH}`);
    IMG_EL0.setAttribute('height', `${MARS_HEIGHT}`);

    //-----------------------------------------------------------------
    // update the first ordered list's class list
    //-----------------------------------------------------------------
    // get the first ordered list
    const OL_EL0 = BODY_EL.querySelector('ol');
    // change the class of the ordered list
    OL_EL0.classList.add(OL0_NEW_CLASS);

    //-----------------------------------------------------------------
    // append to the text of the knowledge list heading
    //-----------------------------------------------------------------

    // find the heading before the knowledge list
    // get the knowledge list
    const KNOWLEDGES_EL = BODY_EL.querySelector('#knowledge-list');
    // find the previous heading node
    let knowledges_head_el = KNOWLEDGES_EL;
    // while not a heading element
    while (H3_NODENAME != knowledges_head_el.nodeName) {
        // update to the previous sibling
        knowledges_head_el = knowledges_head_el.previousSibling;
    } // end while (H3_NODENAME != knowledges_head_el.nodeName)

    // create the text node and append it to the end of the heading
    const KNOWLEDGES_HEAD_APPEND_TEXT =
        document.createTextNode(KNOWLEDGES_HEAD_APPEND);
    knowledges_head_el.append(KNOWLEDGES_HEAD_APPEND_TEXT);

    //-----------------------------------------------------------------
    // add items to the knowledge list
    // remove items from the knowledge list
    //-----------------------------------------------------------------

    // get the current items of the knowledge list
    // the :scope pseudo-class selects the current element
    // the > operator selects only children of the preceding elements
    const CURR_KNOWLEDGES_LI_ELS = KNOWLEDGES_EL.querySelectorAll(':scope > li');

    // for every new knowledge, insert it in the correct place in the list
    // loop through the `NEW_KNOWLEDGES`
    for (const KNOWLEDGE of NEW_KNOWLEDGES) {
        // clone the first current item
        const NEW_KNOWLEDGE_EL = CURR_KNOWLEDGES_LI_ELS[0].cloneNode(true);
        // remove the ID in case it's duplicate
        NEW_KNOWLEDGE_EL.removeAttribute('id');
        // update the text
        NEW_KNOWLEDGE_EL.firstChild.nodeValue = KNOWLEDGE.text;
        // insert the element
        KNOWLEDGES_EL.insertBefore(
            NEW_KNOWLEDGE_EL, CURR_KNOWLEDGES_LI_ELS[KNOWLEDGE.index]);
    } // end for (const KNOWLEDGE of NEW_KNOWLEDGES)

    // remove the element to be removed
    KNOWLEDGES_EL.removeChild(CURR_KNOWLEDGES_LI_ELS[I_KNOWLEDGE_TO_REMOVE]);

    //-----------------------------------------------------------------
    // add an aside at the end of the web page
    //-----------------------------------------------------------------
    // create the aside
    const ASIDE_EL = document.createElement('aside');
    const ASIDE_TEXT = document.createTextNode(ASIDE);
    ASIDE_EL.appendChild(ASIDE_TEXT);
    // append to the end of the body element
    BODY_EL.appendChild(ASIDE_EL);

    //-----------------------------------------------------------------
    // change all .change-me elements to level 6 headings
    //-----------------------------------------------------------------
    // get the .change-me elements
    const CHANGE_ME_ELS = BODY_EL.querySelectorAll('.change-me');

    // loop through .change-me elements
    for (const OLD_EL of CHANGE_ME_ELS) {
        // create the headings
        const H6_EL = document.createElement('h6');

        // copy all attributes
        // loop through all attributes
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
        for (const ATTRIBUTE of OLD_EL.attributes) {
            // set the attribute of the h6 according to this
            // attribute's name and value
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
            H6_EL.setAttribute(ATTRIBUTE.name, ATTRIBUTE.value);
        } // end for (const ATTRIBUTE of OLD_EL.attributes)

        // copy all child nodes
        // loop through all child nodes (including non-elements)
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
        // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/children
        for (const CHILD_NODE of OLD_EL.childNodes) {
            H6_EL.appendChild(CHILD_NODE);
        } // end for (const CHILD_NODE of OLD_EL.childNodes)

        // replace the .change-me element
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
        OLD_EL.parentNode.replaceChild(H6_EL, OLD_EL);
    } // end for (const OLD_EL of CHANGE_ME_ELS)

    console.log('Done.');


// Leave this line alone.
});
