# Les Fleurs Shop

* [Canonical][canonical]

[![Presentation of the Interface][presentation-img]][presentation-doc]

## Project abstraction

[![UML Use Case Diagram][uml-usecase-img]][uml-usecase-doc]

Les Fleurs is a fictional flower shop that wants to modernize by building a website that their clients can use to place orders.  In this project, I will be starting from scratch.  I am limited to using the ECMAscript core, the HTML Document Object Model, and the `XMLHttpRequest` class for AJAX requests.  In this part of the project we will be implementing the following interactions:  The User agent actor will be able to interact with the Item database actor by searching with items;  the User agent actor will be able to interact with the Cart actor by adding or removing items into the cart, and the User agent actor will be able to interact with the Seller by placing orders, which will give the User agent a receipt.

## Project relevance

This project makes use of HTML5 and CSS Level 2 for the Graphical User Interface.  The file that stores acts as Item database actor is a JSON file.  It uses HTML forms as the basis of interaction between the user and the the Item database actor as well as AJAX to fetch the objects from the database.

## Conceptual design

The conceptual design of the project's script is mainly procedural, but uses objects from the HTML Document Object Model and the `XMLHttpRequest` class, and functional programming explained later.  The program also uses event driven architecture to provide function to the HTML forms as well as to handle AJAX requests.  Functional programming is used to build the events, providing scoped parameters that will be used during handling.

## Background

### Building

The project may be downloaded from [the `final` branch][final-branch] or together with the other projects in the [the `master` branch][master-branch].  There will be a release for `final` available once complete.

To install the latest version from the Terminal, use the following commands.

```bash
# clone the repo
git clone https://github.com/lduran2/cis114-javascript_i.git

# optionally, switch to the final project branch
git checkout final
```

### Running

An HTTP server is necessary to run the project and is not included. For this purpose, one may go to the use Python's HTTP server as follows from the root directory of the project.

<a name='running-server'></a>
```sh
python -m http.server 8000
```

Whichever server you prefer, the server must be started from the root directory of the project.

After starting a server, use the browser to navigate to <http://localhost:8000/les-fleurs/>.

The `8000` is the default port number for the server and may be changed, but must be consistent between its use [to start the server](#running-server) and in the address bar of your browser.

## Required resources
* Competencies
  * ECMAscript 12
  * HTML5
  * CSS Level 2
  * being able to use the Terminal
* Equipment
  * Hardware
    * A personal computer (a low end desktop or laptop will do)
  * Software
    * any graphical OS
    * a modern web browser
    * a way to start a server, such as [Python][python]

[canonical]: https://github.com/lduran2/cis114-javascript_i/tree/master/doc/proposal#readme "Canonical link to this PROPOSAL"

[final-branch]: https://github.com/lduran2/cis114-javascript_i/tree/final
[master-branch]: https://github.com/lduran2/cis114-javascript_i/

[presentation-img]: presentation.png "A typical workflow of the project.  The user performs a search, which sends a request to the catalog. Then the user picks an item, which updates to the shopping page. On the shopping page, the seller is then requested information about the item, then user may choose how many of that item to buy. This this updates to the cart, where the user may buy and receive a receipt."
[presentation-doc]: presentation.pdf

[uml-usecase-img]: uml-usecase-diagram.png "The service is a contract between the user, their payment service and home address to/from the administrator, item database, cart, the seller and deliveries department."
[uml-usecase-doc]: uml-usecase-diagram.pdf

[python]: https://www.python.org/downloads/
