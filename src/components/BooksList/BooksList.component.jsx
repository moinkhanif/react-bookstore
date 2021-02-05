import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Book from '../Book/Book.component';

const BookList = ({ books }) => (
  <table>
    <tbody>
      <tr>
        <th>Book Id</th>
        <th>Title</th>
        <th>Category</th>
      </tr>
      {books.map(book => <Book book={book} key={book.id} />)}
    </tbody>
  </table>
);

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = state => ({
  books: state.books,
});

export default connect(mapStateToProps)(BookList);
