import { useSelector } from 'react-redux';

import Book from '../Book/Book.component';

const BookList = () => {
  const books = useSelector(state => state.books);
  return (
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
};

export default BookList;
