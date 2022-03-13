{
    'use strict';

    const select = {
      templateOf: {
        bookProduct: '#template-book',
        },
      containerOf: {
        booksList: '.books-list',
        },
      element:{
        bookImage: '.book__image',
        }
    }
    const templates = {
        bookProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
    }

    const render = function () {
        const thisBook = this;

        for (let book of dataSource.books) {
    
          const generatedHTML = templates.bookProduct(book);
    
          thisBook.element = utils.createDOMFromHTML(generatedHTML);
    
          const bookContainer = document.querySelector(select.containerOf.booksList);
    
          bookContainer.appendChild(thisBook.element);
        }
      };

    const favoriteBooks =[];

    const initActions = function (){

        const thisBook = this;

        thisBook.accordionTrigger  = document.querySelector(select.containerOf.booksList);
        thisBook.bookImage = thisBook.accordionTrigger.querySelectorAll('.book a');           
      
        thisBook.accordionTrigger .addEventListener('dblclick', function(event){
            event.preventDefault();
            const book = event.target.offsetParent;
            console.log('clicked', book);

      if(book.classList.contains('book__image')){       
       
        book.classList.toggle('favorite');

          const bookImageId = book.getAttribute('data-id');

          if(favoriteBooks.includes(bookImageId)){
            favoriteBooks.splice(favoriteBooks.indexOf(bookImageId));
          }
          else {
            favoriteBooks.push(bookImageId);
          }         
      }
      console.log('favoriteBooks', favoriteBooks);
    });
}    

    render();
    initActions();

}
