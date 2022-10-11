
let myLibrary = [];
let book = new Book();

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const completed = document.querySelector("#completed");
const saveButton = document.querySelector("#save-button");

function Book(title, author, pages, isCompleted) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isCompleted = isCompleted;

    this.getTitle = function () {
        return title;
    }

    this.getAuthor = function () {
        return author;
    }

    this.getPages = function () {
        return pages;
    }

    this.getIsCompleted = function () {
        return isCompleted;
    }

    this.info = function () {
        if (isCompleted) {
            return `${title} by ${author}, ${pages} pages, read book.`;
        } else {
            return `${title} by ${author}, ${pages} pages, not read yet.`;
        }
    }
}

function addBookToLibrary() {
    // get info from form and create new Book object
    book = new Book(title.value, author.value, pages.value, completed.checked);
    // add object to myLibrary
    myLibrary.push(book);
    alert(myLibrary.length);
    // create card and add to DOM
}

function removeBookFromLibrary() {
    // remove card from DOM
    // remove object from myLibrary
}

saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
});


