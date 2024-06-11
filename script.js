const modal = document.querySelector("dialog");
const form = document.querySelector("form");
const newBookButton = document.querySelector("#new-book");
const addBookButton = document.querySelector("#add-book")
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");
const bookContainer = document.querySelector(".book-container");

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
    updateLibrary();
    console.log(myLibrary)
}

function updateLibrary() {
    bookContainer.innerHTML = '';
    myLibrary.forEach((book, index) => { createBookCard(book, index); })
}

function createBookCard(book, index) {
    card = document.createElement('div');
    card.classList.add("book-card");
    card.id = index;

    title = document.createElement('span');
    title.classList.add('book-title');
    title.textContent = book.title;
    card.appendChild(title);

    author = document.createElement('span');
    author.classList.add('book-author');
    author.textContent = book.author;
    card.appendChild(author);

    pages = document.createElement('span');
    pages.classList.add('book-pages');
    pages.textContent = book.pages;
    card.appendChild(pages);

    read = document.createElement('button');
    read.classList.add('book-read');
    book.read ? read.textContent = 'Read' : read.textContent = 'Not Read'
    book.read ? read.classList.add('read') : read.classList.add('not-read')
    read.addEventListener("click", (e) => {
        thisRead = e.currentTarget;
        i = thisRead.parentNode.id;
        myLibrary[i].read = !myLibrary[i].read;
        myLibrary[i].read ? thisRead.textContent = 'Read' : thisRead.textContent = 'Not Read';
        thisRead.classList.toggle('read');
        thisRead.classList.toggle('not-read');
    })
    card.appendChild(read);

    remove = document.createElement('button');
    remove.classList.add('book-remove');
    remove.textContent = 'Remove';
    remove.addEventListener("click", () => {
        myLibrary.splice(index, 1);
        updateLibrary();
    })
    card.appendChild(remove);
    
    bookContainer.appendChild(card);
}

newBookButton.addEventListener("click", () => { modal.showModal(); });
form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    addBookToLibrary(new Book(formTitle.value, formAuthor.value, formPages.value, formRead.checked));
});