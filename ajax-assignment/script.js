/**
 * /ajax-assignment/script.js
 * Populates the `results` box, then adds events to each person that
 * retrieve the art installation locations on click.
 *
 * The dataset `1.json` is used in the directory `./dataset-in` to test
 * `addPersonOnClicks` in `test-person-on-click.html`.  This avoids
 * overwhelming <www.philart.net>.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-12-06t20:39
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.2.3
 * Dataset   : http://www.philart.net/api/people/1.json
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/ajax-assignment/script.js
 *
 * CHANGELOG :
 *     v1.2.3 - 2021-12-06t20:39
 *         renamed parameter `evnt` used by functions in
 *             `createMakeAjaxRequest(url, handlesOnLoad)` to `evnt1`
 *             to avoid scoping confusion
 *
 *     v1.2.2 - 2021-12-06t20:26
 *         emptying the `location-results` box before populating
 *
 *     v1.2.1 - 2021-12-06t19:32
 *         refactored `createMakeAjaxRequest` to use multiple functions
 *             for the handler
 *         TESTING_PERSON_ON_CLICK switches on the ID of the body
 *
 *     v1.2.0 - 2021-12-06t18:38
 *         adds the handler to each person to populate the
 *             `location-results` box
 *
 *     v1.1.3 - 2021-12-06t17:58
 *         creates the list of locations from the AJAX response and
 *             appends to the `location-results` box
 *
 *     v1.1.2 - 2021-12-06t17:40
 *         looping through the art installations
 *
 *     v1.1.1 - 2021-12-06t17:31
 *         `handleLocationsAjaxRequest` just logs the request
 *
 *     v1.1.0 - 2021-12-06t17:17
 *         started tests for clicking on a person
 *
 *     v1.0.0 - 2021-12-06t17:08
 *         refactored `handlePeopleAjaxResponse` and `makeAjaxRequest`
 *             for reusable code
 *
 *     v0.0.0 - 2021-11-16t00:46
 *         original template by Professor Liss
 */
'use strict';

/**
 * Populates the `results` box from an AJAX response for people.
 * @param evnt : Event = the AJAX `onload` event
 */
let handlePeopleAjaxResponse = createHandleIfOkResponse(
  function (evnt) {
    let loadedData = evnt.target.response;
    let unorderedList = document.createElement('ul');
    for (let person of loadedData.body.list) {
      let newListItem = document.createElement('li');
      let newListItemText = document.createTextNode(person.name);
      newListItem.appendChild(newListItemText);
      newListItem.dataset.url = person.links[0].href;
      unorderedList.appendChild(newListItem);
    }
    document.querySelector('#results').appendChild(unorderedList);
  } /* end function (evnt) */
);

/**
 * Populates the `location-results` box from an AJAX response for
 * locations.
 * @param evnt : Event = the AJAX `onload` event
 */
let handleLocationsAjaxRequest = createHandleIfOkResponse(
  function (evnt) {
    /* get the `location-results` box */
    const LOCATION_RESULTS = document.querySelector('#location-results');
    /* create the location list */
    const LOCATION_LIST = createLocationList(evnt.target.response.body.art);
    /* empty the location box if necessary, and populate it */
    emptyNode(LOCATION_RESULTS);
    LOCATION_RESULTS.appendChild(LOCATION_LIST);
  } /* end function (evnt) */
);

/**
 * Removes all nodes from the given node.
 * @param node : Node = to empty
 * @return an array of the nodes removed
 */
function emptyNode(node) {
  /* for backing up the child nodes removed */
  const CHILD_NODES = [];
  /* remove the first child until there is none */
  while (node.firstChild) {
    CHILD_NODES.push(node.removeChild(node.firstChild));
  } /* end while (node.firstChild) */
  /* return the nodes removed */
  return CHILD_NODES
} /* end function emptyNode(node) */

/**
 * Create an HTML list from the given art array.
 * @param artArray : Array = an array of art objects with location
 *     descriptions
 * @return the HTML list of locations
 */
function createLocationList(artArray) {
  /* create the ordered list element */
  const OL_EL = document.createElement('ol');
  /* loop through each art from the artist */
  for (const ART of artArray) {
    /* get the description of the location of the current artwork */
    const DESCRIPTION = ART.location.description;
    /* create a list item with the descripton of each location */
    const DESCRIPTION_EL = document.createElement('li');
    const DESCRIPTION_TEXT = document.createTextNode(DESCRIPTION);
    DESCRIPTION_EL.appendChild(DESCRIPTION_TEXT);
    /* append to the list */
    OL_EL.appendChild(DESCRIPTION_EL);
  } /* for (const ART of artArray) */
  return OL_EL;
} /* end function createLocationList(artArray) */

/**
 * Creates an event handler that first ensures that the target AJAX
 * request responded with OK status before proceeding.
 * @param handleEvent : Function(Event) = the response handler
 */
function createHandleIfOkResponse(handleEvent) {
  return function (evnt) {
    if (evnt.target.statusText !== 'OK') {
      console.error(evnt.target.statusText);
      console.error(evnt.target.status);
      return;
    }
    return handleEvent(event);
  }; /* end function (evnt) */
} /* end function createHandleIfOkResponse(handleEvent) */

/**
 * Makes a request to the people database and attaches the handler that
 * populates the `results` box.
 * @param evnt : Event = the event that creates the request
 */
let makeAjaxRequest = createMakeAjaxRequest(
  'people.json', [handlePeopleAjaxResponse, addPersonOnClicks]
);

/**
 * Creates an event handler that makes an AJAX request.  The AJAX
 * request is a GET request to the given url.  Upon loading the AJAX
 * request, the function given in `handlesOnLoad` is called.
 * @param url : String = url to where to send the request
 * @param handlesOnLoad : Array<Function(evnt)> = list of event handlers
 */
function createMakeAjaxRequest(url, handlesOnLoad) {
  return function (evnt) {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();

    request.addEventListener('load', function (evnt1) {
      /* loop through the handlers attaching each one */
      for (const HANDLE of handlesOnLoad) {
        HANDLE(evnt1);
      } /* end for (const HANDLE of handlesOnLoad) */
    } /* end function (evnt1) */);

    request.addEventListener('error', function(evnt1) {
      console.error(evnt1);
    });
  }; /* end function (evnt) */
} /* end function createMakeAjaxRequest(url, handlesOnLoad) */

/**
 * Adds the event handler to make location AJAX requests to each person
 * in the `results` box list.
 */
function addPersonOnClicks() {
  /* get the list items in `results` box */
  const RESULTS_LI_ELS = document.querySelectorAll('#results li');
  /* array adapter for `handleLocationsAjaxRequest` */
  const HANDLE_ARRAY = [ handleLocationsAjaxRequest ];
  /* loop through each list item */
  for (const LI_EL of RESULTS_LI_ELS) {
    /* get the person's URL */
    const URL = LI_EL.dataset.url;
    /* create an event handler that makes a request to one of the
     * specific artist's databases and attaches the handler that
     * populates the `location-results` box.
     */
    const HANDLE = createMakeAjaxRequest(URL, HANDLE_ARRAY);
    /* add it to the list item */
    LI_EL.addEventListener('click', HANDLE);
  } /* end for (const LI_EL of RESULTS_LI_ELS) */
} /* end function addPersonOnClicks() */

/**
 * Flags to test only click events on each person if the document body
 * has the ID test-person-on-click.
 */
const TESTING_PERSON_ON_CLICK = (
  null !== document.querySelector('body#test-person-on-click')
);

function main() {
  /* if not testing onclick on persons, populate the `result` box */
  if (!TESTING_PERSON_ON_CLICK) {
    makeAjaxRequest();
  } /* if (!TESTING_PERSON_ON_CLICK) */
  /* otherwise */
  else {
    /* add click events to every person in the `result` box */
    addPersonOnClicks();
  } /* end (!TESTING_PERSON_ON_CLICK) else */
}; /* end function main() */

main();
