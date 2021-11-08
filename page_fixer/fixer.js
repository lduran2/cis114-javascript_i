'use strict';

// Leave this line alone.
document.addEventListener("DOMContentLoaded", function() {

    // Your code goes here!

    const MARS_FILENAME = 'mars.jpg';   // Mars image file name

    // load the Mars image
    const MARS_FILE = new Image();      // the Mars file
    MARS_FILE.src = MARS_FILENAME;
    MARS_FILE.addEventListener('load', function (){
        alert(`Loaded the image ${this.src}!`);
    });

    console.log('Done.');


// Leave this line alone.
});
