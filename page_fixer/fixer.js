'use strict';

// Leave this line alone.
document.addEventListener("DOMContentLoaded", function() {

    // Your code goes here!

    const MARS_FILENAME = 'mars.jpg';   // Mars image file name
    const MARS_WIDTH = 500;             // [px]
    const MARS_HEIGHT = 500;            // [px]

    // get the first image element
    const imgEl0 = document.querySelector('img');   // image element

    // load the Mars image
    const MARS_FILE = new Image();      // the Mars file
    MARS_FILE.src = MARS_FILENAME;
    MARS_FILE.addEventListener('load', function (){
        // update the image source
        imgEl0.setAttribute('src', this.src);
    });

    // size the image element
    imgEl0.setAttribute('width', `${MARS_WIDTH}`);
    imgEl0.setAttribute('height', `${MARS_HEIGHT}`);

    console.log('Done.');


// Leave this line alone.
});
