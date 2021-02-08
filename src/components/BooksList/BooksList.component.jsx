import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_FILTER } from '../../actions';
import Book from '../Book/Book.component';
import CategoryFilter from '../CategoryFilter/CategoryFilter.component';
import './BookList.styles.css';

const BookList = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const { books } = state;

  const handleFilterChange = event => {
    const selectedFilter = event.target.value;
    dispatch(CHANGE_FILTER(selectedFilter));
  };

  let filteredBooks = [...books];
  if (state.filter !== 'All') {
    filteredBooks = filteredBooks.filter(book => book.category === state.filter);
  }
  const emptyMessage = 'Sorry no books in the selected category';

  return (
    <main className="main-body">
      <div className="filter-container max-width-limit">
        <CategoryFilter handleFilterChange={handleFilterChange} />
      </div>
      <div className="books-container max-width-limit">
        { filteredBooks.length < 1
          ? <p className="empty-books">{emptyMessage}</p>
          : filteredBooks.map(book => <Book book={book} key={book.id} />) }
      </div>
    </main>
  );
};

export default BookList;
