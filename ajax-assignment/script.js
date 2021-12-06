'use strict';

function handlePeopleAjaxResponse(evnt) {
  if (evnt.target.statusText !== 'OK') {
    console.error(evnt.target.statusText);
    console.error(evnt.target.status);
    return;
  }
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

function makeAjaxRequest(evnt) {
  let request = new XMLHttpRequest();
  request.open('GET', 'people.json');
  request.responseType = 'json';
  request.send();

  request.addEventListener('load', handlePeopleAjaxResponse);

  request.addEventListener('error', function(evnt) {
    console.error(evnt);
  });
}

function main() {
  makeAjaxRequest();
}

main();
