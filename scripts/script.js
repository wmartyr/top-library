
let myLibrary = [];
let book = new Book();
let bookCounter = 0;

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const completed = document.querySelector("#completed");
const saveButton = document.querySelector("#save-button");
const main = document.querySelector("main");

function EraseInput() {
    title.value = "";
    author.value = "";
    pages.value = "";
    completed.checked = false;
}

function Book(bookID, title, author, pages, isCompleted) {
    this.bookID = bookID;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isCompleted = isCompleted;

    this.getId = function () {
        return bookID;
    }

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

    this.toggleCompleted = function () {
        if (isCompleted) {
            isCompleted = false;
        } else {
            isCompleted = true;
        }
        alert(`completed is ${isCompleted}`);
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
    book = new Book(++bookCounter, title.value, author.value, pages.value, completed.checked);
    console.log(book.info());
    // add object to myLibrary
    myLibrary.push(book);
    // create card and add to DOM
    createCard(book);
}

function removeBookFromList(id) {
    var objectIndex = myLibrary.findIndex((bk) => bk.bookID == id);
    myLibrary.splice(objectIndex, 1);
}

function toggleBookStatusFromList(id) {
    var objectIndex = myLibrary.findIndex((bk) => bk.bookID == id);
    if (myLibrary[objectIndex].isCompleted) {
        myLibrary[objectIndex].isCompleted = false;
    } else {
        myLibrary[objectIndex].isCompleted = true;
    }
}

function createCard(book) {
    const cardId = book.getId();

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
        toggleBookStatusFromList(cardId);
        book.toggleCompleted();
        completedText.textContent = book.getIsCompleted() ? "Completed" : "Not Completed";
    }
    cardDiv.append(completedText);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = function () {
        main.removeChild(cardDiv);
        removeBookFromList(cardId);
    }
    cardDiv.append(deleteButton);

    main.appendChild(cardDiv);
}

EraseInput();

saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    EraseInput();
});
