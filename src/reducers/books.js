import { CREATE_BOOK, REMOVE_BOOK } from '../actions/index';

const booksReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_BOOK':
      return CREATE_BOOK(action.book, state);
    case 'REMOVE_BOOK':
      return REMOVE_BOOK(action.book, state);
    default:
      return state;
  }
};

export default booksReducer;
