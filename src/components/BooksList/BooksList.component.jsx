import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_FILTER } from '../../actions';

import Book from '../Book/Book.component';
import CategoryFilter from '../CategoryFilter/CategoryFilter.component';

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
    <>
      <CategoryFilter handleFilterChange={handleFilterChange} />
      <table>
        <tbody>
          <tr>
            <th>Book Id</th>
            <th>Title</th>
            <th>Category</th>
          </tr>
          { filteredBooks.length < 1
            ? <tr className="empty-books"><td>{emptyMessage}</td></tr>
            : filteredBooks.map(book => <Book book={book} key={book.id} />) }
        </tbody>
      </table>
    </>
  );
};

export default BookList;
