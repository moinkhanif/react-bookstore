import { BOOK_CATEGORY } from '../containers/BooksForm/BooksForm.component';

const filterReducer = (state = 'All', action) => {
  if (action.type === 'All' || BOOK_CATEGORY.includes(action.type)) {
    return action.type;
  }
  return state;
};

export default filterReducer;
