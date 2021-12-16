# Les Fleurs Shop

* [Canonical][canonical]

## Project abstraction

[![UML Use Case Diagram][uml-usecase-img]][uml-usecase-doc]

Les Fleurs is a fictional flower shop that wants to modernize by building a website that their clients can use to place orders.  In this project, I will be starting from scratch.  I am limited to using the ECMAscript core, the HTML DOM, and the `XMLHttpRequest` class for AJAX requests.  In this part of the project we will be implementing the following interactions:  The User agent actor will be able to interact with the Item database actor by searching with items;  the User agent actor will be able to interact with the Cart actor by adding or removing items into the cart, and the User agent actor will be able to interact with the Seller by placing orders, which will give the User agent a receipt.

## Project relevance

This project makes use of HTML5 and CSS Level 2 for the Graphical User Interface.  It uses HTML forms as the basis of interaction between the user and the JSON file representing the Item database actor 

## Conceptual design

## Background

### Building

The project may be downloaded from [the `final` branch][final-branch].  There will be a release available once complete.

To install the latest version, use the following commands.

<table id='tab-building'>
<caption>Downloading and setting up the final project.</caption>

```bash
# clone the repo
git clone https://github.com/lduran2/cis114-javascript_i.git

# switch to the final project branch
git checkout final
```

</table>

### Running

An HTTP server is necessary to run the project and is not included. For this purpose, one may use Python's HTTP server as follows.

<table id='tab-running'>
<caption>Runing the HTTP server.</caption>

```sh
cd public
python -m http.server 8000
```

</table>
  
from the root directory of the project.

</table>

After starting a server, use the browser to go to `http://localhost:8000` on their web browser.

The `8000` is the default port number and may be changed, but should be consistent between its use in [Table 2][#tab-running] and in the address bar of your browser.

[canonical]: https://github.com/lduran2/cis114-javascript_i/tree/PROPOSAL-final/doc/proposal#readme "Canonical link to this PROPOSAL"

[uml-usecase-img]: uml-usecase-diagram.png "The service is a contract between the user, their payment service and home address to/from the administrator, item database, cart, the seller and deliveries department."
[uml-usecase-doc]: uml-usecase-diagram.pdf

[final-final]: https://github.com/lduran2/cis114-javascript_i/tree/final
