const booksReducer = (state = [], action) => {
  let newState = {};
  switch (action.type) {
    case 'CREATE_BOOK':
      newState = [...state];
      newState.push(action.newBook);
      return newState;
    case 'REMOVE_BOOK':
      return state.filter(sBook => sBook.id !== action.rBook.id);
    default:
      return state;
  }
};

export default booksReducer;
