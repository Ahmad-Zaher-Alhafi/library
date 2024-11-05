const booksTable = document.querySelector(".booksBody");
const container = document.querySelector(".container");

class Book {
    constructor(id, author, title, pagesNum, isRead) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.pagesNum = pagesNum;
        this.isRead = isRead;
    }

    negateIsRead() {
        this.isRead = !this.isRead;
    }
}

let bookId = 0;

const library = [new Book(bookId++, "Zaher", "My life sucks", 125, true), new Book(bookId++, "Jasem", "How to stay alive", 75, true), new Book(bookId++, "Malek", "Do not die", 25, false)];

function addBookToLibrary(book) {
    library.push(book);
    addBookToTable(book);
}

function addBooksToTable() {
    library.forEach(book => {
        addBookToTable(book);
    });
}

function addBookToTable(book) {
    let tr = createBookTableRow(book.id, book.author, book.title, book.pagesNum, book.isRead);
    booksTable.appendChild(tr);
}

function createBookTableRow(id, author, title, pagesNum, isRead) {
    let tr = document.createElement("tr");

    let td = document.createElement("td");
    td.setAttribute("class", "id");
    td.textContent = id;
    tr.appendChild(td);

    td = document.createElement("td");
    td.textContent = author;
    tr.appendChild(td);

    td = tr.appendChild(document.createElement("td"));
    td.textContent = title;
    tr.appendChild(td);

    td = tr.appendChild(document.createElement("td"));
    td.textContent = pagesNum;
    tr.appendChild(td);

    td = tr.appendChild(document.createElement("td"));
    td.setAttribute("class", "isRead");
    td.textContent = isRead;
    tr.appendChild(td);


    td = document.createElement("td");
    let changeIsReadButton = tr.appendChild(document.createElement("button"));
    changeIsReadButton.textContent = "Change read status";
    changeIsReadButton.onclick = () => {
        negateIsReadStatus(id);
    }
    td.appendChild(changeIsReadButton)
    tr.appendChild(td);

    td = document.createElement("td");
    let deleteButton = tr.appendChild(document.createElement("button"));
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
        removeBookFromLibrary(id);
    }
    td.appendChild(deleteButton)
    tr.appendChild(td);


    return tr;
}

function refreashBookIsRead(book) {
    let children = booksTable.querySelectorAll(".id");
    for (let index = 0; index < children.length; index++) {
        let td = children[index];
        if (td.textContent == book.id) {
            td.parentElement.querySelector(".isRead").textContent = book.isRead;
            break;
        }
    }
}

function removeBookFromTable(bookID) {
    let children = booksTable.querySelectorAll(".id");
    for (let index = 0; index < children.length; index++) {
        let td = children[index];
        if (td.textContent == bookID) {
            booksTable.removeChild(td.parentElement);
            break;
        }
    }
}

function removeBookFromLibrary(bookId) {
    library.filter(book => book.id === bookId).pop();
    removeBookFromTable(bookId);
}

function negateIsReadStatus(bookId) {
    let book = library.find(book => book.id === bookId);
    book.negateIsRead();
    refreashBookIsRead(book);
}

const dialog = document.querySelector("dialog");
const author = document.getElementById("author");
const title = document.getElementById("title");
const pagesNumber = document.getElementById("pagesNumber");
const isRead = document.getElementById("isRead");

const addBookButton = document.querySelector(".addBookButton");

addBookButton.addEventListener("click", function () {
    dialog.setAttribute("open", "");
    container.removeChild(addBookButton);
});


dialog.addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary(new Book(bookId++, author.value, title.value, pagesNumber.value, isRead.checked));
    clearDialog();
    dialog.removeAttribute("open");
    container.appendChild(addBookButton);
});

const cancelButton = document.querySelector(".cancelButton");

cancelButton.addEventListener("click", function () {
    clearDialog();
    dialog.removeAttribute("open");
    container.appendChild(addBookButton);
});

function clearDialog() {
    author.value = "";
    title.value = "";
    pagesNumber.value = "";
    isRead.checked = false;
}


addBooksToTable();