
const myLibrary = [];

class Book {
    constructor(title , author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = Number(pages); // not required but can prevent future bugs if try to do math or concacate ratehr than using the string format
        this.read = Boolean(read); // not required as comes as a boolean but good practice to make robust
        this.id = crypto.randomUUID();
    }

    toggleRead() {
        this.read = !this.read;
    }

} // no semicolon as its a statement, would use if we were assigning it to a variable (class expression)


function addBookToLibrary(title, author, pages, read) {
    const t = title.trim().toLowerCase();
    const a = author.trim().toLowerCase();

    if (myLibrary.some(b => 
        b.title.trim().toLowerCase() === t && 
        b.author.trim().toLowerCase() === a
    )) return null;

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
};

myLibrary.push(new Book("Dune", "Frank Herbert", 412, false));
myLibrary.push(new Book("1984", "George Orwell", 328, true));

const libraryBodyEl = document.querySelector("#library-body");

function renderLibrary() {
    libraryBodyEl.textContent = ""; // clear existing rows so we can rebuild the table body from scratch using the array as the source of truth
    for (const book of myLibrary) {
        const rowEl = document.createElement("tr"); //creates a table row element <tr></tr> in memory but not on the page yet
        rowEl.dataset.id = book.id; //in the dom: <tr data-id="some-uuid-here">, makes it easy to retrieve later i.e when user "removes" or toggles "read" we know which book that row represents (and safer/cleaner than author or title)

        rowEl.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read ? "Yes" : "No"}</td>
            <td>
                <button type="button" data-action="toggle">Toggle read</button>
                <button type="button" data-action="remove">Remove</button>
            </td>
            `;

        libraryBodyEl.appendChild(rowEl);
    }
};

function removeBookById(id) {
    const idx = myLibrary.findIndex(b => b.id === id);
    if (idx !== -1) myLibrary.splice(idx, 1); //-1 is the return value of findIndex() if not found. Splice means find the position of the book in the array (which is idx), then the 1 means remove 1 element
}

function toggleReadById(id) {
    const book = myLibrary.find(b => b.id === id);
    if (book) book.toggleRead(); // if such book exists/truthy, then flip it
}

libraryBodyEl.addEventListener("click", (e) => {
    const buttonEl = e.target.closest("button");
    if (!buttonEl) return; // The button tells us *what* to do (data-action), but we still need the row’s data-id to know *which book* in myLibrary to update/delete.

    const rowEl = buttonEl.closest("tr");
    if (!rowEl) return; 

    const id = rowEl.dataset.id; // see above comment
    const action = buttonEl.dataset.action;

    if (action === "remove") removeBookById(id);
    if (action === "toggle") toggleReadById(id);

    renderLibrary();
});

const formEl = document.querySelector("#book-form");
const messageEl = document.querySelector("#message");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked; //.checked is a property on certain form elements mainly checkbox and radio

    const added = addBookToLibrary(title, author, pages, read);

    if (!added) {
        messageEl.textContent = "Duplicate found (same title + author). Has not been added.";
        return;
    }

    messageEl.textContent = ""; //clears any old duplicate message
    formEl.reset();
    renderLibrary();
});


renderLibrary();




