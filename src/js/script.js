{
    'use strict';

    const select = {
      templateOf: {
        bookProduct: '#template-book',
        },
      containerOf: {
        bookList: '.books-list',
        }
    }
    const templates = {
        bookProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
    }

    const render = function (){
        
        for( let book of dataSource.books){
            const thisBook = this;

            const generatedHTML = templates.bookProduct(book);

            thisBook.element = utils.createDOMFromHTML(generatedHTML);

            const bookContainer = document.querySelector(select.containerOf.bookList);

            bookContainer.appendChild(thisBook.element);
        }
    };

    render();

















}