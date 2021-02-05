export const CREATE_BOOK = (book, state) => {
  const newState = {};
  newState.books = [...state.books];
  newState.books.push(book);
  return newState;
};

export const REMOVE_BOOK = (book, state) => {
  const newState = {};
  newState.books = state.books.filter(sBook => sBook.id !== book.id);
  return newState;
};
