/**
 * /ajax-assignment/script.js
 * Populates the `results` box, then adds events to each person that
 * retrieve the art installation locations on click.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-12-06t17:17
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 1.1.0
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/ajax-assignment/script.js
 *
 * CHANGELOG :
 *     v1.1.0 - 2021-12-06t17:17
 *         started tests for clicking on a person
 *
 *     v1.0.0 - 2021-12-06t17:08
 *         refactored `handlePeopleAjaxResponse` and `makeAjaxRequest` for reusable code
 *
 *     v0.0.0 - 2021-11-16t00:46
 *         original template by Professor Liss
 */
'use strict';

/**
 * Handles the AJAX response for people.
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
  }
);

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
  }; /* function (evnt) */
} /* function createHandleIfOkResponse(handleEvent) */

/**
 * `makeAjaxRequest` used in `main`.  This implementation delegates
 * to `createMakeAjaxRequest`.
 * @param evnt : Event = the event that creates the request
 */
let makeAjaxRequest = createMakeAjaxRequest(
  'people.json', handlePeopleAjaxResponse
);

/**
 * Creates an event handler that makes an AJAX request.  The AJAX
 * request is a GET request to the given url.  Upon loading the AJAX
 * request, the given `handleOnLoad` is called.
 * @param url : String = url to where to send the request
 * @param handleOnLoad : Function(evnt) = the event handler
 */
function createMakeAjaxRequest(url, handleOnLoad) {
  return function (evnt) {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();

    request.addEventListener('load', handleOnLoad);

    request.addEventListener('error', function(evnt) {
      console.error(evnt);
    });
  }; /* function (evnt) */
} /* end function createMakeAjaxRequest(url, handleOnLoad) */

/** flags to test only click events on each person */
const TESTING_PERSON_ON_CLICK = true;

function main() {
  if (!TESTING_PERSON_ON_CLICK) {
    makeAjaxRequest();
  }
}

main();
