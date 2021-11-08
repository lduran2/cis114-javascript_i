'use strict';

// Leave this line alone.
document.addEventListener("DOMContentLoaded", function() {

    // Your code goes here!

    const MARS_FILENAME = 'mars.jpg';   // Mars image file name

    // get the first image element
    const imgEl0 = document.querySelector('img');   // image element

    // load the Mars image
    const MARS_FILE = new Image();      // the Mars file
    MARS_FILE.src = MARS_FILENAME;
    MARS_FILE.addEventListener('load', function (){
        imgEl0.src = this.src;
    });

    console.log('Done.');


// Leave this line alone.
});
