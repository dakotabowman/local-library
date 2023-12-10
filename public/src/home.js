function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((checkedOutCount, book) => {
    if (book.borrows[0].returned === false) {
      checkedOutCount += 1;
    }
    return checkedOutCount;
  }, 0);
}

function getMostCommonGenres(books) {
  const genreCount = {};
  for (const book of books) {
    const bookGenre = book.genre;
    if (genreCount[bookGenre]) {
      genreCount[bookGenre]++;
    } else {
      genreCount[bookGenre] = 1;
    }
  }
  const genresArray = [];
  for (const genreName in genreCount) {
    const genreCountValue = genreCount[genreName];
    genresArray.push({ name: genreName, count: genreCountValue });
  }
  genresArray.sort((a, b) => b.count - a.count);
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
