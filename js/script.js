let myLibrary = [],
  booksInfo = document.querySelector("#books-info"),
  cancel = document.getElementById("cancel"),
  addBookContainer = document.querySelector(".add-book"),
  showAddBook = document.getElementById("show-addbook"),
  saveBook = document.querySelector("#form-submit");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
function addToLibrary(book) {
  myLibrary.push(book);
  hideAddBook();
  reset();
}
function showBooks() {
  booksInfo.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let bookItem = document.createElement("div"),
      chkRead = document.createElement("input"),
      h1Title = document.createElement("h1"),
      divDecription = document.createElement("div"),
      buttonRead = document.createElement("button"),
      buttonDelete = document.createElement("button");

    chkRead.setAttribute("type", "checkbox");
    chkRead.classList.add("read-checkbox");
    buttonDelete.classList.add("delete");
    bookItem.classList.add("book-card");
    chkRead.onclick = (e) => {
      editReadState(e);
    };

    buttonDelete.classList.add("delete");
    buttonDelete.onclick = (e) => {
      deleteBook(e);
    };

    bookItem.classList.add("book-card");
    !myLibrary[i].read ? (chkRead.checked = false) : (chkRead.checked = true);

    h1Title.textContent = myLibrary[i].title;
    divDecription.textContent = `By ${myLibrary[i].author}, ${myLibrary[i].pages} pages.`;
    buttonRead.textContent = "Read";
    buttonDelete.textContent = "Delete";

    bookItem.appendChild(h1Title);
    h1Title.classList.add("book-card_title");
    bookItem.appendChild(divDecription);
    divDecription.classList.add("book-card_description");
    bookItem.appendChild(chkRead);
    bookItem.appendChild(buttonDelete);
    booksInfo.appendChild(bookItem);
  }
}
const editReadState = (e) => {
  let title = e.target.parentElement.children[0].textContent,
    currentCheckbox = e.target.parentElement.children[2].checked;
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title == title) {
      myLibrary[i].read = currentCheckbox ? true : false;
    }
  }
  showBooks();
};
const deleteBook = (e) => {
  let title = e.target.parentElement.children[0].textContent;
  myLibrary = myLibrary.filter((elements) => elements.title != title);
  showBooks();
};
const reset = () => {
  document.getElementById("title").value = document.getElementById(
    "author"
  ).value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
};
const hideAddBook = () => {
  addBookContainer.classList.add("hidden");
};
showAddBook.onclick = () => {
  if (addBookContainer.classList.contains("hidden")) {
    addBookContainer.classList.remove("hidden");
  }
};
saveBook.onsubmit = (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    pages = document.getElementById("pages").value,
    read = document.getElementById("read").checked;

  addToLibrary(new Book(title, author, pages, read));
  showBooks();
};

addToLibrary(new Book("All My Rage", "Sabaa Tahir", 384, false));
addToLibrary(new Book("Young Mungo", "Douglas Stuart", 392, true));
addToLibrary(new Book("The Final Strife", "Saara El-Arifi", 583, false));
showBooks();
