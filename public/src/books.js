function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = [];
  const returned = [];
  for (const book of books) {
    if (book.borrows[0].returned === true) {
      returned.push(book);
    }
    else checkedOut.push(book);
  }
  return [checkedOut, returned]
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map(borrow => {
    const account = accounts.find(account => account.id === borrow.id);
    return { ...borrow, ...account };
  });

  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
