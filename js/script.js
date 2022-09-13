window.onload = () => {
  let myLibrary = [],
    booksInfo = document.querySelector("#books-info"),
    closeIcon = document.querySelector(".fa-times"),
    addBookContainer = document.querySelector(".add-book"),
    showAddBook = document.getElementById("show-addbook"),
    saveBook = document.querySelector("#form-submit");

  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  }
  class Library {
    constructor(myLibrary) {
      this.myLibrary = Library;
    }
    addToLibrary(book) {
      myLibrary.push(book);
    }
    showBooks() {
      booksInfo.innerHTML = "";
      for (let i = 0; i < myLibrary.length; i++) {
        let bookItem = document.createElement("div"),
          chkRead = document.createElement("input"),
          h1Title = document.createElement("h1"),
          divDecription = document.createElement("div"),
          label = document.createElement("label"),
          buttonDelete = document.createElement("button");

        chkRead.setAttribute("type", "checkbox");
        chkRead.classList.add("read-checkbox");
        buttonDelete.classList.add("delete");
        bookItem.classList.add("book-card");
        label.classList.add("chk-container");
        label.textContent = "Read it?";

        chkRead.onclick = (e) => {
          this.editReadState(e);
        };
        buttonDelete.classList.add("delete");
        buttonDelete.onclick = (e) => {
          this.deleteBook(e);
        };

        bookItem.classList.add("book-card");
        !myLibrary[i].read
          ? (chkRead.checked = false)
          : (chkRead.checked = true);

        h1Title.textContent = myLibrary[i].title;
        divDecription.textContent = `By ${myLibrary[i].author}, ${myLibrary[i].pages} pages.`;
        buttonDelete.innerHTML = "<i class='fas fa-trash-alt'></i> Delete";

        bookItem.appendChild(h1Title);
        h1Title.classList.add("book-card_title");
        bookItem.appendChild(divDecription);
        divDecription.classList.add("book-card_description");
        label.appendChild(chkRead);
        bookItem.appendChild(label);
        bookItem.appendChild(buttonDelete);
        booksInfo.appendChild(bookItem);
      }
    }
    editReadState(e) {
      let title = e.target.parentElement.parentElement.children[0].textContent,
        currentCheckbox = e.target.parentElement.children[0].checked;

      myLibrary.forEach((book) => {
        book.title == title ? (book.read = currentCheckbox) : book.read;
      });
      this.showBooks();
    }
    deleteBook = (e) => {
      let title = e.target.parentElement.children[0].textContent;
      myLibrary = myLibrary.filter((elements) => elements.title != title);
      this.showBooks();
    };
  }

  const cLibrary = new Library(myLibrary);

  const reset = () => {
    document.getElementById("title").value = document.getElementById(
      "author"
    ).value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
    addBookContainer.classList.add("hidden");
  };
  //EVENT LISTENERS
  showAddBook.onclick = () => {
    if (addBookContainer.classList.contains("hidden")) {
      addBookContainer.classList.remove("hidden");
      // addBookContainer > form > fieldset > input=text
      addBookContainer.children[0].children[1].children[0].focus();
    }
  };
  saveBook.onsubmit = (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value,
      author = document.getElementById("author").value,
      pages = document.getElementById("pages").value,
      read = document.getElementById("read").checked;
    cLibrary.addToLibrary(new Book(title, author, pages, read));
    reset();
    cLibrary.showBooks();
  };
  closeIcon.onclick = reset;
  window.onkeyup = (e) => {
    if (e.key == "Escape") {
      reset();
    }
  };

  //ADDING BOOKS
  const seedBooks = (() => {
    cLibrary.addToLibrary(new Book("All My Rage", "Sabaa Tahir", 384, false));
    cLibrary.addToLibrary(new Book("Young Mungo", "Douglas Stuart", 392, true));
    cLibrary.addToLibrary(
      new Book("The Final Strife", "Saara El-Arifi", 583, false)
    );
    cLibrary.addToLibrary(
      new Book(
        "Quiet: The Power of Introverts in a World That Can't Stop Talking",
        "Susan Cain",
        368,
        true
      )
    );
    cLibrary.showBooks();
  })();
};
