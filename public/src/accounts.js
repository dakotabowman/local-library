function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((account1, account2) => account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  let borrows = 0;
  for (const book of books) {
    const bookBorrows = book.borrows
    for (const item of bookBorrows) {
      if (item.id === account.id) {
        borrows += 1
      }
    }
  }
  return borrows;
}

function getAuthorById(authors, authorId) {
  return authors.find(author => author.id === authorId);
}

function getBooksPossessedByAccount(account, books, authors) {
  const booksCheckedOut = [];
  for (const book of books) {
    const borrows = book.borrows;
    const isCurrentlyCheckedOut = borrows.some(borrow => borrow.id === account.id && !borrow.returned);
    if (isCurrentlyCheckedOut) {
      const author = getAuthorById(authors, bookCopy.authorId);
      bookCopy.author = author;booksCheckedOut.push(bookCopy);
    }
  }
  return booksCheckedOut;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
