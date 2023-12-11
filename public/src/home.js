const getTotalBooksCount = (books) => books.length; // Used arrow function

const getTotalAccountsCount = (accounts) => accounts.length;

//Used .filter
function getBooksBorrowedCount(books) {
  const checkedOutBooks = books.filter(book => !book.borrows[0].returned);
  return checkedOutBooks.length;
}

//Helper function
const countGenres = (books) => {
  return books.reduce((count, book) => {
    const bookGenre = book.genre;
    count[bookGenre] = (count[bookGenre] || 0) + 1;
    return count;
  }, {});
};

function getMostCommonGenres(books) {
  const genreCount = countGenres(books);

  const genresArray = Object.entries(genreCount).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  return genresArray.slice(0, 5);
}

function getMostPopularBooks(books) {
  const bookCount = {};
  for (const book of books) {
    const bookTitle = book.title;
    bookCount[bookTitle] = book.borrows.length;
  }
  const bookArray = [];
  for (const title in bookCount) {
    const count = bookCount[title];
    bookArray.push({ name: title, count });
  }
  bookArray.sort((a, b) => b.count - a.count);
  return bookArray.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = {};
  for (const book of books) {
    const authorId = book.authorId;
    const author = authors.find(author => author.id === authorId);
    if (author) {
      const authorName = `${author.name.first} ${author.name.last}`;
      const borrowCount = book.borrows.length;
      if (authorBorrowCounts[authorName]) {
        authorBorrowCounts[authorName] += borrowCount;
      } else {
        authorBorrowCounts[authorName] = borrowCount;
      }
    }
  }
  const popularAuthors = Object.entries(authorBorrowCounts)
    .map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 5);
  return popularAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
