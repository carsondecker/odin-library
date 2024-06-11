const modal = document.querySelector("dialog");
const form = document.querySelector("form");
const newBookButton = document.querySelector("#new-book");
const addBookButton = document.querySelector("#add-book")
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${pages}, ${read}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    modal.close();
    form.reset();
    console.log(myLibrary)
}

//function updateLibrary() {}

function submitForm(event) {
    event.preventDefault();
    addBookToLibrary(new Book(formTitle.value, formAuthor.value, formPages.value, formRead.checked));
}

newBookButton.addEventListener("click", () => { modal.showModal(); });
form.addEventListener("submit", submitForm);