import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Book from '../Book/Book.component';

const BookList = ({ books }) => (
  <table>
    <tr>
      <th>Book Id</th>
      <th>Title</th>
      <th>Category</th>
    </tr>
    {books.map(book => <Book book={book} key={book.id} />)}
  </table>
);

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
  })),
};

BookList.defaultProps = {
  books: {
    id: 'Undefined',
    title: 'Undefined',
    category: 'Undefined',
  },
};

const mapStateToProps = state => ({
  books: state.books,
});

export default connect(mapStateToProps)(BookList);
