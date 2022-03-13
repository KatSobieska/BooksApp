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

  class BookList {
    constructor() {
      const thisBook = this;

      thisBook.favoriteBooks = [];
      thisBook.filters = [];

      thisBook.initData();
      thisBook.getElements();
      thisBook.initActions();
    }
    initData() {
      const thisBook = this;

      for (let book of dataSource.books) {
        book.ratingBgc = thisBook.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        const generatedHTML = templates.bookProduct(book);

        thisBook.element = utils.createDOMFromHTML(generatedHTML);

        const bookContainer = document.querySelector(
          select.containerOf.booksList
        );

        bookContainer.appendChild(thisBook.element);
      }
    }
    getElements() {
      const thisBook = this;

      thisBook.accordionTrigger = document.querySelector(
        select.containerOf.booksList
      );
      thisBook.filterForm = document.querySelector(select.form.filters);
    }

    initActions() {
      const thisBook = this;

      thisBook.bookImage =
        thisBook.accordionTrigger.querySelectorAll('.book a');

      thisBook.accordionTrigger.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const book = event.target.offsetParent;
        console.log('clicked', book);

        if (book.classList.contains('book__image')) {
          book.classList.toggle('favorite');

          const bookImageId = book.getAttribute('data-id');

          if (thisBook.favoriteBooks.includes(bookImageId)) {
            thisBook.favoriteBooks.splice(
              thisBook.favoriteBooks.indexOf(bookImageId)
            );
          } else {
            thisBook.favoriteBooks.push(bookImageId);
          }
        }

        console.log('favoriteBooks', thisBook.favoriteBooks);
      });

      thisBook.filterForm.addEventListener('click', function (event) {
        const filter = event.target;
        if (
          filter.tagName == 'INPUT' &&
          filter.type == 'checkbox' &&
          filter.name == 'filter'
        ) {
          if (filter.checked == true) {
            thisBook.filters.push(filter.value);
          } else {
            thisBook.filters.splice(thisBook.filters.indexOf(filter.value));
          }
        }
        thisBook.filterBooks();
        console.log('value', filter.value);
        console.log('filters', thisBook.filters);
      });
    }
    filterBooks() {
      const thisBook = this;

      for (let book of dataSource.books) {
        let shouldBeHidden = false;
        for (let filter of thisBook.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        if (shouldBeHidden == true) {
          const bookImageHidden = document.querySelector(
            '[data-id="' + book.id + '"]'
          );
          bookImageHidden.classList.add('hidden');
        } else {
          const bookImageHidden = document.querySelector(
            '[data-id="' + book.id + '"]'
          );
          bookImageHidden.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let ratingBgc = '';
      if (rating < 6) {
        ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return ratingBgc;
    }
  }
  const app = new BookList();
  console.log('app', app);
}
