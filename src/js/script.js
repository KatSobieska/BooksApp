{
    'use strict';

    const select = {
      templateOf: {
        bookProduct: '#template-book',
        },
      containerOf: {
        booksList: '.books-list',
        }
    }
    const templates = {
        bookProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
    }

    const render = function (){
        const thisBook = this;

        for( let book of dataSource.books){

            const generatedHTML = templates.bookProduct(book);

            thisBook.element = utils.createDOMFromHTML(generatedHTML);

            const bookContainer = document.querySelector(select.containerOf.booksList);

            bookContainer.appendChild(thisBook.element);
        }
    };

    render();

    favoriteBooks =[];

    const initActions = function (){

        thisBook = this;

        thisBook.accordionTrigger = document.querySelector(select.containerOf.booksList);
        thisBook.bookImage = document.querySelector('.book a');
        console.log('bookImage', thisBook.bookImage);

        thisBook.accordionTrigger.addEventListener('dblclick', function(event){
            console.log('clicked');
            event.preventDefault();
            thisBook.bookImage.classList.toggle('favorite');
            console.log('thisBook', thisBook.bookImage);
            const bookImage = thisBook.bookImage.getAttribute('data-id');
            favoriteBooks.push(bookImage);

            console.log('favoriteBooks', favoriteBooks);

        });

    };

    initActions();

        


     
}















