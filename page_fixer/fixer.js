'use strict';

// Leave this line alone.
document.addEventListener("DOMContentLoaded", function() {

    // Your code goes here!

    //-----------------------------------------------------------------
    // constants
    //-----------------------------------------------------------------
    const TO_EMPH = 'this';  // word to emphasize in main title

    const MARS_FILENAME = 'mars.jpg';   // Mars image file name
    const MARS_WIDTH = 500;             // [px]
    const MARS_HEIGHT = 500;            // [px]

    const OL0_NEW_CLASS = 'engage';     // class to add to first
                                        // ordered list

    //-----------------------------------------------------------------
    // update the main title
    //-----------------------------------------------------------------

    // get the main title
    const MAIN_TITLE_EL = document.querySelector('#main-title');
    // split up the text by occurances of `${TO_EMPH}`
    const EMPH_SPLITS = MAIN_TITLE_EL.firstChild.nodeValue
        .split(TO_EMPH);
    // remove the original text
    MAIN_TITLE_EL.removeChild(MAIN_TITLE_EL.firstChild);
    // capture new first element
    const NEW0_MAIN_TITLE = MAIN_TITLE_EL.firstChild;
    // create and insert the first split
    const SPLIT0_TEXT = document.createTextNode(EMPH_SPLITS.shift());
    MAIN_TITLE_EL.insertBefore(SPLIT0_TEXT, NEW0_MAIN_TITLE);

    // for every instance of `${TO_EMPH}` in the original,
    // add an emphasis of `${TO_EMPH}`, and 

    // loop through the emphasis splits
    for (const SPLIT of EMPH_SPLITS) {
        // create and insert the emphasis that says `${TO_EMPH}`
        const THIS_EMPH_EL = document.createElement('em');
        const THIS_TEXT = document.createTextNode(TO_EMPH);
        THIS_EMPH_EL.appendChild(THIS_TEXT);
        MAIN_TITLE_EL.insertBefore(THIS_EMPH_EL, NEW0_MAIN_TITLE);

        // create and insert the next split
        const NEXT_SPLIT_TEXT = document.createTextNode(SPLIT);
        MAIN_TITLE_EL.insertBefore(NEXT_SPLIT_TEXT, NEW0_MAIN_TITLE);
    } // for (const SPLIT of EMPH_SPLITS)

    //-----------------------------------------------------------------
    // update the first image
    //-----------------------------------------------------------------

    // get the first image element
    const IMG_EL0 = document.querySelector('img');

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
    // update the first ordered list
    //-----------------------------------------------------------------

    // get the first ordered list
    const OL_EL0 = document.querySelector('ol');
    // change the class of the ordered list
    OL_EL0.classList.add(OL0_NEW_CLASS);

    console.log('Done.');


// Leave this line alone.
});
