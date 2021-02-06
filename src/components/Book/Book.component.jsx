import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { REMOVE_BOOK } from '../../actions';

const Book = ({ book }) => {
  const { id, title, category } = book;
  const dispatch = useDispatch();

  const handleRemoveBook = book => {
    dispatch(REMOVE_BOOK(book));
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{category}</td>
      <td><button type="submit" onClick={() => handleRemoveBook(book)}>Remove Book</button></td>
    </tr>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default Book;
