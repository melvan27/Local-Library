function findAuthorById(authors, id) {
  // returns the author that matches the given ID
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  // returns the book that matches the given ID
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // checks if a book is borrowed and adds it to the borrowed variable
  let borrowed = books.filter((book) => book.borrows.some(person => (person.returned === false)));
  // makes sure no one is borrowing the book and adds it to the returned variable
  let returned = books.filter((book) => book.borrows.every(person => (person.returned === true)));
  // create and return a partitioned array that puts borrowed and returned books in their own arrays
  const partition = [[...borrowed], [...returned]];
  return partition;
}

function getBorrowersForBook(book, accounts) {
  // get the list of borrowers
  let borrowers = book.borrows;
  // get all the accounts that have borrowed or returned the given book
  let people = accounts.filter(account => borrowers.find(person => person.id === account.id));
  // add the returned status to each borrower object
  let detailedBorrowers = people.map(borrower => {
    let person = book.borrows.find(person => person.id === borrower.id);
    return {...borrower, returned: person.returned};
  });
  // cut the list to a max of 10
  return detailedBorrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
