let myLibrary = [],
  booksInfo = document.querySelector("#books-info"),
  cancel = document.getElementById("cancel"),
  addBookContainer = document.querySelector(".add-book");
(showAddBook = document.getElementById("show-addbook")),
  (saveBook = document.querySelector("#form-submit"));

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.getInfo = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

function addToLibrary(book) {
  myLibrary.push(book);
  hideAddBook();
}
function sendToDOM() {
  booksInfo.textContent = "";
  for (let i = 0; i <= myLibrary.length - 1; i++) {
    let bookItem = document.createElement("div");
    let ul = document.createElement("ul"),
      liTitle = document.createElement("li"),
      liAuthor = document.createElement("li"),
      liPages = document.createElement("li"),
      liRead = document.createElement("li"),
      chkReadText = document.createElement("span"),
      chkRead = document.createElement("input");

    chkRead.setAttribute("type", "checkbox");
    chkRead.setAttribute("disabled", "true");

    liTitle.textContent = "Title: " + myLibrary[i].title;
    ul.appendChild(liTitle);
    liAuthor.textContent = "Author: " + myLibrary[i].author;
    ul.appendChild(liAuthor);
    liPages.textContent = "Pages: " + myLibrary[i].pages;
    ul.appendChild(liPages);

    chkReadText.textContent = "Read: ";
    liRead.appendChild(chkReadText);
    !myLibrary[i].read ? (chkRead.checked = false) : (chkRead.checked = true);
    liRead.appendChild(chkRead);
    ul.appendChild(liRead);
    bookItem.appendChild(ul);
    booksInfo.appendChild(bookItem);
  }
}

const hideAddBook = () => {
  addBookContainer.classList.add("hidden");
};
showAddBook.onclick = () => {
  if (addBookContainer.classList.contains("hidden")) {
    addBookContainer.classList.remove("hidden");
  }
};
cancel.onclick = hideAddBook;
saveBook.onsubmit = (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    pages = document.getElementById("pages").value,
    read = document.getElementById("read").checked;
  addToLibrary(new Book(title, author, pages, read));
  sendToDOM();
};
window.onload = () => {
  addToLibrary(new Book("All My Rage", "Sabaa Tahir", 384, false));
  addToLibrary(new Book("Young Mungo", "Douglas Stuart", 392, true));
  addToLibrary(new Book("The Final Strife", "Saara El-Arifi", 583, false));
  sendToDOM();
};
