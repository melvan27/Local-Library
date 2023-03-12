function getTotalBooksCount(books) {
  // return the number of books
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // return the number of accounts
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // create a list of borrowed books
  const borrowed = books.filter((book) => book.borrows.some(person => (person.returned === false)));
  // return the number of borrowed books
  return borrowed.length;
}

function getMostCommonGenres(books) {
  // count the occurrences of each genre
  const genreCount = books.reduce((count, book) => {
    const genre = book.genre;
    // if the genre is already counted, increment the count
    if (genre in count) {
      count[genre]++;
    }
    // if the genre is not present, add it with an initial count of 1
    else {
      count[genre] = 1;
    }
    return count;
  }, {});
  // convert the object of genre counts into an array of objects
  const genres = Object.entries(genreCount)
    .map(([name, count]) => ({ name, count }))
    // sort the array by count in descending order
    .sort((genreA, genreB) => genreB.count - genreA.count)
    // limit the array to the first 5 genres
    .slice(0, 5);
  // return the array of most common genres
  return genres;
}

function getMostPopularBooks(books) {
  // create an array of objects with the book name and the number of times it has been borrowed
  const bookBorrows = books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  });
  // sort the array of books by the number of times each book has been borrowed
  bookBorrows.sort((book1, book2) => book2.count - book1.count);
  // return only the top five books
  return bookBorrows.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // create an object to store the number of times each author's books have been borrowed
  const authorBorrows = {};
  // iterate over each book and increment the borrow count for its author
  books.forEach((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    if (author) {
      const authorName = `${author.name.first} ${author.name.last}`;
      if (authorName in authorBorrows) {
        authorBorrows[authorName] += book.borrows.length;
      } else {
        authorBorrows[authorName] = book.borrows.length;
      }
    }
  });
  // convert the authorBorrows object to an array of objects with name and count keys
  const authorBorrowsArray = [];
  for (const authorName of Object.keys(authorBorrows)) {
    const count = authorBorrows[authorName];
    const authorObject = createAuthorObject(authorName, count);
    authorBorrowsArray.push(authorObject);
  }
  // sort the array of author counts by the number of times each author's books have been borrowed
  authorBorrowsArray.sort((author1, author2) => author2.count - author1.count);
  // return only the top five authors
  return authorBorrowsArray.slice(0, 5);
}

// helper function that creates an object with the properties given
function createAuthorObject(name, count) {
  return { name, count };
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
