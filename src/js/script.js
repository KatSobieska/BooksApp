{
  ('use strict');

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    element: {
      bookImage: '.book__image',
    },
    form: {
      filters: '.filters',
    },
  };
  const templates = {
    bookProduct: Handlebars.compile(
      document.querySelector(select.templateOf.bookProduct).innerHTML
    ),
  };

  const render = function () {
    const thisBook = this;

    for (let book of dataSource.books) {
      const generatedHTML = templates.bookProduct(book);

      thisBook.element = utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector(
        select.containerOf.booksList
      );

      bookContainer.appendChild(thisBook.element);
    }
  };

  const favoriteBooks = [];
  const filters = [];

  const initActions = function () {
    const thisBook = this;

    thisBook.accordionTrigger = document.querySelector(
      select.containerOf.booksList
    );
    thisBook.bookImage = thisBook.accordionTrigger.querySelectorAll('.book a');
    thisBook.filterForm = thisBook.document.querySelector(select.form.filters);

    thisBook.accordionTrigger.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const book = event.target.offsetParent;
      console.log('clicked', book);

      if (book.classList.contains('book__image')) {
        book.classList.toggle('favorite');

        const bookImageId = book.getAttribute('data-id');

        if (favoriteBooks.includes(bookImageId)) {
          favoriteBooks.splice(favoriteBooks.indexOf(bookImageId));
        } else {
          favoriteBooks.push(bookImageId);
        }
      }

      console.log('favoriteBooks', favoriteBooks);
    });

    thisBook.filterForm.addEventListener('click', function (event) {
      const filter = event.target;
      if (
        filter.tagName == 'INPUT' &&
        filter.type == 'checkbox' &&
        filter.name == 'filter'
      ) {
        if (filter.checked == true) {
          filters.push(filter.value);
        } else {
          filters.splice(filters.indexOf(filter.value));
        }
      }
      filterBooks();
      console.log('value', filter.value);
      console.log('filters', filters);
    });
  };
  const filterBooks = function () {
    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (let filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      if (shouldBeHidden == true) {
        const bookImage = document.querySelector('[data-id="' + book.id + '"]');
        bookImage.classList.add('hidden');
      } else {
        const bookImage = document.querySelector('[data-id="' + book.id + '"]');
        bookImage.classList.remove('hidden');
      }
    }

    console.log('bookImage', bookImage);
  };

  render();
  initActions();
}
