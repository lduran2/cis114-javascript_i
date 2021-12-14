/**
 * /scripts/shop-les-fleurs.js
 * Gets data from the JSON action of each JSON form and populates them.
 *
 * By        : Leomar Duran <https://github.com/lduran2>
 * When      : 2021-12-13t22:39
 * Where     : Community College of Philadelphia
 * For       : CIS 114/JavaScript I
 * Version   : 2.0.0
 * Canonical : https://github.com/lduran2/cis114-javascript_i/blob/master/scripts/populate_json_forms.js
 *
 * CHANGELOG :
 *     v2.0.0 - 2021-12-13t22:39
 *         started adapting `populate_json_forms.js` to search form
 *
 *     v1.1.7 - 2021-12-03t23:16
 *         handling not OK status
 *
 *     v1.1.6 - 2021-12-03t23:00
 *         populating the array lists
 *
 *     v1.1.5 - 2021-12-03t22:38
 *         fixed checking the type of objects (arrays are objects)
 *
 *     v1.1.4 - 2021-12-03t22:11
 *         populating string fields
 *
 *     v1.1.3 - 2021-12-03t22:03
 *         check the type of the values in the data
 *
 *     v1.1.2 - 2021-12-03t21:30
 *         tested multiple forms.
 *         Had a null JSON file before the actual form.
 *         Result: XMLHttpRequest objects cannot be reused.
 *
 *     v1.1.1 - 2021-12-03t21:14
 *         testing `REQUEST.onerror`.
 *         All actions are replaced with
 *         <https://developer.mozilla.org/>, causing a XSS error that
 *         stops all events.
 *
 *     v1.1.0 - 2021-12-03t20:01
 *         started populating multiple forms
 *
 *     v1.0.0 - 2021-12-03t19:00
 *         started with a specific form
 */
'use strict';

/** enumeration of the requestType for JSON files */
const JSON_TYPE = 'json';
/** enumeration of an OK status */
const OK_STATUS = 200;

/**
 * Gets data from the JSON action of each JSON form and populates them.
 * @param evnt : Event = the event that triggers this listener
 */
function main(evnt) {
    const ITEM_POINTER = [];
    /* the cart object */
    const CART = {};

    /* get and check the document document body */
    const BODY_EL = document.querySelector('body');
    if (!BODY_EL) {
        return;
    } /* if (!BODY_EL) */

    /* get and check the search form */
    const SEARCH_FORM_EL = BODY_EL.querySelector('#search');
    if (!SEARCH_FORM_EL) {
        return;
    } /* if (!SEARCH_FORM_EL) */

    /* get and check the item form */
    const ITEM_FORM_EL = BODY_EL.querySelector('#item');
    if (!ITEM_FORM_EL) {
        return;
    } /* if (!ITEM_FORM_EL) */

    /* get and check the display item element */
    const DISPLAY_ITEM_EL = ITEM_FORM_EL.querySelector('.display');
    if (!DISPLAY_ITEM_EL) {
        return;
    } /* if (!DISPLAY_ITEM_EL) */
    /* create its accessor */
    const DISPLAY_ITEM = createDisplayItem(DISPLAY_ITEM_EL, ITEM_POINTER);

    /* get and check the item form */
    const CART_FORM_EL = BODY_EL.querySelector('#cart');
    if (!CART_FORM_EL) {
        return;
    } /* if (!CART_FORM_EL) */

    /* get and check the display item element */
    const CART_OL_EL = CART_FORM_EL.querySelector('#cart-list');
    if (!CART_OL_EL) {
        return;
    } /* if (!CART_OL_EL) */

    /* add form submit events */
    SEARCH_FORM_EL.addEventListener('submit', createSendJsonFormRequest(DISPLAY_ITEM));
    ITEM_FORM_EL.addEventListener('submit', createAddToCart(ITEM_POINTER, CART, CART_OL_EL));
    CART_FORM_EL.addEventListener('submit', createBuyInCart(CART));

    /* finish */
    console.log('Done.');
} /* end function main(evnt) */

/**
 * Sends a request to a JSON file using the given form element's method
 * and action.
 * @param formEl : Element = for which to send a JSON request
 */
function createSendJsonFormRequest(displayItem) {
    return function sendJsonFormRequest(evnt) {
        evnt.preventDefault();
        /* get the form element */
        const FORM_EL = evnt.target;
        /* create a new request */
        const REQUEST = new XMLHttpRequest();
        /* get the form action and method */
        const METHOD = FORM_EL.getAttribute('method');
        const ACTION = FORM_EL.getAttribute('action');
        /* open the request */
        REQUEST.open(METHOD, ACTION);
        REQUEST.responseType = JSON_TYPE;
        /* add the load and error events */
        REQUEST.addEventListener('load', createPopulateShopSearchResults(FORM_EL, displayItem));
        REQUEST.addEventListener('error', throwRequestLoadingError);
        /* send the request */
        REQUEST.send();
    } /* function sendJsonFormRequest(formEl) */
}

/**
 * Creates an event listener that populates the search results for Les
 * Fleurs.
 * @param evnt : Event = the event that triggers this listener
 */
function createPopulateShopSearchResults(formEl, displayItem) {
    return function (evnt) {
        /* log the event */
        console.log('createPopulateForm(formEl)(evnt)');
        console.log('formEl:', formEl);
        console.log('evnt:', evnt);

        /* if not OK status */
        if (OK_STATUS !== evnt.target.status) {
            /* throw an error */
            throw `${evnt.target.status}: ${evnt.target.statusText}`;
        } /* if (OK_STATUS !== evnt.target.status) */

        /* get the results element */
        const RESULTS_EL = formEl.querySelector('#search-results');
        /* split up the search keys */
        const SEARCH_KEYS = formEl.elements['keys'].value.split(' ');
        /* get the response data */
        const DATA = evnt.target.response;

        emptyNode(RESULTS_EL);

        /* loop through the data */
        for (const ITEM of DATA) {
            addResultIfMatch(ITEM, RESULTS_EL, SEARCH_KEYS, displayItem)
        }
    }; /* return function (evnt) */
} /* end function createPopulateShopSearchResults(formEl) */

function addResultIfMatch(item, resultsEl, searchKeys, displayItem) {
    /* combine name and description for the search string */
    const SEARCH_STRING = [ item.name, item.description ].join();
    /* split for the search range */
    const SEARCH_RANGE = SEARCH_STRING.split(' ');
    /* check if this item matches the search results */
    if (anyIn(searchKeys, SEARCH_RANGE)) {
        /* create a list element */
        const LI_EL = document.createElement('li');
        /* append the items to it */
        appendDivTextsTo(item, LI_EL);
        LI_EL.addEventListener('click', displayItem(item));
        /* append it to the results */
        resultsEl.appendChild(LI_EL)
    } /* if (anyIn(searchKeys, SEARCH_RANGE)) */
} /* function addResultIfMatch(item, resultsEl, searchKeys) */

/**
 * Throws a request loading error.
 * @param evnt : Event = the event that triggers this listener
 */
function throwRequestLoadingError(evnt) {
    /* log the event */
    console.log('throwRequestLoadingError(evnt)');
    console.log('evnt:', evnt);
    /* stop the program */
    throw 'error loading request';
} /* end function throwRequestLoadingError(evnt) */

function createDisplayItem(displayItemEl, itemPointer) {
    return function (currentItem) {
        return function (evnt) {
            const liEl = evnt.target;
            /* empty the displayItemEl */
            emptyNode(displayItemEl);
            /* add the item to the display-item box */
            appendDivTextsTo(currentItem, displayItemEl);
            /* make item (parent) active */
            console.log(currentItem);
            displayItemEl.parentNode.classList.add('active');
            /* save this item */
            itemPointer[0] = currentItem;
        }
    }
} /* function createDisplayItem(displayItemEl, itemPointer)*/

function createAddToCart(itemPointer, cart, cartOlEl) {
    return function (evnt) {
        evnt.preventDefault();
        /* get the form element */
        const FORM_EL = evnt.target;
        /* get the quantity */
        const QUANTITY = FORM_EL.elements['quantity'].value;
        /* check that the quantity is greater than 0 */
        /* if not, then stop */
        if (QUANTITY <= 0) {
            return;
        }
        /* active the parent node */
        cartOlEl.parentNode.classList.add('active');
        /* update the cart image */
        const CART_FORM_EL = cartOlEl.parentNode;
        const CART_IMG = CART_FORM_EL.querySelector('#cart-icon');
        CART_IMG.src = CART_IMG.src.replace('empty', 'full');
        /* add to the cart object */
        cart[itemPointer[0].name] = QUANTITY;
        /* update the cart */
        updateCartElement(cart, cartOlEl);
    }
} /* function createAddToCart(itemPointer, cart, cartOlEl) */

function createBuyInCart(cart) {
    return function (evnt) {
        evnt.preventDefault();
        /* get the form element */
        const FORM_EL = evnt.target;
        /* get and check the display item element */
        const CART_OL_EL = FORM_EL.querySelector('#cart-list');
        /* update the cart image */
        const CART_IMG = FORM_EL.querySelector('#cart-icon');
        CART_IMG.src = CART_IMG.src.replace('full', 'empty');
        /* delete every item in the cart */
        for (const ITEM of Object.keys(cart)) {
            delete cart[ITEM];
        }
        /* update the cart */
        updateCartElement(cart, CART_OL_EL);
    }
} /* function createBuyInCart(cart) */

function updateCartElement(cart, cartOlEl) {
    /* update the cart element */
    emptyNode(cartOlEl);
    /* assemble an array of the item to quantity mappings */
    const ITEM_STRINGS = [];
    for (const ITEM of Object.keys(cart)) {
        ITEM_STRINGS.push([ ITEM, ': ', cart[ITEM] ].join(''));
    }
    /* unpack and append it to the list */
    appendItemTextsTo(ITEM_STRINGS, cartOlEl);
} /* function updateCartElement(cart, cartOlEl) */

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
 * Returns whether any of the strings in keys is in the given range.
 * @param keys : Array = of strings for which to search
 * @param range : Array = of strings in which to search
 * @return true if any of the strings in keys is in the given range;
 * false otherwise.
 */
function anyIn(keys, range) {
    /* loop through the keys */
    for (const KEY of keys) {
        /* loop through the range */
        for (const RANGE of range) {
            /* compare both ignoring case */
            /* if equal */
            if (RANGE.toLowerCase().indexOf(KEY.toLowerCase()) >= 0) {
                /* return true */
                return true;
            } /* end if (RANGE.toLowerCase().indexOf(KEY.toLowerCase())
                             >= 0)
               */
        } /* end for (const RANGE of range) */
    } /* end for (const KEY of keys) */
    /* if here, then none of the keys was found */
    return false;
} /* end function anyIn(keys, range) */

/**
 * Assembles division or images elements from the given array of items and adds them
 * to the given parent node.
 * @param items = stringable items to add to the list
 * @param parentNode : Node = node to append the list items to
 */
function appendDivTextsTo(item, parentNode) {
    console.log(parentNode);
    /* create the image for the picture and name */
    const IMG_EL = document.createElement('img');
    IMG_EL.setAttribute('src', ['../images/', item.picture].join(''));
    IMG_EL.setAttribute('alt', item.name);
    /* append it */
    parentNode.appendChild(IMG_EL);
    /* loop through the object */
    for (const KEYS of Object.keys(item)) {
        /* skip the picture which we already handled */
        if (KEYS==='picture') {
            continue;
        }
        /* assemble a division element */
        const DIV_EL = document.createElement('div');
        const DIV_TEXT = document.createTextNode(item[KEYS]);
        /* add the key as the class name */
        DIV_EL.classList.add(KEYS);
        DIV_EL.appendChild(DIV_TEXT);
        /* append the list item */
        parentNode.appendChild(DIV_EL);
    } /* for (const KEYS of Object.keys(item)) */
} /* end function appendDivTextsTo(item, parentNode) */

/**
 * Assembles list items from the given array of items and adds them
 * to the given list.
 * @param items = stringable items to add to the list
 * @param listEl : Node = list element to append the list items to
 */
function appendItemTextsTo(items, listEl) {
    /* loop through the object */
    for (const ITEM of items) {
        /* assemble a list item element */
        const LI_EL = document.createElement('li');
        const ITEM_TEXT = document.createTextNode(ITEM);
        LI_EL.appendChild(ITEM_TEXT);
        /* append the list item */
        listEl.appendChild(LI_EL);
    } /* for (const ITEM of items) */
} /* end function appendItemTextsTo(items, listEl) */

/* add main to the window load event */
document.addEventListener('DOMContentLoaded', main);
