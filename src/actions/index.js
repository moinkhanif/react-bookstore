export const CREATE_BOOK = book => ({
  type: 'CREATE_BOOK',
  newBook: book,
});

export const REMOVE_BOOK = book => (
  {
    type: 'REMOVE_BOOK',
    rBook: book,
  }
);
