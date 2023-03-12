function findAccountById(accounts, id) {
  // find the account that matches the given ID
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  // sort the account last names in alphabetical order
  return accounts.sort((account1, account2) => account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  // filter the books by the given account
  let result = books.filter((book) => book.borrows.some(person => person.id === account.id));
  // return the number of books that the account has interacted with
  return result.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
  // the books array is filtered based on whether it's currently being borrowed
    .filter((book) => book.borrows.some(person => (person.id === account.id && person.returned === false)))
    // the filtered array is added to a new array with the author added as a new key
    .map((book) => ({
      ...book,
      author: authors.find((author) => author.id === book.authorId),
    }));
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
