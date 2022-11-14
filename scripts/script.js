const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const completed = document.querySelector("#completed");
const saveButton = document.querySelector("#save-button");
const main = document.querySelector("main");

class Book {
    constructor(title, author, pages, isCompleted) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isCompleted = isCompleted;
    }

    getTitle() {
        return this.title;
    }

    getAuthor() {
        return this.author;
    }

    getPages() {
        return this.pages;
    }

    getIsCompleted() {
        return this.isCompleted;
    }

    toggleCompleted() {
        if (this.isCompleted) {
            this.isCompleted = false;
        } else {
            this.isCompleted = true;
        }
        alert(`completed is ${this.isCompleted}`);
    }

    getInfo() {
        if (this.isCompleted) {
            return `${this.title} by ${this.author}, ${this.pages} pages, read book.`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`;
        }
    }
}

// function to clear the text fields
function EraseInput() {
    title.value = "";
    author.value = "";
    pages.value = "";
    completed.checked = false;
}

function addBookToLibrary() {
    // get info from form and create new Book object
    book = new Book(title.value, author.value, pages.value, completed.checked);
    // add object to myLibrary
    myLibrary.push(book);
    // create card and add to DOM
    createCard(book);
}

function removeBookFromList(info) {
    var objectIndex = myLibrary.findIndex((bk) => bk.getInfo() === info);
    myLibrary.splice(objectIndex, 1);
}

// function to toggle if book is completed or not
function toggleBookStatusFromList(info) {
    var objectIndex = myLibrary.findIndex((bk) => bk.getInfo() === info);
    if (myLibrary[objectIndex].isCompleted) {
        myLibrary[objectIndex].isCompleted = false;
    } else {
        myLibrary[objectIndex].isCompleted = true;
    }
    return myLibrary[objectIndex].isCompleted;
}

function createCard(book) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const p1 = document.createElement("p");
    p1.classList.add("card-subheader");
    p1.textContent = "Title:";
    cardDiv.append(p1);

    const p2 = document.createElement("p");
    p2.classList.add("title", "book-data");
    p2.textContent = book.getTitle();
    cardDiv.append(p2);

    const p3 = document.createElement("p");
    p3.classList.add("card-subheader");
    p3.textContent = "Author:";
    cardDiv.append(p3);

    const p4 = document.createElement("p");
    p4.classList.add("author", "book-data");
    p4.textContent = book.getAuthor();
    cardDiv.append(p4);

    const p5 = document.createElement("p");
    p5.classList.add("card-subheader");
    p5.textContent = "Pages:";
    cardDiv.append(p5);

    const p6 = document.createElement("p");
    p6.classList.add("pages", "book-data");
    p6.textContent = book.getPages();
    cardDiv.append(p6);

    const completedText = document.createElement("button");
    completedText.classList.add("status-button");
    completedText.textContent = book.getIsCompleted() ? "Completed" : "Not Completed";
    completedText.onclick = function () {
        var newCompletedStatus = toggleBookStatusFromList(book.getInfo());
        completedText.textContent = newCompletedStatus ? "Completed" : "Not Completed";
    }
    cardDiv.append(completedText);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = function () {
        main.removeChild(cardDiv);
        removeBookFromList(book.getInfo());
    }
    cardDiv.append(deleteButton);

    main.appendChild(cardDiv);
}

let myLibrary = [];
let book = new Book();

EraseInput();

saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    EraseInput();
});
